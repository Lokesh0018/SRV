// Fails (exit 1) when the production build grows past the performance budgets
// set in OPTIMIZATION_PLAN.md. Run after `vite build`: `npm run check:size`.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = 'dist';
const KB = 1024;
const BUDGETS = {
  jsTotalGzip: 180 * KB, // all JS, gzipped
  jsChunkGzip: 90 * KB, // any single JS chunk, gzipped
  image: 200 * KB, // any single image
  video: 2.1 * KB * KB, // any single video file
};

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
};
walk(DIST);

const failures = [];
const fmt = (n) => `${(n / KB).toFixed(1)} KB`;
let jsTotal = 0;

for (const f of files) {
  const ext = extname(f).toLowerCase();
  const size = statSync(f).size;
  if (ext === '.js') {
    const gz = gzipSync(readFileSync(f)).length;
    jsTotal += gz;
    if (gz > BUDGETS.jsChunkGzip) failures.push(`${f}: ${fmt(gz)} gzipped > ${fmt(BUDGETS.jsChunkGzip)}`);
  } else if (['.webp', '.avif', '.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
    if (size > BUDGETS.image) failures.push(`${f}: ${fmt(size)} > ${fmt(BUDGETS.image)}`);
  } else if (['.webm', '.mp4'].includes(ext)) {
    if (size > BUDGETS.video) failures.push(`${f}: ${fmt(size)} > ${fmt(BUDGETS.video)}`);
  }
}
if (jsTotal > BUDGETS.jsTotalGzip) failures.push(`total JS: ${fmt(jsTotal)} gzipped > ${fmt(BUDGETS.jsTotalGzip)}`);

console.log(`JS total (gzip): ${fmt(jsTotal)} / ${fmt(BUDGETS.jsTotalGzip)}`);
if (failures.length) {
  console.error('\nPerformance budget exceeded:\n  ' + failures.join('\n  '));
  process.exit(1);
}
console.log('All performance budgets met.');
