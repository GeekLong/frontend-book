<template> 
  <table cellpadding="0" cellspacing="0" width="100%" class="tb-table-head">
    <colgroup>
      <col v-if="columnsWidth.length > 0" v-for="w in columnsWidth" :width="w"></col>
      <col v-for="item in columns" :width="item.width" v-if="columnsWidth.length == 0"></col>
    </colgroup>
    <thead>
      <tr>
        <th v-for="item in columns">
          <div class="cell">{{item.label}}</div>
        </th>
        <th v-if="fixedHead && levelscroll" :style="{
          width: scrollWidthHeight + 'px',
          padding: 0
        }"></th>
      </tr>
    </thead>
  </table>
</template>
<script>
  import Emitter from '../../mixins/emitter';
  export default {
    name: 'TbTableHead',
    mixins: [Emitter],
    props: {
      columns: {
        type: [Array, Object],
        required: true
      },
      fixedHead: String,
      columnsWidth: {
        type: Array
      },
      levelscroll: Boolean,
      scrollWidthHeight: [Number, String]
    },
    mounted() {
      
    }
  }
</script>