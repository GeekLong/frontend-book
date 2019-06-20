<style lang="stylus" >
  .app-container 
    width 200px
</style>
<template>
  <div class='app-container'>
    <div>
      <p v-if="datas.length > 0" v-for="(item, index) in datas">{{item}}</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        datas: [5, 2, 3, 4]
      }
    }
  }
</script>
