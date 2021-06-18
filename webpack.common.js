const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
// const WebPackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
    // new WebpackPwaManifest({
    //   name: 'My Progressive Web App',
    //   short_name: 'MyPWA',
    //   description: 'My awesome Progressive Web App!',
    //   background_color: '#ffffff',
    //   crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    //   icons: [
    //     {
    //       src: path.resolve('src/assets/icon.png'),
    //       sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
    //     },
    //     {
    //       src: path.resolve('src/assets/large-icon.png'),
    //       size: '1024x1024' // you can also use the specifications pattern
    //     },
    //     {
    //       src: path.resolve('src/assets/maskable-icon.png'),
    //       size: '1024x1024',
    //       purpose: 'maskable'
    //     }
    //   ]
    // }),
  ],
};
