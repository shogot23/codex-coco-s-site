#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import ffmpegPath from 'ffmpeg-static';

const root = process.cwd();
const configPath = path.join(root, 'scripts/video-accessibility-manifest.json');
const outputRoot = path.join(root, 'public/videos');

const run = (args) => new Promise((resolve, reject) => {
  if (!ffmpegPath) return reject(new Error('ffmpeg-static binary is unavailable'));
  const child = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  let stderr = '';
  child.stderr.on('data', (chunk) => { stderr += chunk; });
  child.on('error', reject);
  child.on('close', (code) => code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}\n${stderr}`)));
});

const probeDurationSeconds = (input) => new Promise((resolve, reject) => {
  if (!ffmpegPath) return reject(new Error('ffmpeg-static binary is unavailable'));
  const child = spawn(ffmpegPath, ['-i', input], { stdio: ['ignore', 'ignore', 'pipe'] });
  let stderr = '';
  child.stderr.on('data', (chunk) => { stderr += chunk; });
  child.on('error', reject);
  child.on('close', () => {
    const match = stderr.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)/u);
    if (!match) return reject(new Error(`Unable to read video duration: ${input}`));
    resolve((Number(match[1]) * 3600) + (Number(match[2]) * 60) + Number(match[3]));
  });
});

const formatVttTimestamp = (seconds) => {
  const milliseconds = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(milliseconds / 3_600_000);
  const minutes = Math.floor((milliseconds % 3_600_000) / 60_000);
  const wholeSeconds = Math.floor((milliseconds % 60_000) / 1000);
  const remainder = milliseconds % 1000;
  return [hours, minutes, wholeSeconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':') + `.${String(remainder).padStart(3, '0')}`;
};

const sha256 = async (file) => createHash('sha256').update(await readFile(file)).digest('hex');

const main = async () => {
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  const records = {};
  const optimizedDir = path.join(outputRoot, 'optimized');
  const posterDir = path.join(outputRoot, 'posters');
  const captionsDir = path.join(outputRoot, 'captions');
  await Promise.all([optimizedDir, posterDir, captionsDir].map((dir) => mkdir(dir, { recursive: true })));

  for (const [slug, entry] of Object.entries(config)) {
    if (entry.speechStatus !== 'no-speech') {
      throw new Error(`${slug}: speechStatus must be manually confirmed before generation`);
    }
    if (!entry.reviewedAt || !entry.reviewMethod) {
      throw new Error(`${slug}: reviewedAt and reviewMethod are required for accessibility evidence`);
    }

    const input = path.resolve(root, entry.source);
    const relativeInput = path.relative(root, input);
    if (relativeInput.startsWith('..') || path.isAbsolute(relativeInput)) {
      throw new Error(`${slug}: source must stay inside the repository`);
    }
    const optimized = path.join(optimizedDir, `${slug}.mp4`);
    const poster = path.join(posterDir, `${slug}.jpg`);
    const captions = path.join(captionsDir, `${slug}.vtt`);

    await run([
      '-y', '-i', input,
      '-vf', 'scale=min(1280\\,iw):-2:flags=lanczos',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '27', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '128k', optimized,
    ]);
    await run(['-y', '-ss', '00:00:01.000', '-i', input, '-frames:v', '1', '-vf', 'scale=960:-2', '-q:v', '3', poster]);
    const duration = await probeDurationSeconds(input);
    await writeFile(captions, `WEBVTT\n\n00:00:00.000 --> ${formatVttTimestamp(duration)}\n[${entry.caption}]\n`);

    records[slug] = {
      source: `/${path.relative(path.join(root, 'public'), input).split(path.sep).join('/')}`,
      optimized: `/videos/optimized/${slug}.mp4`,
      poster: `/videos/posters/${slug}.jpg`,
      captions: `/videos/captions/${slug}.vtt`,
      speechStatus: entry.speechStatus,
      sourceBytes: (await stat(input)).size,
      optimizedBytes: (await stat(optimized)).size,
      sourceSha256: await sha256(input),
      optimizedSha256: await sha256(optimized),
    };
  }

  const ffmpegVersion = await new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, ['-version']);
    let stdout = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.on('error', reject);
    child.on('close', (code) => code === 0 ? resolve(stdout.split(/\r?\n/u)[0]) : reject(new Error(`ffmpeg -version exited ${code}`)));
  });

  await writeFile(path.join(outputRoot, 'video-manifest.json'), `${JSON.stringify({ ffmpegVersion, records }, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({ ffmpegVersion, records })}\n`);
};

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
