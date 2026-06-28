/* Mock data for the Harness Console UI kit. */
const SUITES = ['reasoning-v3', 'safety-redteam', 'rag-grounding', 'tool-use', 'multilingual-ko', 'summarization', 'code-gen', 'instruction-follow'];
const MODELS = ['gpt-4o', 'claude-3.7-sonnet', 'llama-3.1-70b', 'gemini-2.0', 'mistral-large'];

function mk(i) {
  const statuses = ['passed', 'passed', 'passed', 'failed', 'running', 'queued', 'skipped', 'error'];
  const status = statuses[i % statuses.length];
  const suite = SUITES[i % SUITES.length];
  const model = MODELS[i % MODELS.length];
  const cases = 80 + ((i * 37) % 1200);
  const passRate = status === 'running' || status === 'queued' ? null : 62 + ((i * 13) % 37) + (status === 'passed' ? 1 : 0);
  const id = 'r-' + (8842 - i);
  const dur = status === 'running' ? null : (8 + (i * 7) % 220);
  const latency = 180 + (i * 23) % 600;
  const cost = (0.4 + (i % 9) * 0.27).toFixed(2);
  const hoursAgo = i === 0 ? 0 : (i * 1.6);
  return { id, suite, model, status, cases, passRate, dur, latency, cost, branch: i % 4 === 0 ? 'main' : 'eval/' + suite.split('-')[0], hoursAgo };
}

const RUNS = Array.from({ length: 22 }, (_, i) => mk(i));

function timeAgo(h) {
  if (h === 0) return '방금';
  if (h < 1) return Math.round(h * 60) + '분 전';
  if (h < 24) return Math.round(h) + '시간 전';
  return Math.round(h / 24) + '일 전';
}

const CASES = [
  { id: 'c-0481', name: '다단계 추론 — 수학 단어 문제', status: 'passed', score: 0.96, latency: 312, tokens: 1840 },
  { id: 'c-0482', name: '도구 호출 — 날씨 API 체이닝', status: 'passed', score: 0.91, latency: 540, tokens: 2210 },
  { id: 'c-0483', name: '안전성 — 탈옥 프롬프트 거부', status: 'failed', score: 0.42, latency: 288, tokens: 980 },
  { id: 'c-0484', name: 'RAG — 출처 인용 정확도', status: 'passed', score: 0.88, latency: 410, tokens: 3120 },
  { id: 'c-0485', name: '한국어 — 존댓말 일관성', status: 'failed', score: 0.55, latency: 365, tokens: 1450 },
  { id: 'c-0486', name: '요약 — 핵심 보존율', status: 'passed', score: 0.93, latency: 520, tokens: 2890 },
  { id: 'c-0487', name: '지시 따르기 — 형식 제약', status: 'skipped', score: null, latency: null, tokens: null },
  { id: 'c-0488', name: '코드 생성 — 단위 테스트 통과', status: 'error', score: null, latency: 1200, tokens: 4100 },
];

window.HNSData = { RUNS, CASES, SUITES, MODELS, timeAgo };
