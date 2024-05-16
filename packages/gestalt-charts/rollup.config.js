// @noflow
// eslint-disable-next-line import/no-relative-packages
import { acornInjectPlugins, plugins } from '../gestalt-core/build';

const rollupConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/gestalt-charts.js',
      format: 'umd',
      name: 'gestalt-charts',
      exports: 'named',
      globals: {
        react: 'React',
        classnames: 'classnames',
        'classnames/bind': 'classnames',
        'react-dom': 'ReactDOM',
        'recharts': 'Recharts',
      },
      sourcemap: true,
    },
    {
      file: 'dist/gestalt-charts.es.js',
      format: 'es',
      name: 'gestalt-charts',
      exports: 'named',
      globals: {
        react: 'React',
        classnames: 'classnames',
        'classnames/bind': 'classnames',
        'react-dom': 'ReactDOM',
        'recharts': 'Recharts',
      },
      sourcemap: true,
    },
  ],
  external: ['react', 'classnames/bind', 'classnames', 'react-dom', 'recharts', 'gestalt'],
  acornInjectPlugins,
  plugins: plugins('gestalt-charts'),
};

export default rollupConfig;
