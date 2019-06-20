/*
require('./js/a');
require.ensure([], function(require) {
  require('./js/b');
}, 'b');
*/
import Vue from 'vue';

import Index from './views/index';

// 引入路由
import router from './router';

new Vue({
  el: '#app',
  router: router,
  render: h => h(Index)
});