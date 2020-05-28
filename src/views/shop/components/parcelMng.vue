<template>
  <div>
    <div class="agent-page">
      <div class="search">
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
        <div class="item">
          <span class="lb">代发状态：</span>
          <el-select v-model="queryList.status" placeholder="代发状态" size="small">
            <el-option
              v-for="item in statusList"
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
            style="width: 200px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </div>
        <button class="btn" @click="search">搜索</button>
        <button class="btn" @click="exportExcel">导出</button>
      </div>
      <table class="table">
        <tr>
          <!--<th>-->
          <!--<div class="checkbox">-->
          <!--<input class="chk-ipt" type="checkbox" />-->
          <!--<span class="chk-out">-->
          <!--<span class="chk-in"></span>-->
          <!--</span>-->
          <!--</div>-->
          <!--</th>-->
          <th>代发ID</th>
          <th>代发类型</th>
          <th>所选礼品</th>
          <th>快递类型</th>
          <th>代发状态</th>
          <th>数量</th>
          <th>付款金额</th>
          <th>创建时间</th>
          <th>审核备注</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in list">
          <!--<td>-->
          <!--<div class="checkbox">-->
          <!--<input class="chk-ipt" type="checkbox" :value="item.id" />-->
          <!--<span class="chk-out">-->
          <!--<span class="chk-in"></span>-->
          <!--</span>-->
          <!--</div>-->
          <!--</td>-->
          <td>{{ item.id }}</td>
          <td>{{ item.type===1?'礼品代发':'空包代发' }}</td>
          <td>
            <el-image
              v-if="item.type===1"
              style="width: 20px; height: 20px"
              :src="item.giftImg"
              :preview-src-list="[item.giftImg]"
            />
            <span v-if="item.type===2">无</span>
          </td>
          <td>{{ item.courierCompanyName }}</td>
          <td>{{ item.status===1?'待审核':((item.status===2)?'已通过':((item.status===3)?'未通过':'已发货')) }}</td>
          <td>{{ item.num }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.createTime }}</td>
          <td>{{ item.remark }}</td>
          <td>
            <el-button type="text" @click="dowExcel(item.id)">下载表格</el-button>
          </td>
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
    <div v-show="previewToggle" class="preview" style="display: flex;">
      <div class="previewWrap">
        <img class="previewImg" src="@/assets/images/goodsImg.jpg">
        <span class="previewClose" @click="closePreview" />
      </div>
    </div>
  </div>
</template>

<script>
import { selectYwGiftOrderlList, exportYwGiftOrderlList, downYwGiftOrderDetaillList } from '@/api/shop'
import { downloadFile } from '@/utils'
export default {
  name: 'ParcelMng',
  data() {
    return {
      previewToggle: false,
      statusList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '待审核'
      }, {
        value: 2,
        label: '已通过'
      }, {
        value: 3,
        label: '未通过'
      }, {
        value: 4,
        label: '已发货'
      }],
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
      queryList: {
        endTime: null,
        startTime: null,
        pageNum: 1,
        pageSize: 10,
        status: 0,
        type: 0
      },
      timeRange: [],
      list: [],
      total: 1,
      pageIn: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      selectYwGiftOrderlList(this.queryList).then(response => {      
        this.list = response.data.rows
        this.total = Math.ceil(response.data.total / this.queryList.pageSize)
        console.log('数据列表', this.list)
      })
    },
    search() {
      const searchButtom = {
        type: this.queryList.type,
        status: this.queryList.status,
        startTime: this.timeRange[0],
        endTime: this.timeRange[1] + 1,
        pageNum: this.queryList.pageNum,
        pageSize: this.queryList.pageSize
      }
      selectYwGiftOrderlList(searchButtom).then(response => {      
        this.list = response.data.rows
        this.total = Math.ceil(response.data.total / this.queryList.pageSize)
        console.log('数据列表', this.list)
      })
    },
    openPreview() {
      this.previewToggle = true
    },
    closePreview() {
      this.previewToggle = false
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
    dowExcel(id) {
      const data = {
        gId: id,
        type: id,
        pageNum: this.queryList.pageNum,
        pageSize: this.queryList.pageSize,
        startTime: id,
        startTime1: id,
        endTime: id,
        endTime1: id,
        status: id
      }
      downYwGiftOrderDetaillList(data).then(response => {
        if (response.code === 0) {
          console.log('下载表格数据', response)
          // downloadFile(response, 'daifa_dingdan')
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
    // 导出
    exportExcel() {
      // excel数据导出
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('../../../vendor/Export2Excel')
        const tHeader = ['序号', '代发ID', '代发类型', '所选礼品', '快递类型', '待发状态', '数量', '付款金额', '创建时间', '审核备注']
        const filterVal = ['index', 'id', 'type', 'giftImg', 'courierCompanyName', 'status', 'num', 'amount', 'createTime', 'remark']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // exportExcel() {
    //   var data = Object.assign({}, this.queryList)
    //   delete data.pageNum
    //   delete data.pageSize
    //   exportYwGiftOrderlList(this.queryList).then(response => {
    //     if (response.code === 0) {
    //       downloadFile(response, 'daifa_dingdan')
    //     } else {
    //       this.$message({
    //         message: response.msg,
    //         type: 'warning',
    //         showClose: true,
    //         duration: 2000
    //       })
    //     }
    //   })
    // },
    handlePageIn() {
      if (this.pageIn <= this.total && this.pageIn > 0) {
        this.queryList.pageNum = this.pageIn
        this.init()
      }
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
  margin-top: 12px;
}
.downBtn {
  margin-top: 12px;
  background-color: transparent;
  color: #ff0000;
  border: 1px solid #ff0000;
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
  border: 1px solid #6666ff;
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
  background-color: #6666ff;
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
