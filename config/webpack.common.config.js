const path = require('path');
const packageLockJson = require('../package-lock.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.tsx'],
  module: {
    rules: [{
      test: /\.tsx?|\.jsx?$/,
      use: 'ts-loader',
      // eslint-disable-next-line
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: ['./node_modules']
          }
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif|svg|ico|woff|woff2|ttf|eot)$/i,
      type: 'asset/resource'
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    fallback: {
      timers: require.resolve('timers-browserify'),
      stream: require.resolve('stream-browserify')
    },
    alias: {
      // uncomment for development with npm link
      // 'geostyler': path.resolve('node_modules', 'geostyler'),
      // 'geostyler-style': path.resolve('node_modules', 'geostyler-style'),
      // 'geostyler-sld-parser': path.resolve('node_modules', 'geostyler-sld-parser'),
      // 'ol': path.resolve('node_modules', 'ol'),
      // 'antd': path.resolve('node_modules', 'antd'),
      fs: false,
      path: false
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Geostyler Demo',
      geostylerVersion: packageLockJson.packages['node_modules/geostyler'].version,
      template: path.join(__dirname, '..', 'public', 'index.html'),
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
};
