<template>
  <div id="app">
    <router-view />
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" /> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  @import url(~@/styles/style.css);
  @import url(~@/styles/shop.css);
</style>
