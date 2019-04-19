# webpack中插件 prerender-spa-plugin 来进行SEO优化

vue、react对于开发单页应用来说带来了很好的用户的体验，但是同样有缺点，比如首页加载慢，白屏或SEO等问题的产生。为什么会出现这种情况呢？我们之前开发单页应用是这样开发的，比如首页 index.html页面或许是这样的：

```

<!DOCTYPE html> 
<html>
<head>
  <title>webpack+vue项目架构</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
</head>
<body>
  <div id="app">
  </div>
</body>
</html>


```

在理解之前，我们还是和之前一样，先把我们的整个项目架构是一个什么样的，来简单的介绍下，方便有个简单的理解：

```

### 目录结构如下：
demo1                                       # 工程名
|   |--- dist                               # 打包后生成的目录文件             
|   |--- node_modules                       # 所有的依赖包
|   |--- app
|   | |---index
|   | | |-- views                           # 存放所有vue页面文件
|   | | | |-- home.vue
|   | | | |-- index.vue
|   | | | |-- java.vue
|   | | | |-- node.vue
|   | | |-- components                      # 存放vue公用的组件
|   | | |-- js                              # 存放js文件的
|   | | |-- app.js                          # vue入口配置文件
|   | | |-- router.js                       # 路由配置文件
|   |--- views
|   | |-- index.html                        # html文件
|   |--- webpack.config.js                  # webpack配置文件 
|   |--- .gitignore  
|   |--- README.md
|   |--- package.json
|   |--- .babelrc                           # babel转码文件


```


然后我们会通过webpack打包，将单页应用中的入口文件打包到一个js文件中去，如下配置：


```

module.exports = {
  // 入口文件
  entry: {
    main: './app/index/app.js'
  },
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: './views/index.html' // 模版文件
    }),
    new ClearWebpackPlugin(['dist']),
    new ExtractTextPlugin("style.css"),
  ]
};


```


基本的配置代码如上所示，他会把我项目中的/views/index.html 当做模板页面，然后会把css文件样式和js文件会自动打包到index.html文件中，如下打包后的文件代码如下：

dist/index.html 源码如下：


```

<!DOCTYPE html> 
<html>
<head>
  <title>webpack+vue项目架构</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
<link href="style.css?26aab5a9debce5432af2" rel="stylesheet"></head>
<body>
  <div id="app">
  </div>
<script type="text/javascript" src="bundle.js?26aab5a9debce5432af2"></script></body>
</html>


```



如上打包的主页index.html文件，我们可以看到，页面上只用一个 div, 然后有一个样式文件，和一个js文件。并没有其他的。
那么如上代码，我们很容易想到会出现如下几种缺点：第一：SEO不友好，也就是说，我通过百度或google搜索引擎搜索不到我网站的主页到，第二是：很容易出现白屏情况，为什么呢？因为我页面中的所有的内容都是通过 bundle.js这个动态加载进行，那么浏览器在加载及解析这段时间内，页面会一直是空白的。也就是我们说的白屏。当然对于我们首页来讲，加载也是非常慢的。因此为了解决这个问题，webpack中的有个插件 prerender-spa-plugin 可以解决上面这些问题。


我们再使用这个插件之前，我们来理解下我们之前是怎么样进行SEO优化的呢？我们很早很早之前，我们是使用 velocity 语法来编写页面，然后写完后把该页面部署到开发那边去，那么这样就要来回折腾了，并且我们前端开发成本也非常高。

那么第二种方式是使用SSR技术(服务器端渲染)，比如Nuxt.js，最主要的思想是，是通过Node.js完成渲染逻辑，然后会将html视图直接返回给客户端。这样的方式也可以解决SEO的问题。但是对于开发成本还是比较大。比如需要考虑Node.js环境中的内存泄露，运行速度，并发压力等问题。并且开发成本增加，研发周期变长等这些问题。因此我们在webpack中有一种插件能将seo，首屏加载的问题可以解决掉了。



## 如何使用 prerender-spa-plugin ？


### 1. 安装命令如下：


```
npm install prerender-spa-plugin --save-dev

```
###2. 在我们的webpack.config.js 需要配置如下：


```
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

var config = {
  // 入口文件
  entry: {
    main: './app/index/app.js'
  },
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : 'bundle.js',
    // 将输出的文件都放在dist目录下
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // ....
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.styl']
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // ....
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: './views/index.html' // 模版文件
    }),
    new ClearWebpackPlugin(['dist']),
    new ExtractTextPlugin("style.css"),
    // .....
  ]
}
// 这里判断 如果是 正式环境打包的话，就使用该插件
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, '/dist'),
      // 列出需要预渲染的路由
      routes: [ '/home' ],
      renderer: new Renderer({
        inject: {
          foo: 'bar'
        },
        // 监听到自定事件时捕获
        renderAfterDocumentEvent: 'render-event'
      })
    })
  )
}
module.exports = config;

```

下面我们来理解下PrerenderSPAPlugin中的几个配置的含义：

staticDir：指的是预渲染输出的页面地址。

routes: 指的是需要预渲染的路由地址。

renderer：指的是所采用的渲染引擎是什么。目前用的是 V3.4.0 版本支持 PuppeteerRenderer。


inject：指的是预渲染过程中能拿到的值。是否需要渲染这部分代码，可以通过该值进行判断。比如如下代码：

```

isshowRender() {
  if(window.__PRERENDER_INJECTED && window.__PRERENDER_INJECTED.foo =='bar') return;
  this.message = '我是测试预加载拦截';
}

```

上面执行的方法中的代码是不会被渲染的。

renderAfterDocumentEvent的含义是监听 document.dispatchEvent 事件，决定什么时候开始预渲染。

### 3. 因此在我们的app.js 代码要改成如下：


```

import Vue from 'vue';
import Index from './views/index';

// 引入路由
import router from './router';

new Vue({
  el: '#app',
  router: router,
  render: h => h(Index),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
});



```

在实例化 new Vue的时候 在mounted生命周期中加上代码：document.dispatchEvent(new Event('render-event'))，触发render-event事件进行渲染。

### 4. 路由配置(router.js)：

```

import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件 
import home from './views/home';
import path from 'path';

// 告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['./views/home'], resolve),
    // 子路由
    children: [
      {
        path: 'java',
        name: 'java',
        component: resolve => require(['./views/java'], resolve)
      },
      {
        path: 'node',
        name: 'node',
        component: resolve => require(['./views/node'], resolve)
      }
    ]
  },
  {
    path: '*', // 其他没有的页面都重定向到 home页面去
    redirect: '/home'
  }
]

var router = new VueRouter({
  mode: 'history', // 访问路径不带井号  需要使用 history模式
  // base: path.resolve(__dirname, '/app/index'), // 配置单页应用的基路径
  routes: routes
});

export default router;

```

如上路由配置据说要改成 模式变成 mode: 'history'这个模式，该插件才会渲染。


当我们认为配置一切成功的时候，我们在项目的根目录中运行 npm run build 的时候，发现打包报错了，如下提示：

![](https://img2018.cnblogs.com/blog/561794/201904/561794-20190417201341956-1831142797.png)



Chromium revision is not downloaded. Run "npm install" or "yarn install" 提示这样的信息，我们可以根据这个信息去百度搜索下，看看是什么错误，百度结果后，他们的意思是需要我们安装 puppeteer 这个插件，但是安装这个插件也是有条件的。我们需要使用国内Chromium源.如下命令：


```
npm install -g cnpm --registry=https://registry.npm.taobao.org

cnpm i puppeteer

```


如下图所示：

![](https://img2018.cnblogs.com/blog/561794/201904/561794-20190417201429059-964611507.png)


一切安装完成后，我们再运行 npm run build 后可以看到在我们的dist目录下 会多生成一个 home文件夹了，该文件夹有一个 index.html文件，如下所示：


![](https://img2018.cnblogs.com/blog/561794/201904/561794-20190417201451698-1398761315.png)



生成完成后，我们查看下 dist/home/index.html页面变成如下：



```

<!DOCTYPE html><html><head>
  <title>webpack+vue项目架构</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
<link href="style.css?e8ed6db9e5869aa22ba2" rel="stylesheet"><script charset="utf-8" src="1.465ef3291c29aadf53df.js"></script></head>
<body>
  <div id="app"><header><li class="router-link-exact-active router-link-active">Home</li> <a href="/home/java" class="">java</a> <a href="/home/node" class="">node</a></header> <div class="home-container"><h1>欢迎来到Home</h1> <p>我是Home组件</p> <!----></div></div>
<script type="text/javascript" src="main.5aea82d6c5e9feeac132.js?e8ed6db9e5869aa22ba2"></script>
</body></html>



```


如上代码，可以看到，我们的路由 /home 确实所有的静态页面都渲染了。因此实现SEO，页面不会白屏的问题已经解决了。








