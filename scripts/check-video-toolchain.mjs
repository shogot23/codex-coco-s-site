#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import process from 'node:process';
import ffmpegStatic from 'ffmpeg-static';

const requireFfmpeg = process.argv.includes('--require-ffmpeg');
const systemResult = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
const binary = systemResult.error || systemResult.status !== 0 ? ffmpegStatic : 'ffmpeg';
const source = binary === 'ffmpeg' ? 'system' : 'ffmpeg-static';
const result = binary ? spawnSync(binary, ['-version'], { encoding: 'utf8' }) : systemResult;

if (result.error || result.status !== 0) {
  process.stdout.write(`${JSON.stringify({ available: false, source, reason: result.error?.code ?? `exit-${result.status}` })}\n`);
  if (requireFfmpeg) process.exitCode = 1;
} else {
  const firstLine = result.stdout.split(/\r?\n/u)[0] ?? '';
  const version = firstLine.replace(/^ffmpeg version\s+/u, '').trim();
  process.stdout.write(`${JSON.stringify({ available: true, source, version })}\n`);
}
