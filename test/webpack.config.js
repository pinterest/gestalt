module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['./views/main.js'],
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
};
