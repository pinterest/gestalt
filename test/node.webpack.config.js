const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    path: './dist/',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [new ExtractTextPlugin('./css/bundle.css')],
};
