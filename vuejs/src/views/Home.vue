<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld1 msg="Welcome to Your Vue.js App"></HelloWorld1>
    <HelloWorld2 msg="Welcome to Your Vue.js App"></HelloWorld2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HelloWorld1 from '@/components/HelloWorld1.vue'
import HelloWorld2 from '@/components/HelloWorld2.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    HelloWorld1,
    HelloWorld2
  }
}
</script>

<style scoped>
.home{
  width:1980px;
  height:1080px;
  background:linear-gradient(180deg,rgba(33,41,54,1) 0%,rgba(97,139,181,1) 100%);
  background:url(/data/images/zbg.png) no-repeat center;
}
  
</style>