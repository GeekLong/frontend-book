
<template>
  <div>
    欢迎光临
  </div>
</template>

<script type="text/javascript">
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
      }
    },
    created() {
      this.testMock();
    },
    methods: {
      testMock() {
        // 请求的地址是 '//xxx.abc.com/xxxx/yyy'
        Promise.all([this.commonActionGet(['getPower', {}])]).then((res) => {
          console.log(res);
        });
      },
      ...mapActions(['commonActionGet', 'commonActionGetJSON', 'commonActionPost', 'commonActionPostJSON'])
    },
    mounted() {

    }
  }
</script>