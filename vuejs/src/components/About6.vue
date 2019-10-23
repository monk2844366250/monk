<template>
  <div class="hello">
    <div id="main6" style="width: 600px;height:400px;"></div>

  </div>
</template>

<script>

import echarts from 'echarts'
import mockjs from '@/router/mock.js'

export default {
  name: 'About6',
  props: {
    msg: String
  },
  mounted(){
    var num1 = [
      mockjs[1].kill,
      mockjs[1].death,
      mockjs[1].assists,
      mockjs[1].battle,
      mockjs[1].suffer,
      mockjs[1].output,
      mockjs[1].economic
      ]
    var num2 = [
      mockjs[2].kill,
      mockjs[2].death,
      mockjs[2].assists,
      mockjs[2].battle,
      mockjs[2].suffer,
      mockjs[2].output,
      mockjs[2].economic
      ]
    var num3 = [
      mockjs[3].kill,
      mockjs[3].death,
      mockjs[3].assists,
      mockjs[3].battle,
      mockjs[3].suffer,
      mockjs[3].output,
      mockjs[3].economic
      ]
    var num4 = [
      mockjs[4].kill,
      mockjs[4].death,
      mockjs[4].assists,
      mockjs[4].battle,
      mockjs[4].suffer,
      mockjs[4].output,
      mockjs[4].economic
      ]
    var num5 = [
      mockjs[5].kill,
      mockjs[5].death,
      mockjs[5].assists,
      mockjs[5].battle,
      mockjs[5].suffer,
      mockjs[5].output,
      mockjs[5].economic
      ]
    var num6 = [
      mockjs[6].kill,
      mockjs[6].death,
      mockjs[6].assists,
      mockjs[6].battle,
      mockjs[6].suffer,
      mockjs[6].output,
      mockjs[6].economic
      ]
    var name = "";

      var myChart = echarts.init(document.getElementById('main6'));

        // 指定图表的配置项和数据
        var option = {


    title: {
        text: '数据分析图'
    },
    tooltip: {},
    legend: {
        data: ['kasha','lunzima','huonan','sige','jiutong','chuanzhang']
    },
    radar: {
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: '击杀', max: 50},
           { name: '助攻', max: 50},
           { name: '死亡', max: 50},
           { name: '团战', max: 50},
           { name: '对英雄输出伤害', max: 500000},
           { name: '承受英雄伤害', max: 500000},
           { name: '经济 ',max:500000},
           
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        data : [
            {
                value : num1,
                name : 'kasha'
            },
            {
                value : num2,
                name : 'lunzima'
            },
            {
                value : num3,
                name : 'huonan'
            },
            {
                value : num4,
                name : 'sige'
            },
            {
                value : num5,
                name : 'jiutong'
            },
            {
                value : num6,
                name : 'chuanzhang'
            }
        ]
    }]
}
  
           myChart.setOption(option);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
