# webpack构建工具---HappyPack优化构建(七)

## 什么是HappyPack? 作用是什么？

Webpack是允许在NodeJS中的，它是单线程模型的，因此webpack在构建文件时，比如js，css，图片及字体时，它需要一个一个去解析和编译，不能同时处理多个任务。特别当文件数量变多后，webpack构建慢的问题会显得更为严重。因此HappyPack出现了，它能让webpack同时处理多个任务，它将任务分解给多个子进程去并发执行，子进程处理完成后再将结果发送给主进程中。

HappyPack的基本原理：在webpack构建过程中，我们需要使用Loader对js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大的，且这些转换操作不能并发处理文件，而是需要一个个文件进行处理，HappyPack的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间。

## 如何在配置中使用HappyPack？

还是和之前一样，在使用happyPack之前，我们来看下项目的整个目录结构如下：

```
### 目录结构如下：
HappyPack                                   # 工程名
|   |--- dist                               # 打包后生成的目录文件             
|   |--- node_modules                       # 所有的依赖包
|   |--- js                                 # 存放所有js文件
|   | |-- demo1.js  
|   | |-- main.js                           # js入口文件
|   |--- webpack.config.js                  # webpack配置文件
|   |--- webpack.dll.config.js              # 打包第三方依赖的库文件
|   |--- index.html                         # html文件
|   |--- styles                             # 存放所有的css样式文件   
|   | |-- main.styl                         # main.styl文件   
|   | |-- index.styl                        
|   |--- .gitignore  
|   |--- README.md
|   |--- package.json
|   |--- .babelrc                           # babel转码文件

```

js/main.js 入口文件代码如下：


```

require('../styles/main.styl');

const $ = require('jquery');
$('#app').html('欢迎你来我的博客');

console.log('这是main.js');
require('./demo1.js');


```


js/demo1.js 文件如下：

```

export default function printMe() {
 console.log('11111111');
}

```


styles/main.styl 代码如下：


```

@import "./index.styl"; 
#app 
  font-size 18px
  width 200px
  height 200px
  display flex
  border 1PX solid #ccc
  
```

styles/index.styl 代码如下：


 安装HappyPack插件
 
 ```
 npm i -D happypack
 
 ```
 
  配置HappyPack
  
  
  首先在webpack中引入happyPack, 如下代码：
  
  ```
  
  // 引入HappyPack插件 
const HappyPack = require('happypack');


  ```
  
  然后对js模块编译不使用 HappyPack, 是如下配置：
  
  ```
  
  module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules') // 排除文件
      }
    ]
  }
}
  ```
  
  
  使用 HappyPack 配置，变成如下：
  
  ```
  
  module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // 将对.js文件的处理转交给id为babel的HappyPack的实列
        use: ['happypack/loader?id=babel'],
        exclude: path.resolve(__dirname, 'node_modules') // 排除文件
      }
    ]
  }
};

  ```
  
  
  然后在plugins配置如下：

```

module.exports = {
  plugins: [
    /****   使用HappyPack实例化    *****/
    new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置是一样的
      loaders: ['babel-loader']
    })
  ]
}

```


因此所有的webpack配置代码如下：


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

// 引入HappyPack插件 
const HappyPack = require('happypack');

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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['happypack/loader?id=css-pack']
        })
      },
      {
        test: /\.(png|jpg)$/,
        /*
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
        */
        use: ['happypack/loader?id=image']
      },
      {
        test: /\.js$/,
        // 将对.js文件的处理转交给id为babel的HappyPack的实列
        use: ['happypack/loader?id=babel'],
        // loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules') // 排除文件
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
    new HtmlWebpackPlugin({
      template: './index.html' // 模版文件
    }),
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

    /****   使用HappyPack实例化    *****/
    new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置是一样的
      loaders: ['babel-loader']
    }),
    new HappyPack({
      id: 'image',
      loaders: [{
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }]
    }),
    // 处理css文件
    new HappyPack({
      id: 'css-pack',
      loaders: ['css-loader']
    })
  ]
};
```


如上配置代码：


1.在Loader配置中，对所有的文件的处理都交给了happypack/loader（除了styl中使用postcss外，对这个处理貌似会报错），happypack/loader?id=xx 紧跟的id=xxx,就是告诉happy-loader选择哪个happyPack的实列处理文件。

2.在plugin插件配置中新增了HappyPack的实列，作用是告诉HappyPack如何处理该文件，如下代码：

```

module.exports = {
  plugins: [
    new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置是一样的
      loaders: ['babel-loader']
    })
  ]
}

```

HappyPack实列中的id属性会和 happypack/loader?id=xxx 中的xxx对应，HappyPack实列中除了有 id 和 loaders两个属性外，还有如下几个属性：

threads: 代表开启几个子进程去处理这一类文件，默认是3个，必须是整数。

verbose: 是否允许HappyPack输出日志，默认为true。

threadPool: 代表共享进程池。即多个HappyPack实列都使用同一个共享进程池中的子进程去处理任务。以防止资源占用过多。比如如下代码:


```

const HappyPack =require (’happypack’);
// 构造出共享进程池，在进程池中包含 5 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size : 5 )) ;

module.exports = {
  plugins: [
    new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置是一样的
      loaders: ['babel-loader'],
      // 使用共享进程池中的子进程去处理任务。
      threadPool: happyThreadPool
    })
  ]
};
```