import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

export type VisionOcrLine = {
  text: string;
  confidence: number;
};

const SWIFT_RUNNER_PATH = path.resolve('scripts/lib/vision-ocr.swift');

let isVisionOcrAvailable: boolean | undefined;

function roundConfidence(value: number): number {
  return Number(value.toFixed(3));
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export function canUseVisionOcr(): boolean {
  if (isVisionOcrAvailable !== undefined) {
    return isVisionOcrAvailable;
  }

  if (process.platform !== 'darwin' || !existsSync(SWIFT_RUNNER_PATH)) {
    isVisionOcrAvailable = false;
    return isVisionOcrAvailable;
  }

  try {
    execFileSync('swift', ['-version'], {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    isVisionOcrAvailable = true;
  } catch {
    isVisionOcrAvailable = false;
  }

  return isVisionOcrAvailable;
}

export async function extractVisionOcrLines(imagePath: string): Promise<VisionOcrLine[]> {
  if (!canUseVisionOcr()) {
    return [];
  }

  try {
    const stdout = execFileSync('swift', [SWIFT_RUNNER_PATH, imagePath], {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    const parsed = JSON.parse(stdout) as Array<{ text?: unknown; confidence?: unknown }>;

    return parsed
      .map((line) => ({
        text: normalizeText(typeof line.text === 'string' ? line.text : ''),
        confidence: roundConfidence(typeof line.confidence === 'number' ? line.confidence : 0),
      }))
      .filter((line) => line.text.length > 0);
  } catch {
    return [];
  }
}
