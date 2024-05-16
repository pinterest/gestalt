// @noflow
// eslint-disable-next-line import/no-relative-packages
import { acornInjectPlugins, plugins } from '../gestalt-core/build';

const rollupConfig = {
  input: 'src/index.ts',
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
      sourcemap: true,
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
      sourcemap: true,
    },
  ],
  external: ['react', 'classnames/bind', 'classnames', 'react-dom', 'react-datepicker', 'gestalt'],
  acornInjectPlugins,
  plugins: plugins('gestalt-datepicker'),
};

export default rollupConfig;
