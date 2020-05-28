<template>
  <div />
</template>

<script>

export default {
  name: 'Blankpage',
  data() {
    return {
    }
  },
  created() {
    const url = this.$route.query
    let str = ''
    for (const i in url) {
      str += url[i]
    }
    const path = this.$route.query
    this.$router.push({
      path: str
    })
  }
}
</script>

<style scoped>
</style>
