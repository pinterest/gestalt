// eslint-disable-next-line flowtype/require-valid-file-annotation
import { relative } from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

const rollupConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/stylelint-plugin-gestalt.js',
      format: 'umd',
      name: 'stylelint-plugin-gestalt',
      exports: 'named',
      sourcemap: false,
    },
    {
      file: 'dist/stylelint-plugin-gestalt.es.js',
      format: 'es',
      name: 'stylelint-plugin-gestalt',
      exports: 'named',
      sourcemap: false,
    },
  ],
  plugins: [
    nodeResolve(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    typescript({ tsconfig: relative(__dirname, '../../tsconfig.json') }),
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', { targets: { node: true } }], '@babel/preset-typescript'],
      plugins: ['@babel/proposal-class-properties', '@babel/plugin-proposal-private-methods'],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    json(),
  ],
};

export default rollupConfig;
