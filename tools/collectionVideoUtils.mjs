/**
 * High-quality poster + web preview clip for collection tiles.
 */
import { execFile } from 'child_process';
import { promisify } from 'util';
import { mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname } from 'path';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);

export const POSTER_MAX_PX = 1600;
export const POSTER_WEBP_Q = 90;
export const PREVIEW_MAX_W = 960;
export const PREVIEW_CRF = 24;
export const PREVIEW_MAX_SEC = 2;

export async function hasFfmpeg() {
  try {
    await execFileAsync('ffmpeg', ['-version']);
    return true;
  } catch {
    return false;
  }
}

export async function videoDurationSec(videoPath) {
  try {
    const { stdout } = await execFileAsync('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      videoPath,
    ]);
    const n = parseFloat(stdout.trim());
    return Number.isFinite(n) && n > 0 ? n : 4;
  } catch {
    return 4;
  }
}

export async function posterFromVideo(videoPath, outputWebp) {
  await mkdir(dirname(outputWebp), { recursive: true });
  const dur = await videoDurationSec(videoPath);
  const seek = Math.min(Math.max(dur * 0.2, 0.5), Math.max(dur - 0.5, 0.5));
  const tmp = outputWebp.replace(/\.webp$/i, '.__poster.png');

  await execFileAsync('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-ss',
    String(seek),
    '-i',
    videoPath,
    '-vf',
    `scale='min(${POSTER_MAX_PX},iw)':-2:flags=lanczos`,
    '-frames:v',
    '1',
    '-y',
    tmp,
  ]);

  try {
    await sharp(tmp)
      .rotate()
      .webp({ quality: POSTER_WEBP_Q, effort: 4 })
      .toFile(outputWebp);
  } finally {
    if (existsSync(tmp)) await unlink(tmp);
  }
}

export async function previewFromVideo(videoPath, outputMp4) {
  await mkdir(dirname(outputMp4), { recursive: true });
  const dur = await videoDurationSec(videoPath);
  const seek = Math.min(Math.max(dur * 0.15, 0.3), Math.max(dur - 1, 0.3));
  const remaining = Math.max(dur - seek, 0.1);
  const clipLen = Math.min(PREVIEW_MAX_SEC, remaining);

  await execFileAsync('ffmpeg', [
    '-hide_banner',
    '-loglevel',
    'error',
    '-ss',
    String(seek),
    '-i',
    videoPath,
    '-t',
    String(clipLen),
    '-vf',
    `scale='min(${PREVIEW_MAX_W},iw)':-2:flags=lanczos`,
    '-an',
    '-c:v',
    'libx264',
    '-crf',
    String(PREVIEW_CRF),
    '-preset',
    'medium',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-y',
    outputMp4,
  ]);
}
