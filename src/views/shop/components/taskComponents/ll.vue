<template>
  <div>
    <div class="search-list">
      <el-row :gutter="10">
        <el-col :span="8">
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
        <el-col :span="8">
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

        <el-col :span="8">
          <span class="search-title">任务ID：</span>
          <el-input v-model="queryList.id" size="mini" style="width: 100px" />
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;margin-bottom: 10px">

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
        <el-col :span="7">
          <span class="search-title">时间：</span>
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
        <el-col :span="7">
          <span class="search-title">时间：</span>
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
        <el-col :span="4">
          <el-button size="mini" class="btn-theme">搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="danger" size="mini">批量取消任务</el-button>
          <el-button type="success" size="mini">隐藏已结束的任务</el-button>
        </el-col>
      </el-row>
    </div>
    <br>
    <table class="table">
      <tr>
        <th>
          <div class="checkbox">
            <input v-model="checked" class="chk-ipt " type="checkbox" @click="checkedAll">
            <span class="chk-out">
              <span class="chk-in" />
            </span>全选
          </div>
        </th>
        <th>任务ID</th>
        <th>任务类型</th>
        <th>关键词</th>
        <th>商品ID</th>
        <th>任务状态</th>
        <th>每天量/天数</th>
        <th>发布/完成</th>
        <th>发布时间</th>
        <th>执行时间</th>
        <th>备注</th>
        <th>淘口令</th>
        <th>操作</th>
      </tr>
      <!--<tr>-->
      <!--<td>-->
      <!--<div class="checkbox">-->
      <!--<input class="chk-ipt checkItem" type="checkbox" v-model="checkall" value="0"/>-->
      <!--<span class="chk-out">-->
      <!--<span class="chk-in"></span>-->
      <!--</span>1-->
      <!--</div>-->
      <!--</td>-->
      <!--<td>2018-07-06 11:28:52</td>-->
      <!--<td>操作问题</td>-->
      <!--<td>300000</td>-->
      <!--<td>进行中</td>-->
      <!--<td>-->
      <!--<span class="opp" @click="openDetailDialog">详情</span>-->
      <!--<span class="opp" @click="openEndDialog">完结</span>-->
      <!--<span class="opp" @click="openDelDialog">删除</span>-->
      <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td>-->
      <!--<div class="checkbox">-->
      <!--<input class="chk-ipt checkItem" type="checkbox" v-model="checkall" value="1" />-->
      <!--<span class="chk-out">-->
      <!--<span class="chk-in"></span>-->
      <!--</span>1-->
      <!--</div>-->
      <!--</td>-->
      <!--<td>2018-07-06 11:28:52</td>-->
      <!--<td>操作问题</td>-->
      <!--<td>300000</td>-->
      <!--<td>进行中</td>-->
      <!--<td>-->
      <!--<span class="opp">详情</span>-->
      <!--<span class="opp">完结</span>-->
      <!--<span class="opp">删除</span>-->
      <!--</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td>-->
      <!--<div class="checkbox">-->
      <!--<input class="chk-ipt checkItem" type="checkbox" v-model="checkall" value="2" />-->
      <!--<span class="chk-out">-->
      <!--<span class="chk-in"></span>-->
      <!--</span>1-->
      <!--</div>-->
      <!--</td>-->
      <!--<td>2018-07-06 11:28:52</td>-->
      <!--<td>操作问题</td>-->
      <!--<td>300000</td>-->
      <!--<td>进行中</td>-->
      <!--<td>-->
      <!--<span class="opp">详情</span>-->
      <!--<span class="opp">完结</span>-->
      <!--<span class="opp">删除</span>-->
      <!--</td>-->
      <!--</tr>-->
    </table>
    <div class="pagination">
      <span class="total">共{{ pagetotal }}页</span>
      <a class="prev" href>上一页</a>
      <span class="cur">{{ queryList.pageNum }}&nbsp;/&nbsp;{{ pagetotal }}</span>
      <a class="next" href>下一页</a>
      <input v-model="queryList.pageNum" class="ipt" type="text">
      <button class="btn">跳转</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ll',
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
      pageIn: null

    }
  },
  created() {
    // this.init()
    // this.getS()
  },
  methods: {
    // init() {
    //     if (this.timeRange && this.timeRange.length === 2) {
    //         this.queryList.startTime = this.timeRange[0]
    //         this.queryList.endTime = this.timeRange[1]
    //     }
    //     taskFindList(this.queryList).then(response => {
    //         this.list = response.data.rows
    //         this.pagetotal = Math.ceil(response.data.total / this.queryList.pageSize)
    //     })
    // },
    // handleChangePage(type) {
    //     if (type) {
    //         if (this.queryList.pageNum < this.pagetotal) {
    //             this.queryList.pageNum++
    //             this.init()
    //         }
    //     } else {
    //         if (this.queryList.pageNum > 1) {
    //             this.queryList.pageNum--
    //             this.init()
    //         }
    //     }
    // },
    // handlePageIn() {
    //     if (this.pageIn <= this.pagetotal && this.pageIn > 0) {
    //         this.queryList.pageNum = this.pageIn
    //         this.init()
    //     }
    // },
    // getS() {
    //     getStoreList().then(response => {
    //         response.data.forEach(item => {
    //             this.storeList.push({
    //                 value: item.id,
    //                 label: item.storeName
    //             })
    //         })
    //     })
    // },
    // handleMenuChange(val) {
    //     this.activeName = val
    // },
    // search() {
    //
    //     this.init()
    // },
    timeChange(val) {
      if (val === null) {
        this.queryList.startTime = null
        this.queryList.endTime = null
      }
    }
    // handleExpand(active, index) {
    //     if (active === index) {
    //         this.active = ''
    //     } else {
    //         this.active = index
    //     }
    // },
    // handleDetail(id) {
    //     this.$router.push({path: '/admin/shop/taskDetail/' + id})
    // }
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
