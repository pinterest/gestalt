// eslint-disable-next-line flowtype/require-valid-file-annotation, import/no-relative-parent-imports, import/no-relative-packages
import plugins from '../gestalt-core/build.js';

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
  external: ['react', 'classnames/bind', 'classnames', 'react-dom', 'react-datepicker', 'gestalt'],
  plugins: plugins('gestalt-datepicker'),
};

export default rollupConfig;
