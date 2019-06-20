
import Vue from 'vue';
import VueRouter from 'vue-router';

// 告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
  {
    path: '/parent',
    name: 'parent',
    component: resolve => require(['./views/parent'], resolve)
  },
  {
    path: '*', // 其他没有的页面都重定向到 home页面去
    redirect: '/parent'
  },
  {
    path: '/a',
    name: 'a',
    component: resolve => require(['./views/a'], resolve)
  },
  {
    path: '/b',
    name: 'b',
    component: resolve => require(['./views/b'], resolve)
  },
  {
    path: '/testvue',
    name: 'testvue',
    component: resolve => require(['./views/testvue'], resolve)
  }
]

var router = new VueRouter({
  base: '/app/index', // 配置单页应用的基路径
  routes: routes
});

export default router;