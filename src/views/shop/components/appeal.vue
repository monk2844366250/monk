<template>
  <div>
    <div class="appeal-page">
      <div class="search">
        <div class="item">
          <span class="lb">申诉原因：</span>
          <el-select v-model="queryList.type" style="width: 90px" size="mini">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="item">
          <span class="lb">申诉状态：</span>
          <el-select v-model="queryList.status" style="width: 90px" size="mini">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="item">
          <span class="lb">订单编号：</span>
          <input v-model="queryList.orderId" class="ipt" type="text">
        </div>
        <button class="btn btn-add" @click="openAddDialog">发起申诉</button>
      </div>
      <div class="search">
        <div class="item">
          <span class="lb">时间：</span>
          <el-date-picker
            v-model="timeRange"
            value-format="yyyy-MM-dd"
            size="mini"
            style="width: 300px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </div>
        <button class="btn" @click="searchData">搜索</button>
        <button class="btn" @click="handleEndYwAppeal()">批量完结</button>
        <button class="btn" @click="handleRemoveYwAppeal()">批量删除</button>
      </div>
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
          <th>申诉时间</th>
          <th>申诉原因</th>
          <th>订单编号</th>
          <th>申诉状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in list">
          <td>
            <div class="checkbox">
              <input v-model="checkall" class="chk-ipt checkItem" type="checkbox" value="0">
              <span class="chk-out">
                <span class="chk-in" />
              </span>{{ item.index }}
            </div>
          </td>
          <td v-text="item.createTime" />
          <!-- 申诉原因 0-全部 1-资金问题 2-任务问题 3-操作问题 -->
          <td v-text="(item.complaintType === 0) ? '全部' : ((item.complaintType === 1) ? '资金问题' : ((item.complaintType === 2) ? '任务问题' : '操作问题'))" />
          <td v-text="item.orderId" />
          <!-- 申诉状态 0-全部 1-处理中 2-已回复 3-已完结 4-平台介入 -->
          <td v-text="(item.status === 0) ? '全部': ((item.status === 1) ? '处理中' : ((item.status === 2) ? '已回复' : ((item.status === 3) ? '已完结' : '平台介入')))" />
          <td>
            <span class="opp" @click="openDetailDialog(item)">详情</span>
            <span class="opp" @click="openEndDialog">完结</span>
            <span class="opp" @click="closeDelDialog">删除</span>
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
    </div>
    <div v-show="addToggle" class="dialog appealAdd-dialog">
      <div class="dialog-wrap md">
        <div class="dialog-title">发起申诉</div>
        <div class="dialog-close" @click="closeAddDialog" />
        <el-form ref="form" :model="addToggleForm" style="padding: 0 20px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label-width="80px">
                <div slot="label" style="color: #97A8BE;text-align: left">
                  订单编号:
                </div>
                <el-input v-model="addToggleForm.orderId" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="80px">
                <div slot="label" style="color: #97A8BE">
                  申诉原因:
                </div>
                <el-select v-model="addToggleForm.type" size="mini">
                  <el-option
                    v-for="item in type2List"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div slot="label" style="color: #97A8BE">
                  申诉说明
                </div>
                <el-input
                  v-model="addToggleForm.content"
                  style="width: 100%"
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="最多200字"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <div slot="label" style="color: #97A8BE;">
              添加图片证据
              <span style="color: #BCBCBC;font-size: 12px;margin-left: 10px">(最多两张照片，大小在3M以内)</span>
            </div>
            <div style="height: 100px;width: 100%;display: flex;">
              <el-upload
                action
                :http-request="uploadImage1"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
              >
                <img v-if="addToggleForm.img1" :src="addToggleForm.img1" class="avatar" style="height: 100px;width: 100px">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <i class="el-icon-circle-close avatar-uploader-remove" @click="removeAddImg1()" />
              <el-upload
                style="margin-left: 30px"
                action
                :http-request="uploadImage2"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
              >
                <img v-if="addToggleForm.img2" :src="addToggleForm.img2" class="avatar" style="height: 100px;width: 100px">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <i class="el-icon-circle-close avatar-uploader-remove" @click="removeAddImg2()" />
            </div>

          </el-form-item>

        </el-form>

        <div class="dialog-bot">
          <button class="btn" @click="addToggle=false">取消</button>
          <button class="btn" @click="handleAddYwAppeal">提交</button>
        </div>
      </div>
    </div>
    <div v-show="detailToggle" class="dialog appealDetail-dialog">
      <div class="dialog-wrap md">
        <div class="dialog-title">申诉详情</div>
        <div class="dialog-close" @click="closeDetailDialog" />
        <div class="appealDetail">
          <div class="flexCSB">
            <div class="flex1">订单ID：{{ appeal.orderId }}</div>
            <div class="flex1">用户ID：{{ appeal.userId }}</div>申诉原因：
            <div class="flex1" v-text="(appeal.complaintType === 0) ? '全部' : ((appeal.complaintType === 1) ? '资金问题' : ((appeal.complaintType === 2) ? '任务问题' : '操作问题'))" />
          </div>
          <div class="appealDetail-wrap">
            <ul class="appealDetail-list">
              <li class="item">
                <div class="time">{{ appeal.createTime }}</div>
                <div class="con">
                  <span class="label">申诉描述：</span>
                  <div class="flex1">
                    <div class="p">{{ appeal.content }}</div>
                    <img v-if="appeal.imgUrl1" :src="appeal.imgUrl1" alt class="img">
                    <img v-if="appeal.imgUrl2" :src="appeal.imgUrl2" alt class="img">
                  </div>
                </div>
              </li>
              <li v-for="items in appealReplyList" class="item">
                <div class="time">{{ items.createTime }}</div>
                <div class="con">
                  <span class="label" v-text="(items.userType === 1) ? '商家' : ((items.userType === 2) ? '用户' : '平台')" />:
                  <div class="flex1">
                    <div class="p">{{ items.content }}</div>
                    <img v-if="items.imgUrl" :src="items.imgUrl" alt class="img">
                    <!-- <img :src="items.img1" alt class="img"> -->
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tareaWrap">
            <textarea v-model="recallData" class="tarea" />
            <img v-if="addToggleForm.img1" :src="addToggleForm.img1" class="avatar" style="height: 100px;width: 100px">
          </div>
          <div class="botBtn" style="display:flex;justify-content:space-around;">
            <!-- business/addYwAppealReply -->
            <button class="btn" @click="recall">回复</button>
            <div>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :http-request="uploadImagerecall"
                :show-file-list="false"
              >
                <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :http-request="uploadImagerecall"
                multiple
                :auto-upload="false"
                :file-list="fileList"
                :limit="2"
                list-type="picture"
              > -->
                <button class="btn">添加图片</button>
              </el-upload>
            </div>
            <button class="btn" @click="recallman">申请客服介入</button>
            <button class="btn" @click="openEndDialog">完结申诉</button>
          </div>
        </div>
      </div>
    </div>

    <div v-show="endToggle" class="dialog appealEnd-dialog">
      <div class="dialog-wrap">
        <div class="dialog-title">完结申诉</div>
        <div class="dialog-close" @click="closeEndDialog" />
        <div class="dialog-center">确定完结任务申诉？？？</div>
        <div class="dialog-bot">
          <button class="btn" @click="closeEndDialog">取消</button>
          <button class="btn" @click="openendYwAppeal(appeal.orderId)">提交</button>
        </div>
      </div>
    </div>
    <div v-show="delToggle" class="dialog appealDelete-dialog">
      <div class="dialog-wrap">
        <div class="dialog-title">删除申诉</div>
        <div class="dialog-close" @click="closeDelDialog" />
        <div class="dialog-center">确定删除活动申诉？？？</div>
        <div class="dialog-bot">
          <button class="btn">取消</button>
          <button class="btn" @click="openDelDialog(appeal.orderId)">提交</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { selectYwAppealList, addYwAppeal, getYwAppeal, endYwAppeal, removeYwAppeal, addYwAppealReply } from '@/api/shop'
import { uploadImage } from '@/utils'
import { getCustomer } from '@/api/home'
export default {
  name: 'Appeal',
  data() {
    return {
      recallData: '', // 回复数据
      recallImg: [], // 回复图片
      addToggle: false,
      detailToggle: false,
      endToggle: false,
      delToggle: false,
      statusList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '处理中'
      }, {
        value: 2,
        label: '已回复'
      }, {
        value: 3,
        label: '已完结'
      }, {
        value: 4,
        label: '平台介入'
      }],
      typeList: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '资金问题'
      }, {
        value: 2,
        label: '任务问题'
      }, {
        value: 3,
        label: '操作问题'
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
      }],
      queryList: {
        endTime: null,
        startTime: null,
        orderId: null,
        pageNum: 1,
        pageSize: 10,
        status: 0,
        type: 0
      },
      addToggleForm: {
        content: '',
        img1: null,
        img2: null,
        orderId: '',
        type: ''
      },
      fileList: [],
      checkall: [],
      checked: false,
      pagetotal: 1,
      timeRange: [],
      list: [],
      pageIn: null,
      endTime: null, // 详情
      startTime: null,
      orderId: null,
      userId: null,
      pageNum: 1,
      pageSize: 10,
      status: 0,
      type: 0,
      itemList: {},
      appealReplyList: [
        { aIdData: null, // 回复
          content: '',
          img: '',
          img1: '',
          createTime: '' }
      ],
      appeal: {
        orderId: '',
        userId: '',
        createTime: '',
        content: '',
        imgUrl1: '',
        imgUrl2: ''
      }

    }
  },
  watch: {
    'checkall': {
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
      selectYwAppealList(this.queryList).then(response => {
        this.list = response.data.rows
        // console.log('数据源', this.list)
        this.pagetotal = Math.ceil(response.data.total / this.queryList.pageSize)
      })
    },
    // 发起申诉
    openAddDialog() {
      this.addToggle = true
    },
    // 申诉页面的确定
    handleAddYwAppeal() {
      addYwAppeal(this.addToggleForm).then(response => {
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
    // 结束申诉页面
    closeAddDialog() {
      this.addToggle = false
    },
    // 搜索
    searchData() {
      const searchButtom = {
        type: this.queryList.type,
        status: this.queryList.status,
        orderId: this.queryList.orderId,
        startTime: this.timeRange[0],
        endTime: this.timeRange[1] + 1,
        pageNum: this.queryList.pageNum,
        pageSize: this.queryList.pageSize
      }
      selectYwAppealList(searchButtom).then(response => {
        if (response.code === 0) {
          console.log('数据', response.data)
          this.list = response.data.rows
          this.$message({
            message: '获取完成！',
            type: 'success'
          })
        }
      })
    },
    // 批量完结
    handleEndYwAppeal(id) {
      console.log('批量完结', this.checkall)
      var ids = []
      if (id) {
        ids = id
      } else {
        ids = this.checkall.join(',')
      }
      console.log('批量完结', ids)
      endYwAppeal({ ids: ids }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.init()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    // 批量删除
    handleRemoveYwAppeal(id) {
      console.log('批量删除', this.checkall)
      var ids
      if (id) {
        ids = id
      } else {
        ids = this.checkall.join(',')
      }
      console.log('批量删除', ids)
      removeYwAppeal({ ids: ids }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.init()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    // 详情
    openDetailDialog(item) {
      this.itemList = item
      this.detailToggle = true
      this.aIdData = item.id
      var datalist = { aId: item.id }
      getYwAppeal(datalist).then(response => {
        console.log('x详情', response.data)
        if (response.code === 0) {
          this.appealReplyList = response.data.appealReplyList
          this.appeal.orderId = response.data.appeal.orderId
          this.appeal.userId = response.data.appeal.userId
          this.appeal.createTime = response.data.appeal.createTime
          this.appeal.content = response.data.appeal.content
          this.appeal.imgUrl1 = response.data.appeal.imgUrl1
          this.appeal.imgUrl2 = response.data.appeal.imgUrl2
          console.log('asdas', this.appealReplyList)
        }
      })
    },
    // 回复
    recall() {
      console.log('会哦夫', this.recallImg)
      var dataListData = {
        aId: this.aIdData,
        content: this.recallData,
        img: this.recallImg
      }
      addYwAppealReply(dataListData).then(response => {
        if (response.code === 0) {
          console.log('会哦夫', response)
          this.$message({
            message: '成功',
            type: 'success'
          })
          this.openDetailDialog(this.itemList)
        }
      })
      this.recallData = ''
      this.recallImg = null
    },
    // 上传图片
    uploadImagerecall(e) {
      this.recallImg = uploadImage(e)
      var dataListData = {
        aId: this.aIdData,
        content: this.recallData,
        img: this.recallImg
      }
      addYwAppealReply(dataListData).then(response => {
        if (response.code === 0) {
          console.log('会哦夫', response)
          this.$message({
            message: '成功',
            type: 'success'
          })
          this.openDetailDialog(this.itemList)
        }
      })
      this.recallData = ''
      this.recallImg = null
    },
    // 删除图片
    removeAddImg1() {
      this.addToggleForm.img1 = ''
    },
    removeAddImg2() {
      this.addToggleForm.img2 = ''
    },
    // 申请客服
    recallman() {
      getCustomer().then(response => {
        if (response.code === 0) {
          this.$message({
            message: '已经联系客服请稍后',
            type: 'success'
          })
        }
      })
    },
    // 完结调取页面
    openEndDialog() {
      this.endToggle = true
    },
    // 完结调取接口
    openendYwAppeal(id) {
      console.log('xxczxc')
      var datas = { ids: id }
      endYwAppeal(datas).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '完结成功',
            type: 'success'
          })
          this.endToggle = false
          this.detailToggle = false
        } else {
          this.$message({
            message: response.message,
            type: 'error'
          })
          this.init()
          this.endToggle = false
        }
      })
    },
    // 删除调取页面
    closeDelDialog() {
      this.delToggle = true
    },
    // 删除调取接口
    openDelDialog(id) {
      // business/removeYwAppeal
      var data = { ids: id }
      removeYwAppeal(data).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.init()
          this.delToggle = false
        } else {
          this.$message({
            message: response.message,
            type: 'error'
          })
        }
      })
    },
    // 翻页
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
    handlePageIn() {
      if (this.pageIn <= this.total && this.pageIn > 0) {
        this.queryList.pageNum = this.pageIn
        this.init()
      } else if (this.pageIn > this.total) {
        this.queryList.pageNum = 1
        this.init()
      }
    },

    timeChange(val) {
      if (val === null) {
        this.queryList.startTime = null
        this.queryList.endTime = null
      }
    },

    checkedAll() {
      console.log(this.checked)
      var checkObj = document.querySelectorAll('.checkItem') // 获取所有checkbox项
      if (!this.checked) { // 判定全选checkbox的勾选状态
        for (var i = 0; i < checkObj.length; i++) {
          if (!checkObj[i].checked) { // 将未勾选的checkbox选项push到绑定数组中
            this.checkall.push(checkObj[i].value)
          }
        }
      } else { // 如果是去掉全选则清空checkbox选项绑定数组
        this.checkall = []
      }
    },

    beforeAvatarUpload(file) {
      console.log('蹄片数据', file)
      // const isJPG = file.type === "image/jpeg/png";
      const isLt3M = file.size / 1024 / 1024 < 3

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过 3MB!')
      }
      // return isJPG && isLt2M;
      return isLt3M
    },

    closeDetailDialog() {
      this.detailToggle = false
    },
    uploadImage1(e) {
      this.addToggleForm.img1 = uploadImage(e)
    },
    uploadImage2(e) {
      this.addToggleForm.img2 = uploadImage(e)
    },

    closeEndDialog() {
      this.endToggle = false
    }

  }
}
</script>

<style scoped>
.appealAdd-dialog .form-label{min-width: 7em;}
.appealAdd-dialog .form-item .form-input+.form-required{margin-left: 24px;}
.appealDetail{color: #999;}
.appealDetail .flexCSB{padding: 12px 20px;}
.appealDetail-wrap{max-height: 360px;max-height: calc(100vh - 400px);overflow-y: auto;}
.appealDetail-list{padding: 0 20px;}
.appealDetail-list .item{margin-bottom: 24px;}
.appealDetail-list .time{margin-bottom: 6px;}
.appealDetail-list .con{display: flex;}
.appealDetail-list .label{min-width: 80px;}
.appealDetail-list .p{margin-bottom: 10px}
.appealDetail-list .img{width: 80px;height: 80px;}
.appealDetail-list .img+.img{margin-left: 40px}
.appealDetail .tareaWrap{margin: 12px 60px 0 100px;}
.appealDetail .tarea{padding: 12px;width: 100%;height: 64px;border: 1px solid #E4E4E4;resize: none;box-sizing: border-box;border-radius: 6px;}
.appealDetail .botBtn{margin: 20px 60px 20px 100px;}
.appealDetail .botBtn .btn{padding: 0 8px;background-color: transparent;border: 1px solid #6666FF;color: #6666FF;}
.appealDetail .botBtn .btn+.btn{margin-left: 3px;}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

</style>
