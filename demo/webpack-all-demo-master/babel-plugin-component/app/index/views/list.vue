<style lang="stylus">
  #list-container 
    width 100%
</style>
<template>
  <div id="list-container" style="margin:20px auto">
    <div style="width:100%;overflow:hidden;">
      <el-form ref="form" label-width="80px">
        <div style="float:left;width:20%">
          <el-form-item label="姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
        </div>
        <div style="float:left;width:20%">
          <el-form-item label="年龄">
            <el-input v-model="age"></el-input>
          </el-form-item>
        </div>
        <div style="float:left;width:20%">
          <el-form-item label="性别">
            <el-select v-model="sex">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-button type="primary" style="margin-left:20px;" @click="query(true)">查 询</el-button>
        <el-button type="success" @click="newAdd">新 增</el-button>
      </el-form>
    </div>
    <div style="width:90%; margin: 0 auto; border: 1px solid #ebebeb; border-radius: 3px;overflow:hidden;">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editFunc(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="delFunc(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form label-width="40px">
        <div style="float:left;width:100%">
          <el-form-item label="姓名">
            <el-input v-model="add.name"></el-input>
          </el-form-item>
        </div>
        <div style="float:left;width:100%">
          <el-form-item label="年龄">
            <el-input v-model="add.age"></el-input>
          </el-form-item>
        </div>
        <div style="float:left;width:100%">
          <el-form-item label="性别">
            <el-select v-model="add.sex">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible2"
      width="30%">
      <el-form label-width="40px">
        <div style="float:left;width:100%">
          <el-form-item label="姓名">
            <el-input v-model="update.name"></el-input>
          </el-form-item>
        </div>
        <div style="float:left;width:100%">
          <el-form-item label="年龄">
            <el-input v-model="update.age"></el-input>
          </el-form-item>
        </div>
        <div style="float:left;width:100%">
          <el-form-item label="性别">
            <el-select v-model="update.sex">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible3"
      width="30%">
      <div>是否确认删除?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="delConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {  
        formLabelWidth: '120px',
        name: '',
        age: '',
        sex: '',
        options2: [
          {
            value: '1',
            label: '男'
          }, {
            value: '2',
            label: '女'
          }
        ],
        tableData: [],
        // 新增页面
        add: {
          name: '',
          age: '',
          sex: ''
        },
        // 修改页面
        update: {
          name: '',
          age: '',
          sex: ''
        },
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        row: null,
        _id: ''
      }
    },
    created() {
      this.query();
    },
    methods: {
      setData(datas) {
        if (datas.length > 0) {
          for (let i = 0; i < datas.length; i++) {
            if (datas[i].sex * 1 === 1) {
              this.$set(datas[i], 'sex', '男');
            } else if (datas[i].sex * 1 === 2) {
              this.$set(datas[i], 'sex', '女');
            }
          }
        }
        return datas;
      },
      // 查询数据
      query(isquery) {
        const obj = {
          name: this.name,
          age: this.age,
          sex: this.sex
        };
        this.$http.post('/api/query', obj).then((res) => {
          if (res.ok) {
            this.tableData = res.body ? this.setData(res.body) : [];
            if (isquery) {
              /*
              this.$message({
                message: '查询成功',
                type: 'success'
              });
              */
            }
          } else {
            if (isquery) {
              /*
              this.$message({
                message: '查询失败',
                type: 'warning'
              });
              */
            }
            this.tableData = [];
          }
        });
      },
      newAdd() {
        this.dialogVisible = true;
      },
      editFunc(row) {
        this.dialogVisible2 = true;
        this._id = row._id;
        this.$set(this.$data.update, 'name', row.name);
        this.$set(this.$data.update, 'age', row.age);
        this.$set(this.$data.update, 'sex', row.sex);
        this.row = row;
      },
      delFunc(row) {
        this.dialogVisible3 = true;
        console.log(row);
        this.row = row;
      },
      // 编辑页面提交
      editConfirm() {
        const id = this._id,
          name = this.update.name,
          age = this.update.age,
          sex = this.update.sex;
        const obj = {
          id: id,
          name: name,
          age: age,
          sex: sex
        };
        this.$http.post('/api/update', obj).then((res) => {
          if (res.ok) {
            /*
            // 删除成功
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            */
            // 重新请求下查询
            this.query(false);
          } else {
            /*
            // 删除成功
            this.$message({
              message: '更新失败',
              type: 'success'
            });
            */
          }
          this.dialogVisible2 = false;
        });
      },
      // 删除提交
      delConfirm() {
        const obj = {
          'id': this.row._id
        };
        this.$http.post('/api/del', obj).then((res) => {
          console.log(res.body)
          if (res.body.ok) {
            /*
            // 删除成功
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            */
            // 成功后，触发重新查询下数据 
            this.query();
          } else {
            /*
            // 删除失败
            this.$message({
              message: res.body.errorMsg,
              type: 'warning'
            });
            */
          }
          this.dialogVisible3 = false;
        });
      },
      // 新增提交
      addConfirm() {
        // 新增的时候，姓名，年龄，性别 不能为空，这里就不判断了。。。
        const obj = {
          name: this.add.name,
          age: this.add.age,
          sex: this.add.sex
        };
        this.$http.post('/api/add', obj).then((res) => {
          console.log(111);
          console.log(res);
          if (res.body.code === 0) {
            /*
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            */
            // 成功后，触发重新查询下数据 
            this.query();
          } else {
            /*
            this.$message({
              message: res.body.errorMsg,
              type: 'warning'
            });
            */
          }
          this.dialogVisible = false;
        });
      }
    }
  }
</script>