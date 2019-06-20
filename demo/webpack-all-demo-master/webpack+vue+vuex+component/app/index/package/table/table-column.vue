
<template>
  <div class="tb-table-column">
    <slot></slot>
  </div>
</template>

<script>
  import Emitter from '../../mixins/emitter';
  export default {
    mixins: [Emitter],
    name: 'TbTableColumn',
    componentName: 'TbTableColumn'
  }
</script>