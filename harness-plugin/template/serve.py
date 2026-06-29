#!/usr/bin/env python3
"""하네스 로컬 서버 — 정적 서빙 + env 자동저장 + 자동화 실행.

  python serve.py [포트]      (기본 8000)
  -> http://localhost:8000/harness/

엔드포인트(localhost 전용 바인딩 — 외부 노출 안 함):
  POST /__save_env   설정 탭 「저장」 -> automation.env 에 키 기록
  POST /__run {id}   「지금 실행」 -> automation.json 의 그 자동화 run 을 실제 실행
                     (run 스크립트만. 프롬프트 자동화는 Claude Code/에이전트가 실행)

보안: automation.json 에 정의된 자동화의 run 만 돌린다(임의 명령 입력 불가).
"""
import sys, os, json, subprocess, datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent          # 하네스 루트(=서버 cwd)
ENV_FILE = "automation.env"                      # .gitignore 의 *.env 로 커밋 제외

def load_env_vars():                             # 서브프로세스에 키 주입(automation.env + 현재 환경)
    env = dict(os.environ)
    f = ROOT / ENV_FILE
    if f.exists():
        for line in f.read_text(encoding="utf-8").splitlines():
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.split("=", 1); env[k.strip()] = v.strip()
    return env

def find_automation(aid):
    f = ROOT / "automation" / "automation.json"
    if not f.exists(): return None
    try: autos = json.loads(f.read_text(encoding="utf-8")).get("automations", [])
    except json.JSONDecodeError: return None
    return next((a for a in autos if a.get("id") == aid), None)

def log_run(aid, status, summary):
    rec = {"ts": datetime.datetime.now().strftime("%Y-%m-%dT%H:%M"), "actor": "code",
           "op": "automation:run", "target": aid, "status": status, "summary": summary}
    logf = ROOT / "logs" / "log.jsonl"
    logf.parent.mkdir(exist_ok=True)
    with open(logf, "a", encoding="utf-8", newline="\n") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")

class Handler(SimpleHTTPRequestHandler):
    def _json(self, obj, code=200):
        out = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("content-type", "application/json; charset=utf-8")
        self.send_header("content-length", str(len(out)))
        self.end_headers(); self.wfile.write(out)

    def _read(self):
        return self.rfile.read(int(self.headers.get("content-length", 0))).decode("utf-8")

    def do_POST(self):
        path = self.path.rstrip("/")
        try:
            if path == "/__save_env":
                body = self._read()
                with open(ROOT / ENV_FILE, "w", encoding="utf-8", newline="\n") as f:
                    f.write(body if body.endswith("\n") else body + "\n")
                keys = sum(1 for l in body.splitlines() if "=" in l)
                return self._json({"ok": True, "path": ENV_FILE, "keys": keys})

            if path == "/__toggle":           # 켜기/끄기를 automation.json 에 즉시 기록(반영대기 없음)
                data = json.loads(self._read() or "{}")
                aid, en = data.get("id"), bool(data.get("enabled"))
                f = ROOT / "automation" / "automation.json"
                obj = json.loads(f.read_text(encoding="utf-8"))
                hit = next((a for a in obj.get("automations", []) if a.get("id") == aid), None)
                if not hit:
                    return self._json({"ok": False, "reason": "자동화 없음"}, 404)
                hit["enabled"] = en
                f.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                return self._json({"ok": True, "id": aid, "enabled": en})

            if path == "/__run":
                data = json.loads(self._read() or "{}")
                a = find_automation(data.get("id"))
                if not a:
                    return self._json({"ok": False, "reason": "자동화를 찾을 수 없음"}, 404)
                run = a.get("run")
                if not run:                       # 프롬프트(LLM) 자동화는 스크립트가 아니라 못 돌림
                    return self._json({"ok": True, "ran": False,
                        "reason": "프롬프트(LLM) 자동화 — Claude Code/에이전트가 실행하는 작업이라 서버가 못 돌립니다."})
                test = bool(data.get("test"))     # 테스트 모드 → 스크립트에 HARNESS_TEST=1 (안전 동작·접두사 등)
                env = load_env_vars()
                env["PYTHONIOENCODING"] = "utf-8"  # 캡처 시 한글/특수문자 출력이 cp949 로 깨지지 않게
                if test: env["HARNESS_TEST"] = "1"
                proc = subprocess.run(run, shell=True, cwd=str(ROOT), env=env,
                                      capture_output=True, timeout=180)   # 바이트 캡처
                ok = proc.returncode == 0
                output = (proc.stdout + proc.stderr).decode("utf-8", "replace").strip()[-2000:]
                log_run(a["id"], "ok" if ok else "fail",
                        ("[테스트] " if test else "") + (a.get("title", a["id"]) + " 실행")[:70])
                return self._json({"ok": True, "ran": True, "test": test, "status": "ok" if ok else "fail",
                                   "exit": proc.returncode, "cmd": run, "output": output})

            self.send_error(404)
        except subprocess.TimeoutExpired:
            self._json({"ok": True, "ran": True, "status": "fail", "output": "시간초과(180s)"}, 200)
        except Exception as e:                    # ponytail: 단일 핸들러, 에러는 500 한 줄
            self._json({"ok": False, "reason": str(e)}, 500)

def port_busy(p):                                # 이미 누가 듣고 있으면 True (Windows 는 SO_REUSEADDR 로 bind 가 안 막혀 직접 확인)
    import socket
    with socket.socket() as s:
        s.settimeout(0.3)
        return s.connect_ex(("127.0.0.1", p)) == 0

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    if port_busy(port): port = 0                  # 사용 중 → OS 가 빈 포트 배정
    httpd = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    port = httpd.server_address[1]
    print(f"하네스: http://localhost:{port}/harness/   (env 저장 + 자동화 실행 엔드포인트)", flush=True)
    httpd.serve_forever()
