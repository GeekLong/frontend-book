<style lang="stylus">
  .curUser
    float right
    li
      float left
      display block
      height 50px
      line-height 50px
      a
        padding 0 10px
        color #fff
        font-size 14px
</style>
<template>
  <ul class="curUser clearfix">
    <li>
      <a href="javascript:void(0)">xxx</a>
    </li>
    <li>
      <a href="javascript:void(0)">退出</a>
    </li>
    <li v-if="isLogin">
      <a href="javascript:void(0)">登录</a>
    </li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        isLogin: false,
        user: {}
      }
    }
  }
</script>