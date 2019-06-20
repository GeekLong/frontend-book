
import Vue from 'vue';
import VueRouter from 'vue-router';

// 引入组件 
import home from './views/home';

import xxx from './views/xxx';

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
    /*
    components: {
      default: resolve => require(['./views/home'], resolve),  // 使用懒加载
      Header: resolve => require(['./components/header/index'], resolve),  // 使用懒加载
      Sidebar: resolve => require(['./components/sidebar/index'], resolve),  // 使用懒加载
      Main: resolve => require(['./components/main/index'], resolve)  // 使用懒加载
    }
    */
  },
  {
    path: '/xxx/:id',
    name: 'xxx',
    component: resolve => require(['./views/xxx'], resolve)
    /*
    components: {
      default: resolve => require(['./views/xxx'], resolve),  // 使用懒加载
      Header: resolve => require(['./components/header/index'], resolve),  // 使用懒加载
      Sidebar: resolve => require(['./components/sidebar/index'], resolve),  // 使用懒加载
      Main: resolve => require(['./components/main/index'], resolve)  // 使用懒加载
    }
    */ 
  },
  {
    path: '*', // 其他没有的页面都重定向到 home页面去
    redirect: '/home'
  }
]

var router = new VueRouter({
  base: '/app/index', // 配置单页应用的基路径
  routes: routes
});

export default router;