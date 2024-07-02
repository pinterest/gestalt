// eslint-disable-next-line import/no-relative-packages
import { acornInjectPlugins, plugins } from '../gestalt-core/build';

const isExperimentalBuild = process.env.EXPERIMENTAL_BUILD === 'true';
const rollupConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: isExperimentalBuild ? 'dist/gestalt-experimental.js' : 'dist/gestalt.js',
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
      file: isExperimentalBuild ? 'dist/gestalt-experimental.es.js' : 'dist/gestalt.es.js',
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
  acornInjectPlugins,
  plugins: plugins('gestalt'),
};

export default rollupConfig;
