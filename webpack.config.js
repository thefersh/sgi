const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: './site/index.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    // filename: '[name].[contenthash].js'
    filename: '[name].js'
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            use: {
            loader: 'babel-loader',
                options: {
                    presets: ['@babel/react', '@babel/env']
                }
            },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 9000
  },
  plugins: [
    /*
    new CopyPlugin({
      patterns: [{ from: 'site/index.html' }],
    }),
    */
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin({
        verbose: true,
        cleanStaleWebpackAssets: true,
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;