#!/usr/bin/env node
// eslint-disable-next-line no-console
console.log('********* PREBUILDING');
const path = require('node:path');
const fs = require('fs');

const baseDir = process.cwd();

const prebuildScripts = async () => {
  const file = path.join(baseDir, '/node_modules', 'next/dist/server/require-hook.js');

  const content = await fs.promises.readFile(file, 'utf-8');
  await fs.promises.writeFile(
    file,
    content.replace('if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {', 'if (true) {'),
  );
};

prebuildScripts();
