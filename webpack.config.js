const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./frontend/src/index.js'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
};
