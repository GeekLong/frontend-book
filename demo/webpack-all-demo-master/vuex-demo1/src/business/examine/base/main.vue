<style lang="stylus">
  .container
    width calc(100% - 270px)
    margin-left 255px
    padding-top 50px
    min-height 500px
    transition all 0.25s
  .fullContainer
    width calc(100% - 30px)
    margin-left 15px
  
  @media screen and (min-width: 992px)
    .container
      width calc(100% - 300px)
      margin-left 270px
    .fullContainer
      width calc(100% - 60px)
      margin 0 auto
  
  @media screen and (min-width: 1200px)
    .container
      width calc(100% - 300px)
      margin-left 270px
    .fullContainer
      width 1170px
      margin 0 auto

</style>
<template>
  <div id="app">
    <top-nav :is-left-fixed="isLeftFixed" @changeLeft="changeLeft" bgcolor="#ffc107"></top-nav>
    <left-bar :is-left-fixed="isLeftFixed"></left-bar>
    <div class="container" :class="{'fullContainer': !isLeftFixed}">
      <router-view></router-view>
    </div>
    <bottom-footer :is-left-fixed="isLeftFixed"></bottom-footer>
  </div>
</template>

<script>
  import leftBar from '../../../components/leftbar/leftbar.vue';
  import topNav from '../../../components/topnav/topnav.vue';
  import bottomFooter from '../../../components/bottomfooter/bottomfooter.vue';

  export default {
    data () {
      return {
        isLeftFixed: true
      }
    },

    methods: {
      changeLeft (type) {
        this.isLeftFixed = type;
      }
    },

    components: {
      leftBar,
      topNav,
      bottomFooter
    }
  }
</script>