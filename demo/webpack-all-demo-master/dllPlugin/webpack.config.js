
const path = require('path');
// 提取css的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 清除dist目录下的文件
// const ClearWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

// 引入打包html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
  // 入口文件
  entry: {
    main: './js/main.js'
  },
  output: {
    filename: '[name].js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // 使用正则去匹配
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader',
              options: {}
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext')(),
                  require('cssnano')(),
                  require('postcss-pxtorem')({
                    rootValue: 16,
                    unitPrecision: 5,
                    propWhiteList: []
                  }),
                  require('postcss-sprites')()
                ]
              }
            },
            {
              loader: 'stylus-loader',
              options: {}
            }
          ]
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'), // 排除文件
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json']
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233'
    },
    // hot: true,
    inline: true,
    // open: true,
    overlay: true,
    stats: 'errors-only'
  },
  mode: 'development',
  plugins: [
    // new ClearWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      // 从js文件中提取出来的 .css文件的名称
      filename: `main.css`
    }),
    // 告诉webpack使用了哪些第三方库代码
    new DllReferencePlugin({
      context: path.join(__dirname),
      // jquery 映射到json文件上去
      manifest: require('./dist/jquery.manifest.json')
    }),
    new DllReferencePlugin({
      context: path.join(__dirname),
      // echarts 映射到json文件上去
      manifest: require('./dist/echarts.manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: './index.html' // 模版文件
    }),
  ]
};

