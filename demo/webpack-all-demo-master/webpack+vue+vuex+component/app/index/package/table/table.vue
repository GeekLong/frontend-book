<template>
  <div 
    class="tb-table tb-table-bottom-none"
    :class="{
      'tb-table-border': border,
      'tb-table-stripe': stripe,
      'tb-table-hover': hover,
      'tb-table-fixed-head': height || fixedColumnsLeft.length > 0 || fixedColumnsRight > 0
    }"
    ref="tbTable">
    <div>
      <div 
        class="tb-table-head-wrapper" 
        ref="headWrapper"
      >
        <tableHead
          :columns="tableColumns"
          :fixed-head="height"
          :scroll-width-height="scrollWidthHeight"
          :levelscroll="isLevelScroll"
          :columns-width="columnswidth">
        </tableHead>
      </div>
      <div 
        class="tb-table-body-wrapper" 
        ref="bodyWrapper"
        @scroll="handleBodyScroll"
        :style="{
          height: height ? (height + 'px') : 'auto',
          'overflow-x': isLevelScroll ? 'auto' : 'hidden'
        }"
      >
        <tableBody
          ref="tbodyWrapper"
          :data="objData"
          :columns="tableColumns"
          :row-class-name="rowClassName"
          :fixed-head="height"
          :levelscroll="isLevelScroll"
          :scroll-width-height="scrollWidthHeight"
          :columns-width="columnswidth"
          :opera="opera"
          :is-fixed-left-right="isFixedLeftRight"
        >
        </tableBody>
      </div>
    </div>
    <div 
      class="tb-table-fixed-col-left" 
      v-if="fixedColumnsLeft.length > 0" 
      :style="{
        width: fixedLeftWidth + 'px',
        height: fixedHeight + 'px'}">
      <div 
        class="tb-table-fixed-head-wrapper"
        :style="{
          right: (height && isLevelScroll) ? (-scrollWidthHeight + 'px') : 0}">
        <tableHead
          :columns="tableColumns"
          :fixed-head="height"
          :scroll-width-height="scrollWidthHeight"
          :levelscroll="isLevelScroll"
          :columns-width="columnswidth">
        </tableHead>
      </div>
      <div 
        class="tb-table-fixed-body-wrapper" 
        ref="fixedLeftBody"
        :style="{height: fixedBodyHeight + 'px'}">
        <tableBody
          :data="objData"
          :columns="tableColumns"
          :row-class-name="rowClassName"
          :columns-width="columnswidth"
          :levelscroll="isLevelScroll"
          :fixed-head="height"
          :is-add-tr-elem="isAddTrElem"
          :opera="opera"
          :scroll-width-height="scrollWidthHeight"
          :is-fixed-left-right="isFixedLeftRight">
        </tableBody>
      </div>
    </div>
    <div 
      class="tb-table-fixed-col-right" 
      v-if="fixedColumnsRight.length > 0"
      :style="{
        width: (fixedRightWidth - 2) + 'px',
        height: fixedHeight + 'px',
        right: height && fixedColumnsRight.length > 0 ? (scrollWidthHeight + 'px') : 0
      }">
      <div class="tb-table-fixed-head-wrapper" 
           :style="{right: (height && isLevelScroll) ? (-scrollWidthHeight + 'px') : 0}">
        <tableHead
          :columns="tableColumns"
          :fixed-head="height"
          :scroll-width-height="scrollWidthHeight"
          :levelscroll="isLevelScroll"
          :columns-width="columnswidth">
        </tableHead>
      </div>
      <div 
        class="tb-table-fixed-body-wrapper" 
        ref="fixedRightBody"
        :style="{height: fixedBodyHeight + 'px'}">
        <tableBody
          :data="objData"
          :columns="tableColumns"
          :row-class-name="rowClassName"
          :columns-width="columnswidth"
          :scroll-width-height="scrollWidthHeight"
          :levelscroll="isLevelScroll"
          :fixed-head="height"
          :is-add-tr-elem="isAddTrElem"
          :opera="opera"
          :is-fixed-left-right="isFixedLeftRight">
        </tableBody>
      </div>
    </div>
    <div v-if="height" class="tb-table-fixed-right-patch" 
      :style="{
        width: scrollWidthHeight + 'px',
        height: '39px'
      }"></div>
    </div>
  </div>
</template>
<script>
  import Emitter from '../../mixins/emitter';
  import tableBody from './table-body.vue';
  import tableHead from './table-head.vue';
  export default {
    name: 'TbTable',
    componentName: 'TbTable',
    mixins: [Emitter],
    components: {
      tableBody,
      tableHead
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      hover: {
        type: Boolean,
        default: false
      },
      stripe: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      // 带状态的表格
      rowClassName: [String, Function],
      // 固定表头而设置
      height: [String, Number],
      // 操作字段
      opera: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tableColumns: [],
        columnswidth: [],
        /* 保存最左侧列，比如 fixed 或 fixed='left' */
        fixedColumnsLeft: [],
        /* 保存最右侧列，比如 fixed = 'right' */
        fixedColumnsRight: [],
        /* 左侧固定列的宽度 */
        fixedLeftWidth: 0,
        /* 右侧固定列的宽度 */
        fixedRightWidth: 0,
        /* 固定列的高度 */
        fixedHeight: 0,
        /* 固定列的body的高度 */
        fixedBodyHeight: 'auto',
        /* 是否固定左侧或右侧 通过该参数判断是否手动移动上去 是否变色 */
        isFixedLeftRight: false,
        /* 右侧操作是否固定 操作只能右侧固定，不能不固定或左侧固定(因为操作数据是定位上去的) */
        isRightCol: false,
        /* 右侧固定的宽度，默认为0 */
        rightColWidth: '0',
        /* 保存操作固定列的字段 */
        columnsElem: [],
        objData: this.makeData(),

        // 是否有横向滚动条
        isLevelScroll: false,

        // 滚动条的宽度 或高度
        scrollWidthHeight: 0,

        // 判断左侧或右侧 添加 tr 元素
        isAddTrElem: true
      }
    },
    beforeMount() {
      // 获取table列表的字段名称
      this.getListColumns();
    },
    mounted() {
      var self = this;
      this.$nextTick(function() {
        // 如果table的宽度大于 最外层的宽度的话，说明是横向滚动
        if (self.$refs.bodyWrapper.children[0].offsetWidth > self.$refs.tbTable.offsetWidth) {
          self.isLevelScroll = true;
        } else {
          self.isLevelScroll = false;
        }

        // 计算滚动条的默认宽度 简单的判断下 
        self.scrollWidthHeight = self.$refs.bodyWrapper.offsetWidth - self.$refs.bodyWrapper.clientWidth;

        self.fixedBodyHeight = this.$refs.bodyWrapper.clientHeight;
        self.fixedHeight = self.fixedBodyHeight + 39;
      });
    },
    methods: {
      typeOf: function(obj) {
        const toString = Object.prototype.toString;
        const map = {
          '[object Boolean]': 'boolean',
          '[object Number]': 'number',
          '[object String]': 'string',
          '[object Function]': 'function',
          '[object Array]': 'array',
          '[object Date]': 'date',
          '[object RegExp]': 'regExp',
          '[object Undefined]': 'undefined',
          '[object Null]': 'null',
          '[object Object]': 'object'
        };
        return map[toString.call(obj)];
      },
      deepCopy(data) {
        const t = this.typeOf(data);
        let o,
          i;
        if (t === 'array') {
          o = [];
        } else if (t === 'object') {
          o = {};
        } else {
          return data;
        }
        if (t === 'array') {
          for (let i = 0; i < data.length; i++) {
            o.push(this.deepCopy(data[i]));
          }
        } else if (t === 'object') {
          for (i in data) {
            o[i] = this.deepCopy(data[i]);
          }
        }
        return o;
      },
      makeData() {
        var data = [];
        this.data.forEach((row, index) => {
          const newRow = this.deepCopy(row);
          newRow._index = index;
          data[index] = newRow;
        });
        return data;
      },
      // 获取table列表的字段
      getListColumns() {
        var widthArrs = [];
        var defaults = this.$slots.default;
        var filterArrs = [];
        if (defaults.length > 0) {
          for (var d = 0, dlen = defaults.length; d < dlen; d++) {
            if (defaults[d].tag) {
              filterArrs.push(defaults[d])
            }
          }
          for (var f = 0, flen = filterArrs.length; f < flen; f++) {
            var item = filterArrs[f];
            var propsData = item.data.attrs;
            this.tableColumns.push(propsData);
            widthArrs.push(propsData.width);
            if (propsData.fixed === '' || propsData.fixed === 'left') {
              this.fixedColumnsLeft.push(propsData);
            }
            if (propsData.fixed === 'right') {
              this.fixedColumnsRight.push(propsData);
            }
          }
        }
        // 对固定列重新排序
        if (this.fixedColumnsLeft.length > 0 || this.fixedColumnsRight.length > 0) {
          this.fixedColSort();
          this.isFixedLeftRight = true;
        }
      },
      fixedColSort() {
        var self = this;
        var fixedColumnsLeft = this.fixedColumnsLeft;
        var fixedColumnsRight = this.fixedColumnsRight;
        /*
         * 1. 对固定左侧元素重新排序，从后面遍历，依次插入到数组的最前面去。这样就保证了先后顺序
         * 比如原数组 [1,3,5,6,7,8，9]    this.fixedColumnsLeft = [1, 5]
         * 那么先从5遍历，然后依次到1，然后使用数组的unshift方法 向数组的开头添加元素，且原数组对应的项删除掉，这样就组成了新数组
         * newArrs = [1, 5, 3, 6, 7, 8, 9]
           2. 同理对固定在右侧的元素重新排序，比如 this.fixedColumnsRight = [7, 8], 先在原数组中删除对应的项，然后使用push方法，依次从头到尾循环 右侧固定的列
           依次往后面插入元素，最后新数组就变成 newArrs = [1, 5, 3, 6, 9, 7, 8]
         */
        // 对固定左侧的元素 进行重新排序
        var leftRightSort = function (arrs, type) {
          var tableColumns = self.tableColumns;
          if (type === 'left') {
            // 对左侧排序
            for (var j = arrs.length - 1; j >= 0; j--) {
              for (var i = 0, ilen = tableColumns.length; i < ilen; i++) {
                if (tableColumns[i].label === arrs[j].label) {
                  self.tableColumns.splice(i, 1);
                  self.tableColumns.unshift(arrs[j]);
                  self.fixedLeftWidth += arrs[j].width - 1;
                  break;
                }
              }
            }
          } else if (type === 'right') {
            // 对右侧排序
            for (var m = 0; m < arrs.length; m++) {
              for (var n = 0, nlen = tableColumns.length; n < nlen; n++) {
                if (tableColumns[n].label === arrs[m].label) {
                  if (!arrs[m].prop) {
                    self.isRightCol = true;
                    self.rightColWidth = arrs[m].width;
                  }
                  self.tableColumns.splice(n, 1);
                  self.tableColumns.push(arrs[m]);
                  self.fixedRightWidth += arrs[m].width - 1;
                  break;
                }
              }
            }
          }
        };
        // 对固定左侧的元素 进行重新排序
        if (fixedColumnsLeft.length > 0) {
          leftRightSort(fixedColumnsLeft, 'left');
        }
        // 对固定右侧的元素 进行重新排序
        if (fixedColumnsRight.length > 0) {
          leftRightSort(fixedColumnsRight, 'right');
        }
      },
      handleBodyScroll(event) {
        var scrollTop = event.target.scrollTop;
        this.$refs.headWrapper.scrollLeft = event.target.scrollLeft;
        if (this.fixedColumnsLeft.length) {
          this.$refs.fixedLeftBody.scrollTop = scrollTop;
        }
        if (this.fixedColumnsRight.length) {
          this.$refs.fixedRightBody.scrollTop = scrollTop;
        }
      },
      handleMouseIn(index) {
        this.objData[index].isHover = true;
        this.objData = Object.assign({}, this.objData);
      },
      handleMouseOut(index) {
        this.objData[index].isHover = false;
        this.objData = Object.assign({}, this.objData);
      }
    }
  }
</script>