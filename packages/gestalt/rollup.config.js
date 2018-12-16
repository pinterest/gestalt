import babel from 'rollup-plugin-babel';
import cssnano from 'cssnano';
import filesize from 'rollup-plugin-filesize';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssModules from 'postcss-modules';
import replace from 'rollup-plugin-replace';
import visualizer from 'rollup-plugin-visualizer';
import { readFileSync, writeFileSync } from 'fs';
import { extname, relative } from 'path';
import { parseString } from 'xml2js';
import gzip from 'gzip-size';

const breakpoints = require('./src/breakpoints.json');

const svgPath = () => ({
  name: 'svgPath',
  load(id) {
    if (extname(id) !== '.svg') {
      return null;
    }

    const data = readFileSync(id, 'utf-8');

    return new Promise((resolve, reject) =>
      parseString(data, (err, result) => {
        if (err) {
          return reject(err);
        }

        const path = result.svg.path[0].$.d;
        const code = `export default '${path}';`;
        return resolve({ code });
      })
    );
  },
});

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
    postcssPresetEnv({
      preserve: false,
      features: {
        'custom-media-queries': {
          importFrom: [{ customMedia: breakpoints }],
        },
      },
    }),
    postcssModules({
      scopeBehavior: 'local',
      generateScopedName: (name, filename) => {
        const dir = relative(__dirname, filename);
        const hash = `${dir}:${name}`;

        if (!Object.prototype.hasOwnProperty.call(scopeNames, hash)) {
          // base 36 encode the unique scope name
          const i = Object.keys(scopeNames).length;
          scopeNames[hash] = `_${i.toString(36)}`;
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

        return `export default ${JSON.stringify(
          cssExportMap[result.opts.from]
        )};`;
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
    svgPath(),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    json({
      preferConst: true,
    }),
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true,
    }),
    visualizer(),
    filesize(),
    stats,
  ],
};
