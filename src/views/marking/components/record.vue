<template>
  <div>
    <el-form ref="form" :model="listQuery" label-width="70px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="商品ID">
            <el-input v-model="listQuery.goodsId" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关键词">
            <el-input v-model="listQuery.keyWord" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">

          <el-form-item label="旺旺号">
            <el-input v-model="listQuery.wwNum" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="打标状态">
            <el-select v-model="listQuery.status" placeholder="请选择" size="small">
              <el-option
                v-for="{value,title} in status"
                :key="value"
                :label="title"
                :value="value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="提交时间">
            <el-date-picker
              v-model="timeRange"
              size="small"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="padding-top: 4px;"
              @change="timeChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" class="btn-theme" style="margin-top: 4px;" @click="search">
            搜索
          </el-button>

        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" class="btn-theme" style="margin-top: 4px;" @click="restSearch">
            重置
          </el-button>

        </el-col>

      </el-row>

    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      />
      <el-table-column
        label="打标类型"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.type===1?'商品打标':'竞品打标' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="keyWord"
        align="center"
        label="搜索关键词"
      />
      <el-table-column
        prop="goodsId"
        align="center"
        label="商品ID"
      />
      <el-table-column
        prop="wwNum"
        align="center"
        label="旺旺号"
      />
      <el-table-column
        label="打标状态"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.status===1?'待打标':row.status===2?'成功':'失败' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remarks"
        align="center"
        label="状态备注"
      />
      <el-table-column
        prop="createTime"
        align="center"
        label="提交时间"
        width="95"
      />
      <el-table-column
        prop="timingTime"
        align="center"
        label="定时时间"
        width="95"
      />
      <el-table-column
        prop="maekingTime"
        align="center"
        label="打标时间"
        width="95"
      />
    </el-table>
    <div style="text-align: center">
      <el-pagination
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        layout="total, prev, pager, next"
        :total="total"
        @size-change="search"
        @current-change="search"
      />
    </div>
  </div>
</template>

<script>
import { selectYwMarkingCompeList } from '@/api/marking'

export default {
  name: 'Record',
  data() {
    return {
      listQuery: {
        goodsId: null,
        keyWord: null,
        startTime: null,
        endTime: null,
        wwNum: null,
        status: 0,
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      listLoading: false,
      total: 0,
      timeRange: [],
      status: [
        {
          value: 0,
          title: '全部'
        }, {
          value: 1,
          title: '待打标'
        }, {
          value: 2,
          title: '成功'
        }, {
          value: 3,
          title: '失败'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    timeChange(val) {
      if (val === null) {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
    },
    restSearch() {
      this.listQuery = {
        goodsId: null,
        keyWord: null,
        startTime: null,
        endTime: null,
        wwNum: null,
        status: 0,
        pageNum: 1,
        pageSize: 10
      }
      this.timeRange = []
    },
    init() {
      this.listLoading = true
      selectYwMarkingCompeList(this.listQuery).then(response => {
        if (response.code === 0) {
          this.list = response.data.rows
          this.total = response.data.total
          this.listLoading = false
        } else {
          this.$message({
            message: response.msg,
            type: 'warning',
            showClose: true,
            duration: 2000
          })
          this.listLoading = false
        }
      })
    },
    search() {
      if (this.timeRange && this.timeRange.length === 2) {
        this.listQuery.startTime = this.timeRange[0]
        this.listQuery.endTime = this.timeRange[1]
      }
      this.init()
    }
  }
}
</script>

<style scoped>

</style>
