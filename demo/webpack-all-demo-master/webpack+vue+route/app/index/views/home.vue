
<style lang='stylus'>
  .home-container
    width 100%
</style>

<template>
  <div class="home-container">
    <h1>欢迎来到Home</h1>
    <p>{{msg}}</p>
    <p @click="func">进入index页面</p>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        msg: '我是Home组件'
      }
    },
    methods: {
      func() {
        this.$router.push({
          path: 'xxx',
          params: { id: 1 }
        });
      }
    }
  }
</script>