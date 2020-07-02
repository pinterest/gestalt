// eslint-disable-next-line flowtype/require-valid-file-annotation
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
  let cssIE11 = ''; // CSS targeted toward IE11
  let css = '';

  const breakpoints = {
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1312px)',
  };

  const modulesPlugin = postcssModules({
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
  });

  const pluginsIE11 = [
    postcssCssnext({
      features: {
        customMedia: {
          extensions: breakpoints,
        },
      },
    }),
    modulesPlugin,
  ];

  const plugins = [
    postcssCssnext({
      features: {
        customProperties: false,
        customMedia: {
          extensions: breakpoints,
        },
      },
    }),
    modulesPlugin,
  ];

  const postcssParserIE11 = postcss(pluginsIE11);
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

      let transformResult;
      const processIE11 = postcssParserIE11.process(code, opts).then(result => {
        // Append CSS to output
        cssIE11 += result.css;

        // We can't yet export consts because some selector names aren't
        // valid js variable names (anything with a hyphen "foo-bar").
        const js = `
          export default ${JSON.stringify(cssExportMap[result.opts.from])};
          `;
        const map = { mappings: '' };
        transformResult = { code: js, map };
      });
      const process = postcssParser.process(code, opts).then(result => {
        // Append CSS to output
        css += result.css;
      });
      return Promise.all([processIE11, process]).then(() => transformResult);
    },

    generateBundle: () => {
      const opts = {
        preset: ['default', { calc: false }],
      };
      cssnano.process(css, { from: undefined }, opts).then(result => {
        const filename = `${options.output}-future.css`;
        writeFileSync(filename, result.css);
        options.stats.updateStats(result.css, filename);
      });
      cssnano.process(cssIE11).then(result => {
        const filename = `${options.output}.css`;
        writeFileSync(filename, result.css);
        options.stats.updateStats(result.css, filename);
      });
    },
  };
};

const plugins = name => [
  cssModules({
    output: `../${name}/dist/${name}`,
    stats: statsPlugin(),
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
  statsPlugin(),
];

export default plugins;
