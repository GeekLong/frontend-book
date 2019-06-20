
<template>
  <div>
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
        const obj = {
          'xx': 11
        };
        // 请求的地址是 '//xxx.abc.com/xxxx/yyy'
        Promise.all([this.commonActionGet(['getPower', obj])]).then((res) => {
          console.log('getPower');
          console.log(typeof res);
          console.log(res);
        });

        Promise.all([this.commonActionPost(['reConfig', obj])]).then((res) => {
          console.log('reConfig');
          console.log(res);
        });

        Promise.all([this.commonActionPost(['reConList', obj])]).then((res) => {
          console.log('reConList');
          console.log(res);
        });

        Promise.all([this.commonActionPost(['reGroup', obj])]).then((res) => {
          console.log('reGroup');
          console.log(res);
        });
      },
      ...mapActions(['commonActionGet', 'commonActionGetJSON', 'commonActionPost', 'commonActionPostJSON'])
    },
    mounted() {

    }
  }
</script>