import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const rollupConfig = {
  input: 'src/index.js',
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
    babel({
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [['@babel/preset-env', { targets: { node: true } }]],
      plugins: ['@babel/proposal-class-properties', '@babel/plugin-proposal-private-methods'],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    json(),
  ],
};

export default rollupConfig;
