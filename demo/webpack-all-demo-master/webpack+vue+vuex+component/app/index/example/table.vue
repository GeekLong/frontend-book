
<style lang="stylus">
  body
    font-size 14px
</style>
<template>
  <div style="width: 800px;">
    <h3>基础表格</h3>
    <tb-table
      :data="tableData"
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="400">
      </tb-table-column>
    </tb-table>

    <h3>带斑马纹的表格</h3>
    <tb-table
      :data="tableData"
      stripe
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="400">
      </tb-table-column>
    </tb-table>

    <h3>带边框的表格</h3>
    <tb-table
      :data="tableData"
      border
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="400">
      </tb-table-column>
    </tb-table>

    <h3>带状态的表格</h3>
    <tb-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="400">
      </tb-table-column>
    </tb-table>

    <h3>固定表头</h3>
    <tb-table
      :data="tableData2"
      height="250"
      border
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="400">
      </tb-table-column>
    </tb-table>
    
    <h3>固定列--随意固定任何一列和多列，只能固定在左侧或右侧</h3>
    <tb-table
      :data="tableData3"
      border
      :opera="opera"
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        width="150">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="120">
      </tb-table-column>
      <tb-table-column
        prop="province"
        label="省份"
        width="120">
      </tb-table-column>
      <tb-table-column
        prop="city"
        label="市区"
        width="120">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="300">
      </tb-table-column>
      <tb-table-column
        prop="zip"
        label="邮编"
        fixed="right"
        width="120">
      </tb-table-column>
      <tb-table-column
        label="操作"
        fixed="right"
        width="100">
      </tb-table-column>
    </tb-table>

    <h3>固定头部列</h3>
    <tb-table
      :data="tableData4"
      border
      :opera="opera"
      height="250"
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        fixed
        width="150">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="120">
      </tb-table-column>
      <tb-table-column
        prop="province"
        label="省份"
        width="120">
      </tb-table-column>
      <tb-table-column
        prop="city"
        label="市区"
        width="120">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="300">
      </tb-table-column>
      <tb-table-column
        prop="zip"
        label="邮编"
        width="120">
      </tb-table-column>
      <tb-table-column
        label="操作"
        fixed="right"
        width="100">
      </tb-table-column>
    </tb-table>

    <h3>内容未超过时，固定头部和右侧</h3>
    <tb-table
      :data="tableData2"
      height="250"
      border
      :opera="opera"
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="300">
      </tb-table-column>
      <tb-table-column
        label="操作"
        fixed="right"
        width="100">
      </tb-table-column>
    </tb-table>

    <h3>只固定右侧，不固定头部</h3>
    <tb-table
      :data="tableData"
      border
      :opera="opera"
      style="width: 100%">
      <tb-table-column
        prop="date"
        label="日期"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="name"
        label="姓名"
        width="200">
      </tb-table-column>
      <tb-table-column
        prop="address"
        label="地址"
        width="300">
      </tb-table-column>
      <tb-table-column
        label="操作"
        fixed="right"
        width="100">
      </tb-table-column>
    </tb-table>
  </div>
</template>
<style>
  .tb-table .info-row {
    background: #c9e5f5;
  }

  .tb-table .positive-row {
    background: #e2f0e4;
  }
</style>
  <script>
    export default {
      data() {
        return {
          tableData: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, 
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄'
            }, 
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ],
          tableData2: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, 
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄'
            }, 
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ],
          tableData3: [
            {
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, 
            {
              date: '2016-05-02',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, 
            {
              date: '2016-05-04',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, 
            {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }
          ],
          tableData4: [
            {
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄 弄',
              zip: 200333
            }, 
            {
              date: '2016-05-02',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, 
            {
              date: '2016-05-04',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }, 
            {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333
            }
          ],
          opera: '<span @click="clickFunc($event)">查看</span><span @click="clickFunc($event)">编辑</span>'
        }
      },
      methods: {
        tableRowClassName(row, index) {
          if (index === 1) {
            return 'info-row';
          } else if (index === 3) {
            return 'positive-row';
          }
          return '';
        },
        handleClick(item, index) {
          console.log(item);
          console.log(index);
        },
        clickFunc (e) {
          console.log(e.target);
          var index = e.target.parentNode.parentNode.getAttribute('data-index');
          console.log(index);
        }
      }
    }
  </script>