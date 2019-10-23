<template>
  <div class="hello">
    <div id="main1" style="width: 600px;height:400px;"></div>

  </div>
</template>

<script>

import echarts from 'echarts'
import mockjs from '@/router/mock.js'

export default {
  name: 'About1',
  props: {
    msg: String
  },
  mounted(){
    var num = [
      mockjs[4].kill,
      mockjs[4].death,
      mockjs[4].assists,
      mockjs[4].battle,
      mockjs[4].suffer,
      mockjs[4].output,
      mockjs[4].economic
      ]
    // console.log(num)
    // console.log(mockjs[0])
    // console.log(monkjs[0].kill)

      var myChart = echarts.init(document.getElementById('main1'));

        // 指定图表的配置项和数据
        var option = {


    title: {
        text: '数据分析图'
    },
    tooltip: {},
    legend: {
        data: ['数据分析图']
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
                value : num,
                name : '数据分析图'
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
