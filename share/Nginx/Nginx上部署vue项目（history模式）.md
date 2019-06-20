# 在nginx上部署vue项目(history模式)

先看下我们项目的整个架构

```
|------- 项目的根目录
|  |--- app
|  | |--- index
|  | | |--- components
|  | | | |--- home.vue
|  | | | |--- index.vue
|  | | | |--- java.vue
|  | | | |--- node.vue
|  | | | |--- xxx.vue
|  | | |--- app.js
|  | | |--- router.js
|  |--- views
|  |--- package.json
|  |--- webpack.config.js

```

整个项目架构基本上如上一个简单的结构。下面我们来分别贴下代码吧

app/index/components/index.vue 代码如下：

```

<style lang="stylus">
  
</style>

<template>
  <div id="app">
    <header>
      <router-link to="/home">Home</router-link>
      <router-link to="/java">java</router-link>
      <router-link to="/node">node</router-link>
      <router-link to='/xxx'>XXX</router-link>
    </header>
    <!-- 对应组件的内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        
      }
    }
  }
</script>

```

app/index/components/home.vue 代码如下：

```
<style lang='stylus'>
  .home-container
    width 100%
</style>

<template>
  <div class="home-container">
    <h1>欢迎来到home页面</h1>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      
    }
  }
</script>

```

app/index/components/java.vue 代码如下：

```
<style lang='stylus'>
  .java-container
    width 100%
</style>

<template>
  <div class="java-container">
    <h1>欢迎来到java类书籍</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        msg: '我是java组件'
      }
    },
    methods: {
      
    }
  }
</script>

```

app/index/components/node.vue 代码如下：

```
<style lang='stylus'>
  .node-container
    width 100%
</style>

<template>
  <div class="node-container">
    <h1>欢迎来到node类书籍</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        msg: '我是node组件'
      }
    },
    methods: {
      
    }
  }
</script>

```

app/index/components/xxx.vue 代码如下：

```

<style lang='stylus'>
  .xxx-container
    width 100%
</style>

<template>
  <div class="xxx-container">
    <h1>欢迎来到xxx</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        msg: '我是XXX组件'
      }
    },
    created() {
      console.log(this.$route.params.id)
    }
  }
</script>

```
app/index/app.js 代码如下：

```

import Vue from 'vue';

import Index from './components/index';

// 引入路由
import router from './router';

new Vue({
  el: '#app',
  router: router,
  render: h => h(Index)
});

```

app/index/router.js 代码如下：

```
import Vue from 'vue';
import VueRouter from 'vue-router';

// 告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['./components/home'], resolve)
  },
  {
    path: '/java',
    name: 'java',
    component: resolve => require(['./components/java'], resolve)
  },
  {
    path: '/node',
    name: 'node',
    component: resolve => require(['./components/node'], resolve)
  },
  {
    path: '/xxx',
    name: 'xxx',
    component: resolve => require(['./components/xxx'], resolve)
  },
  {
    path: '*', // 其他没有的页面都重定向到 home页面去
    redirect: '/home'
  }
]

var router = new VueRouter({
  base: '', // 配置单页应用的基路径
  routes: routes,
  mode: 'history'
});

export default router;

```


如上就是所有的代码。然后就是webpack.config.js 代码了。

webpack.config.js 代码我就不贴代码了，到时候大家可以看下github源码即可：

package.json 代码如下：


```
"scripts": {
  "dev": "webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "webpack --progress --colors --devtool cheap-module-source-map"
},

```

现在一切准备就绪完成后，我们运行 命令 npm run dev 后就可以启动我们的服务了，然后当我们访问：

http://0.0.0.0:8083/java

就可以看到如下信息了：

![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224109757-140796830.png)


但是当我们刷新下 就变成如下了：

![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224131175-380221843.png)


现在我们需要在nginx上配置下即可。


实现步骤. 我们首先 运行 npm run build 打包正式环境，然后在我们的项目根目录下会生成 dist 文件夹，然后再把我们生成的dist 文件夹的所有页面扔到nginx服务器下的html文件夹下。然后我们就需要在nginx上配置即可。

首先执行 npm run build 打包，打包完成后，我们可以看到项目的根目录下有dist目录，如下所示：


![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224301535-946971851.png)

然后我们查看下 dist/index.html 页面，会把css和js自动加上去，代码如下：


![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224310866-1123285344.png)

现在我们需要把dist目录下的文件放到 nginx下的html文件夹下。因此我们需要移动目录了。

我本地的nginx的html目录路径是如下：/usr/local/Cellar/nginx/1.15.12/html 如下所示：


![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224330617-2026504955.png)


1.我们先需要在该html目录下，新建一个文件夹，来保存所有的资源文件，假如我这边叫 vuedemo. 创建文件如下所示：



![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224348042-221705066.png)


2.我们现在把我们的打包的dist目录下的所有文件复制到 /usr/local/Cellar/nginx/1.15.12/html/vuedemo 目录下：先进入我们的项目根目录下，使用命令：cp -Rf dist/* /usr/local/Cellar/nginx/1.15.12/html/vuedemo  如下所示：

![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224409021-1775680608.png)


然后我们再查看下 /usr/local/Cellar/nginx/1.15.12/html/vuedemo 下的文件，看是否复制过来了没，如下所示：

![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224424743-1469460356.png)


现在文件一切准备好了，现在我们需要在我们的nginx下配置即可：

3.使用 sudo open /usr/local/etc/nginx/nginx.conf -a 'code' 使用编辑器sublime打开)。

然后在nginx.conf 配置信息如下：

```

worker_processes  1;
events {
    worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;
  server {
    listen       8022;
    server_name  xxx.abc.com;
    root html/vuedemo;
    index index.html;
    location ~ ^/favicon\.ico$ {
      root html/vuedemo;
    }
    location / {
      index index.html index.htm;
      try_files $uri $uri/ @fallback;
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Credentials' 'true';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
      proxy_set_header   Host             $host;
      proxy_set_header   X-Real-IP        $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto  $scheme;
    }
    location @fallback {
      rewrite ^.*$ /index.html break;
    }
  }
  include servers/*;
}

```

## 注意：

1.我们的vuedemo的路径是在nginx下的，如：/usr/local/Cellar/nginx/1.15.12/html/vuedemo 这个下的，vuedemo文件夹下是存放的是我们使用webpack打包所有的dist目录下的资源文件。如下所示：

![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224538738-1374541381.png)

2.是否注意到，我listen(监听的)是 8022，本来应该是80的，这样访问页面的时候就不用添加端口号，但是也不知道为什么我本地安装的nginx默认的端口号不是80，而是8080. 所以如果我监听80端口号的话，会有问题。因此这边先不管。

如上配置完成后，我们就可以再页面上访问 http://xxx.abc.com:8022/home 就可以访问到页面了，不管我页面刷新多少次，都是这个页面；如下所示：


![](https://img2018.cnblogs.com/blog/561794/201906/561794-20190619224711124-1309736232.png)



