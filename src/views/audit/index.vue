<template>
  <div class="audit">
    <div class="search">
      <el-input v-model="searchQuery" placeholder="输入旺旺号查询" style="width: 339px" size="mini">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
      <el-button slot="append" v-re-click class="btn-theme search-button" size="mini" @click="onSeach">搜索</el-button>
      <div style="margin-top: 10px">今日可用免费查号次数：{{ usedCount }}/{{ searchCount }}</div>
    </div>
    <div class="audit-menu">
      <div
        :class="['menu-button',{'menu-button-active':activeName==='result'}]"
        @click="handleMenuChange('result')"
      >查询结果</div>
      <div
        :class="['menu-button',{'menu-button-active':activeName==='list'}]"
        @click="handleMenuChange('list')"
      >查询记录</div>
    </div>

    <result v-show="activeName === 'result'" ref="result" :search-key="searchQuery" @resultBack="resultBack" />
    <list v-show="activeName === 'list'" ref="list" />
  </div>
</template>

<script>
import Result from './components/result'
import List from './components/list'
import { getSearchCount, getAuditkFindList } from '@/api/auditk'

export default {
  name: 'Audit',
  components: {
    Result,
    List
  },
  data() {
    return {
      searchQuery: '',
      activeName: 'result',
      usedCount: '',
      searchCount: ''
    }
  },
  created() {
    this.getCount()
  },
  methods: {
    handleMenuChange(val) {
      this.activeName = val
      if (val === 'list') {
        this.$refs.list.getList()
      }
    },
    getCount() {
      var data = { type: 4 }
      getSearchCount(data).then(response => {
        if (response.code === 0) {
          this.usedCount = response.data.count
          this.searchCount = response.data.allCount
        } else {
          this.$message({
            message: response.msg,
            type: 'warning',
            showClose: true,
            duration: 2000
          })
        }
      })
      getAuditkFindList(this.searchQuery).then(response => {
        console.log('getAuditkFindList', data)
        console.log(this.searchQuery)
      })
    },
    onSeach() {
      if (this.searchQuery === '') {
        this.$message({
          message: '请输入旺旺号',
          type: 'warning',
          showClose: true,
          duration: 2000
        })
        return
      }
      // if (this.usedCount >= this.searchCount) {
      //   this.$message({
      //     message: "查询次数已用完！",
      //     type: "error",
      //     showClose: true,
      //     duration: 2000
      //   });
      //   return;
      // }
      this.activeName = 'result'
      this.$refs.result.getResult()
    },
    resultBack() {
      this.getCount()
    }
  }
}
</script>

<style scoped>
.search {
  position: relative;
  width: 400px;
  margin: auto;
  margin-bottom: 80px;
}

.search >>> .el-input__inner {
  border-color: rgb(102, 102, 255) !important;
  border-radius: 45px !important;
  padding-right: 56px !important;
}

.search .search-button {
  border-radius: 0 45px 45px 0;
  position: absolute;
  right: 61px;
}
.audit-menu {
  display: flex;
  margin: 0 100px;
}
.menu-button {
  margin: auto;
  width: 350px;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.menu-button-active {
  color: red;
  border-bottom: 3px solid rgb(102, 102, 255);
}
</style>
