<template>
  <div class="hello">
    <div id="left">
      <div id="top">
        <div class="tu">
          <img src="" alt="">
          <p>赛季战绩</p>
        </div>
        <ul>
          <li>
            <img src="" alt="">
            <p>姓名</p>
          </li>
        </ul>
      </div>
      <div id="bottom">
        <div class="win">
          <img src="../../public/data/win.png" alt="">
        </div>
        <img src="" alt="">
      </div>
    </div>
    <div id="cent">
      <div id="game">
        <div class="gamep">
          <p class="p1">22</p>
          <p class="p2">16</p>
        </div>
        <img src="" alt="">
      </div>
       <div id="time">
          <div class="times">
            34:44
          </div> 
        </div> 
    </div>
    <div id="right">
      <div id="top">
        <div class="tu">
          <img src="" alt="">
          <p>赛季战绩</p>
        </div>
        <ul>
          <li>
            <img src="" alt="">
            <p>姓名</p>
          </li>
        </ul>
      </div>
      <div id="bottom">
        <div class="win">
          <img src="../../public/data/loss.png" alt="">
        </div>
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inform',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#left{
  width:899px;
  height:320px;

  background:linear-gradient(90deg,rgba(125,159,198,0.2) 0%,rgba(50,70,101,0) 44%,rgba(125,159,198,0.2) 100%,rgba(135,166,197,0.24) 100%);
  box-shadow:0px 0px 20px 0px rgba(159,206,255,0.3);
  border:1px solid;
  border-image:linear-gradient(90deg, rgba(50,70,101,0.46), rgba(135,166,197,1)) 1 1;
}
#top{
    display: flex;
  justify-content: space-around;
}
.tu{
  width:130px;
  height:130px;
  background:linear-gradient(180deg,rgba(41,53,69,0) 0%,rgba(201,226,255,1) 100%);
  box-shadow:0px 2px 8px 0px rgba(41,53,70,1);
  border:1px solid;
  border-image:linear-gradient(360deg, rgba(255,255,255,1), rgba(92,129,172,1)) 1 1;
}
.tu p{
  width:78px;
  height:20px;
  font-size:18px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:20px;
  text-shadow:0px 2px 4px rgba(41,53,70,1);
  background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(146,175,212,1) 59%, rgba(120,156,202,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
li img{
  width:140px;
  height:99px;
  box-shadow:0px 0px 20px 1px rgba(188,217,249,1);
  border:2px solid;
  border-image:linear-gradient(180deg, rgba(154,193,239,1), rgba(97,139,181,1)) 2 2;
}
li p{
  width:78px;
  height:20px;
  font-size:18px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:20px;
  text-shadow:0px 2px 4px rgba(41,53,70,1);
  background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(146,175,212,1) 59%, rgba(120,156,202,1) 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
#cent{
  width:296px;
  height:296px;
  box-shadow:0px 0px 10px 0px rgba(28,255,247,0.5);
  opacity:0.1;
  border:2px solid;
  border-image:linear-gradient(337deg, rgba(7,254,246,1), rgba(255,255,255,1), rgba(20,121,232,0.02), rgba(255,255,255,1), rgba(53,254,247,1), rgba(60,161,238,0.15), rgba(61,144,236,0)) 2 2;
}
#time{
  width:130px;
  height:47px;
  margin:60px 0 0 40xp;
  text-align: center;
  display: inline-block;
  background:linear-gradient(180deg,rgba(30,74,103,1) 0%,rgba(126,187,248,1) 100%);
  border:1px solid;
  border-image:linear-gradient(360deg, rgba(0,255,212,1), rgba(50,70,101,0.46), rgba(6,179,232,0.93)) 1 1;
}
.times{
  width:78px;
  height:37px;
  font-size:32px;
  text-align: center;
  display: inline-block;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:37px;
  text-shadow:0px 2px 4px rgba(41,53,70,1);
  background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(146,175,212,1) 59%, rgba(120,156,202,1) 100%);
  -webkit-text-fill-color:transparent;
}
#game{
  background: url(../../public/data/vs.png) no-repeat center;
}
#game p{
  width:79px;
  height:78px;
  font-size:68px;
  margin-top:-40px;
  font-family:Nobel-Bold,Nobel;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:78px;
  text-shadow:0px 2px 4px rgba(41,53,70,1), 0px 0px 5px rgba(255,132,95,1);
  background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,59,0,1) 82%, rgba(16,38,57,1) 100%);

  -webkit-text-fill-color:transparent;
}
#right{
  width:899px;
  height:320px;

  background:linear-gradient(90deg,rgba(125,159,198,0.2) 0%,rgba(50,70,101,0) 44%,rgba(125,159,198,0.2) 100%,rgba(135,166,197,0.24) 100%);
  box-shadow:0px 0px 20px 0px rgba(159,206,255,0.3);
  border:1px solid;
  border-image:linear-gradient(90deg, rgba(50,70,101,0.46), rgba(135,166,197,1)) 1 1;
}
.hello{
  display: flex;
  justify-content: space-around;
}
.gamep{
  display: flex;
  justify-content: space-between;
}

#bottom{
  display: flex;
  justify-content: space-around;
}
</style>
