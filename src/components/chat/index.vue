<template>
  <!-- 客服 -->
  <div class="service-fixed">
    <i class="icon icon-service" @click="handleShowQr" />
    <div v-if="qrShow" class="bg">
      <p class="p">微信扫码</p>
      <!-- <div id="qrCode" ref="qrcode" style="width: 100px;height: 100px;background-color: white" /> -->
      <img :src="customer" alt="" style="width: 100px;height: 100px;background-color: white">
      <span class="close" @click="handleShowQr">收起</span>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { getCustomer } from '@/api/home'
export default {
  name: 'Index',
  data() {
    return {
      qrShow: false,
      customer: ''
    }
  },
  created() {
    this.initCustomer()
  },
  mounted() {

  },
  methods: {
    handleShowQr() {
      this.qrShow = !this.qrShow
      this.$nextTick(() => {
        new QRCode('qrCode', {
          width: 100,
          height: 100, // 高度
          text: this.customer // 二维码内容
        })
      })
    },
    initCustomer() {
      getCustomer().then(response => {
        if (response.code === 0) {
          this.customer = response.data.wxImg
          console.log('客服微信', response.data.wxImg)
        } else {
          this.$message({
            message: response.msg,
            type: 'warning',
            showClose: true,
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  /* 客服*/
  .service-fixed {
    position: fixed;
    z-index: 5;
    top: 300px;
    right: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6666FF;
    border-radius: 6px;
    cursor: pointer;
    color: white;
  }

  .icon-service {
    width: 40px;
    height: 40px;
    background-image: url(../../assets/images/service.png)
  }

  .service-fixed .bg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 24px;
    background-color: #6666FF;
    border-radius: 6px;
  }

  .service-fixed .p {
    margin-bottom: 12px;
    text-align: center;
    font-size: 16px;
  }

  .service-fixed .img {
    padding: 10px;
    width: 120px;
    height: 120px;
    background-color: white
  }

  .service-fixed .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;
    font-size: 12px
  }
</style>
