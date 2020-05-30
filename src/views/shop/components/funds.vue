<template>
  <div>
    <div class="account-page">
      <div class="search-flex" style="margin-bottom: 20px">
        <div class="account-total">本金： <span class="spm8" style="color: red">{{ balance?balance:0 }}</span>元</div>
        <div class="account-total">佣金： <span class="spm8" style="color: #97A8BE">{{ brokerageBalance?brokerageBalance:0 }}</span>元</div>
        <div class="account-total">冻结资金： <span class="spm8" style="color: #97A8BE">{{ freezeBalance?freezeBalance:0 }}</span>元</div>
        <div style="position: absolute;right: 44px"><el-button class="btn-theme" size="mini" @click="dialogFormVisibleTrue">佣金充值</el-button></div>
      </div>

      <div class="search-flex" style="margin-bottom: 20px">
        <div class="item">
          <span class="lb">账户类型：</span>
          <el-select v-model="queryList.flag" style="width: 90px" size="mini">
            <el-option
              v-for="item in flagList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="item">
          <span class="lb">收支：</span>
          <el-select v-model="queryList.type" style="width: 90px" size="mini">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="item">
          <span class="lb">时间：</span>
          <el-date-picker
            v-model="timeRange"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 200px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </div>
        <el-button size="mini" class="btn-theme" @click="search">搜索</el-button>
        <el-button size="mini" class="btn-theme" @click="exportExcel">导出</el-button>
      </div>
      <table class="table">
        <tr>
          <th>时间</th>
          <th>收支</th>
          <th>账户类型</th>
          <th>金额</th>
          <th>账户余额</th>
          <th>备注</th>
        </tr>
        <tr v-for="item in list">
          <td>{{ item.createTime }}</td>
          <td><span :class="{'up':item.moneyType===1,'down':item.moneyType===2}">{{ item.moneyType===1?'收':'支' }}</span></td>
          <td><span :class="{'up':item.moneyFlag===1,'down':item.moneyFlag===2}">{{ item.moneyFlag===1?'本金':(item.moneyFlag===2?'佣金':'冻结本金') }}</span></td>
          <td><span :class="{'up':item.moneyType===1,'down':item.moneyType===2}">{{ item.moneyDesc }}</span></td>
          <td>{{ item.balance }}</td>
          <td><span class="remark">{{ item.remarks }}</span></td>
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

    <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="400px">
      <div slot="title">
        佣金充值
      </div>
      <div style="margin: 15px 0">
        1金币=1元
      </div>
      <el-form ref="form" :model="form" :rules="formRules">
        <el-form-item prop="money">
          <span slot="label" style="color:#97A8BE;">
            充值金币
          </span>
          <el-input v-model="form.money" autocomplete="off" style="width: 200px">
            <template slot="append">金</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        备注说明：
      </div>
      <div style="color:#97A8BE;">
        <p>输入充入金币数量，自动从本金扣除相应金额得到对应金币（提前保持本金有足够余额），佣金一旦充值不予退还。</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commission">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { addCommission, selectYwCapitalRecordList, exportYwCapitalRecordList } from '@/api/shop'

export default {
  name: 'Funds',
  data() {
    var valiNumberPass1 = (rule, value, callback) => { // 包含小数的数字
      const reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g
      // const res = /^\d+(\.\d{2})?$/g
      if (value === '') {
        callback(new Error('请输入内容'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      flagList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '本金'
      }, {
        value: 2,
        label: '佣金'
      }],
      typeList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '收'
      }, {
        value: 2,
        label: '支'
      }],
      dialogFormVisible: false,
      queryList: {
        endTime: null,
        startTime: null,
        flag: 0,
        type: 0,
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      total: 1,
      pageIn: null,
      timeRange: [],
      form: {
        money: ''
      },
      formRules: {
        money: [
          { required: true, message: '请输入充值金币', trigger: 'blur' },
          { validator: valiNumberPass1, message: '请输入数字', trigger: 'blur' }
        ]
      },
      balance: 0,
      brokerageBalance: 0,
      freezeBalance: 0,
      moneyTypedata: '',
      moneyflagdata: ''
    }
  },
  // watch: {
  //   balance: function(value, oldvalue) {
  //     console.log(value)
  //     console.log(oldvalue)
  //   }
  // },
  created() {
    this.init()
    this.balance = this.$store.getters.balance
    this.brokerageBalance = this.$store.getters.brokerageBalance
    this.freezeBalance = this.$store.getters.freezeBalance
    console.log('sol', this.balance, this.brokerageBalance, this.freezeBalance)
  },
  methods: {
    dialogFormVisibleTrue() {
      this.dialogFormVisible = true
      this.form.money = ''
    },
    init() {
      selectYwCapitalRecordList(this.queryList).then(response => {
        this.list = response.data.rows
        console.log('list', this.list)
        this.total = Math.ceil(response.data.total / this.queryList.pageSize)
      })
    },
    timeChange(val) {
      if (val === null) {
        this.queryList.startTime = null
        this.queryList.endTime = null
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
      } else if (this.pageIn > this.total) {
        this.queryList.pageNum = 1
        this.init()
      }
    },
    // 搜索
    search() {
      const listData = {
        flag: this.queryList.flag,
        type: this.queryList.type,
        pageNum: this.queryList.pageNum,
        pageSize: this.queryList.pageSize,
        startTime: this.timeRange[0],
        endTime: this.timeRange[1]
      }
      console.log('搜索数据', listData)
      selectYwCapitalRecordList(listData).then(response => {
        this.list = response.data.rows
        // this.init()
        console.log('显示数据', this.list)
        this.total = Math.ceil(response.data.total / this.queryList.pageSize)
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
        const tHeader = ['序号', '时间', '收支', '账户类型', '金额', '账户余额', '备注']
        const filterVal = ['index', 'createTime', 'moneyType', 'moneyflag', 'moneyDesc', 'balance', 'remarks']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
      })
    },
    // 导出
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 充值
    commission() {
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      // this.form = this.form.money.map(Number)
      this.form.money = Number(this.form.money)
      const res = /^\d+(\.\d{2})?$/g
      if (!res.test(this.form.money)) {
        this.$message({
          message: '请输入最多包含两位小数的正确金额',
          type: 'error'
        })
      } else {
        if (this.balance >= this.form.money) {
          console.log('form', this.form)
          addCommission(this.form).then(response => {
            if (response.code === 0) {
              this.$message({
                message: '充值成功',
                type: 'success'
              })
              setTimeout(function() {
                window.location.reload()
              }, 700)
            } else {
              this.$message({
                // message: response.msg,
                message: response.msg,
                type: 'warning'
              })
              setTimeout(function() {
                window.location.reload()
              }, 700)
            }
            this.dialogFormVisible = false
            // this.init()
            this.balance = this.$store.getters.balance
            this.brokerageBalance = this.$store.getters.brokerageBalance
            this.freezeBalance = this.$store.getters.freezeBalance
            console.log('失败还是要拿取数据', this.balance, this.brokerageBalance, this.freezeBalance)
          })
        } else {
          this.$router.push({ path: 'recharge' })
          this.$message({
            // message: response.msg,
            message: '您的本金不足，请充值',
            type: 'warning'
          })
        }
      }

      //   } else {
      //     console.log('error submit!!')
      //   }
      // })
    }
  }
}
</script>

<style scoped>
    .account-total{margin-bottom: 12px;color: #6666FF;margin-right: 30px}
    .search-flex{display: flex}
    .search-flex .item{margin-right: 15px}
    .lb{color: #97A8BE}
</style>
