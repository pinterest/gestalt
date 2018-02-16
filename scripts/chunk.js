#!/usr/bin/env babel-node

const [, , totalChunks, thisChunk, ...files] = process.argv;

if (files.length < totalChunks) {
  process.stdout.write(files.join(' '));
} else {
  const chunkLength = Math.ceil(files.length / totalChunks);
  const startIdx = (thisChunk - 1) * chunkLength;
  const endIdx = startIdx + chunkLength;

  process.stdout.write(files.slice(startIdx, endIdx).join(' '));
}
