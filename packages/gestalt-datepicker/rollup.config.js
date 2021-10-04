// eslint-disable-next-line flowtype/require-valid-file-annotation
import plugins from '../gestalt-core/build.js'; // eslint-disable-line import/no-relative-parent-imports

const rollupConfig = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/gestalt-datepicker.js',
      format: 'umd',
      name: 'gestalt-datepicker',
      exports: 'named',
      globals: {
        react: 'React',
        classnames: 'classnames',
        'classnames/bind': 'classnames',
        'react-dom': 'ReactDOM',
        'react-datepicker': 'ReactDatePicker',
      },
      sourcemap: 'inline',
    },
    {
      file: 'dist/gestalt-datepicker.es.js',
      format: 'es',
      name: 'gestalt-datepicker',
      exports: 'named',
      globals: {
        react: 'React',
        classnames: 'classnames',
        'classnames/bind': 'classnames',
        'react-dom': 'ReactDOM',
        'react-datepicker': 'ReactDatePicker',
      },
      sourcemap: 'inline',
    },
  ],
  external: ['react', 'classnames/bind', 'classnames', 'react-dom', 'react-datepicker'],
  plugins: plugins('gestalt-datepicker'),
};

export default rollupConfig;
