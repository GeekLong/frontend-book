
import Vue from 'vue';

// 添加store
import store from './store/index';

// 暂时先用 vue-resource 演示
import VueResource from 'vue-resource';

import App from './App.vue';

// 引入路由
import router from './router';

// Resource
Vue.use(VueResource);

// 引入css
import './assets/styles/index.styl';

import iView from './main';
Vue.use(iView);

// 开启错误提示
Vue.config.debug = true;
// Vue.config.performance = true
// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  // vue实列添加store
  store: store,
  render: h => h(App)
});