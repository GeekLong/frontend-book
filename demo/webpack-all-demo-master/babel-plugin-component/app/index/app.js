
import Vue from 'vue';

// 添加store
import store from './store/index';

// 暂时先用 vue-resource 演示
import VueResource from 'vue-resource';

import Index from './views/index';

// 引入路由
import router from './router';

/*
// 引入element组件化框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
*/
import { Table, Form, FormItem, Button, Dialog, Input, Select, Option, Message, MessageBox, Alert, TableColumn } from 'element-ui';

// 引入样式文件
import './css/index.css';

Vue.config.productionTip = false;

// Resource
Vue.use(VueResource);

// Vue.use(ElementUI);
Vue.use(Table);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Message);
Vue.use(MessageBox);
Vue.use(Alert);
Vue.use(TableColumn);

new Vue({
  el: '#app',
  router: router,
  // vue实列添加store
  store: store,
  render: h => h(Index)
});