<template>
  <div class="hello">
    <img src="/data/images/bgbfy.png" alt="" class="bgbfy">

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
  height:552px;
  position: relative;
  margin-top:20px;
}
.bgbfy{
  position:absolute;
  left: 0;
  top:0;
}
</style>
