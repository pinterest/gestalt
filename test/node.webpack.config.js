const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcss = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssCssNext = require('postcss-cssnext');
const breakpoints = require('../src/breakpoints.json');

module.exports = {
  output: {
    path: './dist/',
    libraryTarget: 'commonjs2',
  },
  plugins: [new ExtractTextPlugin('./css/bundle.css')],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]',
          'postcss-loader',
        ]),
      },
      {
        test: /\.svg$/,
        loader: 'svg-path-loader',
      },
    ],
  },
  postcss(webpack) {
    return [
      postcss({ addDependencyTo: webpack }),
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
