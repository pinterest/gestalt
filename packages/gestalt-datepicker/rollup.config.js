// eslint-disable-next-line flowtype/require-valid-file-annotation
import plugins from '../gestalt-core/build.js'; // eslint-disable-line import/no-relative-parent-imports

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/gestalt-datepicker.js',
      format: 'umd',
      name: 'gestalt-datepicker',
      exports: 'named',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
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
        'prop-types': 'PropTypes',
        classnames: 'classnames',
        'classnames/bind': 'classnames',
        'react-dom': 'ReactDOM',
        'react-datepicker': 'ReactDatePicker',
      },
      sourcemap: 'inline',
    },
  ],
  external: [
    'react',
    'prop-types',
    'classnames/bind',
    'classnames',
    'react-dom',
    'react-datepicker',
  ],
  plugins: plugins('gestalt-datepicker'),
};
