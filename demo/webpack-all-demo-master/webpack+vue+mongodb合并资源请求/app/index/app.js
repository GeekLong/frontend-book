
import Vue from 'vue';

// 添加store
import store from './store/index';

// 暂时先用 vue-resource 演示
import VueResource from 'vue-resource';

import Index from './views/index';

// 引入路由
import router from './router';

// 引入element组件化框架
import ElementUI from 'element-ui';
// 引入样式文件
import './css/index.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

// Resource
Vue.use(VueResource);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router: router,
  // vue实列添加store
  store: store,
  render: h => h(Index)
});