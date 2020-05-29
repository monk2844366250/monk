<template>
  <div>
    <div class="search-list">
      <el-row :gutter="10">
        <el-col :span="6">
          <span class="search-title">店铺名称：</span>
          <el-select v-model="queryList.storeId" placeholder="请选择" size="mini" style="width: 100px">
            <el-option
              v-for="item in storeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="search-title">任务ID：</span>
          <el-input v-model="queryList.id" size="mini" style="width: 100px" />
        </el-col>
        <el-col :span="6">
          <span class="search-title">任务类型：</span>
          <el-select v-model="queryList.advancePaymentType" placeholder="请选择" size="mini" style="width: 100px">
            <el-option
              v-for="item in advancePaymentTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="search-title">任务状态：</span>
          <el-select v-model="queryList.status" placeholder="请选择" size="mini" style="width: 100px">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>

      </el-row>
      <el-row style="margin-top: 20px;margin-bottom: 10px">
        <el-col :span="6">
          <span class="search-title">评价类型：</span>
          <el-select v-model="queryList.commentType" placeholder="请选择" size="mini" style="width: 100px">
            <el-option
              v-for="item in commentTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <!--<el-col :span="6">-->
        <!--<span class="search-title">订单类型：</span>-->
        <!--<el-select v-model="queryList.storeId" placeholder="请选择" size="mini" style="width: 100px">-->
        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->
        <el-col :span="10">
          <span class="search-title">时间：</span>
          <el-date-picker
            v-model="timeRange"
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
        <el-col :span="5">
          <el-button size="mini" class="btn-theme" @click="searchData()">搜索</el-button>
          <el-button size="mini" class="btn-theme" @click="dataExport">导出</el-button>
        </el-col>
      </el-row>
    </div>

    <ul class="activity-list">
      <li v-for="(item, index) in list" :class="['item',{'cur':active===index}]">
        <div class="top">
          <i
            :class="(active===index) ?'el-icon-minus':'el-icon-plus'"
            style="cursor: pointer;width:13px;"
            @click="handleExpand(active,index)"
          />
          <div style="display: flex;align-items:center;width: 100px">
            <img :src="item.storeTypeImgUrl" class="fav">
            <div>
              {{ item.storeName }}
            </div>
          </div>
          <span style="width: 90px">任务ID：{{ item.id }}</span>
          <span class="sp" style="width: 190px">任务类型：{{ item.taskTypeName }}</span>
          <span class="sp" style="width: 70px">总单数：{{ item.orderNum }}</span>
          <span class="sp blink" @click="statusData(item)">{{ item.status===0?'待支付':item.status===1?'待审核':item.status===2?'已通过':item.status===3?'已完成':'未通过' }}</span>
          <span class="sp blink" @click="handleDetail(item)">详情</span>
          <span class="sp blink" @click="toActivity(item)">重新发布</span>
          <span class="sp blink" @click="delItem(item)">删除</span>
          <span class="sp">{{ item.createTime }}</span>
        </div>
        <div class="box">
          <img :src="item.goodsImgUrl" alt="" class="img">
          <div class="con">
            <div class="d1 flex1">
              <p class="p1">{{ item.goodsName }}</p>
              <p class="p2" style="color: #97A8BE">实际付款：<span class="main-txt"> ¥ {{ item.goodsRealPrice }}</span></p>
            </div>
            <div class="d1" @click="(waitReleaseNumbuttom(item))">
              <p class="p1" style="color:#6666FF ">{{ item.waitReleaseNum }}</p>
              <p class="p2" style="color:#97A8BE ">待放单</p>
            </div>
            <div class="d1" @click="(waitAcceptNumbuttom(item))">
              <p class="p1" style="color:#6666FF ">{{ item.waitAcceptNum }}</p>
              <p class="p2" style="color:#97A8BE ">待接单</p>
            </div>
            <div class="d1" @click="(waitOperationNumbuttom(item))">
              <p class="p1" style="color:#6666FF ">{{ item.waitOperationNum }}</p>
              <p class="p2" style="color:#97A8BE ">待操作</p>
            </div>
            <div class="d1" @click="(waitRefundsNumbuttom(item))">
              <p class="p1" style="color:#6666FF ">{{ item.waitRefundsNum }}</p>
              <p class="p2" style="color:#97A8BE ">待返款</p>
            </div>
            <div class="d1" @click="(waitCommentNumbuttom(item))">
              <p class="p1" style="color:#6666FF ">{{ item.waitCommentNum }}</p>
              <p class="p2" style="color:#97A8BE ">待评价</p>
            </div>
            <div class="d1" @click="(waitConfirmNumbuttom(item))">
              <p class="p1" style="color:#6666FF ">{{ item.waitConfirmNum }}</p>
              <p class="p2" style="color:#97A8BE ">待确认</p>
            </div>
            <div class="d1" @click="(alreadyCompleteNumbuttom(item))">
              <p class="p1" style="color:#6666FF ">{{ item.alreadyCompleteNum }}</p>
              <p class="p2" style="color:#97A8BE ">已完成</p>
            </div>
            <div class="d1" @click="(alreadyRevokeNumbuttom(item))">
              <p class="p1" style="color:#6666FF ">{{ item.alreadyRevokeNum }}</p>
              <p class="p2" style="color:#97A8BE ">已撤销</p>
            </div>
          </div>
        </div>
      </li>

    </ul>

    <div class="pagination">
      <span class="total">共{{ pagetotal }}页</span>
      <a class="prev" @click="handleChangePage(false)">上一页</a>
      <span class="cur">{{ queryList.pageNum }}&nbsp;/&nbsp;{{ pagetotal?pagetotal:1 }}</span>
      <a class="next" @click="handleChangePage(true)">下一页</a>
      <input v-model="pageIn" class="ipt" type="text">
      <button class="btn" @click="handlePageIn">跳转</button>
    </div>
  </div>
</template>

<script>
import { reSetData, taskFindList, getStoreList, deleteData } from '@/api/shop'
// import { export_json_to_excel } from '../../../../vendor/Export2Excel'

export default {
  name: 'Cg',
  data() {
    return {
      queryList: {
        advancePaymentType: null,
        commentType: null,
        endTime: null,
        startTime: null,
        id: null,
        status: null,
        storeId: null,
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      timeRange: [],
      advancePaymentTypeList: [{
        value: 1,
        label: '浏览任务'
      }, {
        value: 2,
        label: '垫付任务'
      }],
      commentTypeList: [{
        value: 1,
        label: '普通好评'
      }, {
        value: 2,
        label: '指定文字好评 '
      }, {
        value: 3,
        label: '指定图片好评 '
      }, {
        value: 4,
        label: '指定视频好评 '
      }],
      statusList: [{
        value: 0,
        label: '待支付'
      }, {
        value: 1,
        label: '待审核'
      }, {
        value: 2,
        label: '已通过'
      }, {
        value: 3,
        label: '已完成'
      }, {
        value: 4,
        label: '未通过'
      }],
      storeList: [],
      active: null,
      pagetotal: 1,
      pageIn: null,
      testData: '',
      pagesize: 99999,
      currentPage: 1
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
  created() {
    this.init()
    this.getS()
  },
  methods: {
    init() {
      if (this.timeRange && this.timeRange.length === 2) {
        this.queryList.startTime = this.timeRange[0]
        this.queryList.endTime = this.timeRange[1]
      }
      taskFindList(this.queryList).then(response => {
        this.list = response.data.rows
        this.pagetotal = Math.ceil(response.data.total / this.queryList.pageSize)
        console.log('zxczxczxc', this.list)
      })
    },
    // 导出
    dataExport() {
      // excel数据导出
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('../../../../vendor/Export2Excel')
        const tHeader = ['序号', '任务类型', '任务ID', '店铺名', '总单数', '审核状态', '时间', '备注']
        const filterVal = ['index', 'taskTypeName', 'id', 'storeName', 'orderNum', 'status', 'createTime', 'remarks']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 详情跳转
    statusData(item) {
      console.log('xiangqing ', item.status)
      if (item.status === 0) {
        console.log('xxx')
        const param = {
          store: item.storeId,
          storeType: item.storeTypeId,
          taskType: item.taskTypeId,
          id: item.id,
          postData: item,
          type: '未支付',
          viewsData: false
        }
        // this.$router.push({ path: 'repay' })
        this.$router.push({ path: 'components/repay', query: param })
      }
    },
    // 搜索
    searchData() {
      console.log('实打实大师')
      const listData = {
        storeId: this.queryList.storeId,
        id: this.queryList.id,
        advancePaymentType: this.queryList.advancePaymentType,
        status: this.queryList.status,
        commentType: this.queryList.commentType,
        startTime: this.timeRange[0],
        endTime: this.timeRange[1]
      }

      taskFindList(listData).then(response => {
        console.log('数据', response.data)
        this.list = response.data.rows
        this.pagetotal = Math.ceil(response.data.total / this.queryList.pageSize)
        console.log('zxczxczxc', this.list)
      })
    },
    // 待放单跳转
    waitReleaseNumbuttom(data) {

      // const param = {
      //   data: data,
      //   type: '任务管理'
      // }
      // this.$router.push({ path: 'order', query: param })
    },
    // 待接单跳转
    waitAcceptNumbuttom(data) {
      if (data.waitAcceptNum > 0) {
        const param = {
          data: data,
          type: '任务管理'
        }
        this.$router.push({ path: 'order', query: param })
      }
    },
    // 待操作跳转
    waitOperationNumbuttom(data) {
      if (data.waitOperationNum > 0) {
        const param = {
          data: data,
          type: '任务管理'
        }
        this.$router.push({ path: 'order', query: param })
      }
    },
    // 待返款跳转
    waitRefundsNumbuttom(data) {
      if (data.waitRefundsNum > 0) {
        const param = {
          data: data,
          type: '任务管理'
        }
        this.$router.push({ path: 'order', query: param })
      }
    },
    // 待评价跳转
    waitCommentNumbuttom(data) {
      if (data.waitCommentNum > 0) {
        const param = {
          data: data,
          type: '任务管理'
        }
        this.$router.push({ path: 'order', query: param })
      }
    },
    // 待确认跳转
    waitConfirmNumbuttom(data) {
      if (data.waitConfirmNum > 0) {
        const param = {
          data: data,
          type: '任务管理'
        }
        this.$router.push({ path: 'order', query: param })
      }
    },
    // 已完成跳转
    alreadyCompleteNumbuttom(data) {
      if (data.alreadyCompleteNum > 0) {
        const param = {
          data: data,
          type: '任务管理'
        }
        this.$router.push({ path: 'order', query: param })
      }
    },
    // 已撤销跳转
    alreadyRevokeNumbuttom(data) {
      if (data.alreadyRevokeNum > 0) {
        const param = {
          data: data,
          type: '任务管理'
        }
        this.$router.push({ path: 'order', query: param })
      }
    },
    handleChangePage(type) {
      if (type) {
        if (this.queryList.pageNum < this.pagetotal) {
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
      if (this.pageIn <= this.pagetotal && this.pageIn > 0) {
        this.queryList.pageNum = this.pageIn
        this.init()
      } else if (this.pageIn > this.pagetotal) {
        this.queryList.pageNum = 1
      }
    },
    getS() {
      getStoreList().then(response => {
        response.data.forEach(item => {
          this.storeList.push({
            value: item.id,
            label: item.storeName
          })
        })
      })
    },
    handleMenuChange(val) {
      this.activeName = val
    },
    delItem(val) {
      var data = { id: val.id }
      deleteData(data).then(response => {
        if (val.status === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.init()
        }
        if (val.status !== 0) {
          this.$message({
            message: '该任务不可删除',
            type: 'warning'
          })
        }
      })
      this.init()
    },
    search() {
      this.init()
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
    },
    toActivity(item) {
      // this.$router.push({ path: '/admin/shop/activity', query: param })@/views/shop/components/reactivity/resjtb
      // var getData = ''
      console.log('item', item)
      reSetData({ id: item.id }).then(response => {
        console.log('京东特别', response.data)
      })
      reSetData({ id: item.id }).then(response => {
        console.log('任务发布', item.taskTypeName)
        if (response.code === 0) {
          this.testData = response.data
          const param = {
            code: '1',
            data: item,
            tast: 'cg',
            id: this.testData.id,
            uppath: '重新发布',
            postData: this.testData
          }
          this.$store.commit('SET_RESETDATA', param)
          if (item.taskTypeName === '淘宝预售任务') {
            this.$router.push({ path: 'components/retbys', query: param })
          } else if (item.taskTypeName === '淘宝浏览任务') {
            this.$router.push({ path: 'components/retbll', query: param })
          } else if (item.taskTypeName === '手机淘宝任务') {
            this.$router.push({ path: 'components/resjtb', query: param })
          } else if (item.taskTypeName === '手机淘宝无截图任务') {
            this.$router.push({ path: 'components/resjtbwjt', query: param })
          } else if (item.taskTypeName === '淘宝特别任务') {
            this.$router.push({ path: 'components/retbtb', query: param })
          } else if (item.taskTypeName === '淘宝退款任务') {
            this.$router.push({ path: 'components/retbtk', query: param })
          } else if (item.taskTypeName === '淘宝追评任务') {
            this.$router.push({ path: 'components/retbzp', query: param })
          } else if (item.taskTypeName === '淘宝超级标签任务') {
            this.$router.push({ path: 'components/retbcjbq', query: param })
          } else if (item.taskTypeName === '淘宝打标任务') {
            this.$router.push({ path: 'components/retbdb', query: param })
          } else if (item.taskTypeName === '京东浏览任务') {
            this.$router.push({ path: 'components/rejdll', query: param })
          } else if (item.taskTypeName === '手机京东任务') {
            this.$router.push({ path: 'components/resjjd', query: param })
          } else if (item.taskTypeName === '京东特别任务') {
            this.$router.push({ path: 'components/rejdtb', query: param })
          } else if (item.taskTypeName === '京东预售任务') {
            this.$router.push({ path: 'components/rejdys', query: param })
          } else if (item.taskTypeName === '手机拼多多任务') {
            this.$router.push({ path: 'components/resjpdd', query: param })
          } else if (item.taskTypeName === '拼多多浏览任务') {
            this.$router.push({ path: 'components/repddll', query: param })
          } else if (item.taskTypeName === '手机阿里巴巴任务') {
            this.$router.push({ path: 'components/resjtb', query: param })
          }
        }
      })
    },
    handleDetail(item) {
      // this.$router.push({ path: '/admin/shop/taskDetail/' + id })
      reSetData({ id: item.id }).then(response => {
        if (response.code === 0) {
          this.testData = response.data
          const param = {
            code: '1',
            data: item,
            tast: 'cg',
            id: this.testData.id,
            uppath: '重新发布',
            postData: this.testData
          }
          this.$store.commit('SET_RESETDATA', param)
          if (item.taskTypeName === '淘宝预售任务') {
            this.$router.push({ path: 'components/tasktbys/', query: param })
          } else if (item.taskTypeName === '淘宝浏览任务') {
            this.$router.push({ path: 'components/tasktbll/', query: param })
          } else if (item.taskTypeName === '手机淘宝任务') {
            this.$router.push({ path: 'components/tasksjtb/', query: param })
          } else if (item.taskTypeName === '手机淘宝无截图任务') {
            this.$router.push({ path: 'components/tasksjtbwjt/', query: param })
          } else if (item.taskTypeName === '淘宝特别任务') {
            this.$router.push({ path: 'components/tasktbtb/', query: param })
          } else if (item.taskTypeName === '淘宝退款任务') {
            this.$router.push({ path: 'components/tasktbtk/', query: param })
          } else if (item.taskTypeName === '淘宝追评任务') {
            this.$router.push({ path: 'components/tasktbzp/', query: param })
          } else if (item.taskTypeName === '淘宝超级标签任务') {
            this.$router.push({ path: 'components/tasktbcjbq/', query: param })
          } else if (item.taskTypeName === '淘宝打标任务') {
            this.$router.push({ path: 'components/tasktbdb/', query: param })
          } else if (item.taskTypeName === '京东浏览任务') {
            this.$router.push({ path: 'components/taskjdll/', query: param })
          } else if (item.taskTypeName === '手机京东任务') {
            this.$router.push({ path: 'components/tasksjjd/', query: param })
          } else if (item.taskTypeName === '京东特别任务') {
            this.$router.push({ path: 'components/taskjdtb/', query: param })
          } else if (item.taskTypeName === '京东预售任务') {
            this.$router.push({ path: 'components/taskjdys/', query: param })
          } else if (item.taskTypeName === '手机拼多多任务') {
            this.$router.push({ path: 'components/tasksjpdd/', query: param })
          } else if (item.taskTypeName === '拼多多浏览任务') {
            this.$router.push({ path: 'components/taskpddll/', query: param })
          } else if (item.taskTypeName === '手机阿里巴巴任务') {
            this.$router.push({ path: 'components/tasksjtb/', query: param })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .search-title {
    color: #97A8BE;
    font-size: 14px
  }

  .activity-list {
    font-size: 12px;
  }

  .activity-list .top {
    padding: 0 6px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #BCBCBC;
    color: white;
  }

  .activity-list .box {
    padding: 0 24px;
    height: 80px;
    display: flex;
    align-items: center;
    background-color: #BCBCBC;
    background-color: #f2f2f2
  }

  .activity-list .con {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .activity-list .fav {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }

  .activity-list .img {
    width: 60px;
    height: 60px;
  }

  .activity-list .d1 {
    width: 60px;
    text-align: center;
  }

  .activity-list .d1.flex1 {
    margin-left: 24px;
    text-align: left;
  }

  .activity-list .p1 {
    margin-bottom: 12px;
    color: #BCBCBC;
  }

  .activity-list .blink {
    color: #6666FF;
    text-decoration: underline;
    cursor: pointer;
  }

  .activity-list .icon-expanding {
    width: 12px;
    height: 12px;
    cursor: pointer;
  }

  .activity-list .box {
    display: none;
  }

  .activity-list .item.cur .box {
    display: flex;
  }

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
</style>

