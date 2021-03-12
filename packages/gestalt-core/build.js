// eslint-disable-next-line flowtype/require-valid-file-annotation
import babel from '@rollup/plugin-babel';
import cssnano from 'cssnano';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'postcss';
import postcssCssnext from 'postcss-cssnext';
import postcssModules from 'postcss-modules';
import replace from '@rollup/plugin-replace';
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
      }),
    );
  },
});

const cssModules = (options = {}) => {
  const cssExportMap = {};
  const scopeNames = {};
  const cssCache = {};

  const breakpoints = {
    'g-sm': '(min-width: 576px)',
    'g-md': '(min-width: 768px)',
    'g-lg': '(min-width: 1312px)',
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
          throw new Error(`${filePath} / .${className} composes from an incorrect classname`);
        }
      });
      cssExportMap[filePath] = exportTokens;
    },
  });

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
      const process = postcssParser.process(code, opts).then((result) => {
        // Set CSS for specific file
        cssCache[id] = result.css;

        // We can't yet export consts because some selector names aren't
        // valid js variable names (anything with a hyphen "foo-bar").
        const js = `
          export default ${JSON.stringify(cssExportMap[result.opts.from])};
          `;
        const map = { mappings: '' };
        transformResult = { code: js, map };
      });
      return process.then(() => transformResult);
    },

    generateBundle: () => {
      const opts = {
        preset: ['default', { calc: false }],
      };
      cssnano
        .process(Object.values(cssCache).join(''), { from: undefined }, opts)
        .then((result) => {
          const filename = `${options.output}.css`;
          writeFileSync(filename, result.css);
        });
    },
  };
};

const plugins = (name) => [
  cssModules({
    output: `../${name}/dist/${name}`,
  }),
  nodeResolve(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  svgPath(),
  json({
    preferConst: true,
  }),
  babel({
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [['@babel/preset-env', { modules: false }], '@babel/react', '@babel/flow'],
    plugins: [
      '@babel/proposal-class-properties',
      [
        process.env.NODE_ENV === 'development'
          ? '@babel/plugin-transform-react-jsx-self'
          : '@babel/plugin-transform-react-jsx',
        {
          runtime: 'automatic',
          useBuiltIns: true,
        },
      ],
    ],
    exclude: 'node_modules/**',
  }),
];

export default plugins;
