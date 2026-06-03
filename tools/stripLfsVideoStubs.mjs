/**
 * Remove Git LFS pointer stubs from dist/ so Vercel rewrites can proxy real files from origin.
 * LFS pointers are tiny text files (~130 bytes) mis-served as broken videos.
 */
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname } from 'path';

const DIST = join(process.cwd(), 'dist');
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm', '.m4v', '.mkv', '.MP4', '.MOV']);
const MAX_BYTES = 2048;

async function walk(dir) {
  let removed = 0;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = join(dir, ent.name);
    if (ent.isDirectory()) {
      removed += await walk(full);
      continue;
    }
    const ext = extname(ent.name);
    if (!VIDEO_EXT.has(ext)) continue;
    const { size } = await stat(full);
    if (size <= MAX_BYTES) {
      await unlink(full);
      removed += 1;
      console.log(`  stripped LFS stub: ${full.replace(DIST, '')} (${size} B)`);
    }
  }
  return removed;
}

async function main() {
  const targets = [join(DIST, 'videos'), join(DIST, 'collections')];
  let total = 0;
  for (const t of targets) {
    try {
      total += await walk(t);
    } catch (e) {
      if (e && e.code !== 'ENOENT') throw e;
    }
  }
  console.log(total ? `✓ ${total} video stub(s) removed from dist` : '✓ no video stubs in dist');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
