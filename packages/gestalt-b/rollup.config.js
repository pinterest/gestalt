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
import visualizer from 'rollup-plugin-visualizer';
import { parseString } from 'xml2js';
import { readFileSync, writeFileSync } from 'fs';
import { extname, relative } from 'path';

import classnameBuilder from './lib/classnameBuilder.js';

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
    generateBundle(options, bundles) {
      const [file] = Object.keys(bundles);
      const bundle = bundles[file];

      updateStats(bundle.code, file);
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
      getJSON: (filePath, exportTokens) => {
        Object.entries(exportTokens).forEach(([className, value]) => {
          if (value.includes('undefined')) {
            throw new Error(
              `${filePath} / .${className} composes from an incorrect classname`
            );
          }
        });
        cssExportMap[filePath] = exportTokens;
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

    generateBundle: () => {
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
      file: 'dist/gestalt-b.js',
      format: 'umd',
      name: 'gestalt-b',
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
      file: 'dist/gestalt-b.es.js',
      format: 'es',
      name: 'gestalt-b',
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
    'classnames/bind',
    'classnames',
    'date-fns',
    'gestalt',
    'prop-types',
    'react',
    'react-datepicker',
    'react-dom',
  ],
  plugins: [
    cssModules({
      output: 'dist/gestalt-b.css',
      stats,
    }),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    svgPath(),
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
    }),
    visualizer(),
    filesize(),
    stats,
  ],
};
