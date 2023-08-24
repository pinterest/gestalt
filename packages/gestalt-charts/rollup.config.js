// eslint-disable-next-line flowtype/require-valid-file-annotation, import/no-relative-packages
import plugins from '../gestalt-core/build.js';

const rollupConfig = {
  input: 'src/index.js',
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
  plugins: plugins('gestalt-charts'),
};

export default rollupConfig;
