<template>
  <div>
    <div class="parcel-menu">
      <div
        :class="['menu-button',{'menu-button-active':activeName==='gift'}]"
        @click="handleMenuChange('gift')"
      >代发单号</div>
      <div
        :class="['menu-button',{'menu-button-active':activeName==='leary'}]"
        @click="handleMenuChange('leary')"
      >补单空包</div>
    </div>
    <div v-if="activeName=='gift'">
      <div class="order-page">
        <div class="search">
          <div class="item">
            <span class="lb">代发订单ID:</span>
            <input v-model="queryList.gId" class="ipt" type="text">
          </div>
          <div class="item">
            <span class="lb">状态：</span>
            <el-select v-model="queryList.status" placeholder="状态" size="small">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="item">
            <span class="lb">代发类型：</span>
            <el-select v-model="queryList.type" placeholder="代发类型" size="small">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="search">
          <div class="item">
            <span class="lb">创建时间：</span>
            <el-date-picker
              v-model="timeRange"
              value-format="yyyy-MM-dd"
              size="mini"
              style="width: 220px"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeChange"
            />
          </div>
          <div class="item">
            <span class="lb">发货时间：</span>
            <el-date-picker
              v-model="timeRange2"
              value-format="yyyy-MM-dd"
              size="mini"
              style="width: 220px"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="timeChange2"
            />
          </div>
          <button class="btn" @click="search">搜索</button>
          <button class="btn" @click="handleExportYwGiftOrderDetaillList">导出</button>
        </div>
        <table class="table">
          <tr>
            <th>代发ID</th>
            <th>代发类型</th>
            <th>订单编号</th>
            <th>所选礼品</th>
            <th>快递类型</th>
            <th>快递单号</th>
            <th>上传时间</th>
            <th>发货时间</th>
          </tr>
          <tr v-for="item in list">

            <td>{{ item.id }}</td>
            <td>{{ item.type===1?'礼品代发':'空包代发' }} </td>
            <td>{{ item.orderNo }}</td>
            <td>
              <el-image
                v-if="item.type===1"
                style="width: 20px; height: 20px"
                :src="item.giftImg"
                :preview-src-list="[item.giftImg]"
              />
              <span v-if="item.type===2">无</span>
            </td>
            <td>{{ item.courierCompanyName?item.courierCompanyName:'无' }}</td>
            <td>{{ item.courierNo }}</td>
            <td>{{ item.createTime }}</td>
            <td>{{ item.startTime1 }}</td>
          </tr>

        </table>
        <div class="pagination">
          <span class="total">共{{ total }}页</span>
          <a class="prev" @click="handleChangePage(false)">上一页</a>
          <span class="cur">{{ queryList.pageNum }}&nbsp;/&nbsp;{{ total?total:1 }}</span>
          <a class="next" @click="handleChangePage(true)">下一页</a>
          <input v-model="pageIn" class="ipt" type="text">
          <button class="btn" @click="handlePageIn">跳转</button>
        </div>
      </div>
    </div>

    <div v-if="activeName=='leary'">
      <div class="search">
        <div class="item">
          <span class="lb">任务ID:</span>
          <input v-model="emptyQueryList.taskId" class="ipt" type="text">
        </div>
        <div class="item">
          <span class="lb">订单ID：</span>
          <input v-model="emptyQueryList.orderId" class="ipt" type="text">
        </div>
        <div class="item">
          <span class="lb">店铺名称：</span>
          <input v-model="emptyQueryList.storeName" class="ipt" type="text">
        </div>
        <div class="item">
          <span class="lb">订单编号：</span>
          <input v-model="emptyQueryList.orderNo" class="ipt" type="text">
        </div>
        <div class="item">
          <span class="lb">快递状态：</span>
          <el-select v-model="emptyQueryList.status" placeholder="快递状态" size="small">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <button class="btn" @click="searchExpress()">搜索</button>
        <button class="btn" @click="exportExcel">导出</button>
      </div>
      <div class="od-title">获取快递单号前务必核对订单编号、收货信息、于下单地址是否一致</div>
      <ul class="order-list">
        <li v-for="itemdata in emptyList" class="item">
          <div class="dt">
            <div class="checkbox">
              <input type="checkbox" class="chk-ipt">
              <span class="chk-out" style="margin-right:0">
                <span class="chk-in" />
              </span>
            </div>
            <div class="one"> 任务ID：{{ itemdata.taskId }} </div>
            <div class="one"> 订单ID：{{ itemdata.orderId }} </div>
            <div class="one"> 店铺：{{ itemdata.storeName }} </div>
            <div class="one"> 订单编号：{{ itemdata.thirdOrderNo }} </div>
            <div class="one"> 付款时间：{{ itemdata.createTime }} </div>
          </div>
          <div class="dd">
            <div class="border first">发货信息</div>
            <div class="border flex1">
              <div class="one"><span class="lb">发货人：</span><span class="sp">{{ itemdata.senderName }} </span></div>
              <div class="one"><span class="lb">发货号码：</span><span class="sp">{{ itemdata.senderPhone }}</span></div>
              <div class="one"><span class="lb">发货地址：</span><span class="sp">{{ itemdata.senderProvince }} {{ itemdata.senderCity }} {{ itemdata.senderArea }}{{ itemdata.senderAddress }} </span></div>
            </div>
            <div class="border last">
              <span class="lb">会员名：</span><span class="sp">{{ itemdata.nickname }} </span>
            </div>
          </div>
          <div class="dd">
            <div class="border first">收货信息</div>
            <div class="border flex1">
              <div class="one"><span class="lb">收货人：</span><span class="sp">{{ itemdata.addresseeName }} </span></div>
              <div class="one"><span class="lb">发货号码：</span><span class="sp">{{ itemdata.addresseePhone }}</span></div>
              <div class="one"><span class="lb">收货地址：</span><span class="sp">{{ itemdata.addresseeProvince }}{{ itemdata.addresseeCity }}{{ itemdata.addresseeArea }}{{ itemdata.addresseeAddress }}</span></div>
            </div>
            <div class="border last">
              <p class="main-txt">{{ itemdata.expressNum }}</p>
            </div>
          </div>
          <div class="dd">
            <div class="border first">快递信息</div>
            <div class="border flexjsp" style="padding:0;">
              <div class="one" style="width:380px;"><span class="lb">商品名称：</span><span class="sp">{{ itemdata.goodsName }} </span></div>
              <div class="one" style="width:200px;">
                <span class="lb">快递：</span>
                <select
                  v-model="itemdata.courierCompanyName"
                  style="width:60px;height:20px;"
                  @focus="toSelectYwCourierCompanyList(itemdata)"
                  @blur="blurValue(itemdata)"
                >
                  <option v-if="(itemdata.remark === '已获取数据') ? false : true">
                    {{ itemdata.courierCompanyName }}
                  </option>
                  <option
                    v-for="items in kdList"
                    :key="items.id"
                    style="width:60px;height:20px;"
                    :label="items.name"
                    :value="items.id"
                  />
                </select>
                <span class="lb">重 </span><input v-model="itemdata.weight" style="width:40px;" name=""> kg
              </div>
            </div>
            <div class="border bdbtn" @click="toGetCourierOrderNo(itemdata)">获取单号</div>
            <div class="border bdbtn" @click="toUpdateCourier(itemdata)">修改地址</div>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <span class="total">共{{ emptyTotal }}页</span>
        <a class="prev" @click="handleChangePage2(false)">上一页</a>
        <span class="cur">{{ emptyQueryList.pageNum }}&nbsp;/&nbsp;{{ emptyTotal?emptyTotal:1 }}</span>
        <a class="next" @click="handleChangePage2(true)">下一页</a>
        <input v-model="emptyPageIn" class="ipt" type="text">
        <button class="btn" @click="handlePageIn2">跳转</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  selectYwGiftOrderDetaillList,
  exportYwGiftOrderDetaillList,
  selectYwOrderCourierList,
  selectYwCourierCompanyList,
  updateCourier,
  selectYwCourierList,
  getCourierOrderNo
} from '@/api/shop'
import { downloadFile } from '@/utils'
export default {
  name: 'Single',
  data() {
    return {
      activeName: 'gift',
      statusList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '已发货'
      }, {
        value: 2,
        label: '未发货'
      }],
      kdList: [],
      typeList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '礼品代发'
      }, {
        value: 2,
        label: '空包代发'
      }],
      courierCompanyData: true,
      queryList: {
        endTime: null,
        endTime1: null,
        startTime: null,
        startTime1: null,
        gId: null,
        pageNum: 1,
        pageSize: 10,
        status: 0,
        type: 0
      },
      list: [],
      total: 1,
      pageIn: null,
      timeRange: [],
      timeRange2: [],
      courierCompanyNames: null,
      emptyQueryList: {
        orderId: null,
        orderNo: null,
        storeName: null,
        taskId: null,
        pageNum: 1,
        pageSize: 10,
        status: 0
      },
      emptyList: [],
      emptyTotal: 1,
      emptyPageIn: null
    }
  },
  created() {
    this.init()
    // this.emptyInit()
  },
  methods: {
    init() {
      selectYwGiftOrderDetaillList(this.queryList).then(response => {
        this.list = response.data.rows
        this.total = Math.ceil(response.data.total / this.queryList.pageSize)
      })
      var data = { pageNum: this.emptyQueryList.pageNum, pageSize: this.emptyQueryList.pageSize }
      selectYwCourierList(data).then(response => {
        this.emptyList = response.data.rows
        console.log('补单空包数据', this.emptyList)
        this.emptyTotal = Math.ceil(response.data.total / this.emptyQueryList.pageSize)
      })
    },
    // emptyInit() {
    //   var data = { pageNum: this.emptyQueryList.pageNum, pageSize: this.emptyQueryList.pageSize }
    //   selectYwOrderCourierList(data).then(response => {
    //     this.emptyList = response.data
    //     console.log('经典的空包代发', this.emptyList)
    //     console.log('经典的空包代发', this.emptyQueryList)
    //     console.log('经典的空包代发', response.data)
    //     this.emptyTotal = Math.ceil(response.data.total / this.emptyQueryList.pageSize)
    //   })
    // },
    timeChange(val) {
      if (val === null) {
        this.queryList.startTime = null
        this.queryList.endTime = null
      }
    },
    timeChange2(val) {
      if (val === null) {
        this.queryList.startTime1 = null
        this.queryList.endTime1 = null
      }
    },
    handleChangePage(type) {
      if (type) {
        if (this.queryList.pageNum < this.total) {
          this.queryList.pageNum++
          this.init()
        }
      } else {
        if (this.queryList.pageNum > 1) {
          this.queryList.pageNum--
          this.init()
        }
      }
    },
    handlePageIn() {
      if (this.pageIn <= this.total && this.pageIn > 0) {
        this.queryList.pageNum = this.pageIn
        this.init()
      }
    },
    search() {
      if (this.timeRange && this.timeRange.length === 2) {
        this.queryList.startTime = this.timeRange[0]
        this.queryList.endTime = this.timeRange[1]
      }
      if (this.timeRange2 && this.timeRange2.length === 2) {
        this.queryList.startTime1 = this.timeRange[0]
        this.queryList.endTime1 = this.timeRange[1]
      }
      this.init()
    },
    // 所选快递显示
    blurValue(data) {
      // /
      console.log('所选快递公司,把值和数据都获取火来', this.courierCompanyId)
      // console.log('快递公司信息', this.courierCompanyName)
      // console.log('快递公司信息s', this.courierCompanyNames)
      // console.log('所选快递公司', this.courierCompanyId)
    },
    // 快递公司信息
    toSelectYwCourierCompanyList(data, val) {
      data.remark = '已获取数据'
      var dataexp = {
        storeTypeId: data.storeTypeId
      }
      console.log('快递公司信息', dataexp, val)
      selectYwCourierCompanyList(dataexp).then(response => {
        // console.log('快递公司信息123', response.data)
        this.kdList = response.data
        // this.$message({
        //   message: '快递类型获取完成！',
        //   type: 'success'
        // })
      })
    },
    // 搜索
    searchExpress() {
      const searchButtom = {
        beginAcceptTime: this.emptyQueryList.acceptTime[0],
        endAcceptTime: this.emptyQueryList.acceptTime[1] + 1,
        courierState: this.emptyQueryList.courierState,
        storeName: this.emptyQueryList.storeName,
        taskId: this.emptyQueryList.taskId,
        orderId: this.emptyQueryList.orderId,
        thirdOrderNo: this.emptyQueryList.thirdOrderNo,
        pageNum: this.emptyQueryList.pageNum,
        pageSize: this.emptyQueryList.pageSize
      }
      selectYwCourierList(searchButtom).then(response => {
        if (response.code === 0) {
          console.log('数据', response.data)
          this.list = response.data.rows
          this.$message({
            message: '获取完成！',
            type: 'success'
          })
        }
      })
    },
    // 获取快递单号
    toGetCourierOrderNo(item) {
      var arrlist = this.kdList
      for (var i = 0; i < arrlist.length; i++) {
        if (arrlist[i].name === item.courierCompanyName) {
          item.courierCompanyId = arrlist[i].id
        }
      }
      console.log('所选快递公司,把值和数据都获取火来', item.courierCompanyId, item)
      const data = {
        addresseeAddress: item.addresseeAddress,
        addresseeArea: item.addresseeArea,
        addresseeCity: item.addresseeCity,
        addresseeName: item.addresseeName,
        addresseePhone: item.addresseePhone,
        addresseeProvince: item.addresseeProvince,
        courierCompanyId: item.courierCompanyName,
        goodsName: item.goodsName,
        id: item.id,
        senderAddress: item.senderAddress,
        senderArea: item.senderArea,
        senderCity: item.senderCity,
        senderName: item.senderName,
        senderPhone: item.senderPhone,
        senderProvince: item.senderProvince,
        thirdOrderNo: item.thirdOrderNo,
        weight: item.weight
      }
      console.log('所选快递公司,把值和数据都获取火来', data)
      getCourierOrderNo(data).then(response => {
        if (response.code === 0) {
          this.expressNum = response.data.courierOrderNo
          this.$message({
            message: '获取完成！',
            type: 'success'
          })
        }
      })
    },
    // 修改快递信息
    toUpdateCourier(item) {
      updateCourier(item).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '获取完成！',
            type: 'success'
          })
        }
      })
    },

    // 导出
    exportExcel() {
      console.log('导出asd')
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].moneyType === 1) {
          this.moneyTypedata = '收'
        } else if (this.list[i].moneyType === 2) {
          this.moneyTypedata = '支'
        }
      }
      // excel数据导出
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('../../../vendor/Export2Excel')
        const tHeader = [
          '序号',
          '任务ID',
          '订单ID',
          '店铺',
          '订单编号',
          '付款时间',
          '会员名称',
          '单号',
          '发货人',
          '发货号码',
          '发货省',
          '发货市',
          '发货区',
          '发货具体地址',
          '收货人',
          '收货号码',
          '收货省',
          '收货市',
          '收货区',
          '收货具体地址',
          '商品名称',
          '快递',
          '重量'
        ]
        const filterVal = [
          'index',
          'taskId',
          'orderId',
          'storeName',
          'thirdOrderNo',
          'createTime',
          'nickname',
          'expressNum',
          'senderName',
          'senderPhone',
          'senderProvince',
          'senderCity',
          'senderArea',
          'senderAddress',
          'addresseeName',
          'addresseePhone',
          'addresseeProvince',
          'addresseeCity',
          'addresseeArea',
          'addresseeAddress',
          'goodsName',
          'courierCompanyName',
          'weight'
        ]
        const list = this.emptyList
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
      })
    },
    // 导出
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleExportYwGiftOrderDetaillList() {
      var data = Object.assign({}, this.queryList)
      delete data.pageNum
      delete data.pageSize
      exportYwGiftOrderDetaillList(this.queryList).then(response => {
        if (response.code === 0) {
          downloadFile(response, 'daifa_dingdan')
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
    // 翻页
    handleChangePage2(type) {
      if (type) {
        if (this.emptyList.pageNum < this.emptyTotal) {
          this.emptyList.pageNum++
          this.emptyInit()
        }
      } else {
        if (this.emptyList.pageNum > 1) {
          this.emptyList.pageNum--
          this.emptyInit()
        }
      }
    },
    // 跳转
    handlePageIn2() {
      if (this.emptyPageIn <= this.emptyTotal && this.emptyPageIn > 0) {
        this.emptyList.pageNum = this.emptyPageIn
        this.emptyInit()
      }
    },
    search2() {
      this.emptyInit()
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
.od-title{padding:0 12px; line-height: 30px;font-size: 14px;color:red; background-color: #f2f2f2}
.order-list{font-size: 13px}
.order-list .item{margin-bottom: 24px;}
.order-list .dt{padding: 0 12px; height: 36px; display: flex;justify-content: space-between;align-items: center;color:white; background-color:#6666FF; }
.order-list .dd{display: flex;}
.order-list .border{ margin-top:2px;padding:0 12px; height: 30px;display: flex;align-items: center;  border:2px solid #E4E4E4;}
.order-list .border+.border{margin-left:2px;}
.order-list .border.first{width: 80px;text-align: center;}
.order-list .border.last{width: 146px}
.order-list .border.flex1{flex:1;display: flex;}
.order-list .border.flexjsp{flex:1;display: flex;justify-content: center}
.order-list .one+.one{margin-left: 12px;}
.order-list .lb{color:#97A8BE;}
.order-list .sp{color:#bcbcbc}
.order-list .bdbtn{padding:0;border:0; width: 72px; justify-content: center; color: white;background-color: #6666FF;box-sizing: border-box}
.order-list .dd:nth-child(3) .sp{border-bottom: 1px solid #6666FF;}
.order-list .dd:nth-child(3) .last{justify-content: center}
/* .app-main .el-row .el-col-20 .page-load .order-list .item .dd .flexjsp .one .el-select--mini .el-input--suffix .el-input__inner{margin: 0;padding: 0;}
.el-select-dropdown .el-scrollbar .el-select-dropdown__wrap .el-select-dropdown__list .el-select-dropdown__item{margin: 0;padding: 0;height: 30px;}
.el-popper .el-scrollbar .el-scrollbar__wrap .el-select-dropdown__list .el-select-dropdown__item{margin: 0;padding: 0;height: 34px;} */
</style>
