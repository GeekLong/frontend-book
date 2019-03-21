# 深入浅出的webpack构建工具---AutoDllPlugin插件(六)
 DllPlugin插件能够快速打包，能把第三方依赖的文件能提前进行预编译打包到一个文件里面去。提高了构建速度。因为很多第三方插件我们并不需要改动它，所以我们想这些第三方库在我们每次编译的时候不要再次构建它就好。因此 DLLPlugin插件就产生了，那么现在有DLLPlugin插件，我们现在为什么还需要一个AutoDllPlugin插件呢？该插件的具体的作用是什么呢？ 

我们从上一篇文章DllPlugin 可以看到，DllPlugin构建dll的js文件后，在index.html需要手动引入dll文件，因为HtmlWebpackPlugin插件不会把dll.js文件自动打包到页面上去，它只会对bundle.js自动引入进去，因此AutoDllPlugin插件就是来解决这个问题的。

因此推荐 AutoDllPlugin HtmlWebpackPlugin，这两个插件一起使用，因为它可以节省手动将DLL包添加到自己的HTML中。

###1. 首先需要安装命令如下：

如果是webpack4以下的版本：如下命令安装：

```
npm install --save-dev autodll-webpack-plugin@0.3

```
如果是webpack4版本的话，如下命令安装：

```

npm install --save-dev autodll-webpack-plugin

```

我这边是webpack4版本，所以如下命令安装：

```

npm install --save-dev autodll-webpack-plugin

```

在webpack.config.js 使用方式如下：


```

// 引入打包html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入 autodll-webpack-plugin
const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html' // 模版文件
    }),
    new AutoDllPlugin({
      inject: true,
      filename: '[name]_[hash].js',
      entry: {
        vendor: [
          'jquery'
          // .... 更多插件
        ]
      }
    })
  ]
}

```

因此webpack中所有配置代码如下：

```

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

// 引入 autodll-webpack-plugin
const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = {
  // 入口文件
  entry: {
    main: './js/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist'),
    publicPath: './'
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
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html' // 模版文件
    }),
    new AutoDllPlugin({
      inject: true,
      filename: '[name]_[hash].js',
      entry: {
        vendor: [
          'jquery'
          // .... 更多插件
        ]
      }
    })
  ]
};

```