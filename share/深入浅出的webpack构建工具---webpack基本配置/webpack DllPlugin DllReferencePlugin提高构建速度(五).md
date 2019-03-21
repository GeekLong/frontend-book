# webpack构建工具---DllPlugin DllReferencePlugin提高构建速度(五)

## 什么是DllPlugin 和 DllReferencePlugin？作用是什么？
 在使用webpack进行打包时候，对于依赖的第三方库，比如vue，vuex等这些不会修改的依赖，我们可以让它和我们自己编写的代码分开打包，这样做的好处是每次更改我本地代码的文件的时候，webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库，那么第三方库在第一次打包的时候只打包一次，以后只要我们不升级第三方包的时候，那么webpack就不会对这些库去打包，这样的可以快速的提高打包的速度。因此为了解决这个问题，DllPlugin 和 DllReferencePlugin插件就产生了。
 
那么对于目前webpack社区来讲，我们希望和自己编写的代码分离开的话，webpack社区提供了2种方案：

### 1. CommonsChunkPlugin
### 2. DLLPlugin
CommonsChunkPlugin 插件每次打包的时候还是会去处理一些第三方依赖库，只是它能把第三方库文件和我们的代码分开掉，生成一个独立的js文件。但是它还是不能提高打包的速度。

DLLPlugin 它能把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。所以打包速度会更快。

DLLPlugin 这个插件是在一个额外独立的webpack设置中创建一个只有dll的bundle，也就是说我们在项目根目录下除了有webpack.config.js，还会新建一个webpack.dll.config.js文件。webpack.dll.config.js作用是把所有的第三方库依赖打包到一个bundle的dll文件里面，还会生成一个名为 manifest.json文件。
该manifest.json的作用是用来让 DllReferencePlugin 映射到相关的依赖上去的。

DllReferencePlugin 这个插件是在webpack.config.js中使用的，该插件的作用是把刚刚在webpack.dll.config.js中打包生成的dll文件引用到需要的预编译的依赖上来。什么意思呢？就是说在webpack.dll.config.js中打包后比如会生成 vendor.dll.js文件和vendor-manifest.json文件，vendor.dll.js文件包含所有的第三方库文件，vendor-manifest.json文件会包含所有库代码的一个索引，当在使用webpack.config.js文件打包DllReferencePlugin插件的时候，会使用该DllReferencePlugin插件读取vendor-manifest.json文件，看看是否有该第三方库。vendor-manifest.json文件就是有一个第三方库的一个映射而已。

所以说 第一次使用 webpack.dll.config.js 文件会对第三方库打包，打包完成后就不会再打包它了，然后每次运行 webpack.config.js文件的时候，都会打包项目中本身的文件代码，当需要使用第三方依赖的时候，会使用 DllReferencePlugin插件去读取第三方依赖库。所以说它的打包速度会得到一个很大的提升。


## 在项目中如何使用 DllPlugin 和 DllReferencePlugin？

 在使用之前，我们首先看下我们项目现在的整个目录架构如下：
 
 ```
 
 ### 目录结构如下：
demo1                                       # 工程名
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
 
 因此我们首先需要在我们的项目根目录下创建一个 webpack.dll.config.js 文件。然后配置代码如下：
 
 ```
 
const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  // 入口文件
  entry: {
    // 项目中用到该两个依赖库文件
    jquery: ['jquery'],
    echarts: ['echarts']
  },
  // 输出文件
  output: {
    // 文件名称
    filename: '[name].dll.js', 
    // 将输出的文件放到dist目录下
    path: path.resolve(__dirname, 'dist'),

    /*
     存放相关的dll文件的全局变量名称，比如对于jquery来说的话就是 _dll_jquery, 在前面加 _dll
     是为了防止全局变量冲突。
    */
    library: '_dll_[name]'
  },
  plugins: [
    // 使用插件 DllPlugin
    new DllPlugin({
      /*
       该插件的name属性值需要和 output.library保存一致，该字段值，也就是输出的 manifest.json文件中name字段的值。
       比如在jquery.manifest文件中有 name: '_dll_jquery'
      */
      name: '_dll_[name]',

      /* 生成manifest文件输出的位置和文件名称 */
      path: path.join(__dirname, 'dist', '[name].manifest.json')
    })
  ]
};


 ```
DllPlugin 插件有三个配置项参数如下：

context(可选)： manifest文件中请求的上下文，默认为该webpack文件上下文。

name: 公开的dll函数的名称，和 output.library保持一致。

path: manifest.json 生成文件的位置和文件名称。

下面我们继续看下 webpack.config.js 配置代码如下：

首先引入文件如下代码：

```

// 引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

```


然后在插件中使用该插件，如下代码：

```

module.exports = {
  plugins: [
    // 告诉webpack使用了哪些第三方库代码
    new DllReferencePlugin({
      // jquery 映射到json文件上去
      manifest: require('./dist/jquery.manifest.json')
    }),
    new DllReferencePlugin({
      // echarts 映射到json文件上去
      manifest: require('./dist/echarts.manifest.json')
    })
  ]
}

```

DllReferencePlugin项的参数有如下：

context: manifest文件中请求的上下文。

manifest: 编译时的一个用于加载的JSON的manifest的绝对路径。

context: 请求到模块id的映射(默认值为 manifest.content)

name: dll暴露的地方的名称(默认值为manifest.name)

scope: dll中内容的前缀。

sourceType: dll是如何暴露的libraryTarget。

webpack.config.js 所有代码如下：

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
  plugins: [
    // new ClearWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.html' // 模版文件
    }),
    new ExtractTextPlugin({
      // 从js文件中提取出来的 .css文件的名称
      filename: `main.css`
    }),
    // 告诉webpack使用了哪些第三方库代码
    new DllReferencePlugin({
      // jquery 映射到json文件上去
      manifest: require('./dist/jquery.manifest.json')
    }),
    new DllReferencePlugin({
      // echarts 映射到json文件上去
      manifest: require('./dist/echarts.manifest.json')
    })
  ]
};
```

执行构建：

最后一步就是构建代码了，先生存第三方库文件，因此我们运行如下命令：

```
webpack --config webpack.dll.config.js

```


为了方便，我们在package.json中scripts加如下代码了：

```

"scripts": {
  "dev": "webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "webpack --progress --colors --devtool cheap-module-source-map",
  "build:dll": "webpack --config webpack.dll.config.js"
},


```

所以我们先运行 npm run build:dll 命令，运行完成后，会在dist目录下生存 echarts.dll.js, echarts.manifest.json,jquery.dll.js, jquery.manifest.json 文件。如下图所示：


![图片](https://images2018.cnblogs.com/blog/561794/201808/561794-20180822220700728-1111599669.png)


再看下打包两个库执行的时间，如下所示：

![图片](https://images2018.cnblogs.com/blog/561794/201808/561794-20180822220719521-930666566.png)



xx.dll.js 文件代码大概如下这个样子，比如echarts.dll.js 代码为例：


```
var _dll_echarts = (function(modules) {
  // ... 此处省略 webpackBootstrap 函数代码
}([
  (function(module, exports, __webpack_require__) {
    // ID为0模块对应的代码
  }),
  (function(module, exports, __webpack_require__) {
    // ID为1模块对应的代码
  }),
  // ....... 很多模块代码
]));


```


那么 echarts.manifest.json 生存的代码如下：



```

{
  "name": "_dll_echarts",
  "content": {
    "./node_modules/zrender/lib/core/util.js": {
      "id": 0,
      "meta": {}
    },
    "./node_modules/echarts/lib/echarts.js": {
      "id": 1,
      "meta": {}
    },
    "./node_modules/echarts/lib/util/graphic.js": {
      "id": 2,
      "meta": {}
    },
    // .....
  }
}


```


echarts.manifest.json 文件可以清楚的看到与其对应的dll.js文件中包含了哪些模块，以及每个模块的路径和ID。

如上打包完库文件后，我们需要 运行 npm run build命令打包项目中文件了，如下dist目录后的文件

![图片](https://images2018.cnblogs.com/blog/561794/201808/561794-20180822220821098-148645411.png)



然后我们查看index.html代码如下：


```

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
<link href="main.css" rel="stylesheet"></head>
<body>
  <div id="app">22222</div>
  <div class="test1">12aaa</div>
  <div class='test2'>vvvvv</div>
<script type="text/javascript" src="main.js"></script></body>
</html>

```


可以看到jquery文件没有自动加上，因此需要我们手动加上，加上后代码变成如下：


```


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
<link href="main.css" rel="stylesheet"></head>
<body>
  <div id="app">22222</div>
  <div class="test1">12aaa</div>
  <div class='test2'>vvvvv</div>
<script type="text/javascript" src="jquery.dll.js"></script>
<script type="text/javascript" src="main.js"></script></body>
</html>

```

加上jquery.dll.js文件后，main.js入口文件的代码如下：


```

require('../styles/main.styl');

const $ = require('jquery');
$('#app').html('欢迎你来我的github');

console.log('这是main.js');
require('./demo1.js');


```

$('#app') 就可以操作元素了。


## DllPlugin DllReferencePlugin使用在vue和vuex项目中


首先vuex-demo代码可以查看github上的代码了。然后我们在没有使用 DllPlugin 插件时候，打包的速度如下，使用了十几秒：

![图片](https://images2018.cnblogs.com/blog/561794/201808/561794-20180822221226440-693194834.png)




首先我们看下我们的入口文件 src/business/examine/app.js，引入我们所安装的静态资源，结果为：

```

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './base/main';
import routerConfig from './router';
import store from './store';

// 主题样式
import '../../components/common/common.styl';

Vue.config.devtools = true;

// Router
Vue.use(VueRouter);

// Resource
Vue.use(VueResource);

// 配置 resource
Vue.http.options.root = '';
Vue.http.options.emulateJSON = true;

const router = routerConfig(VueRouter);

new Vue(Vue.util.extend({
  router,
  store
}, App)).$mount('#app');


```
在store文件内用到了vuex，如下代码：

```

import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions
});


```
如上代码我们把vue和vue-router,vue-resource，vuex一起打包的。如上只是用到一些vue常见的插件，还没有使用很多其他的插件，就耗时了十几秒的时间，如果插件更多的话，那么相对来说耗时更长，那么现在我们希望把 vue，vuex, vue-router, vue-resource这样的在 webpack.dll.config.js中进行打包，然后再使用webpack.config.js打包本项目中的文件代码；
还是和上面一样在项目中根目录下新建 webpack.dll.config.js，我把打包文件统一都放到build文件内，配置代码如下：

配置入口文件代码：


```


module.exports = {
  entry: {
    // 项目中用到该依赖库文件
    vendor: ['vue/dist/vue.esm.js', 'vue', 'vuex', 'vue-router', 'vue-resource']
  },
  plugins: [
    // 使用插件 DllPlugin
    new DllPlugin({
      /*
       该插件的name属性值需要和 output.library保存一致，该字段值，也就是输出的 manifest.json文件中name字段的值。
       比如在jquery.manifest文件中有 name: '_dll_jquery'
      */
      name: '_dll_[name]',

      /* 生成manifest文件输出的位置和文件名称 */
      path: path.resolve(__dirname, paths.dist, '[name].manifest.json')
    })
  ]
}


```


webpack.config.js 配置相关代码如下：


```

// 引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
  plugins: [
    // 告诉webpack使用了哪些第三方库代码
    new DllReferencePlugin({
      // jquery 映射到json文件上去
      manifest: require(path.resolve(__dirname, paths.dist, 'vendor.manifest.json'))
    }),
  ]
}


```
然后运行打包 npm run build 后，打包的时间如下图所示：

![图片](https://images2018.cnblogs.com/blog/561794/201808/561794-20180822221422475-36778153.png)


可以看到没有使用 DllPlugin DllReferencePlugin 打包前，打包的时间需要12.5秒，使用了该插件后，仅仅需要4秒的时间，可见提高了8秒的打包时间。并且分了两个文件，所有相关的vue的依赖都放在了vendor.dll.js内，我们项目上相关的代码放在了bundle.js内，这样就可以减少一个js文件非常大的问题。但是在页面上需要引用 vendor.dll.js 文件了。



