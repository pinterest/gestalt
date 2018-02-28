const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['./views/main.js'],
  resolve: {
    alias: {
      gestalt: `${__dirname}/../node_modules/gestalt`,
      react: `${__dirname}/../node_modules/react`,
      'react-dom': `${__dirname}/../node_modules/react-dom`,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
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
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
      },
    }),
  ],
};
