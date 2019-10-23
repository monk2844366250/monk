<template>
  <div class="about">
    <About1 msg="Welcome to Your Vue.js App"></About1>|
    <About2 msg="Welcome to Your Vue.js App"></About2>|
    <About3 msg="Welcome to Your Vue.js App"></About3>
    <About4 msg="Welcome to Your Vue.js App"></About4>
    <About5 msg="Welcome to Your Vue.js App"></About5>
    <About6 msg="Welcome to Your Vue.js App"></About6>
  </div>
</template>

<script>
// @ is an alias to /src
import About1 from '@/components/About1.vue'
import About2 from '@/components/About2.vue'
import About3 from '@/components/About3.vue'
import About4 from '@/components/About4.vue'
import About5 from '@/components/About5.vue'
import About6 from '@/components/About6.vue'

export default {
  name: 'about',
  components: {
    About1,
    About2,
    About3,
    About4,
    About5,
    About6
  },
  mounted(){

  }
}
</script>

<style scoped>
.about{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>