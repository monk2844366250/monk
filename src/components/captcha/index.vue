<template>
  <div>
    <img style="width: 100px;height: 30px" :src="captchaUrl" @click="handleChange">
  </div>
</template>

<script>
import { getCaptcha } from '@/api/user'
export default {
  name: 'Captcha',
  data() {
    return {
      captchaUrl: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getCaptcha().then(response => {
        if (response.code === 0) {
          this.captchaUrl = 'data:image/png;base64,' + response.data.data
          this.$emit('changeUid', response.data.uuid)
        }
      })
    },
    handleChange() {
      this.init()
    }

  }
}
</script>

<style scoped>

</style>
