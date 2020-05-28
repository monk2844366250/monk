<template>
  <div class="login-container">
    <canvas id="canvas"></canvas>
    <div class="login" style="width:450px;margin-left:-225px;height:700px;margin-top:-350px;">

      <el-form
              style="margin-top:15px;"
              ref="loginForm"
              :model="form"
              :rules="loginRules"
              class="login-form simple_form new_user"
              auto-complete="on"
      >
        <div class="login-top">
          修改密码
        </div>
        <el-form-item class="login-center clearfix" prop="phone">
          <div class="login-center-img"><svg-icon icon-class="user" style="color: #889aa4" /></div>
          <div class="login-center-input">
            <input type="text" id="phone"  v-model="form.phone" class="validate error" value="" placeholder="请输入您的手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的手机号'" aria-required="true" aria-invalid="true" title="手机号格式不对!" data-original-title="手机号格式不对!">
            <div class="login-center-input-text">手机号</div>
          </div>
        </el-form-item>

        <el-form-item class="login-center clearfix" prop="captchaCode">
          <div class="login-center-img"><svg-icon icon-class="password" style="color: #889aa4" /></div>
          <div class="login-center-input">
            <input type="text" id="imgvcode" v-model="captchaCode" class="validate" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'">
            <div class="login-center-input-text">验证码</div>
            <div style="position:absolute;right:10px;top:0px;z-index: 99999;">
              <captcha @changeUid="changeUid"></captcha>
            </div>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="vcode">
          <div class="login-center-img"><svg-icon icon-class="password" style="color: #889aa4" /></div>
          <div class="login-center-input">
            <input type="text" v-model="form.vcode" class="validate" placeholder="请输入短信验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入短信验证码'">
            <div class="login-center-input-text">短信</div>
            <a class="pull-left Get_verification" v-if="verShow" style="position:absolute;right:10px;top:0px;z-index: 99999;color:#409EFF;text-decoration: underline;" @click="handleSms">
              获取短信验证码
            </a>
            <a class="pull-left Get_verification" style="position:absolute;right:10px;top:0px;z-index: 99999;" v-if="!verShow">
              <span>{{timer}}</span>秒后重新获取
            </a>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="password">
          <div class="login-center-img"><svg-icon icon-class="password" style="color: #889aa4" /></div>
          <div class="login-center-input">
            <input type="password" v-model="form.password" value="" placeholder="请输入您的新密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入您的新密码'">
            <div class="login-center-input-text">密码</div>
          </div>
        </el-form-item>
        <el-form-item class="login-center clearfix" prop="passwordConfirm">
          <div class="login-center-img"><svg-icon icon-class="password" style="color: #889aa4" /></div>
          <div class="login-center-input">
            <input type="password" v-model="form.passwordConfirm" value="" placeholder="请确认您的密码" onfocus="this.placeholder=''" onblur="this.placeholder='请确认您的密码'">
            <div class="login-center-input-text">确认密码</div>
          </div>
        </el-form-item>

        <button type="submit" class="login-button" style="margin-left:100px;margin-top:0px;" @click="handleForgetPwd">修改密码</button>
        <div class="login-center clearfix">
          <a @click="goToLogin" style="width:100%;text-align: center;display: inline-block;margin-top: 20px;color:#409EFF;text-decoration: underline;">已经有了账号?立即登陆</a>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'
  import { main } from '@/vendor/dots'
  import captcha from '@/components/captcha'
  import {forgetPwd, getSmsCodeByImgCode} from '@/api/user'
  export default {
    name: 'Register',
    components:{
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
          password: '',
          phone: '',
          vcode: '',
          passwordConfirm: '',

        },
        loginRules: {
          phone: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}],
          passwordConfirm: [{required: true, trigger: 'blur', validator: validatePasswordC}],
          vcode: [{required: true, trigger: 'blur'}],
        },
        loading: false,
        redirect: undefined,
        verShow:true,
        timer:60,
        captchaCode: '',
        captchaUid: '',
        divDisable: true,
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
    mounted(){
      main();
    },
    methods: {
      changeUid(uid) {
        this.captchaUid = uid;
      },
      handleSms() {
        if (this.captchaCode && this.form.phone.length === 11) {
          const data = {
            phone: this.form.phone,
            uuid: this.captchaUid,
            vcode: this.captchaCode,
          };
          getSmsCodeByImgCode(data).then(response => {
            console.log(response)
            if (response.code === 0){
              this.$message({
                message: '短信发送成功',
                type: 'success'
              });
              this.verShow = false;
              var auth_timer = setInterval(()=>{
                this.timer--;
                if(this.timer<=0){
                  this.verShow = true;
                  this.timer = 60
                  clearInterval(auth_timer)
                }
              },1000)
            }else{
              this.$message({
                message: response.msg,
                type: 'warning',

              });
            }

          })
        } else {
          if (this.form.phone.length !== 11) {
            this.$message({
              message: '请输入正确的手机号',
              type: 'warning'
            });
          } else if (!this.captchaCode) {
            this.$message({
              message: '请输入验证码',
              type: 'warning'
            });
          }


        }

      },
      goToLogin(){
        this.$router.push({ path: '/login' })
      },

      handleForgetPwd() {
        this.$refs.loginForm.validate(valid => {
          if (valid && this.divDisable) {
            var data = Object.assign({},this.form)
            data.password = this.$md5(this.form.password)
            delete data.passwordConfirm
            this.divDisable = false;
            var self = this
            forgetPwd(data).then(response => {
              if (response.code === 0){
                this.$message({
                  message: response.msg,
                  type: 'success'
                });
                this.$router.push({ path: '/login' })
              }else{
                this.$message({
                  message: response.msg,
                  type: 'warning',
                  onClose:function () {
                    self.divDisable = true
                  }
                });
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

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;
  /* reset element-ui css */
  .login-container {
    background: url(../../assets/images/login_bg.jpg) center no-repeat;
    background-size:cover;
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
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
  }

  .login{z-index: 2;position:absolute;width: 350px;border-radius: 5px;height: 500px;background: white;box-shadow: 0px 0px 5px #333333;top: 50%;left: 50%;margin-top: -250px;margin-left: -175px;transition: all 1s;-moz-transition: all 1s;	/* Firefox 4 */-webkit-transition: all 1s;	/* Safari 和 Chrome */-o-transition: all 1s;	/* Opera */}
  .login-top{font-size: 24px;margin-top: 100px;padding-left: 40px;box-sizing: border-box;color: #333333;margin-bottom: 50px;}
  .login-center{width: 100%;box-sizing: border-box;padding: 0 40px;margin-bottom: 30px;}
  .login-center-img{width: 20px;height: 20px;float: left;}
  .login-center-img>img{width: 100%;}
  .login-center-input{float: left;width: 330px;margin-left: 15px;height: 30px;position: relative;}
  .login-center-input input{z-index: 2;transition: all 0.5s;padding-left: 10px;color: #333333;width: 100%;height: 30px;border: 0;border-bottom: 1px solid #cccccc;border-top: 1px solid #ffffff;border-left: 1px solid #ffffff;border-right: 1px solid #ffffff;box-sizing: border-box;outline: none;position: relative;}
  .login-center-input input:focus{border: 1px solid dodgerblue;}
  .login-center-input-text{background: white;padding: 0 5px;position: absolute;z-index: 0;opacity: 0;height: 20px;top: 50%;margin-top: -10px;font-size: 14px;left: 5px;color: dodgerblue;line-height: 20px;transition: all 0.5s;-moz-transition: all 0.5s;	/* Firefox 4 */-webkit-transition: all 0.5s;	/* Safari 和 Chrome */-o-transition: all 0.5s;	/* Opera */}
  .login-center-input input:focus~.login-center-input-text{top: 0;z-index: 3;opacity: 1;margin-top: -15px;}
  .login.active{-webkit-animation: login-small 0.8s ; animation: login-small 0.8s ;animation-fill-mode:forwards;-webkit-animation-fill-mode:forwards}
  .login-button{cursor: pointer;width: 250px;text-align: center;height: 40px;line-height: 40px;background-color: dodgerblue;border-radius: 5px;margin: 0 auto;margin-top: 50px;color: white;}


</style>
