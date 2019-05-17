const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, 'src', 'index')],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './build',
    hot: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(path.join(__dirname, 'src', '/index.html')),
    }),
  ],

  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@services': path.resolve(__dirname, 'src', 'services'),
      '@store': path.resolve(__dirname, 'src', 'store'),
      '@actions': path.resolve(__dirname, 'src', 'store', 'actions'),
      '@styles': path.resolve(__dirname, 'src', 'assets', 'styles'),
    },
    extensions: ['.js'],
  },
};
