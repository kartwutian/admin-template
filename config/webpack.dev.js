const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const common = require('./webpack.common');
const PATHS = require('./PATHS');
const { publicPath } = require('./config.common.js');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = env => {
  const API = (env || {}).API || 'dev';

  console.log('API %s', API);

  const devServer = {
    contentBase: path.resolve(PATHS.dist),
    historyApiFallback: true,
    compress: true,
    hot: true,
    inline: true,
    disableHostCheck: true,
    publicPath: publicPath || '/',
    progress: true,
  };

  if (API === 'dev') {
    devServer.proxy = {
      '/api': {
        target: 'http://rap2api.taobao.org',
        pathRewrite: {
          '^/api': '/app/mock/84445/api/post',
        },
        // changeOrigin: true,
        // onProxyRes: function(proxyReq, req, res) {
        //   console.log('--------------------------------');
        //   console.log(proxyReq);
        //   console.log(req);
        //   // console.log(res);
        //   console.log('--------------------------------');
        // }
      },
    };
  } else {
    devServer.before = app => {
      app.post('/api/v1/login', function(req, res) {
        res.json(require('../mock/login').login);
      });
    };
  }

  return merge(common, {
    entry: {
      main: ['@babel/polyfill', path.resolve(PATHS.src, 'index.js')],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(PATHS.dist),
      publicPath: publicPath || '/',
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: devServer,
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
          test: /\.less$/,
          exclude: path.resolve(PATHS.src, 'asset/stylesheet'),
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[local]_[hash:base64:5]',
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer('last 2 version')],
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          include: path.resolve(PATHS.src, 'asset/stylesheet'),
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // new OpenBrowserPlugin({
      //   url: 'http://localhost:8080',
      //   browser: "Google Chrome",
      // }),
      new webpack.DefinePlugin({
        // 为项目注入环境变量
        'process.env.API': JSON.stringify(API),
      }),
      new HtmlWebPackPlugin({
        template: path.resolve(PATHS.src, 'asset/template/index.html'),
        filename: path.resolve(PATHS.dist, 'index.html'),
        favicon: path.resolve(PATHS.src, 'asset/image/favicon.png'),
      }),
    ],
  });
};
