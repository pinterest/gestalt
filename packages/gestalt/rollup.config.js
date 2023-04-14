// eslint-disable-next-line flowtype/require-valid-file-annotation, import/no-relative-packages
import plugins from '../gestalt-core/build.js';

const rollupConfig = {
  input: 'src/index.js',
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
  external: ['react', 'classnames/bind', 'classnames', 'react-dom'],
  plugins: plugins('gestalt'),
};

export default rollupConfig;
