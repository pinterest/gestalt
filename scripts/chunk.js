#!/usr/bin/env node

const totalChunks = process.argv[2];
const thisChunk = process.argv[3];
const files = process.argv.slice(3);

if (files.length < totalChunks) {
  process.stdout.write(files.join(' '));
} else {
  const chunkLength = Math.ceil(files.length / totalChunks);
  const startIdx = (thisChunk - 1) * chunkLength;
  const endIdx = startIdx + chunkLength;

  process.stdout.write(files.slice(startIdx, endIdx).join(' '));
}
