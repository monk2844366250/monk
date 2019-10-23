<template>
  <div class="hello">
    <img src="/data/images/bgcztx.png" alt="" class="bgcztx">

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  height:323px;
  position: relative;
  margin-top:20px;
}
.bgcztx{
  position:absolute;
  left: 0;
  top:0;
}
</style>
