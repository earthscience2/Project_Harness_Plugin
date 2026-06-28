// 폴더 구조 manifest 생성. 저장소 루트에서: node web/gen-manifest.js
// areas/**/content 각 폴더의 트리를 web/manifest.json 으로 출력 (뷰어 폴더 패널이 읽음).
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
if (fs.existsSync(areasDir)) (function findContent(d){
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(d, e.name);
    if (e.name === 'content') {
      const areaPath = path.relative(ROOT, d).split(path.sep).join('/') + '/';
      manifest[areaPath] = build(p);
    } else findContent(p);
  }
})(areasDir);
fs.writeFileSync(path.join(ROOT, 'web', 'manifest.json'), JSON.stringify(manifest));
console.log('manifest.json 갱신: ' + Object.keys(manifest).length + ' areas');
