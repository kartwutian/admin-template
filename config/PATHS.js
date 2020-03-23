const path = require('path');
const { publicPath } = require('./config.common.js');

module.exports = {
  root: path.resolve(__dirname, '../'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, `../dist${publicPath}`),
  doc: path.resolve(__dirname, '../docs'),
};
