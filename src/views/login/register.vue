<template>
  <div class="login-container">
    <canvas id="canvas" />
    <div class="login" style="width:450px;margin-left:-225px;height:500px;margin-top:-250px;">

      <el-form
        ref="loginForm"
        style="margin-top:15px;"
        :model="form"
        :rules="loginRules"
        class="login-form simple_form new_user"
        auto-complete="on"
      >
        <div class="login-top">
          注册
        </div>
        <el-form-item class="login-center clearfix" prop="phone">
          <div class="login-center-img">
            <svg-icon icon-class="user" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="form.phone"
              type="text"
              class="validate"
              placeholder="请输入您的手机号"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入您的手机号'"
            >
            <div class="login-center-input-text">手机号</div>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix">
          <div class="login-center-img">
            <svg-icon icon-class="password" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="captchaCode"
              type="text"
              class="validate"
              placeholder="请输入验证码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入验证码'"
            >
            <div class="login-center-input-text">验证码</div>
            <div style="position:absolute;right:10px;top:0px;z-index: 99999;">
              <captcha @changeUid="changeUid" />
            </div>

          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="vcode">
          <div class="login-center-img">
            <svg-icon icon-class="password" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="form.vcode"
              type="text"
              placeholder="请输入短信验证码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入短信验证码'"
            >
            <div class="login-center-input-text">短信</div>
            <a v-if="verShow" class="pull-left Get_verification" style="position:absolute;right:10px;top:0px;z-index: 99999;color:#409EFF;text-decoration: underline;" @click="handleSms">
              获取短信验证码
            </a>
            <a v-if="!verShow" class="pull-left Get_verification" style="position:absolute;right:10px;top:0px;z-index: 99999;">
              <span>{{ timer }}</span>秒后重新获取
            </a>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="password">
          <div class="login-center-img">
            <svg-icon icon-class="password" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="form.password"
              type="password"
              placeholder="请输入您的密码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入您的密码'"
            >
            <div class="login-center-input-text">密码</div>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="passwordConfirm">
          <div class="login-center-img">
            <svg-icon icon-class="password" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="form.passwordConfirm"

              type="password"
              placeholder="请确认您的密码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请确认您的密码'"
            >
            <div class="login-center-input-text">确认密码</div>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="qqNum">
          <div class="login-center-img">
            <svg-icon icon-class="password" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="form.qqNum"
              type="text"
              placeholder="请输入您的QQ"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='请输入您的QQ'"
            >
            <div class="login-center-input-text">QQ</div>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="invite">
          <div class="login-center-img">
            <svg-icon icon-class="password" style="color: #889aa4" />
          </div>
          <div class="login-center-input">
            <input
              v-model="form.invite"
              type="text"
              value=""
              :disabled="trueOrFalse"
              class="validate"
              placeholder="邀请码"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='邀请码'"
            >
            <div class="login-center-input-text">邀请码</div>
          </div>
        </el-form-item>

        <button
          type="submit"
          class="login-button"
          style="margin-left:100px;margin-top:0px;"
          @click="handleRegister"
        >注册
        </button>
        <div class="login-center clearfix">
          <a style="width:100%;text-align: center;display: inline-block;margin-top: 20px;color:#409EFF;text-decoration: underline;" @click="goToLogin">已经有了账号?立即登陆</a>
        </div>

      </el-form>

    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { main } from '@/vendor/dots'
import captcha from '@/components/captcha'
import { register, getSmsCodeByImgCode } from '@/api/user'

export default {
  name: 'Register',
  components: {
    captcha
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 11) {
        callback(new Error('请输入正确的手机号'))
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
    const validatePasswordC = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入您的确认密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两个密码不一致，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      form: {
        invite: null,
        password: '',
        passwordConfirm: '',
        phone: '',
        qqNum: '',
        vcode: ''
      },
      trueOrFalse: false,
      verShow: true,
      timer: 60,
      captchaCode: '',
      captchaUid: '',
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        passwordConfirm: [{ required: true, trigger: 'blur', validator: validatePasswordC }],
        qqNum: [{ required: true, trigger: 'blur', message: '请输入QQ号' }],
        vcode: [{ required: true, trigger: 'blur', message: '请输入短信验证码' }]
      },
      loading: false,
      redirect: undefined,
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
    // var s=this.$md5('password=e10adc3949ba59abbe56e057f20f883e&phone=15659750709&qqNum=123456&vcode=387434&appkey=H5V2B7&timestamp=1583310698')
    // console.log(s);
    this.init()
  },
  mounted() {
    main()
    this.init()
  },
  methods: {
    init() {
      var textUrl = window.location.href
      if (textUrl.indexOf('inviteCode=') !== -1) {
        var textList = textUrl.split('?inviteCode=')
        this.form.invite = textList[1]
        this.trueOrFalse = true
      }
    },
    changeUid(uid) {
      this.captchaUid = uid
    },
    handleSms() {
      if (this.captchaCode && this.form.phone.length === 11) {
        const data = {
          phone: this.form.phone,
          uuid: this.captchaUid,
          vcode: this.captchaCode
        }
        getSmsCodeByImgCode(data).then(response => {
          console.log(response)
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
          } else {
            this.$message({
              message: response.msg,
              type: 'warning'
            })
          }
        })
      } else {
        if (this.form.phone.length !== 11) {
          this.$message({
            message: '请输入正确的手机号',
            type: 'warning'
          })
        } else if (!this.captchaCode) {
          this.$message({
            message: '请输入验证码',
            // message: '请输入验证码',
            type: 'warning'
          })
        }
      }
    },
    goToLogin() {
      this.$router.push({ path: '/login' })
    },
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid && this.divDisable) {
          var data = Object.assign({}, this.form)
          data.password = this.$md5(this.form.password)
          delete data.passwordConfirm
          this.divDisable = false
          var self = this
          register(data).then(response => {
            if (response.code === 0) {
              this.$message({
                message: '恭喜注册成功',
                type: 'success'
              })
              this.$router.push({ path: '/login' })
            } else if (response.code === 301) {
              this.$message({
                message: response.msg,
                type: 'warning'
              })
            } else {
              this.$message({
                message: response.msg,
                type: 'warning',
                onClose: function() {
                  self.divDisable = true
                }
              })
            }
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

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    background: url(../../assets/images/login_bg.jpg) center no-repeat;
    background-size: cover;

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
    -webkit-transition: all 1s; /* Safari 和 Chrome */
    -o-transition: all 1s; /* Opera */
  }

  .login-top {
    font-size: 24px;
    margin-top: 24px;
    padding-left: 40px;
    box-sizing: border-box;
    color: #333333;
    margin-bottom: 24px;
  }

  .login-center {
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    margin-bottom: 18px;
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
    width: 330px;
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
    -webkit-transition: all 0.5s; /* Safari 和 Chrome */
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
    margin-top: 50px;
    color: white;
  }

</style>
