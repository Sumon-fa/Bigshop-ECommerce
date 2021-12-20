const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/index.jsx'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
};
