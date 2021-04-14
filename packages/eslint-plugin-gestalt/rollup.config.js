// eslint-disable-next-line flowtype/require-valid-file-annotation
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';

const rollupConfig = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/eslint-plugin-gestalt.js',
      format: 'umd',
      name: 'eslint-plugin-gestalt',
      exports: 'named',
      sourcemap: 'inline',
    },
    {
      file: 'dist/eslint-plugin-gestalt.es.js',
      format: 'es',
      name: 'eslint-plugin-gestalt',
      exports: 'named',
      sourcemap: 'inline',
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
      presets: [['@babel/preset-env', { targets: { node: true } }], '@babel/flow'],
      plugins: ['@babel/proposal-class-properties'],
      exclude: 'node_modules/**',
    }),
  ],
};

export default rollupConfig;
