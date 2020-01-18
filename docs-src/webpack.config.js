const HtmlWebpackPlugin = require ('html-webpack-plugin');
const path = require ('path');

module.exports = {
  mode: 'development',
  output: {
    // options related to how webpack emits results
    path: path.resolve (__dirname, '../docs'), // string
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: './src/index.html',
    }),
  ],
};
