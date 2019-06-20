
import Table from './package/table/table.vue';
import TableColumn from './package/table/table-column.vue';

const components = {
  'tb-table': Table,
  'tb-table-column': TableColumn
};

const install = function(Vue, opts={}) {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  version: process.env.VERSION,
  install,
  ...components
};
export default API;