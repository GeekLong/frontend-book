
<template>
  <div>
    <div>
      <label>父组件:</label>
      <span style="color:red;">{{name}}</span>
      <br />
      <!-- 引入子组件 定义一个方法来监听子组件的状态值 -->
      <child @childChange="childChangeFunc"></child>
    </div>
  </div>
</template>

<script type="text/javascript">
  import child from './child';
  export default {
    data() {
      return {
        name: ''
      }
    },
    methods: {
      childChangeFunc(value) {
        // value 就是子组件传递过来的值
        this.name = value;
      }
    },
    components: {
      child: child
    }
  }
</script>