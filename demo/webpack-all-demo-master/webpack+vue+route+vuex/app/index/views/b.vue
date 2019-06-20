
<template>
  <div>
    <label>B组件：</label>
    <input type='button' value='点击触发' @click="getDataFunc" />
    <span>{{name}}</span>
  </div>
</template>

<script type="text/javascript">
  import Bus from '../js/bus.js';
  export default {
    data() {
      return {
        name: 0
      }
    },
    mounted() {
      const vm = this;
      // 使用$on事件来接收参数
      Bus.$on('val', (data) => {
        console.log(data);
        vm.name = data;
      });
    },
    methods: {
      getDataFunc() {
        this.name++;
      }
    }
  }
</script>