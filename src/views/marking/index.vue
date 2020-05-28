<template>
  <div class="app-container">
    <div class="marking-menu">
      <el-tabs v-model="activeName" type="card" @tab-click="">
        <el-tab-pane label="商品打标" name="commodity" />
        <el-tab-pane label="竞品打标" name="competition" />
        <el-tab-pane label="超级标签" name="super" />
        <el-tab-pane label="打标记录" name="record" />
      </el-tabs>
    </div>
    <div class="marking-content">
      <commodity v-if="activeName==='commodity'" />
      <competition v-if="activeName==='competition'" />
      <super v-if="activeName==='super'" />

    </div>
    <record v-if="activeName==='record'" />

  </div>
</template>

<script>
import Commodity from './components/commodity'
import Competition from './components/competition'
import Super from './components/super'
import Record from './components/record'
export default {
  name: 'Index',
  components: {
    Commodity,
    Competition,
    Super,
    Record
  },
  data() {
    return {
      activeName: 'commodity'
    }
  }
}
</script>

<style scoped>
    .marking-menu{
        margin-left:30%;
        width: 389px;
    }
    .marking-content{
        margin-left:30%;
    }
    .marking-menu >>> .is-active{
        color:rgb(102,102,255) !important ;
    }
    .marking-menu >>> .el-tabs__item:hover{
        color:rgb(102,102,255) !important ;
    }
</style>
