
<template>
  <div>
    <label>子组件：</label>
    <span>{{childValue}}</span>
    <!-- 子组件事件传值 -->
    <input type='button' value='点击触发' @click="childClick" />
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        childValue: '我是子组件的数据'
      }
    },
    methods: {
      childClick() {
        // 子组件触发事件
        this.$emit('childChange', this.childValue);
      }
    }
  }
</script>

