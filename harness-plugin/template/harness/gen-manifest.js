// 폴더 구조 manifest 생성. 저장소 루트에서: node harness/gen-manifest.js
// 각 영역의 content/ 폴더 트리를 harness/manifest.json 으로 출력 (뷰어 「구조」 패널이 읽음. ssot 은 별도 섹션).
// 파일을 추가/삭제/이동하면 다시 실행해 갱신한다. areas/ 가 아직 없으면 빈 manifest 를 쓴다.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');         // 저장소 루트
function build(dir){
  const out = { dirs: [], files: [] };
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;            // .git 등 제외
    if (e.isDirectory()) out.dirs.push({ n: e.name, c: build(path.join(dir, e.name)) });
    else out.files.push({ n: e.name });
  }
  out.dirs.sort((a, b) => a.n.localeCompare(b.n));
  out.files.sort((a, b) => a.n.localeCompare(b.n));
  return [...out.dirs, ...out.files];               // 폴더 먼저
}
const manifest = {};
const areasDir = path.join(ROOT, 'areas');
if (fs.existsSync(areasDir)) (function walk(d){
  const entries = fs.readdirSync(d, { withFileTypes: true });
  // 영역 폴더 = content/ 또는 ssot/ 를 가진 폴더 → 「구조」는 content/ 트리만 기록(더 안 내려감)
  if (entries.some(e => e.isDirectory() && (e.name === 'content' || e.name === 'ssot'))) {
    const areaPath = path.relative(ROOT, d).split(path.sep).join('/') + '/';
    const contentDir = path.join(d, 'content');
    manifest[areaPath] = fs.existsSync(contentDir) ? build(contentDir) : [];
    return;
  }
  for (const e of entries) if (e.isDirectory()) walk(path.join(d, e.name));
})(areasDir);
fs.writeFileSync(path.join(ROOT, 'harness', 'manifest.json'), JSON.stringify(manifest));
console.log('manifest.json 갱신: ' + Object.keys(manifest).length + ' areas');
