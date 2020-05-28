<template>
  <div class="login-container">
    <canvas id="canvas" />
    <div class="login">
      <el-form
        ref="loginForm"
        style="margin-top:15px;"
        :model="loginForm"
        :rules="loginRules"
        class="login-form simple_form new_user"
        auto-complete="on"
      >
        <!--<form id="form1" style="margin-top:15px;" novalidate="novalidate" class="login-form simple_form new_user" action="#" accept-charset="UTF-8" method="post">-->
        <div class="login-top">
          登录
        </div>
        <el-form-item class="login-center clearfix" prop="username">
          <div class="login-center-img">
            <svg-icon icon-class="user" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="loginForm.username"
              type="text"
              name="username"
              value=""
              placeholder="请输入您的手机号"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入您的手机号'"
            >
            <div class="login-center-input-text">手机号</div>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="password">
          <div class="login-center-img">
            <svg-icon icon-class="password" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="loginForm.password"
              type="password"
              name="password"
              value=""
              placeholder="请输入您的密码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入您的密码'"
            >
            <div class="login-center-input-text">密码</div>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix">
          <div class="login-center-img">
            <svg-icon icon-class="password" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="loginForm.vcode"
              type="text"
              class="validate"
              placeholder="请输入验证码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入验证码'"
            >
            <div class="login-center-input-text">验证码</div>
            <div style="position:absolute;right:10px;top:0px;z-index: 99999;">
              <captcha ref="captcha" @changeUid="changeUid" />
            </div>

          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix">
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
        </el-form-item>
        <div class="login-button" @click="handleLogin" @keyup.enter="handleLogin">
          登陆
        </div>

        <div class="login-center clearfix">
          <el-button
            type="text"
            style="width:50%;text-align: center;display: inline-block;margin-top: 20px;"
            @click="goToRegister"
          >现在注册!
          </el-button>
          <el-button
            type="text"
            style="width:40%;text-align: center;display: inline-block;margin-top: 20px;"
            @click="goToPassword"
          >忘记密码?
          </el-button>
          <!--<a  style="width:50%;text-align: center;display: inline-block;margin-top: 20px;">现在注册!</a>-->
          <!--<a  style="width:40%;text-align: center;display: inline-block;margin-top: 20px;">忘记密码?</a>-->
        </div>

        <!--</form>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import captcha from '@/components/captcha'
import { main } from '@/vendor/dots'
import { login, getSmsCodeByImgCode } from '@/api/user'

export default {
  name: 'Login',
  components: {
    captcha
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length !== 11) {
        callback(new Error('请输入您的手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入您的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        password: '',
        remember: false,
        username: '',
        vcode: '',
        uuid: ''
      },
      exdays: 7, // cookie过期时间
      verShow: true,
      timer: 60,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      // captchaCode: '',
      captchaUid: '',
      divDisable: true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    var _self = this
    document.onkeydown = function(e) {
      const key = window.event.keyCode
      if (key === 13) {
        _self.handleLogin()
      }
    }
  },
  mounted() {
    main()
    this.init()
  },
  methods: {
    init() {
      var x = document.cookie
      // var arrList = x.match(/\?dialogFormVisible=(.*)/)
      console.log('x', x)
    },
    changeUid(uid) {
      this.captchaUid = uid
    },
    handleSms() {
      if (this.loginForm.vcode && this.loginForm.username.length === 11) {
        const data = {
          phone: this.loginForm.username,
          uuid: this.captchaUid,
          vcode: this.loginForm.vcode
        }
        getSmsCodeByImgCode(data).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '短信发送成功',
              type: 'success'

            })
            this.verShow = false
            var auth_timer = setInterval(() => {
              this.timer--
              if (this.timer <= 0) {
                this.verShow = true
                this.timer = 60
                clearInterval(auth_timer)
              }
            }, 1000)
          }
        })
      } else {
        if (this.loginForm.username.length !== 11) {
          this.$message({
            message: '请输入正确的手机号',
            type: 'warning'
          })
        } else if (!this.loginForm.vcode) {
          this.$message({
            message: '请输入验证码',
            type: 'warning'
          })
        }
      }
    },

    goToRegister() {
      this.$router.push({ path: '/register' })
    },
    goToPassword() {
      this.$router.push({ path: '/password' })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid && this.divDisable) {
          this.loading = true
          var data = Object.assign({}, this.loginForm)
          data.password = this.$md5(this.loginForm.password)
          data.uuid = this.captchaUid
          this.divDisable = false
          var self = this
          this.remember = true
          if (this.remember === true) {
            var name = this.loginForm.username
            var pass = this.$md5(this.loginForm.password)
            // 添加到cookie
            var d = new Date()
            d.setTime(d.getTime() + (this.exdays * 24 * 60 * 60 * 1000))
            var expires = 'expires=' + d.toUTCString()
            document.cookie = 'username=' + name + ';password=' + this.password + expires + ';'
            // document.cookie = "username=John Doe; expires=Sun, 31 Dec 2017 12:00:00 UTC";
          }

          this.$store.dispatch('Login', data).then(() => {
            this.$message({
              message: '登录成功，欢迎回来',
              type: 'success',
              showClose: true,
              duration: 2000
            })
            if (this.redirect === '/404') { this.redirect = null }
            this.$router.push({ path: this.redirect || '/admin' })
            this.loading = false
          }).catch((res) => {
            this.$message({
              message: res.msg,
              type: 'warning',
              onClose: function() {
                self.divDisable = true
              }

            })
            this.$refs.captcha.handleChange()
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;
  /* reset element-ui css */
  .login-container {

  }
</style>

<style lang="scss" scoped>

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-center-input-text {
    background: white;
    padding: 0 5px;
    position: absolute;
    z-index: 0;
    opacity: 0;
    height: 20px;
    top: 50%;
    margin-top: -10px;
    font-size: 14px;
    left: 5px;
    color: dodgerblue;
    line-height: 20px;
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
  }

  .login-container > > > input:focus {
    border: 1px solid dodgerblue;
  }

  .login-container > > > input:focus ~ .login-center-input-text {
    top: 0;
    z-index: 3;
    opacity: 1;
    margin-top: -15px;
  }

  #canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    // background-color: $bg;
    overflow: hidden;
    background: url(../../assets/images/login_bg.jpg) center no-repeat;
    background-size: cover;

    .show-pwd {
      position: absolute;
      right: 17px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

  .login {
    z-index: 2;
    position: absolute;
    width: 350px;
    border-radius: 5px;
    height: 500px;
    background: white;
    box-shadow: 0px 0px 5px #333333;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -175px;
    transition: all 1s;
    -moz-transition: all 1s; /* Firefox 4 */
    -webkit-transition: all 1s; /* Safari å’Œ Chrome */
    -o-transition: all 1s; /* Opera */
  }

  .login-top {
    font-size: 24px;
    margin-top: 40px;
    padding-left: 40px;
    box-sizing: border-box;
    color: #333333;
    margin-bottom: 50px;
  }

  .login-center {
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    margin-bottom: 30px;
  }

  .login-center-img {
    width: 20px;
    height: 20px;
    float: left;
  }

  .login-center-img > img {
    width: 100%;
  }

  .login-center-input {
    float: left;
    width: 230px;
    margin-left: 15px;
    height: 30px;
    position: relative;
  }

  .login-center-input input {
    z-index: 2;
    transition: all 0.5s;
    padding-left: 10px;
    color: #333333;
    width: 100%;
    height: 30px;
    border: 0;
    border-bottom: 1px solid #cccccc;
    border-top: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    box-sizing: border-box;
    outline: none;
    position: relative;
  }

  .login-center-input input:focus {
    border: 1px solid dodgerblue;
  }

  .login-center-input-text {
    background: white;
    padding: 0 5px;
    position: absolute;
    z-index: 0;
    opacity: 0;
    height: 20px;
    top: 50%;
    margin-top: -10px;
    font-size: 14px;
    left: 5px;
    color: dodgerblue;
    line-height: 20px;
    transition: all 0.5s;
    -moz-transition: all 0.5s; /* Firefox 4 */
    -webkit-transition: all 0.5s; /* Safari å’Œ Chrome */
    -o-transition: all 0.5s; /* Opera */
  }

  .login-center-input input:focus ~ .login-center-input-text {
    top: 0;
    z-index: 3;
    opacity: 1;
    margin-top: -15px;
  }

  .login.active {
    -webkit-animation: login-small 0.8s;
    animation: login-small 0.8s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards
  }

  .login-button {
    cursor: pointer;
    width: 250px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: dodgerblue;
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 30px;
    color: white;
  }

</style>
