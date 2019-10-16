<template>
  <div class="setting">
    <h1>This is an user page</h1>
    <br>
    <div class="user1">

        <div class="logo">
          <img src="../../public/data/timg.jpg" alt="Avatar">
        </div>
        <div class="info">
          <div class="bit">
            <p>用户名:</p><span>李四桑三王</span>
          </div>
          <div class="bit">
            <p>Id:</p><span>1223123123_231</span>
          </div>
          <div class="bit">
            <p>金库余额:</p><span>￥192037.00</span>
          </div>
        </div>
    </div>
    <h4>基本信息</h4>
    <div class="user2">
      <div class="bit">
        <p>年龄:</p><span>18</span>
      </div>
      <div class="bit">
        <p>性别:</p><span>男</span>
      </div>
      <div class="bit">
        <p>所在地:</p><span>艾蒂利</span>
      </div>
      <div class="bit">
        <p>个性签名:</p><span>做自己想做的</span>
      </div>
    </div>
    <h4>账号设置</h4>
    <div class="user">
      <div class="phone">
        <div class="tu">
          <img src="../../public/data/phone.png" alt="">
        </div>
        <div class="num">
          <p>绑定手机</p>
          <p>已绑定:17776532241</p>
        </div>
        <div class="niu">
          <input type="button" value="点击修改">
        </div>
      </div>
      <div class="pass">
        <div class="tu">
          <img src="../../public/data/password.png" alt="">
        </div>
        <div class="num">
          <p>绑定密码</p>
          <p>建议定期修改密码</p>
        </div>
        <div class="niu">
          <input type="button" value="点击修改">
        </div>
      </div>
    </div>
  </div>
</template>
<script>


console.log("999")
export default {
  name: 'user',
  // components: {
  //   Echarts
  // }
}
</script>>


<style scoped>
  .user1{
    overflow: hidden;
    width:60%;
    margin:0 auto;
  }
  .logo{
    float:left;
  }
  .info{
    float:left; 
  }
  img{
    width:106px;
    height:106px;
    margin:20px;
  }
  .user2{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .phone,.pass{
    display: flex;
    justify-content: space-around;
  }
  .bit{
    display:flex;
    justify-content: space-around;
  }
  .bit p{
    display:inline-block;
  }
  .bit span{
    display:inline-block;
    margin:16px 0;
  }
</style>