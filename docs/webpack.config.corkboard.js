const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssUrl = require('postcss-url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const breakpoints = require('../src/breakpoints.json');
const webpack = require('webpack');

module.exports = {
  entry: ['./docs/src/index', 'webpack/hot/only-dev-server'],
  output: {
    path: path.join(__dirname, 'docs', 'build'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],

    // De-dupe module includes for fast development builds
    alias: {
      'classnames/bind': `${__dirname}/../node_modules/classnames/bind`,
      corkboard: `${__dirname}/../node_modules/corkboard`,
      react: `${__dirname}/../node_modules/react`,
      'react-dom': `${__dirname}/../node_modules/react-dom`,
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
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, '.corkboard'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, '..', 'src'),
        exclude: path.join(__dirname, '..', 'node_modules'),
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.dirname(require.resolve('corkboard'))],
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'react-hot-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        include: [
          path.join(__dirname, '..', 'src'),
          path.join(__dirname, 'src'),
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
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: wp => [
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
        ],
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './docs/public/index.html',
      title: 'Gestalt',
      inject: true,
      favicon: './docs/public/favicon.png',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
  ],
};
