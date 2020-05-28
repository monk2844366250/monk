<template>
  <div class="blacklist-page">
    <div class="search">
      <div class="item">
        <span class="lb">用户ID:</span>
        <input v-model="queryList.userId" class="ipt" type="text">
      </div>
      <button class="btn btn-add" @click="openAddDialog">+添加黑名单</button>
      <button class="btn" @click="searchList">搜索</button>
      <button class="btn" @click="handleRemoveYwBlack()">批量取消</button>
    </div>
    <table class="table">
      <tr>
        <th>
          <div class="checkbox">
            <input v-model="checked" class="chk-ipt" type="checkbox" @click="checkedAll">
            <span class="chk-out">
              <span class="chk-in" />
            </span>全选
          </div>
        </th>
        <th>用户ID</th>
        <th>拉黑时间</th>
        <th>拉黑原因</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item,index) in list" :key="index">
        <td>
          <div class="checkbox">
            <input v-model="checkall" class="chk-ipt checkItem" type="checkbox" :value="item.id">
            <span class="chk-out">
              <span class="chk-in" />
            </span>{{ item.id }}
          </div>
        </td>
        <td>{{ item.userId }}</td>
        <td>{{ item.createTime }}</td>
        <td>
          <el-select v-model="item.reason" size="mini" disabled>
            <el-option
              v-for="items in reasonList"
              :key="items.value"
              :label="items.label"
              :value="items.value"
            />
          </el-select>
        </td>
        <td>
          <span class="opp" @click="openDelDialog(item.id)">取消</span>
        </td>
      </tr>
    </table>
    <div class="pagination">
      <span class="total">共{{ pagetotal }}页</span>
      <a class="prev" @click="handleChangePage(false)">上一页</a>
      <span class="cur">{{ queryList.pageNum }}&nbsp;/&nbsp;{{ pagetotal?pagetotal:1 }}</span>
      <a class="next" @click="handleChangePage(true)">下一页</a>
      <input v-model="pageIn" class="ipt" type="text">
      <button class="btn" @click="handlePageIn">跳转</button>
    </div>
    <!-- <div v-show="addToggle" class="dialog blackAdd-dialog">
      <div class="dialog-wrap md">
        <div class="dialog-title">发起申诉</div>
        <div class="dialog-close" @click="closeAddDialog" />
        <el-form ref="form" :model="addToggleForm" style="padding: 0 20px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label-width="80px">
                <div slot="label" style="color: #97A8BE;text-align: left">订单编号:</div>
                <el-input v-model="addToggleForm.userId" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label-width="80px">
                <div slot="label" style="color: #97A8BE">申诉原因:</div>
                <el-select v-model="addToggleForm.reason" size="mini">
                  <el-option
                    v-for="item in type2List"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>

        <div class="dialog-bot">
          <button class="btn" @click="addToggle=false">取消</button>
          <button class="btn" @click="handleAddYwBlack">提交</button>
        </div>
      </div>
    </div> -->

    <el-dialog
      title="添加黑名单"
      :visible.sync="addToggle"
      width="30%"
      center
    >
      <div style="margin:10px 0;">
        <span>用户ID:</span>&nbsp;&nbsp;&nbsp;&nbsp;&ensp;
        <el-input v-model="userData" size="mini" style="width:100px;" />
      </div>
      <div>
        <span>拉黑原因:</span>&ensp;
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
        <el-button @click="addToggle = false">取 消</el-button>
        <el-button type="primary" @click="addToggleSure">确 定</el-button>
      </span>
    </el-dialog>

    <div v-show="delToggle" class="dialog blackDelete-dialog">
      <div class="dialog-wrap">
        <div class="dialog-title">删除黑名单</div>
        <div class="dialog-close" @click="closeDelDialog" />
        <div class="dialog-center">确定删除黑名单？</div>
        <div class="dialog-bot">
          <button class="btn" @click="delToggle=false">取消</button>
          <button class="btn" @click="handleRemoveYwBlack(delIndex)">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { blackList, AddBlack, removeYwBlack, addYwBusinessBlackList } from '@/api/shop2'
export default {
  name: 'Blacklist',
  data() {
    return {
      userData: null,
      reason: null,
      pageIn: null,
      addToggle: false,
      delToggle: false,
      centerDialogVisibleTure: false,
      delIndex: null,
      queryList: {
        userId: null,
        pageNum: 1,
        pageSize: 10
      },
      addToggleForm: {
        userId: '',
        reason: ''
      },
      checkall: [],
      checked: false,
      pagetotal: 1,
      timeRange: [],
      list: [],
      reasonList: [{
        value: 1,
        label: '淘宝客'
      }, {
        value: 2,
        label: '评价问题'
      }, {
        value: 3,
        label: '京挑客'
      }, {
        value: 4,
        label: '农村淘宝'
      }, {
        value: 5,
        label: '号不安全'
      }, {
        value: 6,
        label: '乱写评价'
      }, {
        value: 7,
        label: '恶意退款'
      }, {
        value: 8,
        label: '其他'
      }],
      type2List: [{
        value: 1,
        label: '资金问题'
      }, {
        value: 2,
        label: '任务问题'
      }, {
        value: 3,
        label: '操作问题'
      }]
    }
  },
  watch: {
    checkall: {
      handler: function(val, oldVal) {
        if (val.length === this.list.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      blackList(this.queryList).then(response => {
        console.log('原始数据', response)
        this.list = response.data.rows
        this.pagetotal = Math.ceil(
          response.data.total / this.queryList.pageSize
        )
      })
    },
    searchList() {
      const searchButtom = {
        userId: this.queryList.userId,
        pageNum: this.queryList.pageNum,
        pageSize: this.queryList.pageSize

      }
      blackList(searchButtom).then(response => {
        console.log(response)
        this.list = response.data.rows
        this.pagetotal = Math.ceil(
          response.data.total / this.queryList.pageSize
        )
      })
    },
    // 确认黑名单
    addToggleSure() {
      console.log('哇哇哇哇')
      var blackData = {
        reason: this.reason,
        userId: this.userData
      }
      console.log('asd', blackData)
      AddBlack(blackData).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '成功',
            type: 'success'
          })
        }
      })
      this.addToggle = false
      this.init()
      this.reason = ''
      this.userData = ''
    },
    handleAddYwBlack() {
      AddBlack(this.addToggleForm).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.addToggle = false
          this.init()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    checkedAll() {
      console.log(this.checked)
      var checkObj = document.querySelectorAll('.checkItem') // 获取所有checkbox项
      if (!this.checked) {
        // 判定全选checkbox的勾选状态
        for (var i = 0; i < checkObj.length; i++) {
          if (!checkObj[i].checked) {
            // 将未勾选的checkbox选项push到绑定数组中
            this.checkall.push(checkObj[i].value)
          }
        }
      } else {
        // 如果是去掉全选则清空checkbox选项绑定数组
        this.checkall = []
      }
    },
    // 翻页
    handleChangePage(type) {
      if (type) {
        if (this.queryList.pageNum < this.pagetotal ) {
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
      if (this.pageIn <= this.pagetotal  && this.pageIn > 0) {
        this.queryList.pageNum = this.pageIn
        this.init()
      } else if (this.pageIn > this.pagetotal) {
        this.queryList.pageNum = 1
        this.init()
      }
    },

    handleRemoveYwBlack(id = false) {
      var ids
      if (id) {
        ids = id
      } else {
        ids = this.checkall.join(',')
      }

      removeYwBlack({ ids: ids }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.init()
          this.delToggle = false
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    openAddDialog() {
      this.addToggle = true
    },
    closeAddDialog() {
      this.addToggle = false
    },
    openDelDialog(index) {
      this.delToggle = true
      this.delIndex = index
    },
    closeDelDialog() {
      this.delToggle = false
    }
  }
}
</script>
<style >
</style>
