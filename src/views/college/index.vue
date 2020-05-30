<script src="../../store/modules/user.js"></script>
<template>
  <div class="content-color">
    <div class="search-input">
      <el-input v-model="listQuery.title" placeholder="请输入内容" style="width: 300px" size="small">
        <i slot="prefix" class="el-input__icon el-icon-search" />
        <el-button slot="append" @click="handleSearch">GO</el-button>
      </el-input>
    </div>
    <div class="search-condition">
      <div class="search-radio">
        时段：
        <el-radio-group v-model="listQuery.tTime" fill="#6666FF" @change="handleSearch">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">今天</el-radio-button>
          <el-radio-button :label="2">本周</el-radio-button>
          <el-radio-button :label="3">本月</el-radio-button>
        </el-radio-group>
      </div>

      <div class="search-radio">
        分类：
        <el-radio-group v-model="listQuery.type" fill="#6666FF" @change="handleSearch">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">淘宝</el-radio-button>
          <el-radio-button :label="2">京东</el-radio-button>
          <el-radio-button :label="3">拼多多</el-radio-button>
          <el-radio-button :label="4">阿里巴巴</el-radio-button>
          <el-radio-button :label="5">资讯</el-radio-button>
        </el-radio-group>
      </div>
      <div class="search-radio">
        标签：
        <el-radio-group v-model="listQuery.label" fill="#6666FF" @change="handleSearch">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="4">实战干货</el-radio-button>
          <el-radio-button :label="5">电商早报</el-radio-button>
          <el-radio-button :label="3">最新规则</el-radio-button>
          <el-radio-button :label="2">每日问答</el-radio-button>
          <el-radio-button :label="1">新手必看</el-radio-button>
        </el-radio-group>
      </div>

    </div>
    <div class="search-result">
      <el-tabs v-model="activeName">
        <el-tab-pane label="综合排序" name="first" />
      </el-tabs>
      <el-row v-loading="listLoading" :gutter="20">
        <el-col v-for="item in list" :key="item.id" :span="6" style="margin-top: 15px">
          <el-card>
            <img :src="item.icon" class="image" style="cursor: pointer;" @click="goToDetail(item.id)">
            <div style="padding-top: 15px">
              <span class="ells" style="height: 36px;cursor: pointer;" :title="item.title" @click="goToDetail(item.id)">{{ item.title }}</span>
              <div class="bottom clearfix" style="display: flex;align-items: center;justify-content: flex-start;">
                <time class="time">{{ item.releaseTime }}</time>
                <div style=" flex-grow: 1;display: flex; justify-content: flex-end;align-items: center;">
                  <el-button type="text" style="margin-right: 4px"><svg-icon icon-class="xin" style="color: red;" /></el-button>
                  <span>{{ item.praiseNum }}</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>

      </el-row>
      <div style="text-align: center;margin-top: 20px">
        <el-pagination
          :current-page.sync="listQuery.pageNum"
          :page-size="listQuery.pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

  </div>
</template>

<script>
    import {selectArticleList} from '@/api/collega'
    export default {
        name: "college",
        data(){
            return{
                listQuery:{
                    label:0,
                    tTime:0,
                    type:0,
                    title:null,
                    pageNum:0,
                    pageSize:12,
                },
                total:0,
                listLoading:false,
                list:[],
                activeName:'first',
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.listLoading = true
              selectArticleList(this.listQuery).then(response=>{
                  if (response.code ===0){
                      var {data} = response;
                      this.total = data.total;
                      this.list = data.rows;
                      this.listLoading = false;
                  }else{
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
            handleCurrentChange(){
                this.init()
            },
            handleSizeChange(){
            },
            handleSearch(val){
                this.init()
            },
            goToDetail(id){
                this.$router.push({
                    path: '/admin/college/detail?collegaId='+id
                })
            }
        }
    }
</script>

<style scoped>
    .content-color{
        /* background-color: rgb(242,242,242); */
        padding: 20px 100px;
    }
    .search-input{
        width: 20%;
        margin: 30px auto;
    }
    .search-condition{
        background-color: #ffffff;
        padding: 15px;
    }
    .el-radio-button{
        margin-right: 25px;

    }
    .el-radio-button >>> span{
        border-style:hidden !important;
        border-radius:4px !important;
    }
    .search-radio{
        padding: 5px;
        border-bottom: 1px solid #BCBCBC;;
    }
    .image{
        width: 100%;
        height: 100px;
    }
    .bottom{
        font-size: 12px;
    }
    .search-result >>> .el-tabs__item:hover{
       color: rgb(102,102,255) !important;
    }
    .search-result >>> .is-active{
        color:rgb(102,102,255)!important;
    }
    .search-result >>>  .el-tabs__active-bar{
        background-color:rgb(102,102,255)!important;
    }
</style>
