<template>
  <div class="home">

    <Messages msg="Welcome to Your Vue.js App"></Messages>
    <div id="heig"></div>
    <Inform msg="Welcome to Your Vue.js App"></Inform>
    <div id="heig"></div>
    <Queue msg="Welcome to Your Vue.js App"></Queue>
  </div>
</template>

<script>
// @ is an alias to /src
import Messages from '@/components/Messages.vue'
import Inform from '@/components/Inform.vue'
import Queue from '@/components/Queue.vue'

export default {
  name: 'home',
  components: {
    Messages,
    Inform,
    Queue
  }
}
</script>
<style scoped>
  #heig{
    height: 40px;
  }
</style>
