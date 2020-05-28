<template>
  <div>
    <div class="parcel-menu">
      <div
        :class="['menu-button',{'menu-button-active':activeName==='gift'}]"
        @click="handleMenuChange('gift')"
      >礼品代发
      </div>
      <div
        :class="['menu-button',{'menu-button-active':activeName==='leary'}]"
        @click="handleMenuChange('leary')"
      >空包代发
      </div>
    </div>
    <div v-if="activeName=='gift'">
      <div class="context">
        <h3 class="h3">代发说明</h3>
        <p class="p">1、16:00点之前支付的代发数据，当天18点后下载快递单号，16:00之后支付的代发数据，次日18点后下载快递单号，部分偏远地区可能会略有延迟；</p>
        <p class="p">2、快递单号一旦生成将无法修改或作废，因此由于个人原因造成的信息错误，导致快递单号生成，代发费用不退还。</p>
        <p class="p">3、商家如果发布了多多进宝AB单活动选择了平台代发，两次选择的礼品务必一致。否则因商家原因导致用户退款、投诉等情况，瓶盖概不负责。</p>
        <p class="p">4、使用平台快递，请先下载快递表格模版，防止发货失败！</p>
      </div>
      <div class="step-title">上传发货信息</div>
      <div class="form">
        <div class="form-item">
          <span class="form-required">*必填</span>
          <span class="form-label">请选择快递产品：</span>
          <span class="main-txt form-block">
            {{ giftDetail.name }}
          </span>
          <span class="main-txt form-block" style="color: red">  {{ giftDetail.price }}元/单</span>
          <span class="udllink exampleImg" @click="previewPrice=true">礼品价格表</span>
        </div>
        <ul class="goods-list">
          <li v-for="item in giftList" class="item">
            <img class="img" :src="item.imgUrl">
            <div class="checkbox">
              <input
                v-model="giftForm.gId"
                class="chk-ipt"
                type="radio"
                :value="item.id"
                @change="handleChangeName(item)"
              >
              <span class="chk-out">
                <span class="chk-in" />
              </span>
            </div>
          </li>
        </ul>
        <div class="form-item">
          <span class="form-required" />
          <span class="form-label">请备注不能使用的的快递：</span>
          <input v-model="giftForm.courierRemarks" type="text" class="form-input w150">
          <div class="form-err">（默认发天天快递，商家务必备注不能接受的快递）</div>
        </div>
        <div class="form-item">
          <span class="form-required">*必填</span>
          <span class="form-label">上传表格：</span>
          <div class="form-block">
            <div style="display: flex;position: relative">
              <!--<input type="text" class="form-input w100" />-->

              <el-upload
                ref="upload"
                action=""
                :auto-upload="false"
                class="upload-demo"
                :on-change="handleChange"
                :file-list="fileList"
                :http-request="httpRequest"
              >
                <el-button size="small" type="primary">获取文件</el-button>
              </el-upload>
              <el-button
                size="small"
                type="success"
                style="margin-left: 20px;position: absolute;left: 84px;"
                @click="handleExcelUp()"
              >上传表格
              </el-button>
            </div>

            <button class="btn downBtn" @click="dowloadExcel(1)">下载模版</button>
          </div>
        </div>
        <div class="form-item">
          <span class="form-required" />
          <span class="form-label">快递备注：</span>
          <input
            v-model="giftForm.remarks"
            type="text"
            class="form-input form-block"
            placeholder="最多不能超过30个字"
          >
        </div>
        <div class="form-item">
          <span class="form-required" />
          <span class="form-label">核对订单：</span>
        </div>
        <div class="form-item">
          <span class="form-required" />
          <div class="form-block">
            <table class="table">
              <tr>
                <th>收费明细</th>
                <th>数量</th>
                <th>小计</th>
              </tr>
              <tr>
                <td class="mw50">
                  <div class="flexCSB">
                    本金返款：
                    <span class="value">{{ orderDetail.price }}元/单</span>
                  </div>
                </td>
                <td>{{ orderDetail.num }}单</td>
                <td>{{ orderDetail.amountMoney }}元</td>
              </tr>
              <tr class="last">
                <td>合计</td>
                <td colspan="2">
                  <span class="down">{{ orderDetail.amountMoney }}</span>
                  <span class="opp">元</span>
                </td>
              </tr>
            </table>
            <div class="table-tatol">
              账户余额：
              <span class="main-txt spm8">{{ orderDetail.balance }}</span>元
            </div>
          </div>
        </div>

        <div class="form-bot">
          <button class="btn">取消退出</button>
          <el-button class="btn submit" :disabled="isConfirm()" @click="handleAddYwGiftOrder()">确定支付
          </el-button>
        </div>
      </div>
    </div>
    <div v-if="activeName==='leary'">
      <div class="context">
        <h3 class="h3">代发说明</h3>
        <p class="p">1、16:00点之前支付的代发数据，当天18点后下载快递单号，16:00之后支付的代发数据，次日18点后下载快递单号，部分偏远地区可能会略有延迟；</p>
        <p class="p">2、快递单号一旦生成将无法修改或作废，因此由于个人原因造成的信息错误，导致快递单号生成，代发费用不退还。</p>
        <p class="p">3、使用平台快递，请先下载快递表格模版，防止发货失败！</p>
      </div>
      <div class="step-title">上传发货信息</div>
      <div class="form">
        <div class="form-item">
          <span class="form-required">*必填</span>
          <span class="form-label">请选择快递类型：</span>
          <div class="form-block">
            <el-select v-model="emptyForm.cId" placeholder="请选择" size="small" @change="kuaidiChange">
              <el-option
                v-for="item in kuaidiList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <!--<select class="form-input" v-model="emptyForm.cId" @change="kuaidiChange()">-->
            <!--<option @click="kuaidiChange(item)"-->
            <!--v-for="item in kuaidiList" :value="item.id">-->
            <!--{{ item.name }}-->
            <!--</option>-->
            <!--</select>-->
            <!--<el-input v-model="emptyForm.cid" class="w150" size="small" placeholder="包裹重量">-->
            <!--<template slot="append">KG</template>-->
            <!--</el-input>-->
            <!--<input class="form-input w100" type="text" placeholder="包裹重量"/>-->
            <!--<span class="spm8">KG</span>-->
            <span class="red-txt">{{ kuaidiAmount }}元/单</span>
          </div>
          <span class="udllink exampleImg" @click="previewPrice=true">空包代发价格表</span>
        </div>
        <div class="form-item">
          <span class="form-required">*必填</span>
          <span class="form-label">上传表格：</span>
          <div class="form-block">
            <div>
              <div style="display: flex;position: relative">
                <!--<input type="text" class="form-input w100" />-->

                <el-upload
                  ref="upload"
                  action=""
                  :auto-upload="false"
                  class="upload-demo"
                  :on-change="handleEmptyChange"
                  :file-list="emptyFileList"
                  :http-request="httpEmptyRequest"
                >
                  <el-button size="small" type="primary">获取文件</el-button>
                </el-upload>
                <el-button
                  size="small"
                  type="success"
                  style="margin-left: 20px;position: absolute;left: 84px;"
                  @click="handleEmptyExcelUp()"
                >上传表格
                </el-button>
              </div>

            </div>
            <button class="btn downBtn" @click="dowloadExcel(2)">下载模版</button>
          </div>
        </div>
        <div class="form-item">
          <span class="form-required" />
          <span class="form-label">快递备注：</span>
          <input
            v-model="emptyForm.remarks"
            type="text"
            class="form-input form-block"
            placeholder="最多不能超过30个字"
          >
        </div>
        <div class="form-item">
          <span class="form-required" />
          <span class="form-label">核对订单：</span>
        </div>
        <div class="form-item">
          <span class="form-required" />
          <div class="form-block">
            <table class="table">
              <tr>
                <th>收费明细</th>
                <th>数量</th>
                <th>小计</th>
              </tr>
              <tr>
                <td class="mw50">
                  <div class="flexCSB">
                    本金返款：
                    <span class="value">{{ emptyOrderDetail.price }}元/单</span>
                  </div>
                </td>
                <td>{{ emptyOrderDetail.num }}单</td>
                <td>{{ emptyOrderDetail.amountMoney }}元</td>
              </tr>
              <tr class="last">
                <td>合计</td>
                <td colspan="2">
                  <span class="down">{{ emptyOrderDetail.amountMoney }}</span>
                  <span class="opp">元</span>
                </td>
              </tr>
            </table>
            <div class="table-tatol">
              账户余额：
              <span class="main-txt spm8">{{ emptyOrderDetail.balance }}</span>元
            </div>
          </div>
        </div>

        <div class="form-bot">
          <button class="btn">取消退出</button>
          <button class="btn submit" :disabled="isEmptyConfirm()" @click="handleAddEmptyOrder()">确定支付</button>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="previewPrice"
      width="50%"
    >
      <div style="display: flex;justify-content: center">
        <el-image
          :src="pUrl"
          :preview-src-list="srcList"
        />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="previewPrice = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const previewUrl = require('@/assets/images/lipin.jpg')
import {
  addYwGiftOrder,
  addEmptyOrder,
  selectYwGiftList,
  downExcl,
  upGiftExcel,
  upEmptyExcel,
  getYwCourierCompany
} from '@/api/shop'

export default {
  name: 'Parcel',
  data() {
    return {
      srcList: [
        previewUrl
      ],
      pUrl: previewUrl,
      previewPrice: false,
      activeName: 'gift',
      giftList: [],
      giftForm: {
        file: null,
        gId: null,
        remarks: null,
        courierRemarks: null
      },
      giftUpForm: {
        file: '',
        gId: ''
      },
      kuaidiList: [],
      previewToggle: false,
      fileList: [],
      emptyFileList: [],
      orderDetail: {
        amountMoney: '',
        balance: '',
        num: '',
        price: ''
      },
      giftDetail: {
        name: '',
        price: ''
      },
      emptyForm: {
        cId: null,
        file: null,
        remarks: null
      },
      emptyOrderDetail: {
        amountMoney: '',
        balance: '',
        num: '',
        price: ''
      },
      kuaidiAmount: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      selectYwGiftList().then(response => {
        this.giftList = response.data
      })
      getYwCourierCompany().then(response => {
        this.kuaidiList = response.data
      })
    },
    initData() {
      this.orderDetail = {
        amountMoney: '',
        balance: '',
        num: '',
        price: ''
      }
      this.giftDetail = {
        name: '',
        price: ''
      }
      this.giftForm = {
        file: null,
        gId: null,
        remarks: null,
        courierRemarks: null
      }
      this.giftUpForm = {
        file: '',
        gId: ''
      }
    },
    handleAddYwGiftOrder() {
      const data = {
        gId: this.giftForm.gId,
        remarks: this.giftForm.remarks,
        courierRemarks: this.giftForm.courierRemarks
      }
      const file = new FormData() // 创建form对象
      file.append('file', this.giftForm.file)

      addYwGiftOrder(data, file).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '提交成功',
            type: 'success',
            showClose: true,
            duration: 2000
          })
          this.initData()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning',
            showClose: true,
            duration: 2000
          })
        }
      })
    },
    isConfirm() {
      if (this.giftForm.file && this.giftForm.gId) {
        return false
      } else {
        return true
      }
    },
    dowloadExcel(type) {
      downExcl({ type: type }).then(response => {
        console.log(response)
      })
    },
    httpRequest(file) {
      this.giftForm.file = file.file
    },
    handleExcelUp() {
      this.$refs.upload.submit()
      if (!this.giftForm.gId) {
        this.$message({
          message: '请先选择快递产品',
          type: 'warning',
          showClose: true,
          duration: 2000
        })
      } else if (!this.giftForm.file) {
        this.$message({
          message: '请先选择上传文件',
          type: 'warning',
          showClose: true,
          duration: 2000
        })
      } else {
        const gift = {
          gId: this.giftForm.gId
        }
        const file = new FormData() // 创建form对象
        file.append('file', this.giftForm.file)

        upGiftExcel(gift, file).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '提交成功',
              type: 'success',
              showClose: true,
              duration: 2000
            })

            this.orderDetail = response.data
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
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的csv文件
      }
    },
    handleChangeName(item) {
      this.giftDetail.name = item.giftName
      this.giftDetail.price = item.price
      console.log(this.giftDetail)
    },
    httpEmptyRequest(file) {
      this.emptyForm.file = file.file
    },
    // 上传表格
    handleEmptyExcelUp() {
      this.$refs.upload.submit()
      if (!this.emptyForm.cId) {
        this.$message({
          message: '请先选择快递',
          type: 'warning',
          showClose: true,
          duration: 2000
        })
      } else if (!this.emptyForm.file) {
        this.$message({
          message: '请先选择上传文件',
          type: 'warning',
          showClose: true,
          duration: 2000
        })
      } else {
        const gift = {
          cId: this.emptyForm.cId
        }
        const file = new FormData() // 创建form对象
        file.append('file', this.emptyForm.file)

        upEmptyExcel(gift, file).then(response => {
          if (response.code === 0) {
            this.$message({
              message: '提交成功',
              type: 'success',
              showClose: true,
              duration: 2000
            })

            this.emptyOrderDetail = response.data
            console.log('未知途径的数据', response)
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
    },
    handleEmptyChange(file, fileList) {
      if (fileList.length > 0) {
        this.emptyFileList = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的csv文件
      }
    },
    kuaidiChange(val) {
      this.kuaidiList.map((item, index) => {
        if (item.id === val) {
          this.kuaidiAmount = item.amount
        }
      })
    },
    emptyInitData() {
      this.emptyForm = {
        cId: null,
        file: null,
        remarks: null
      }
      this.emptyOrderDetail = {
        amountMoney: '',
        balance: '',
        num: '',
        price: ''
      }
      this.kuaidiAmount = null
    },
    isEmptyConfirm() {
      if (this.emptyForm.file && this.emptyForm.cId) {
        return false
      } else {
        return true
      }
    },
    handleAddEmptyOrder() {
      const data = {
        cId: this.emptyForm.cId,
        remarks: this.emptyForm.remarks,
        courierRemarks: this.emptyForm.courierRemarks
      }
      const file = new FormData() // 创建form对象
      file.append('file', this.emptyForm.file)

      addEmptyOrder(data, file).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '提交成功',
            type: 'success',
            showClose: true,
            duration: 2000
          })
          this.emptyInitData()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning',
            showClose: true,
            duration: 2000
          })
        }
      })
    },
    handleMenuChange(val) {
      this.activeName = val
    }
  }
}
</script>

<style scoped>
    .parcel-menu {
        display: flex;
    }

    .menu-button {
        margin: auto;
        width: 100%;
        color: rgb(188, 188, 188);
        font-size: 20px;
        cursor: pointer;
        text-align: center;
        padding-bottom: 5px;
        margin-bottom: 20px;
    }

    .menu-button-active {
        color: #6666ff;
        border-bottom: 1px solid rgb(102, 102, 255);
    }

    .step-title {
        margin-top: 24px;
        line-height: 32px;
        text-align: center;
        background-color: #6666ff;
        color: white;
        font-size: 16px;
    }

    .form .checkbox {
        margin-left: 14px;
    }

    .step-title {
        margin-top: 24px;
        line-height: 32px;
        text-align: center;
        background-color: #6666ff;
        color: white;
        font-size: 16px;
    }

    .form .form-err-change {
        padding: 6px 0 6px 54px;
        font-size: 12px;
    }

    .form .form-label {
        min-width: 7em;
    }

    .context {
        font-size: 16px;
        color: #333;
    }

    .context .h3 {
        margin-top: 24px;
    }

    .context .p {
        margin-top: 12px
    }

    .downBtn {
        margin-top: 12px;
        background-color: transparent;
        color: #FF0000;
        border: 1px solid #FF0000;
    }

    .goods-list {
        padding: 16px 0 0 3em;
        display: flex;
        flex-wrap: wrap;
    }

    .goods-list .item {
        position: relative;
        margin-right: 32px;
        margin-bottom: 16px;
        width: 50px;
        height: 50px;
        border-radius: 10px;
    }

    .goods-list .img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .goods-list .out {
        position: absolute;
        right: 0;
        top: 0;
        padding: 2px;
        width: 14px;
        height: 14px;
        border: 1px solid #6666FF;
        box-sizing: border-box;
        border-radius: 10px;
    }

    .goods-list .in {
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 10px;
    }

    .goods-list .active .in {
        background-color: #6666FF;
    }

    .goods-list .checkbox {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 0;
        width: 100%;
        height: 100%;
    }

    .goods-list .checkbox .chk-out {
        margin-right: 0;
        position: absolute;
        right: 0;
        top: 0;
    }

</style>
