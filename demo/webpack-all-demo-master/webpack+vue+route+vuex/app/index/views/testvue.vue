
<template>
  <div>
    {{name}}, 总数：{{todoCount}} 
    <span @click='addList'>点击改变总数</span>
    <button @click='addFuncAnsyc'>点击我actions改变数据</button>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        name: '我是空智',
        count: 1,
        todoLists: []
      }
    },
    created() {
      
    },
    computed: {
      todoCount: function() {
        return this.$store.state.add;
      }
    },
    methods: {
      addList() {
        var count = this.count++;
        this.$store.commit('ADD', count);
      },
      addFuncAnsyc() {
        const obj = {
          
        };
        Promise.all([this.$store.dispatch('commonActionGet', ['getPower:COUNTASYNC', obj])]).then((res) => {

        });
      }
    }
  }
</script>