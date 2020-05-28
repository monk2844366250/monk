<template>
  <div>
    <div class="table-style">
      <div class="table-title bl1 bt1 bb1 br1">查询账旺旺号</div>
      <div class="table-title bt1 bb1 br1">查询时间</div>
      <div v-for="(item,index) in dataList" :key="index" style="display: flex;flex-wrap: wrap;width: 100%">
        <div class="table-content bl1 bb1 br1">{{item.wwNum}}</div>
        <div class="table-content bb1 br1">{{item.queryTime}}</div>
      </div>
      <div style="text-align: center;width: 100%;margin-top: 30px">
        <el-pagination
          :hide-on-single-page="true"
          @current-change="handleCurrentChange"
          :current-page.sync="pageCur"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuditkList } from "@/api/auditk";
export default {
  name: "list",
  data() {
    return {
      pageCur: 1,
      pageSize: 10,
      total: 40,
      dataList:[],
    };
  },
  methods: {
    getList() {
      var data = {
        pageNum: this.pageCur,
        pageSize: this.pageSize
      };
      getAuditkList(data).then(response => {

        if (response.code === 0) {
            this.dataList=response.data.rows;
            this.total=response.data.total;
        } else {
          this.$message({
            message: response.msg,
            type: "warning",
            showClose: true,
            duration: 2000
          });
        }
      });
    },
    handleCurrentChange() {
      this.getList()
    }
  }
};
</script>

<style scoped>
.table-style {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
}
.table-title {
  width: 50%;
  height: 40px;
  padding: 10px 0;
  text-align: center;
  /* background-color: rgb(242, 242, 242); */
  background-color: #6666FF;
  color:white;
}

.table-content {
  width: 50%;
  height: 40px;
  text-align: center;
  padding: 10px 0;
  position: relative;
}
.br1 {
  border-right: 1px solid rgb(188, 188, 188);
}
.bl1 {
  border-left: 1px solid rgb(188, 188, 188);
}
.bt1 {
  border-top: 1px solid rgb(188, 188, 188);
}
.bb1 {
  border-bottom: 1px solid rgb(188, 188, 188);
}
</style>
