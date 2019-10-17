<template>
  <div class="hello">
    <div class="big">
      <img src="/data/images/bgtl1.png" alt="" class="img1">
      <div class="box">
        <img src="/data/images/tbg1.png" alt="">
        <div class="box-img">
          <img src="/data/images/tbg.png" alt="">
          <div class="bag">
            <img src="/data/images/G2.png" alt="meidui">
          </div>
        </div>
      </div>
      <div class="game">
        <img src="/data/images/gamebg.png" alt="">
        <span>GAME1</span>
      </div>
      <img src="/data/images/tbg1.png" alt="" class="img2">
      <img src="/data/images/tbg.png" alt="" class="img3">
      <img src="/data/images/HKA.png" alt="" class="img4">
      <img src="/data/images/vs.png" alt="" class="img5">
      <span class="lf">{{listData[0].game}}</span>
      <span class="rf">{{listData[0].game}}</span>
    </div>
    <div class="big1">
      <img src="/data/images/bgtc1.png" alt="中间" class="cimg1">
            <div class="box">
              <img src="/data/images/tbg1.png" alt="">
              <div class="box-img">
                <img src="/data/images/tbg.png" alt="">
                <div class="bag">
                  <img src="/data/images/G2.png" alt="meidui">
                </div>
              </div>
            </div>
            <div class="game1">
              <img src="/data/images/gamebg.png" alt="" class="cimg6">
              <span class="cspan1">GAME2</span>
            </div>
        <img src="/data/images/tbg1.png" alt="" class="cimg2">
        <img src="/data/images/tbg.png" alt="" class="cimg3">
        <img src="/data/images/HKA.png" alt="" class="cimg4">
        <img src="/data/images/vs.png" alt="" class="cimg5">
        <span class="cspan2">{{listData[3].game}}</span>
        <span class="cspan3">{{listData[3].game}}</span>
    </div>
    <div class="big2">
      <img src="/data/images/bgtr1.png" alt="" class="rimg1">
      <div class="rbox1">
        <img src="/data/images/tbg1.png" alt="" class="rimg2">
        <div class="rbox-img">
          <img src="/data/images/tbg.png" alt="" class="rimg3">
          <div class="rbag">
            <img src="/data/images/G2.png" alt="meidui" class="rimg4">
          </div>
        </div>
      </div>
      <div class="game3">
        <img src="/data/images/gamebg.png" alt="" class="imgs">
        <span class="rspan">GAME3</span>
      </div>
      <div class="rbox2">
        <img src="/data/images/tbg1.png" alt="" class="rimg5">
        <div class="rbox3-img">
          <img src="/data/images/tbg.png" alt="" class="rimg6">
          <div class="rbag3">
            <img src="/data/images/HKA.png" alt="meidui" class="rimg7">
          </div>
        </div>
      </div>
      <img src="/data/images/vs.png" alt="" class="imgs5">
      <span class="rspan2">{{listData[5].game}}</span>
      <span class="rspan3">{{listData[5].game}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      listData:[],
    }
  },
   mounted(){
    axios({
      url:'/data/json/shuju.json',
      // params:{_page:1,_limit:8}
    }).then(
      res=>{return this.listData = res.data}
      
    )
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgs5{
  width:200px;
  height: 40px;
  position: absolute;
  top: 69px;
  left: 112px;
}
.rspan2,.rspan3{
  width:30px;
  height:41px;
  font-size:36px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:41px;

}
.rspan2{
  position: absolute;
  top: 67px;
  left: 126px;
}
.rspan3{
  position: absolute;
  top: 67px;
  left: 274px;
}
.rbox1{
  width:80px;
  height:80px;
  position:absolute;
  left:21px;
  top:21px;
}
.rimg2{
  width:80px;
  height:80px;
  position:absolute;
  left: 0;
  top:0;
}
.rbox-img{
  width:60px;
  height:60px;
  position:absolute;
  left:10px;
  top:11px;
}
.rimg3{
  position: absolute;
  left: -11px;
  top:-16px;
}
.rbag{
  width:44px;
  height:44px;
  margin:8px;
  position: absolute;
  left: 0;
  top:0;
}
.rimg4{
  width:44px;
  height:44px;
  position: absolute;
  top: 0;
  left: 0;
}
.rbox2{
  width:80px;
  height:80px;
  position:absolute;
  right:43px;
  top:21px;
}
.rimg5{
  width:80px;
  height:80px;
  position:absolute;
  left: 0;
  top:0;
}
.rbox3-img{
  width:60px;
  height:60px;
  position:absolute;
  left:10px;
  top:11px;
}
.rimg6{
  position: absolute;
  left: -11px;
  top:-16px;
}
.rbag3{
  width:44px;
  height:44px;
  margin:8px;
  position: absolute;
  left: 0;
  top:0;
}
.rimg7{
  width:44px;
  height:44px;
  position: absolute;
  top: -4px;
  left: 0;
}
.game3{
  width:160px;
  height:48px;
  position: absolute;
  left: 124px;
  top:7px;
}
.imgs{
  width:206px;
  height:48px;
  position: absolute;
  left:-10px;
  top:4px;
}
.rspan{
  width:114px;
  height:37px;
  font-size:32px;
  position: absolute;
  left:33px;
  top: 5px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:37px;
  text-shadow:0px 2px 4px rgba(41,53,70,1);
}
.big2{
  width:450px;
  height:118px;
  position:absolute;
  top:16px;
  right:292px;
}
.rimg1{
  position: absolute;
  left:-12px;
  top:-6px;
}
.cimg2{
  width:80px;
  height:80px;
  position:absolute;
  left: 310px;
  top:21px;
}
.cimg3{
  width:80px;
  height:80px;
  position: absolute;
  left: 308px;
  top: 22px;
}
.cimg4{
  width:44px;
  height:44px;
  position: absolute;
  top: 37px;
  left: 329px;
}
.cimg5{
  width:200px;
  height: 40px;
  position: absolute;
  top: 69px;
  left: 104px;
}
.game1{
  width:160px;
  height:48px;
  position: absolute;
  left: 124px;
  top:7px;
}
.cimg6{
  width:206px;
  height:48px;
  position: absolute;
  left:-20px;
  top:4px; 
}
.cspan1{
  width:114px;
  height:37px;
  font-size:32px;
  position: absolute;
  left:22px;
  top: 5px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:37px;
  text-shadow:0px 2px 4px rgba(41,53,70,1);
}
.cspan2,.cspan3{
  width:30px;
  height:41px;
  font-size:36px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:41px;

}
.cspan2{
  position: absolute;
  top: 67px;
  left: 123px;
}
.cspan3{
  position: absolute;
  top: 67px;
  left: 257px;
}
.big1 .box{
  width:80px;
  height:80px;
  position:absolute;
  left:21px;
  top:21px;
}
.hello{
  width:1980px;
  height:160px;
  position: relative;
  background:linear-gradient(360deg,rgba(50,70,101,1) 0%,rgba(135,166,197,0.53) 100%);
  opacity:0.3;
}
.big{
  width:450px;
  height:118px;
  position: absolute;
  left:279px;
  top:17px;
}
.big .img1{
  position: absolute;
  left:-11px;
  top:-5px;
}
.big1{
  width:419px;
  height:123px;
  position: absolute;
  left:775px;
  top:13px;
}
.cimg1{
  width:419px;
  height:123px;
  position: absolute;
  left:0px;
  top:0px;
}
.box{
  width:80px;
  height:80px;
  position:absolute;
  left:42px;
  top:21px;
}
.box img{
  width:80px;
  height:80px;
  position:absolute;
  left: 0;
  top:0;
}

.box-img{
  width:60px;
  height:60px;
  position:absolute;
  left:10px;
  top:11px;
}
.box-img img{
  position: absolute;
  left: -11px;
  top:-10px;
}
.bag{
  width:44px;
  height:44px;
  margin:8px;
  position: absolute;
  left: 0;
  top:0;
}
.bag img{
  width:44px;
  height:44px;
  position: absolute;
  top: 0;
  left: 0;
}
.game{
  width:160px;
  height:48px;
  position: absolute;
  left: 124px;
  top:7px;
}
.game img{
  width:206px;
  height:48px;
  position: absolute;
  left:12px;
  top:4px;
}
.game span{
  width:114px;
  height:37px;
  font-size:32px;
  position: absolute;
  left:54px;
  top: 5px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:37px;
  text-shadow:0px 2px 4px rgba(41,53,70,1);
}
.img2{
  width:80px;
  height:80px;
  position:absolute;
  left: 356px;
  top:21px;
}
.img3{
  width:80px;
  height:80px;
  position: absolute;
  left: 354px;
  top: 22px;
}
.img4{
  width:44px;
  height:44px;
  position: absolute;
  top: 37px;
  left: 374px;
}
.img5{
  width:200px;
  height: 40px;
  position: absolute;
  top: 69px;
  left: 139px;
}
.lf,.rf{
  width:30px;
  height:41px;
  font-size:36px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:41px;

}
.lf{
  position: absolute;
  top: 67px;
  left: 153px;
}
.rf{
  position: absolute;
  top: 67px;
  left: 290px;
}
</style>
