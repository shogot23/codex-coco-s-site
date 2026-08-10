#!/usr/bin/env node

import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const rootDir = process.cwd();
const source = path.join(rootDir, 'public/favicon.svg');
const destination = path.join(rootDir, 'public/apple-touch-icon.png');

sharp(source)
  .resize(180, 180, { fit: 'contain', background: '#f6f2eb' })
  .png()
  .toFile(destination)
  .then(() => process.stdout.write(`${destination}\n`))
  .catch((error) => {
    process.stderr.write(`${error.stack ?? error}\n`);
    process.exitCode = 1;
  });
