<template>
  <div class="repay-page">
    <el-backtop />
    <el-steps :active="active" finish-status="success">
      <el-step title="任务类型" />
      <el-step title="任务信息" />
      <el-step title="收费详情" />
      <el-step title="发布任务" />
    </el-steps>
    <div class="form">
      <table class="table">
        <tr>
          <th>收费明细</th>
          <th>数量</th>
          <th>小计</th>
        </tr>
        <tr v-for="(item, index) in priceDetail.feeList" v-if="item !== null" :key="index">
          <td class="mw50">
            <div class="flexCSB">{{ item.name }}：<span class="value">{{ item.amount + item.unit }}</span></div>
          </td>
          <td>{{ priceDetail.orderNum }}单</td>
          <td>{{ item.amountTotal + item.unit }}</td>
        </tr>
        <tr class="last">
          <td> 合计</td>
          <td colspan="2"><span>本金：</span> <span class="down">{{ priceDetail.principalAmountTotal }}</span> <span
            class="opp"
          >元</span> +
            <span>佣金：</span> <span class="down">{{ priceDetail.commissionTotal }}</span> <span class="opp">金</span></td>
        </tr>
      </table>
      <div class="table-tatol">账户余额：<span class="main-txt spm8">{{ balance }}</span>元</div>
    </div>
    <div style="text-align: center; margin-top: 65px">
      <el-button
        v-if="viewsData === true"
        class="activity-button"
        style="margin-right: 80px;width: 100px"
        :disabled="active===0"
        size="mini"
        @click="handleNextOrPre(false)"
      >上一步
      </el-button>
      <!-- <el-button
        v-if="active < 2"
        class="activity-button"
        style="width: 100px"
        size="mini"
        @click="handleNextOrPre(true)"
      >下一步
      </el-button> -->
      <el-button class="btn-theme" size="mini" @click="handleSuccess">付款并发布任务</el-button>
    </div>

    <el-dialog width="25%" top="30vh" :visible.sync="dialogFormVisible" @close="closeSuccess">
      <p style="color:#6666FF;text-align: center;font-size: 19px;font-weight: bold ">恭喜，发布成功！</p>
    </el-dialog>
    <el-dialog
      width="25%"
      top="30vh"
      :visible.sync="dialogFormVisibleFalse"
      center
      @close="close"
    >
      <p style="color:#6666FF;text-align: center;font-size: 19px;font-weight: bold ">余额不足请充值！</p>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisibleFalse = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="topup">去充值</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPrice, pay, reSetData } from '@/api/shop'
import { getInfo } from '@/api/user'

export default {
  name: 'Repay',
  data() {
    return {
      viewsData: true,
      active: 2,
      balance: null,
      dialogFormVisible: false,
      dialogFormVisibleFalse: false,
      priceDetail: {
        platformServiceAmount: 0,
        taskToUpAmount: 0,
        commentAmount: 0,
        manyPeopleAmount: 0,
        returnAmount: 0,
        screenshotAmount: 0,
        commissionTotal: 0,
        principalAmountTotal: 0,
        orderNum: 0,
        baseAmount: 0
      }
    }
  },
  computed: {
    reSetData: {
      get() {
        return this.$store.getters.reSetData
      },
      set(val) {
        this.$store.commit('SET_RESETDATA', val)
      }
    }
  },
  mounted() {
    this.init()
    this.balance = this.$store.getters.balance
    window.addEventListener('beforeunload', e => {
      alert('-----------')
    })
  },
  methods: {
    init() {
      var goodsdatas = this.$route.query
      //   this.taskId = goodsdatas.id
      this.store = goodsdatas.store
      if (goodsdatas.type === '未支付') {
        this.viewsData = goodsdatas.viewsData
      }
      // this.viewsData = goodsdatas.viewsData
      this.storeType = goodsdatas.storeType
      this.taskType = goodsdatas.taskType
      this.priceDetail = goodsdatas.priceDetail
      this.handlePrice(goodsdatas.id)
    },
    handlePrice(id) {
      this.taskId = id
      getPrice({ id: id }).then(response => {
        this.priceDetail = response.data
        this.active++
      })
    },
    topup() {
      this.$router.push({ path: '/admin/shop/recharge' })
    },
    handleNextOrPre(jd) {
      if (this.storeType !== null && this.taskType !== null && this.store !== null) {
        // history.go(-1)
        var goodsdata = this.$route.query
        // goodsdata.postData.taskAdditionalIncrement = JSON.parse(goodsdata.postData.taskAdditionalIncrement)
        // goodsdata.postData.taskCommentList = JSON.parse(goodsdata.postData.taskCommentList)
        // goodsdata.postData.taskGoodsList = JSON.parse(goodsdata.postData.taskGoodsList)
        // goodsdata.postData.taskReleaseTimeList = JSON.parse(goodsdata.postData.taskReleaseTimeList
        reSetData({ id: goodsdata.id }).then(response => {
          if (response.code === 0) {
            this.testData = response.data
            const param = {
              code: '1',
              data: goodsdata.postData.type,
              id: this.testData.id,
              uppath: '重新发布',
              postData: this.testData
            }
            this.$store.commit('SET_RESETDATA', param)
            if (goodsdata.type === '淘宝预售任务') {
              this.$router.push({ path: 'retbys', query: param })
            } else if (goodsdata.type === '淘宝浏览任务') {
              this.$router.push({ path: 'retbll', query: param })
            } else if (goodsdata.type === '手机淘宝任务') {
              this.$router.push({ path: 'resjtb', query: param })
            } else if (goodsdata.type === '手机淘宝无截图任务') {
              this.$router.push({ path: 'resjtbwjt', query: param })
            } else if (goodsdata.type === '淘宝特别任务') {
              this.$router.push({ path: 'retbtb', query: param })
            } else if (goodsdata.type === '淘宝退款任务') {
              this.$router.push({ path: 'retbtk', query: param })
            } else if (goodsdata.type === '淘宝追评任务') {
              this.$router.push({ path: 'retbzp', query: param })
            } else if (goodsdata.type === '淘宝超级标签任务') {
              this.$router.push({ path: 'retbcjbq', query: param })
            } else if (goodsdata.type === '淘宝打标任务') {
              this.$router.push({ path: 'retbdb', query: param })
            } else if (goodsdata.type === '京东浏览任务') {
              this.$router.push({ path: 'rejdll', query: param })
            } else if (goodsdata.type === '手机京东任务') {
              this.$router.push({ path: 'resjjd', query: param })
            } else if (goodsdata.type === '京东特别任务') {
              this.$router.push({ path: 'rejdtb', query: param })
            } else if (goodsdata.type === '京东预售任务') {
              this.$router.push({ path: 'rejdys', query: param })
            } else if (goodsdata.type === '手机拼多多任务') {
              this.$router.push({ path: 'resjpdd', query: param })
            } else if (goodsdata.type === '拼多多浏览任务') {
              this.$router.push({ path: 'repddll', query: param })
            } else if (goodsdata.type === '手机阿里巴巴任务') {
              this.$router.push({ path: 'resjtb', query: param })
            }
          }
        })
      } else {
        this.$message({
          message: '页面丢失请点击任务管理查看',
          type: 'warning'
        })
      }
    },
    handleSuccess() {
      pay({ id: this.taskId }).then(response => {
        if (response.code === 0) {
          this.dialogFormVisible = true
          getInfo().then(responseInfo => {
            if (responseInfo.code === 0) {
              // responseInfo.data.balance
              this.$store.commit('SET_BALANCE', responseInfo.data.balance)
              this.balance = this.$store.getters.balance
            }
          })
          this.active = 3
        } else {
          this.dialogFormVisibleFalse = true
        }
      })
    },
    closeSuccess() {
      this.active = 0
      this.init()
      this.storeType = null
      this.taskTypeList = []
      this.$router.push({ path: '/admin/shop/task' })
    },
    close() {
      this.active = 0
      this.init()
      this.storeType = null
      this.taskTypeList = []
    }
  }
}

</script>

<style>
</style>
