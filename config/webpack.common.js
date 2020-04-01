const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PATHS = require('./PATHS');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: path.normalize('assets/[name].[ext]'),
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: path.normalize('assets/[name].[ext]'),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(PATHS.src),
      stylesheet: path.resolve(PATHS.src, 'asset/stylesheet'),
      image: path.resolve(PATHS.src, 'asset/image'),
      layout: path.resolve(PATHS.src, 'layout'),
      components: path.resolve(PATHS.src, 'components'),
      pages: path.resolve(PATHS.src, 'pages'),
      models: path.resolve(PATHS.src, 'models'),
      utils: path.resolve(PATHS.src, 'utils'),
      constant: path.resolve(PATHS.src, 'constant'),
    },
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
};
