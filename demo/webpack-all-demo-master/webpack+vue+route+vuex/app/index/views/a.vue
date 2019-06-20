
<template>
  <div>
    <label>A组件：</label>
    <span>{{value}}</span>
    <input type="button" value="点击触发" @click="clickFunc" />
  </div>
</template>

<script type="text/javascript">
  // 引入公共的bus
  import Bus from '../js/bus.js';
  export default {
    data() {
      return {
        value: 4
      }
    },
    methods: {
      clickFunc() {
        Bus.$emit('val', this.value);
      }
    }
  }
</script>