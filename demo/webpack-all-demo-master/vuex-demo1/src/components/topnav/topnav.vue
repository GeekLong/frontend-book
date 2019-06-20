<style lang="stylus">
  .tb-nav
    box-shadow 0 1px 1px rgba(0,0,0,.1) !important
    // background-color #ffc107 !important
  
  .logoCon
    width 240px
    background-color #fff
    margin-left -15px
    padding-left 15px
    float left

  .logo
    display inline-block
    height 50px
    line-height 50px
    color #333
    img
      height 40px
      margin-top -14px
    span
      color #333
      font-size 24px
      margin-left 10px
  .subLogo
    color #333
    font-size 12px
  
  .topTool
    display block
    height 50px
    float right
</style>
<template>
  <div>
    <div :position="true" class="clearfix" :style="{'background-color': bgcolor}">
      <div class="logoCon">
        xxxxx
      </div>
      <cur-user></cur-user>
      <div class="topTool">
        <div>xxxx</div>
      </div>
    </div>
  </div>
</template>

<script>
  import curUser from '../curuser/curuser.vue';

  export default {
    props: {
      isLeftFixed: {
        type: Boolean,
        default: true
      },

      bgcolor: {
        type: String,
        default: '#4285f4'
      }
    },

    data () {
      return {
        curLeftShow: true
      }
    },

    created () {
      this.curLeftShow = this.isLeftFixed;
      this.$watch('curLeftShow', (val) => {
        this.$emit('changeLeft', val);
      });
    },

    components: {
      curUser
    }
  }
</script>