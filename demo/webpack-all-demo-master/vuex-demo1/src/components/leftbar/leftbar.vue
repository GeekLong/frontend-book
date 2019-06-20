<style lang="stylus">
.leftBar
  position fixed
  left 0
  top 50px
  height calc(100% - 50px)
  width 240px
  background-color #fff
  box-shadow 0 1px 1px rgba(0, 0, 0, 0.15)
  overflow auto
  
.leftBarNav
  box-shadow none !important

.efLeft-enter-active
  transition all 0.25s
  opacity 0
  left -240px
.efLeft-enter-to
  opacity 1
  left 0
.efLeft-leave-active
  opacity 1
  left 0
.efLeft-leave-to
  transition all 0.25s
  opacity 0
  left -240px
</style>

<template>
  <div>xxxx</div>
</template>

<script>
  export default {
    props: {
      isLeftFixed: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        pathName: window.location.pathname
      }
    },

    created () {
    },

    methods: {
      setUrl (path, rePath) {
        if (this.pathName === path) {
          return rePath;
        }
        return path + '#' + rePath;
      }
    }
  }
</script>