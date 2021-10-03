// eslint-disable-next-line flowtype/require-valid-file-annotation
import plugins from '../gestalt-core/build.js'; // eslint-disable-line import/no-relative-parent-imports

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
      sourcemap: 'inline',
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
      sourcemap: 'inline',
    },
  ],
  external: ['react', 'classnames/bind', 'classnames', 'react-dom'],
  plugins: plugins('gestalt'),
};

export default rollupConfig;
