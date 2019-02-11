// Imports: Dependencies
const path = require('path');
require("@babel/register");
const HtmlWebpackPlugin = require('html-webpack-plugin');


// Webpack Configuration
const config = {
  
  // Entry
  entry: ['@babel/polyfill','./src/js/index.js'],
  // Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },

  devServer: {
    contentBase: './dist'
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    })
  ]
};
// Exports
module.exports = config;