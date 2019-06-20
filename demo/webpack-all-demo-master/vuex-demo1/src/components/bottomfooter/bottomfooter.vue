<style lang="stylus">
  footer
    padding-top 40px
    padding-bottom 40px
    color #767676
    text-align center
    padding-left 300px
    &.fullFooter
      padding-left 0
</style>
<template>
  <footer :class="{'fullFooter': !isLeftFixed}">
    <p>版权所有&nbsp;&nbsp;2012-2016&nbsp;&nbsp;浙B2-20140310&nbsp;&nbsp;浙ICP备12044815号&nbsp;&nbsp;市场有风险，投资需谨慎</p>
  </footer>
</template>

<script>
  export default {
    props: {
      isLeftFixed: {
        type: Boolean,
        default: true
      }
    }
  }
</script>