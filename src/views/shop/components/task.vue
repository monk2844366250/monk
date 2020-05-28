<template>
  <div>
    <div class="parcel-menu">
      <div
        :class="['menu-button',{'menu-button-active':activeName==='cg'}]"
        @click="handleMenuChange('cg')"
      >常规任务
      </div>
      <div
        :class="['menu-button',{'menu-button-active':activeName==='ll'}]"
        @click="handleMenuChange('ll')"
      >流量任务
      </div>
    </div>
    <cg v-if="activeName==='cg'" />
    <ll v-if="activeName==='ll'" />
    <!-- <div v-show="reactive===1">
      <tbll
        v-if="taskType === 1 "
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <sjtb
        v-if="taskType === 2 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <sjtbwjt
        v-if="taskType === 3 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <tbtb
        v-if="taskType === 4 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <tbtk
        v-if="taskType === 5 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <tbys
        v-if="taskType === 6 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <tbzp
        v-if="taskType === 7 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <tbcjbq
        v-if="taskType === 8 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <tbdb
        v-if="taskType === 9 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />

      <jdll
        v-if="taskType === 10 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <sjjd
        v-if="taskType === 11 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <jdtb
        v-if="taskType === 12 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <jdys
        v-if="taskType === 13 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <sjpdd
        v-if="taskType === 14||taskType === 15 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />
      <pddll
        v-if="taskType === 16 && store !== null"
        ref="task"
        :store-type="storeType"
        :task-type="taskType"
        :store="store"
        :express-flag="expressFlag"
      />

    </div> -->

  </div>
</template>

<script>
import { taskFindList, getStoreList } from '@/api/shop'
import cg from './taskComponents/cg'
import ll from './taskComponents/ll'

export default {
  name: 'Task',
  components: {
    cg,
    ll
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
      taskType: 0,
      reactive: 0,
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
        value: 1,
        label: '待支付'
      }, {
        value: 2,
        label: '待审核'
      }, {
        value: 3,
        label: '已通过'
      }, {
        value: 4,
        label: '已完成'
      }, {
        value: 4,
        label: '未通过'
      }],
      storeList: [],
      active: 1,
      activeName: 'cg'

    }
  },
  created() {
    this.init()
    this.getS()
  },
  methods: {
    init() {
      taskFindList(this.queryList).then(response => {
        this.list = response.data.rows
      })
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
    search() {
      if (this.timeRange && this.timeRange.length === 2) {
        this.queryList.startTime = this.timeRange[0]
        this.queryList.endTime = this.timeRange[1]
      }
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
</style>
