<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="aboutt">
        <Echarts msg="this is chart"></Echarts>
    </div>
    
  </div>
</template>
<script>

import Echarts from '@/components/Echarts.vue'

export default {
  name: 'about',
  data(){
    return {
      listData:[]

    }
  },
  components: {
    Echarts
  },
  // mounted(){
  //   axios({
  //   url:'/data/shuju.json',   
  //   }).then(
  //     res=>{ console.log(res.data);return this.listData=window.listData=res.data.data}
  //     )
  // }
}
</script>>


<style scoped>
  .aboutt{
    text-align: center;
    display:inline-block;
  }
</style>