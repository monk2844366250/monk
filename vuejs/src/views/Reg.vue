<template>
  <div class="about">
    <h1>This is an reg page</h1>
    <h2>1、输入手机号; 2、输入您想要创建的账号密码; 3、验证是否通过; 4、注册成功</h2>
    <div class="reg">
      <span>请输入手机号:</span>
      <input type="text" id="into">
      <br>
      <input type="button" value="点击验证是否可以注册" id="int">      
    </div>
    <div class="nex">
      <!-- <input type="button" value="下一步" id="int"> -->
      <router-link to="/reg1" tag="button">下一步</router-link>
    </div>
  </div>
</template>
<script>

const router = new VueRouter({  })

router.beforeEach((reg1, reg, next) => {
  // 
 if(input.value != data.value){
    
 }
})

export default {
  name: 'reg',
  components: {

  }
}
</script>>


<style scoped>
  #into{
    width:200px;
    height:40px;
  }
  #int{
    width:320px;
    height:40px;
    text-align:center;
    margin:20px 0;
  }
</style>