<style lang="stylus">
  #list-container 
    width 100%
    h3.title
      width 200px
      margin 0 auto 30px
      font-size 20px
</style>

<template>
  <div id="list-container" style="margin:20px auto" class="login-container">
    <div style="width:400px;margin:100px auto 0; overflow:hidden;">
      <h3 class="title">用户登录/注册</h3>
      <el-form ref="form" label-width="80px">
        <div style="overflow:hidden;">
          <div>
            <el-form-item label="用户名" style="display:inline-block;width:300px;">
              <el-input v-model="name"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="密码" style="display:inline-block;width:300px;">
              <el-input v-model="password" type="password"></el-input>
            </el-form-item>
          </div>
          <div style="margin-left:80px;">
            <el-button type="danger" class="is-round" style="width:90px;" @click="login">登录</el-button>
          </div>
          <div style="margin-left:80px;font-size:14px;color:#919191;margin-top:20px;">
            还没有注册？<router-link :to="{path:'/regist'}" style="color:#0099FF;">免费注册</router-link>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        name: '',
        password: ''
      }
    },
    methods: {
      messageFunc(status, msg) {
        this.$message({
          type: status,
          message: msg
        });
      },
      login() {
        if (!this.name) {
          this.messageFunc('warning', '用户名不能为空');
          return;
        }
        if (!this.password) {
          this.messageFunc('warning', '密码不能为空');
          return;
        }
        const obj = {
          username: this.name,
          password: this.password
        };
        this.$http.post('/reglogin/login', obj).then((res) => {
          if (res.body.code === 0) {
            // 登录成功
            const msg = res.body.msg || '登录成功!!!';
            this.messageFunc('success', msg);
            setTimeout(() => {
              this.$router.push({
                path: '/list'
              });
            }, 2000);
          } else {
            // 登录失败
            const errorMsg = res.body.errorMsg || '登录失败';
            this.messageFunc('warning', errorMsg);
          }
        });
      }
    }
  }
</script>