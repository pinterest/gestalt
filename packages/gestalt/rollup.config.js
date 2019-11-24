import babel from 'rollup-plugin-babel';
import cssnano from 'cssnano';
import filesize from 'rollup-plugin-filesize';
import gzip from 'gzip-size';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'postcss';
import postcssCssnext from 'postcss-cssnext';
import postcssModules from 'postcss-modules';
import replace from 'rollup-plugin-replace';
import svg from 'rollup-plugin-inline-svg';
import visualizer from 'rollup-plugin-visualizer';
import { writeFileSync } from 'fs';
import { extname, relative } from 'path';

import classnameBuilder from './lib/classnameBuilder.js';

const breakpoints = require('./src/breakpoints.json');

const statsPlugin = () => {
  const statsMap = {};
  const updateStats = (code, name) => {
    const fileName = name.replace('dist/', '');
    statsMap[fileName] = {
      fileName,
      size: Buffer.byteLength(code),
      gzipSize: gzip.sync(code),
    };
    writeFileSync('dist/stats.json', JSON.stringify(statsMap, null, 2));
  };

  return {
    name: 'stats',
    ongenerate(bundle, obj) {
      updateStats(obj.code, bundle.file);
    },
    updateStats,
  };
};

const cssModules = (options = {}) => {
  const cssExportMap = {};
  const scopeNames = {};
  let css = '';

  const plugins = [
    postcssCssnext({
      features: {
        customMedia: {
          extensions: breakpoints,
        },
      },
    }),
    postcssModules({
      scopeBehavior: 'local',
      generateScopedName: (name, filename) => {
        const dir = relative(__dirname, filename);
        const hash = `${dir}:${name}`;

        if (!Object.prototype.hasOwnProperty.call(scopeNames, hash)) {
          scopeNames[hash] = classnameBuilder.getMinifiedClassname(hash);
        }

        return scopeNames[hash];
      },
      getJSON: (path, exportTokens) => {
        cssExportMap[path] = exportTokens;
      },
    }),
  ];

  const postcssParser = postcss(plugins);

  return {
    name: 'cssModules',
    transform: (code, id) => {
      if (extname(id) !== '.css') {
        return null;
      }

      const opts = {
        from: id,
        to: id,
        parser: options.parser,
      };

      return postcssParser.process(code, opts).then(result => {
        // Append CSS to output
        css += result.css;

        // We can't yet export consts because some selector names aren't
        // valid js variable names (anything with a hyphen "foo-bar").
        const js = `
          export default ${JSON.stringify(cssExportMap[result.opts.from])};
          `;
        const map = { mappings: '' };
        return { code: js, map };
      });
    },

    ongenerate: () => {
      cssnano.process(css).then(result => {
        writeFileSync(options.output, result.css);
        options.stats.updateStats(result.css, options.output);
      });
    },
  };
};

// ---

const stats = statsPlugin();
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/gestalt.js',
      format: 'umd',
      name: 'gestalt',
      exports: 'named',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
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
        'prop-types': 'PropTypes',
        classnames: 'classnames',
        'classnames/bind': 'classnames',
        'react-dom': 'ReactDOM',
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
  ],
  plugins: [
    cssModules({
      output: 'dist/gestalt.css',
      stats,
    }),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    svg(),
    json({
      preferConst: true,
    }),
    babel({
      babelrc: false,
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/react',
        '@babel/flow',
      ],
      plugins: ['@babel/proposal-class-properties'],
      exclude: 'node_modules/**',
      externalHelpers: true,
    }),
    visualizer(),
    filesize(),
    stats,
  ],
};
