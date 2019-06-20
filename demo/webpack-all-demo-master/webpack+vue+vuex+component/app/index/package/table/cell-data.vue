<template>
  <div class="cell" ref="cell" :style="{width: column.width}" :data-index="row._index">
    {{row[column.prop]}}
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  import Vue from 'vue';
  export default {
    mixins: [Emitter],
    props: {
      row: [Object, Array],
      column: [Object, Array],
      opera: String,
      isLastCell: Boolean
    },
    mounted() {
      this.$nextTick(() => {
        this.compile();
      });
    },
    methods: {
      typeOf: function(obj) {
        const toString = Object.prototype.toString;
        const map = {
          '[object Boolean]': 'boolean',
          '[object Number]': 'number',
          '[object String]': 'string',
          '[object Function]': 'function',
          '[object Array]': 'array',
          '[object Date]': 'date',
          '[object RegExp]': 'regExp',
          '[object Undefined]': 'undefined',
          '[object Null]': 'null',
          '[object Object]': 'object'
        };
        return map[toString.call(obj)];
      },
      compile() {
        const methods = {};
        const $parent = this.$root;
        var template = this.opera;
        if (template) {
          const cell = document.createElement('div');
          cell.innerHTML = template;
          Object.keys($parent).forEach(key => {
            const func = $parent[key];
            if (this.typeOf(func) === 'function' && (func.name === 'boundFn' || func.name === 'n')) {
              methods[key] = func;
            }
          });
          const res = Vue.compile(cell.outerHTML);
          // 获取组件使用的局部 component
          const components = {};
          Object.getOwnPropertyNames($parent.$options.components).forEach(item => {
            components[item] = $parent.$options.components[item];
          });
          const component = new Vue({
            render: res.render,
            staticRenderFns: res.staticRenderFns,
            methods: methods,
            data () {
              return $parent._data;
            },
            components: components
          });
          const Cell = component.$mount();
          if (this.isLastCell) {
            this.$refs.cell.appendChild(Cell.$el);
          }
        }
      }
    }
  }
</script>