
import Vue from 'vue';

// 添加store
import store from './store/index';

// 暂时先用 vue-resource 演示
import VueResource from 'vue-resource';

import Index from './views/index';

// 引入路由
import router from './router';

// Resource
Vue.use(VueResource);

// 引入css
import styles from './styles/index.styl';

new Vue({
  el: '#app',
  router: router,
  // vue实列添加store
  store: store,
  render: h => h(Index)
});