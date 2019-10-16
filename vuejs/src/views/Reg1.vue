<template>
  <div class="about">
    <h1>This is an reg page</h1>
    <h2>1、输入手机号; 2、输入您想要创建的账号密码; 3、验证是否通过; 4、注册成功</h2>
    <div class="reg">
      <span>请输入账号:</span>
      <input type="text" id="into">
      <br>
      <span>请输入密码:</span>
      <input type="text" id="into">
      <br>
      <input type="button" value="点击验证用户名是否重复" id="int">      
    </div>
    <div class="nex">
      <input type="button" value="下一步" id="int">
    </div>
  </div>
</template>
<script>



export default {
  name: 'reg1',
  components: {

  }
}
</script>>


<style scoped>
  #into{
    width:200px;
    height:40px;
    margin:10px 0;
  }
  #int{
    width:320px;
    height:40px;
    text-align:center;
    margin:20px 0;
  }
</style>