<template>
  <div>
    <div class="express-list">
      <el-row :gutter="10">
        <el-col :span="10">
          <span class="search-title">时间：</span>
          <el-date-picker
            v-model="searchData.acceptTime"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 240px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </el-col>
        <el-col :span="6">
          <span class="search-title">快递状态：</span>
          <el-select v-model="searchData.courierState" placeholder="请选择" size="small" style="width: 100px">
            <el-option
              label="未获取"
              value="1"
            />
            <el-option
              label="已获取"
              value="2"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="search-title">店铺：</span>
          <el-input v-model="searchData.storeName" placeholder="请输入店铺名称" size="mini" style="width: 100px" />
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px;margin-bottom: 10px">
        <el-col :span="6">
          <span class="search-title">任务ID：</span>
          <el-input v-model="searchData.taskId" size="mini" style="width: 100px" />
        </el-col>
        <el-col :span="6">
          <span class="search-title">订单ID：</span>
          <el-input v-model="searchData.orderId" size="mini" style="width: 100px" />
        </el-col>
        <el-col :span="8">
          <span class="search-title">第三方订单编号：</span>
          <el-input v-model="searchData.thirdOrderNo" size="mini" style="width: 100px" />
        </el-col>
        <el-col :span="4">
          <el-button size="mini" class="btn-theme" @click="searchExpress()">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <span class="form-required">获取单号前，务必核对下单号、收发货信息与下单地址是否一致</span>

    <table v-for="item in rows" class="table" cellspacing="0" style="margin:10px auto;">
      <tr>
        <th colspan="2">
          <el-checkbox style="padding: 10px;" />订单ID：{{ item.orderId }}
        </th>
        <th colspan="4">
          第三方订单编号：
          <el-input v-model="item.thirdOrderNo" size="mini" style="width:200px;padding:10px;" placeholder="请输入内容" />
        </th>
        <th colspan="2">
          <img src="" alt="">
          店铺：{{ item.storeName }}
        </th>

      </tr>
      <tr>
        <td />
        <td>
          姓名：
        </td>
        <td>  电话：
        </td>
        <td>   省：
        </td>
        <td>  市：
        </td>
        <td>    区/县：
        </td>
        <td>   街道：
        </td>
        <td rowspan="4">
          买手ID：{{ item.nickname }}
          <span v-if="expressNum !== null" v-text="expressNum" />
          <el-button type="primary" style="margin:10px;" size="mini" @click="toGetCourierOrderNo(item)">获取快递单号</el-button><br>
          <el-button type="primary" size="mini" @click="toUpdateCourier(item)">修改快递信息</el-button>
        </td>
      </tr>
      <tr>
        <td>
          收件人
        </td>
        <td>

          <el-input v-model="item.addresseeName" size="mini" placeholder="" /></td>
        <td>
          <el-tooltip class="item" effect="dark" :content="item.addresseePhone" placement="top">
            <el-input v-model="item.addresseePhone" size="mini" placeholder="" />
          </el-tooltip>
        </td>
        <td>
          <el-input v-model="item.addresseeProvince" size="mini" placeholder="" /></td>
        <td>
          <el-input v-model="item.addresseeCity" size="mini" placeholder="" /></td>
        <td>
          <el-tooltip class="item" effect="dark" :content="item.addresseeArea" placement="top">
            <el-input v-model="item.addresseeArea" size="mini" placeholder="" />
          </el-tooltip>
        </td>
        <td>
          <el-tooltip class="item" effect="dark" :content="item.addresseeAddress" placement="top">
            <el-input v-model="item.addresseeAddress" size="mini" placeholder="" />
          </el-tooltip>
        </td>

      </tr>
      <tr>
        <td>
          寄件人
        </td>
        <td>

          <el-input v-model="item.senderName" size="mini" placeholder="" /></td>
        <td>
          <el-tooltip class="item" effect="dark" :content="item.senderPhone" placement="top">
            <el-input v-model="item.senderPhone" size="mini" placeholder="" />
          </el-tooltip>
        </td>
        <td>
          <el-input v-model="item.senderProvince" size="mini" placeholder="" /></td>
        <td>
          <el-input v-model="item.senderCity" size="mini" placeholder="" /></td>
        <td>
          <el-tooltip class="item" effect="dark" :content="item.senderArea" placement="top">
            <el-input v-model="item.senderArea" size="mini" placeholder="" />
          </el-tooltip>
        </td>
        <td>
          <el-tooltip class="item" effect="dark" :content="item.senderAddress" placement="top">
            <el-input v-model="item.senderAddress" size="mini" placeholder="" />
          </el-tooltip>
        </td>

      </tr>
      <tr>
        <td>
          商品
        </td>
        <td colspan="2">
          商品名称：
          <el-input v-model="item.goodsName" size="mini" style="width:100px;display:inline-block;" placeholder="请输入内容" />&nbsp;&nbsp;
        </td>
        <td colspan="2">
          商品重量：
          <el-input v-model="item.weight" size="mini" style="width:80px;display:inline-block;" placeholder="请输入内容" />&nbsp;kg &nbsp;
        </td>
        <td colspan="2">
          所选快递：
          <el-select
            v-model="item.courierCompanyName"
            size="mini"
            style="width:80px;display:inline-block;"
            @focus="toSelectYwCourierCompanyList(item.storeTypeId)"
          >
            <el-option
              v-for="items in kdList"
              :key="items.id"
              :label="items.name"
              :value="items.id"
              @blur="blurValue(items.id)"
            />
          </el-select>
        </td>
      </tr>
    </table>

    <div class="pagination">
      <span class="total">共{{ pagetotal }}页</span>
      <a class="prev" @click="handleChangePage(false)">上一页</a>
      <span class="cur">{{ pageNum }}&nbsp;/&nbsp;{{ pagetotal?pagetotal:1 }}</span>
      <a class="next" @click="handleChangePage(true)">下一页</a>
      <el-input v-model="pageIn" class="ipt" type="text" />
      <button class="btn" @click="handlePageIn">跳转</button>
    </div>
  </div>
</template>

<script>
import { taskFindList, getStoreList, updateCourier, selectYwCourierList, getCourierOrderNo, selectYwCourierCompanyList } from '@/api/shop'

export default {
  name: 'Express',
  components: {
  },
  data() {
    return {
      queryList: {
        advancePaymentType: null,
        commentType: null,
        endTime: null,
        startTime: null,
        id: null,
        status: null,
        storeId: null
      },
      expressNum: null,
      rows: {
        acceptTime: '',
        addresseeAddress: '',
        addresseeArea: '',
        addresseeCity: '',
        addresseeName: '',
        addresseePhone: '',
        addresseeProvince: '',
        courierCompanyId: null,
        courierCompanyName: '',
        goodsName: '',
        id: 1,
        nickname: '',
        senderAddress: '',
        senderArea: '',
        senderCity: '',
        senderName: '',
        senderPhone: '',
        senderProvince: '',
        storeId: 0,
        storeName: '',
        taskId: 1,
        orderId: null,
        thirdOrderNo: '',
        weight: 0
      },
      kdList: [],
      searchData: {
        acceptTime: '',
        courierState: null,
        storeName: '',
        taskId: '',
        orderId: null,
        thirdOrderNo: ''
      },
      pageNum: 1,
      pageSize: 10,
      taskType: 0,
      reactive: 0,
      list: [],
      timeRange: [],
      pagetotal: 1,
      pageIn: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      taskFindList(this.queryList).then(response => {
        this.list = response.data.rows
        console.log('页码shuju ', this.list)
      })
      var data = { pageNum: this.pageNum, pageSize: this.pageSize }
      selectYwCourierList(data).then(response => {
        if (response.code === 0) {
          this.rows = response.data.rows
          console.log('页码', this.rows)
          this.pagetotal = Math.ceil(response.data.rows / this.pageSize)
        }
      })
    },
    // 快递公司信息
    toSelectYwCourierCompanyList(data) {
      var dataexp = {
        storeTypeId: data
      }
      selectYwCourierCompanyList(dataexp).then(response => {
        this.kdList = response.data
        // this.$message({
        //   message: '快递类型获取完成！',
        //   type: 'success'
        // })
      })
    },
    // 快递显示
    blurValue(data) {
      this.courierCompanyId = data
    },
    // 搜索
    searchExpress() {
      const searchButtom = {
        beginAcceptTime: this.searchData.acceptTime[0],
        endAcceptTime: this.searchData.acceptTime[1] + 1,
        courierState: this.searchData.courierState,
        storeName: this.searchData.storeName,
        taskId: this.searchData.taskId,
        orderId: this.searchData.orderId,
        thirdOrderNo: this.searchData.thirdOrderNo,
        pageNum: this.pageNum,
        pageSize: this.pageSize
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
    // 快递单号
    toGetCourierOrderNo(item) {
      getCourierOrderNo(item).then(response => {
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
    // 分页
    handleChangePage(type) {
      if (type) {
        if (this.pageNum < this.pagetotal) {
          this.pageNum++
          this.init()
        }
      } else {
        if (this.pageNum > 1) {
          this.pageNum--
          this.init()
        }
      }
    },
    // 跳转
    handlePageIn() {
      if (this.pageIn <= this.pagetotal && this.pageIn > 0) {
        this.pageNum = this.pageIn
        this.init()
      }
    },
    handleMenuChange(val) {
      this.activeName = val
    },
    timeChange(val) {
      if (val === null) {
        this.queryList.startTime = null
        this.queryList.endTime = null
      }
    },
    handleExpand(active, index) {
      if (active === index) {
        this.active = ''
      } else {
        this.active = index
      }
    }
  }
}
</script>

<style scoped>
    .search-title{color:#97A8BE;font-size: 14px}
    .activity-list{font-size: 12px;}
    .activity-list .top{padding: 0 6px;height: 30px;display: flex;align-items: center;justify-content: space-between;background-color: #BCBCBC;color: white;}
    .activity-list .box{padding: 0 24px;height: 80px;display: flex;align-items: center;background-color: #BCBCBC;background-color: #f2f2f2}
    .activity-list .con{flex: 1;display: flex;align-items: center;}
    .activity-list .fav{width: 20px;height: 20px;border-radius: 4px;}
    .activity-list .img{width: 60px;height: 60px;}
    .activity-list .d1{width: 60px;text-align: center;}
    .activity-list .d1.flex1{margin-left: 24px;text-align: left;}
    .activity-list .p1{margin-bottom: 12px;color: #BCBCBC;}
    .activity-list .blink{color: #6666FF;text-decoration: underline;cursor: pointer;}
    .activity-list .icon-expanding{width: 12px;height: 12px;cursor: pointer;}
    .activity-list .box{display: none;}
    .activity-list .item.cur .box{display: flex;}
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

    .form-required{
      color: red;
      font-size: 18px;
    }

    .table td {
    border: 1px solid #6666FF;
    padding: 5px;
  }
</style>
