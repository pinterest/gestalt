#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

// yargs and esbuild have some incompatibility. This fixes it
// See https://github.com/evanw/esbuild/issues/1492
const importMeta = {
  name: 'Import Meta',
  setup({onLoad}) {
    const fs = require('fs');
    const url = require('url');
    onLoad({filter: /.*/}, (args) => {
      let code = fs.readFileSync(args.path, 'utf8');
      code = code.replace(
        /\bimport\.meta\.url\b/g,
        JSON.stringify(url.pathToFileURL(args.path)),
      );
      return {contents: code, loader: 'default'};
    });
  },
};

require('esbuild')
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    external: ['babylon'],
    platform: 'node',
    format: 'cjs',
    outdir: 'dist',
    plugins: [importMeta],
    // Linked sourcemap
    sourcemap: true,
  })
  .catch(() => process.exit(1));
