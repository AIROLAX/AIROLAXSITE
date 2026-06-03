/**
 * Vercel install: pull Git LFS media when available, then npm install.
 */
import { spawnSync } from 'child_process';

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  return r.status ?? 1;
}

console.log('→ git lfs install (if available)');
run('git', ['lfs', 'install']);

console.log('→ git lfs pull');
const lfsStatus = run('git', ['lfs', 'pull']);
if (lfsStatus !== 0) {
  console.warn('⚠ git lfs pull failed — heavy videos will use origin proxy (vercel.json rewrites)');
}

console.log('→ npm install');
const npmStatus = run('npm', ['install']);
process.exit(npmStatus);
