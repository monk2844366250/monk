<template>
  <div class="hello">
      <div class="game">
        <div class="logo1">
          <img src="/data/logo1.jpg" alt="">
        </div>
        <div class="cen">
          <div class="title">GAME1</div>
          <div class="vs">
              <div class="left">0</div>
              <P>VS</P>
              <div class="right">0</div>
          </div>

        </div>       
        <div class="logo2">
          <img src="/data/logo2.jpg" alt="">
        </div>
      </div>
      <div class="game">
        <div class="logo1">
          <img src="/data/logo1.jpg" alt="">
        </div>
        <div class="cen">
          <div class="title">GAME2</div>
          <div class="vs">
              <div class="left">0</div>
              <P>VS</P>
              <div class="right">1</div>
          </div>

        </div>       
        <div class="logo2">
          <img src="/data/logo2.jpg" alt="">
        </div>
      </div>
      <div class="game">
        <div class="logo1">
          <img src="/data/logo1.jpg" alt="">
        </div>
        <div class="cen">
          <div class="title">GAME3</div>
          <div class="vs">
              <div class="left">0</div>
              <P>VS</P>
              <div class="right">6</div>
          </div>

        </div>       
        <div class="logo2">
          <img src="/data/logo2.jpg" alt="">
        </div>
      </div>
      <!-- {{Data[0].name}} -->
  </div>
</template>

<script>
import Data from '../../public/data/shuju.json'

// console.log(Data)
// console.log(Data[0].name)
// console.log(Data[0].record[0])
// console.log(Data[0].record[0].sd)
// console.log(Data[0].record[0].sd.kill)
var jj = Data[0].record[0].sd.kill;
console.log(jj)
export default {
  name: 'Messages',
  props: {
    msg: String,
  },

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
p{
  width:46px;
  height:30px;
  background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(146,175,212,1) 59%,rgba(120,156,202,1) 100%);
  box-shadow:0px 4px 1px 1px rgba(33,44,60,1);
}
a {
  color: #42b983;
}
.game{
  width:450px;
  height:118px;
  background:linear-gradient(1deg,rgba(50,70,101,0.46) 0%,rgba(122,151,182,0.92) 71%,rgba(135,166,197,1) 100%);
  box-shadow:0px 0px 20px 1px rgba(159,206,255,1);
  border:2px solid rgba(154,193,239,1);
  display: flex;
  justify-content: space-around;
}
img{
  width:80px;
  height:80px;
  margin-top:12px;
  background:linear-gradient(180deg,rgba(41,53,69,0) 0%,rgba(201,226,255,1) 100%);
  box-shadow:0px 2px 8px 0px rgba(41,53,70,1);
  border:1px solid;
  border-image:linear-gradient(360deg, rgba(255,255,255,1), rgba(92,129,172,1)) 1 1;
} 
.vs{
  display: flex;
  justify-content: space-around;
  width:200px;
}
.title{
  width:160px;
  height:48px;
  font-size:36px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:41px;
  display: inline-block;
  text-align: center;
  background:linear-gradient(180deg,rgba(62,117,207,0) 0%,rgba(179,215,251,0.77) 100%);
  box-shadow:0px 2px 0px 1px rgba(41,53,70,0.2),0px -5px 20px 0px rgba(255,255,255,0.2);
  border:2px solid;
  border-image:linear-gradient(180deg, rgba(135,167,205,0), rgba(126,190,253,1)) 2 2;
}
.left{
  width:24px;
  height:41px;
  margin-top:12px;
  font-size:36px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:41px;
  background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(146,175,212,1) 59%, rgba(120,156,202,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.right{
  width:15px;
  height:41px;
  font-size:36px;
  margin:12px 4px 0 0;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:41px;
  background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(146,175,212,1) 59%, rgba(120,156,202,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.cen{
  display: inline-block;
  text-align: center;
}
.hello{
  display: flex;
  justify-content: space-around;
}
</style>
