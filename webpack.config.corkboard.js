const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssUrl = require('postcss-url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const breakpoints = require('./src/breakpoints.json');
const webpack = require('webpack');

const DEV_MODE = process.argv.includes('--dev');

module.exports = {
  entry: ['./.corkboard/index', 'webpack/hot/only-dev-server'],
  output: {
    path: path.join(__dirname, 'docs'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],

    // De-dupe module includes for fast development builds
    alias: {
      'classnames/bind': `${__dirname}/node_modules/classnames/bind`,
      corkboard: `${__dirname}/node_modules/corkboard`,
      react: `${__dirname}/node_modules/react`,
      'react-dom': `${__dirname}/node_modules/react-dom`,
    },
  },
  node: {
    // postcss needs to strip this out to compile clientside
    fs: 'empty',
  },
  devServer: {
    hot: true,
    inline: true,
    stats: 'normal',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style',
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, 'node_modules'),
        loaders: [
          'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.css$/,
        include: [path.dirname(require.resolve('corkboard'))],
        loaders: ['css?importLoaders=1', 'postcss'],
      },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel?cacheDirectory'],
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, '.corkboard'),
          path.dirname(require.resolve('corkboard')),
        ],
        exclude: /node_modules\/(?!(corkboard)\/).*/,
      },
      {
        test: /\.svg$/,
        loader: 'svg-path-loader',
      },
    ],
  },
  postcss(wp) {
    return [
      postcssImport({
        addDependencyTo: wp,
      }),
      postcssUrl(),
      postcssCssNext({
        features: {
          customMedia: {
            extensions: breakpoints,
          },
        },
      }),
      postcssBrowserReporter(),
      postcssReporter(),
    ];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'Gestalt',
      inject: true,
      favicon: './favicon.png',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEV_MODE ? 'dev' : 'production'),
      },
    }),
  ],
};
