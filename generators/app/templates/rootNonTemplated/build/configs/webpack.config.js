const path = require('path');
const webpack = require('webpack');
const webpackHtmlPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const baseOutputFolder = path.resolve(path.join(__dirname, '..', '..', 'dist'));
const loaderPattern = path.join('resources', '[name].[ext]');
const logoPath = path.join(__dirname, '..', '..', 'src', 'resources', 'logo.svg');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward' // babel-7 monorepo fix
          }
        }
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|svg|png|jpg|jpeg|mp3|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: loaderPattern,
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production' ? true : false
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: baseOutputFolder,
    filename: 'index.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      'NODE_ENV': process.env.NODE_ENV,
      'API_URL': 'http://localhost:8083',
    }),
    new webpackHtmlPlugin({
      template: path.join(__dirname, '..', '..', 'src', 'index.html'),
    }),
    new FaviconsWebpackPlugin({
      logo: logoPath,
      publicPath: '',
      favicons: {
        manifestRelativePaths: true,
        icons: {
          appleStartup: false,
        }
      },
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    contentBase: baseOutputFolder,
    hot: true,
    port: 9999,
    open: true,
    onListening: function(server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port);
    }
  },
};
