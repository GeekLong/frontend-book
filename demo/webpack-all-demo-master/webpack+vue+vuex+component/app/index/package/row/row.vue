
<template>
  <div
    class="tb-row"
    :style="style">
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'TbRow',
    componentName: 'TbRow',
    props: {
      gutter: Number
    },
    computed: {
      style() {
        
        const ret = {};

        if (this.gutter) {
          ret.marginLeft = `-${this.gutter / 2}px`;
          ret.marginRight = ret.marginLeft;
        }

        return ret;
      }
    }
  }
</script>