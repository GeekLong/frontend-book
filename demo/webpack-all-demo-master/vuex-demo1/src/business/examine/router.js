import index from './views/index';

export default function(VueRouter) {
  return new VueRouter({
    base: __dirname,
    routes: [{
      path: '/index',
      component: index
    }, {
      path: '*',
      redirect: '/index'
    }]
  });
};