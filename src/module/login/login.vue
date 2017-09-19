<template>
  <div class="login-box is-login">
    <div class="login-logo">
      <img src="/static/img/logo.png" width="60" alt="">
      <p class="text-ffffff text-size16">综合信息安全监控平台</p>
    </div>
    <div class="login-box-body" @keydown.13='doLogin'>
      <div class="form-group has-feedback">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
        <input type="text" class="form-control" placeholder="请输入用户名" v-model='useraccount' @keyup='checkUserAccount'>
        <span v-text='accountError' style="color:#ccc;"></span>
      </div>
      <div class="form-group has-feedback">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        <input type="password" class="form-control" placeholder="请输入密码" v-model='password' @keyup='checkPassword'>
        <span v-text='passwordError' style="color:#ccc;"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox text-ffffff" style="margin: 0 0 15px 0;">
            <label><input type="checkbox" v-model='rememberme'> 记住密码？</label>
          </div>
        </div>
        <div class="col-xs-4 text-right">
          <!-- <a href="#" class="text-ffffff">忘记密码</a> -->
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button type="button" class="btn btn-primary btn-block btn-flat" @click='doLogin' :disabled="disabledBtn==true">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import '/static/css/common.css';
</style>
<script type="es6">
  export default {
    name: 'Login',
    data () {
      return {
        useraccount: '', //账号
        accountError: '',
        password: '', //密码
        passwordError: '',
        rememberme: true, //是否记住
        disabledBtn : false
      }
    },
    beforeCreate (){
      document.body.setAttribute("class","hold-transition login-page");
    },
    methods: {
      checkUserAccount () {
        if (this.useraccount === '' || this.useraccount === null) {
          this.accountError = '*请输入您的用户名'
          return false
        }
        this.accountError = ''
        return true
      },
      checkPassword () {
        if (this.password === '' || this.password === null) {
          this.passwordError = '*请输入您的密码'
          return false
        }
        this.passwordError = ''
        return true
      },
      doLogin () {
        if (!this.checkUserAccount() || !this.checkPassword()) {
          return;
        }

        this.disabledBtn = true
        var params = {
          username: this.useraccount,
          password: this.password,
          remember: this.rememberme
        }
        let self = this
        this.$http.post('login',params)
        .then(function (res) {
          if (res.data.flag) {
            this.$store.state.UserName = this.useraccount
            this.$store.state.UserRole = this.useraccount
            this.$store.state.UserName = this.useraccount
            // self.$router.push({ path: '/' })
            self.disabledBtn = true
          } else {
            alert(res.data.msg);
            self.disabledBtn = false
          }
        })
        .catch(function(error){
          alert("登陆失败");
          self.disabledBtn = false
        })
      }
    }
  }
</script>
