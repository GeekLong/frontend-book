
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
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'mock') {
          const Mock = require('mockjs');
          const json = require('../json/parent_yyyy.json');
          Mock.mock('//xxx.abc.com/xxxx/yyy', 'get', {
            'list': json
          });
        }
        // 请求的地址是 '//xxx.abc.com/xxxx/yyy'
        Promise.all([this.commonActionGet(['getPower', {}])]).then((res) => {
          console.log(res);
          let rets;
          if (process.env.NODE_ENV === 'mock') {
            rets = res[0].list;
          } else {
            rets = res;
          } 
          console.log(rets);
        });
      },
      ...mapActions(['commonActionGet', 'commonActionGetJSON', 'commonActionPost', 'commonActionPostJSON'])
    },
    mounted() {

    }
  }
</script>