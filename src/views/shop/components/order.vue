<template>
  <div class="order">
    <div class="search-list" style="margin-bottom: 10px">

      <div>
        <span class="search-title">任务ID：</span>
        <el-input v-model="query.taskId" size="mini" style="width: 80px;margin-right: 8px" />

        <span class="search-title">订单ID：</span>
        <el-input v-model="query.id" size="mini" style="width: 80px;margin-right: 8px" />

        <span class="search-title">接单账户：</span>
        <el-input v-model="query.accountNum" size="mini" style="width: 80px;margin-right: 8px" />

        <span class="search-title">任务类型：</span>
        <el-select v-model="query.taskType" placeholder="请选择" size="mini" style="width: 80px;margin-right: 8px">
          <el-option
            v-for="item in taskTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <span class="search-title">订单状态：</span>
        <el-select v-model="query.status" placeholder="请选择" size="mini" style="width: 80px">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-row style="margin-top: 20px;margin-bottom: 10px">
        <el-col :span="6">
          <span class="search-title">店铺名称：</span>
          <el-input v-model="query.storeName" size="mini" style="width: 120px;" />
        </el-col>
        <el-col :span="7">
          <span class="search-title">订单编号：</span>
          <el-input v-model="query.thirdOrderNo" size="mini" style="width: 130px;" />
        </el-col>
        <el-col :span="8">
          <span class="search-title">付款时间：</span>
          <el-date-picker
            v-model="timeRange"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 180px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </el-col>
        <el-col :span="3">
          <el-button size="mini" class="btn-theme" @click="searchdatas">搜索</el-button>

        </el-col>
      </el-row>
      <el-button size="mini" class="btn-theme" @click="dataExport">导出</el-button>
      <el-button size="mini" type="success" @click="handleAllYes">批量确认</el-button>
      <el-button size="mini" type="danger" @click="restSearch">撤销</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      class="table-new"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="40"
      />
      <el-table-column label="任务ID" width="60">
        <template slot-scope="{row}">
          <span>{{ row.taskId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" width="65">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" width="85">
        <template slot-scope="{row}">
          <span>{{ row.storeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" width="71">
        <template slot-scope="{row}">
          <span slot="reference" @click="rowUserId(row.userId)">{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接单账户" width="90">
        <template slot-scope="{row}">

          <span>{{ row.accountNum }}</span>

        </template>
      </el-table-column>
      <el-table-column label="关键词" width="100">
        <template slot-scope="{row}">
          <span>{{ row.keyword }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="71">
        <template slot-scope="{row}">
          <span>{{ stateReturn(row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家支付" width="71">
        <template slot-scope="{row}">
          <span>{{ row.principalAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户实付" width="71">
        <template slot-scope="{row}">
          <span>{{ row.userPayAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="返款金额" width="71">
        <template slot-scope="{row}">
          <span>{{ row.refundsAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接单时间" width="90">
        <template slot-scope="{row}">
          <span>{{ row.acceptTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款时间" width="90">
        <template slot-scope="{row}">
          <span>{{ row.operationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="195" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" :disabled="(row.status === 4 || row.status === 6)? false : true" @click="handleYes(row.id)">确认</el-button>
          <el-button type="text" :disabled="(row.status !== 1 && row.status !== 2)? false : true" @click="handleDetail(row)">详情</el-button>
          <el-button type="text" :disabled="(row.status === 4) ? false : true" @click="handleDialog(2,row.id)">改价</el-button>
          <el-button type="text" @click="handleHr(row.id)">换人</el-button>
        </template>

      </el-table-column>
    </el-table>
    <div class="pagination">
      <span class="total">共{{ pagetotal }}页</span>
      <a class="prev" @click="handleChangePage(false)">上一页</a>
      <span class="cur">{{ query.pageNum }}&nbsp;/&nbsp;{{ pagetotal?pagetotal:1 }}</span>
      <a class="next" @click="handleChangePage(true)">下一页</a>
      <el-input v-model="pageIn" class="ipt" type="text" />
      <button class="btn" @click="handlePageIn">跳转</button>
    </div>

    <el-dialog :title="title[titleIndex]" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form">
        <!--<el-form-item v-if="titleIndex===0">-->
        <!--<span>请选择换人理由：</span>-->
        <!--<el-select v-model="value2" placeholder="请选择" size="mini" style="width: 150px">-->
        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item v-if="titleIndex===1">-->
        <!--<span>请选择拉黑原因：</span>-->
        <!--<el-select v-model="value2" placeholder="请选择" size="mini" style="width: 150px">-->
        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->

        <el-form-item v-if="titleIndex===2">
          <span>请输入正确的返款金额：</span>
          <el-input v-model="form.refundsAmount" size="mini" style="width: 150px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="mini" style="color: #6666FF" @click="dialogFormVisible = false">取消退出</el-button>
        <el-button class="btn-theme" size="mini" @click="handleChangePrice">确认提交</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="titleUserId"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div>
        <span>*拉黑原因:</span>
        <el-select v-model="reason" size="mini">
          <el-option
            label="淘宝客"
            value="1"
          />
          <el-option
            label="评价问题"
            value="2"
          />
          <el-option
            label="京挑客"
            value="3"
          />
          <el-option
            label="农村淘宝"
            value="4"
          />
          <el-option
            label="号不安全"
            value="5"
          />
          <el-option
            label="乱写评价"
            value="6"
          />
          <el-option
            label="恶意退款"
            value="7"
          />
          <el-option
            label="其他"
            value="8"
          />
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisibleTure">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>

import { orderList, orderConfirmOrder, orderSubstitution, orderUpdateRefundsAmount, getDetail } from '@/api/shop'
import { AddBlack } from '@/api/shop2'
export default {
  name: 'Order',
  data() {
    return {
      query: {
        endTime: null,
        startTime: null,
        status: null,
        id: null,
        storeName: null,
        taskId: null,
        taskType: null,
        thirdOrderNo: null,
        accountNum: null,
        pageNum: 1,
        pageSize: 10
      },
      timeRange: [],
      title: ['换人', '拉黑用户', '改价'],
      titleIndex: 0,
      statusList: [{
        value: 1,
        label: '待发布'
      }, {
        value: 2,
        label: '待接单 '
      }, {
        value: 3,
        label: '待操作 '
      }, {
        value: 4,
        label: '待返款'
      }, {
        value: 5,
        label: '待评价 '
      }, {
        value: 6,
        label: '待确认'
      }, {
        value: 7,
        label: '已完成'
      }, {
        value: 8,
        label: '已撤销'
      }],
      taskTypeList: [{
        value: 1,
        label: '浏览'
      }, {
        value: 2,
        label: '垫付'
      }],
      AddBlackDatas: null,
      reason: null,
      labelValue: [], // 批量确认
      multipleSelection: [], // 批量确认
      titleUserId: '',
      dialogFormVisible: false,
      centerDialogVisible: false,
      visible: false,
      form: {
        refundsAmount: null,
        id: null
      },
      tableData: [],
      pagetotal: 1,
      pageIn: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    timeChange(val) {
      if (val === null) {
        this.query.startTime = null
        this.query.endTime = null
      }
    },
    init() {
      var goodsdatas = {}
      goodsdatas = this.$route.query
      if (goodsdatas.type === '任务管理') {
        console.log('体哦啊转完毕，数据携带完毕u', goodsdatas.data.status)
        console.log('体哦啊转完毕，数据携带完毕u', goodsdatas.data)
        var statusData = null
        if (goodsdatas.data.waitReleaseNum > 0) {
          statusData = 1
        } else if (goodsdatas.data.waitAcceptNum > 0) {
          statusData = 2
        } else if (goodsdatas.data.waitOperationNumb > 0) {
          statusData = 3
        } else if (goodsdatas.data.waitRefundsNum > 0) {
          statusData = 4
        } else if (goodsdatas.data.waitCommentNum > 0) {
          statusData = 5
        } else if (goodsdatas.data.waitConfirmNum > 0) {
          statusData = 6
        } else if (goodsdatas.data.alreadyCompleteNum > 0) {
          statusData = 7
        } else if (goodsdatas.data.alreadyRevokeNum > 0) {
          statusData = 8
        }
        console.log('体哦啊转完毕', statusData)
        this.query = {
          taskId: goodsdatas.data.id,
          status: statusData,
          pageNum: this.query.pageNum,
          pageSize: this.query.pageSize
        }
        orderList(this.query).then(response => {
          this.tableData = response.data.rows
          this.pagetotal = Math.ceil(response.data.total / this.query.pageSize)
        })
      } else {
        orderList(this.query).then(response => {
          this.tableData = response.data.rows
          this.pagetotal = Math.ceil(response.data.total / this.query.pageSize)
        })
      }
    },
    // 用戶ID點擊觸發事件
    rowUserId(id) {
      this.centerDialogVisible = true
      this.titleUserId = '确认将' + id + '添加到黑名单吗？'
      this.AddBlackDatas = id
    },
    // 點擊關閉
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 分页
    handleChangePage(type) {
      if (type) {
        if (this.query.pageNum < this.pagetotal) {
          this.query.pageNum++
          this.init()
        }
      } else {
        if (this.query.pageNum > 1) {
          this.query.pageNum--
          this.init()
        }
      }
    },
    // 跳转
    handlePageIn() {
      if (this.pageIn <= this.pagetotal && this.pageIn > 0) {
        this.query.pageNum = this.pageIn
        this.init()
      }
    },
    stateReturn(status) {
      var data
      this.statusList.map(item => {
        if (item.value === status) {
          data = item.label
        }
      })
      return data
    },
    restSearch() {
      this.query = {
        endTime: null,
        startTime: null,
        status: null,
        id: null,
        storeId: null,
        taskId: null,
        taskType: null,
        thirdOrderNo: null
      }
      this.timeRange = []
    },
    // 拉黑
    centerDialogVisibleTure() {
      console.log('ture', this.reason)
      var blackData = {
        reason: this.reason,
        userId: this.AddBlackDatas
      }
      AddBlack(blackData).then(response => {
        console.log('asdas', response)
      })
      this.centerDialogVisible = true
    },
    // 搜索
    searchdatas() {
      const listData = {
        taskId: this.query.taskId,
        id: this.query.id,
        accountNum: this.query.accountNum,
        taskType: this.query.taskType,
        status: this.query.status,
        storeName: this.query.storeName,
        thirdOrderNo: this.query.thirdOrderNo,
        startTime: this.timeRange[0],
        endTime: this.timeRange[1]
      }
      orderList(listData).then(response => {
        this.tableData = response.data.rows
        this.pagetotal = Math.ceil(response.data.total / this.query.pageSize)
      })
    },
    // 导出
    dataExport() {
      if (this.tableData.length === 0) {
        this.$message({
          message: '请勾选导出数据',
          type: 'error'
        })
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
          '店铺名称',
          '用户ID',
          '接单账户',
          '关键词',
          '订单状态',
          '商家支付',
          '用户实付',
          '返款金额',
          '接单时间',
          '付款时间']
        const filterVal = [
          'index',
          'taskId',
          'id',
          'storeName',
          'userId',
          'accountNum',
          'keyword',
          'principalAmount',
          'userPayAmount',
          'refundsAmount',
          'acceptTime',
          'operationTime']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 确认
    handleYes(id) {
      orderConfirmOrder({ id: id }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '返款完成！',
            type: 'success'
          })
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
      this.init()
    },
    // 批量确认
    handleAllYes() {
      console.log(' 啊实打实大', this.labelValue)
      var data = this.labelValue
      orderConfirmOrder({ id: data }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '返款完成！',
            type: 'success'
          })
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.labelValue = []
      for (var i = 0; i < val.length; i++) {
        this.labelValue.push(val[i].id)
      }
    },
    handleHr(id) {
      orderSubstitution({ id: id }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '换人成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    handleChangePrice() {
      orderUpdateRefundsAmount(this.form).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '改价成功！',
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    handleDialog(val, id) {
      this.titleIndex = val
      this.form.id = id
      this.dialogFormVisible = true
    },
    // 详情
    handleDetail(row) {
      this.$emit('detail', '1')
      // 订单状态 1-待发布 2-待接单 3-待操作 4-待返款 5-待评价 6-待确认 7-已完成 8-已撤销
      if ((row.status !== 1) && (row.status !== 2)) {
        var data = { id: row.id }
        getDetail(data).then(response => {
          if (response.code === 0) {
            console.log('页面数据', response.data)
            const param = {
              data: response.data
            }
            this.$router.push({ path: '/admin/shop/orderDetail/' + row.id, query: param })
            this.dialogFormVisible = false
          } else {
            this.$message({
              message: response.msg,
              type: 'warning'
            })
          }
        })
      }
    }

  }
}
</script>

<style scoped>
    .search-title{color:#97A8BE;font-size: 14px}
    .table-new{font-size: 12px !important;}
    .table-new >>>th{color: white;background-color: #6666FF;padding: 5px 1px;text-align: center;white-space: nowrap;}
    .table-new >>>td{color: #97A8BE;text-align: center;padding: 0}
    .order>>>.el-dialog__body{padding: 0 30px}
</style>
