// eslint-disable-next-line import/no-relative-packages
import { acornInjectPlugins, plugins } from '../gestalt-core/build';

const rollupConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/gestalt.js',
      format: 'umd',
      name: 'gestalt',
      exports: 'named',
      globals: {
        react: 'React',
        classnames: 'classnames',
        'classnames/bind': 'classnames',
        'react-dom': 'ReactDOM',
      },
      sourcemap: true,
    },
    {
      file: 'dist/gestalt.es.js',
      format: 'es',
      name: 'gestalt',
      exports: 'named',
      globals: {
        react: 'React',
        classnames: 'classnames',
        'classnames/bind': 'classnames',
        'react-dom': 'ReactDOM',
      },
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'classnames/bind',
    'classnames',
    'react-dom',
    'react/jsx-runtime',
    'react-dom/client',
  ],
  acornInjectPlugins,
  plugins: plugins('gestalt'),
};

export default rollupConfig;
