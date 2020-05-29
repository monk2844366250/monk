<template>
  <div>
    <div class="feedback-page">
      <div class="search" style="margin: 10px 0;">
        <div class="item">
          <span class="lb">时间：</span>
          <el-date-picker
            v-model="timeRange"
            size="mini"
            style="width: 300px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timeChange"
          />
        </div>
        <button class="btn" @click="searchFeedback">搜索</button>
        <button class="btn btn-add" @click="openAddDialog">发起反馈</button>
      </div>
      <table class="table">
        <tr>
          <th>
            <div class="checkbox">
              <input v-model="checked" class="chk-ipt" type="checkbox" @click="checkedAll">
              <span class="chk-out">
                <span class="chk-in" />
              </span>全选
            </div>
          </th>
          <th>反馈时间</th>
          <th>反馈类型</th>
          <th style="width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">问题描述</th>
          <!-- <th>回复</th> -->
          <th>操作</th>
        </tr>
        <tr v-for="item in list">
          <td>
            <div class="checkbox">
              <input v-model="checkall" class="chk-ipt checkItem" type="checkbox" value="0">
              <span class="chk-out">
                <span class="chk-in" />
                {{ item.index }}
              </span>
            </div>
          </td>
          <td>{{ item.createTime }}</td>
          <td>{{ item.type===1?'系统优化':item.type===2?'服务建议':'其他' }}</td>
          <td>{{ item.content }}</td>
          <!-- <td>{{ null }}</td> -->
          <td>
            <span class="opp" @click="handleDetail(item.id)">详情</span>
            <span class="opp" @click="handleRemoveFeedback(item.id)">删除</span>
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
        <div class="dialog-title">意见反馈</div>
        <div class="dialog-close" @click="closeAddDialog" />
        <el-form ref="form" :model="addToggleForm" style="padding: 0 20px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item>
                <div slot="label" style="color: #97A8BE;">反馈类型:</div>
                <el-select v-model="addToggleForm.type" size="mini">
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div slot="label" style="color: #97A8BE">反馈内容:</div>
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
              添加图片:
              <span style="color: #BCBCBC;font-size: 12px;margin-left: 10px">(大小在3M以内)</span>
            </div>
            <div style="height: 100px;width: 100%;display: flex;">
              <el-upload
                action
                :http-request="uploadAddImage1"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
              >
                <img v-if="addToggleForm.img" :src="addToggleForm.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <i class="el-icon-circle-close avatar-uploader-remove" @click="removeAddImg1()" />
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
        <div class="dialog-title">意见反馈</div>
        <div class="dialog-close" @click="closeDetailDialog" />
        <div class="appealDetail">
          <div class="flexCSB">
            <div class="flex1">反馈类型:
              <el-select v-model="detail.type" size="mini">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="appealDetail-wrap">
            <ul class="appealDetail-list">
              <li class="item">
                <div class="time">{{ detail.createTime }}</div>
                <div class="con">
                  <span class="label">反馈类型:</span>
                  <div class="flex1">
                    <div class="p">{{ detail.content }}</div>
                    <img v-if="detail.imgUrl" :src="detail.imgUrl" alt class="img">
                  </div>
                </div>
              </li>
              <li v-for="items in feedbackReplyList" class="item">
                <!-- <div class="time">{{item.createTime}}</div> -->
                <div class="con">
                  <span class="label">{{items.userType === 1 ? '商家' : '平台'}}</span>
                  <div class="flex1">
                    <div class="p">{{ items.content }}</div>
                    <img v-if="items.imgUrl" :src="items.imgUrl" alt class="img">
                    <!-- <img src="@/assets/images/goodsImg.jpg" alt class="img"> -->
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tareaWrap">
            <textarea v-model="backContent" class="tarea" />
          </div>
          <div class="botBtn" style="display:flex;justify-content:space-around;">
            <button class="btn" @click="handleFeedbackReply">回复</button>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :http-request="uploadImagerecall"
              :on-change="handleChange"
              :show-file-list="false"
            >
              <button class="btn">添加图片</button>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  feedbackList,
  addFeedback,
  feedbackDetail,
  feedbackReply,
  removeFeedback
} from '@/api/shop2'

import { uploadImage } from '@/utils'

export default {
  name: 'Appeal',
  data() {
    return {
      addToggle: false,
      itemId: null,
      detailToggle: false,
      endToggle: false,
      delToggle: false,
      recallImg: null,
      pageIn: null,
      typeList: [
        {
          value: 1,
          label: '系统优化'
        },
        {
          value: 2,
          label: '服务建议'
        },
        {
          value: 3,
          label: '其他'
        }
      ],
      feedbackReplyList: [],
      queryList: {
        endTime: null,
        startTime: null,
        pageNum: 1,
        pageSize: 10
      },
      addToggleForm: {
        content: '',
        img: null,
        type: ''
      },
      recallback: [{
        content: '',
        img: null
      }],
      checkall: [],
      checked: false,
      pagetotal: 1,
      timeRange: [],
      list: [],
      removeId: null,
      detail: {},
      backContent: null
    }
  },
  watch: {
    checkall: {
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
      feedbackList(this.queryList).then(response => {
        console.log(response)
        this.list = response.data.rows
        this.pagetotal = Math.ceil(
          response.data.total / this.queryList.pageSize
        )
      })
    },
    // 搜索
    searchFeedback() {
      console.log('asdas')
      const feedbackdata = {
        pageNum: this.queryList.pageNum,
        pageSize: this.queryList.pageSize,
        startTime: this.timeRange[0],
        endTime: this.timeRange[1]
      }
      feedbackList(feedbackdata).then(response => {
        console.log(response)
        this.list = response.data.rows
        this.pagetotal = Math.ceil(
          response.data.total / this.queryList.pageSize
        )
      })
    },
    // 发起反馈
    openAddDialog() {
      this.addToggle = true
    },
    // 反馈确认
    handleAddYwAppeal() {
      addFeedback(this.addToggleForm).then(response => {
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
        this.init()
        this.addToggleForm = {
          content: '',
          img: null,
          type: ''
        }
      })
    },
    // 详情
    handleDetail(id) {
      this.itemId = id
      feedbackDetail({ fId: id }).then(response => {
        console.log('x详情', response)
        if (response.code === 0) {
          this.detail = response.data.feedback
          this.feedbackReplyList = response.data.feedbackReplyList
        }
      })
      this.detailToggle = true
    },
    // 回复
    handleFeedbackReply() {
      feedbackReply({
        fId: this.detail.id,
        content: this.backContent,
        img: this.recallImg
      }).then(response => {
        if (response.code === 0) {
          this.recallback = response.data
          this.$message({
            message: '回复成功',
            type: 'success'
          })
          this.handleDetail(this.itemId)
          this.backContent = ''
          this.recallImg = null
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
        this.backContent = ''
        this.recallImg = null
      })
    },
    // 上传图片
    uploadImagerecall(e) {
      this.recallImg = uploadImage(e)
      // this.$message({
      //   message: '上传成功',
      //   type: 'success'
      // })
      feedbackReply({
        fId: this.detail.id,
        content: this.backContent,
        img: this.recallImg
      }).then(response => {
        if (response.code === 0) {
          this.recallback = response.data
          this.$message({
            message: '回复成功',
            type: 'success'
          })
          this.handleDetail(this.itemId)
          this.backContent = ''
          this.recallImg = null
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
        this.backContent = ''
        this.recallImg = null
      })
    },
    // 删除图片
    removeAddImg1() {
      this.addToggleForm.img = ''
    },
    // 管理图片列表
    handleChange(file, fileList) {
      this.fileList = []
    },
    // 删除
    handleRemoveFeedback(id) {
      removeFeedback({ fId: id }).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.delToggle = false
          this.init()
        } else {
          this.$message({
            message: response.msg,
            type: 'warning'
          })
        }
      })
    },
    // 翻页
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
        this.init()
      }
    },
    timeChange(val) {
      if (val === null) {
        this.queryList.startTime = null
        this.queryList.endTime = null
      }
    },
    uploadAddImage1(e) {
      this.addToggleForm.img = uploadImage(e)
    },
    uploadAddImage2(e) {
      this.addToggleForm.img2 = uploadImage(e)
    },

    checkedAll() {
      console.log(this.checked)
      // if (this.checked) { //实现反选
      //   this.checkall = [];
      // } else { //实现全选
      //   this.checkall = [];
      //   this.checkall.forEach(function(item, index) {
      //     this.checkList.push(item.id);
      //   });
      // }

      var checkObj = document.querySelectorAll('.checkItem') // 获取所有checkbox项
      if (!this.checked) {
        // 判定全选checkbox的勾选状态
        for (var i = 0; i < checkObj.length; i++) {
          if (!checkObj[i].checked) {
            // 将未勾选的checkbox选项push到绑定数组中
            this.checkall.push(checkObj[i].value)
          }
        }
      } else {
        // 如果是去掉全选则清空checkbox选项绑定数组
        this.checkall = []
      }
    },
    handleEndYwAppeal(id = false) {
      var ids
      if (id) {
        ids = id
      } else {
        ids = this.checkall.join(',')
      }
      // endYwAppeal({ ids: ids }).then(response => {
      //   if (response.code === 0) {
      //     this.$message({
      //       message: "提交成功",
      //       type: "success"
      //     });
      //     this.init();
      //   } else {
      //     this.$message({
      //       message: response.msg,
      //       type: "warning"
      //     });
      //   }
      // });
    },
    handleRemoveYwAppeal(id = false) {
      var ids
      if (id) {
        ids = id
      } else {
        ids = this.checkall.join(',')
      }
      removeFeedback({ ids: ids }).then(response => {
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
    beforeAvatarUpload(file) {
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

    closeAddDialog() {
      this.addToggle = false
    },
    openDetailDialog(id) {
      this.detailToggle = true
      this.handleDetail(id)
    },
    closeDetailDialog() {
      this.detailToggle = false
    },
    openEndDialog() {
      this.endToggle = true
    },
    closeEndDialog() {
      this.endToggle = false
    },
    openDelDialog(id) {
      this.delToggle = true
      this.removeId = id
    },
    closeDelDialog() {
      this.delToggle = false
    }
  }
}
</script>

<style scoped>
.appealAdd-dialog .form-label {
  min-width: 7em;
}
.appealAdd-dialog .form-item .form-input + .form-required {
  margin-left: 24px;
}
.appealDetail {
  color: #999;
}
.appealDetail .flexCSB {
  padding: 12px 20px;
}
.appealDetail-wrap {
  max-height: 360px;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
}
.appealDetail-list {
  padding: 0 20px;
}
.appealDetail-list .item {
  margin-bottom: 24px;
}
.appealDetail-list .time {
  margin-bottom: 6px;
}
.appealDetail-list .con {
  display: flex;
}
.appealDetail-list .label {
  min-width: 80px;
}
.appealDetail-list .p {
  margin-bottom: 10px;
}
.appealDetail-list .img {
  width: 80px;
  height: 80px;
}
.appealDetail-list .img + .img {
  margin-left: 40px;
}
.appealDetail .tareaWrap {
  margin: 12px 60px 0 100px;
}
.appealDetail .tarea {
  padding: 12px;
  width: 100%;
  height: 64px;
  border: 1px solid #e4e4e4;
  resize: none;
  box-sizing: border-box;
  border-radius: 6px;
}
.appealDetail .botBtn {
  margin: 12px 60px 20px 100px;
}
.appealDetail .botBtn .btn {
  padding: 0 8px;
  background-color: transparent;
  border: 1px solid #6666FF;
  color: #6666FF;
}
.appealDetail .botBtn .btn + .btn {
  margin-left: 3px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
