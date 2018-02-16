const breakpoints = require('../src/breakpoints.json');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssNext = require('postcss-cssnext');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['./views/main.js'],
  resolve: {
    alias: {
      react: `${__dirname}/../node_modules/react`,
      'react-dom': `${__dirname}/../node_modules/react-dom`,
    },
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel',
      },
      {
        test: /\.svg$/,
        loader: 'svg-path-loader',
      },
    ],
  },
  postcss(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      postcssUrl(),
      postcssCssNext({
        features: {
          customMedia: {
            extensions: breakpoints,
          },
        },
      }),
    ];
  },
};
