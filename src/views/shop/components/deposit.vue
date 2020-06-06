<template>
  <div class="deposit-page" style="margin-top:24px;">
    <ul class="attention">
      <div class="dt">充值注意事项</div>
      <li class="li">禁止使用财付通转账，禁止通过很行柜台、ATM机转账</li>
      <li class="li">要求先转账再提交转账信息</li>
      <li class="li">提交转账信息前仔细核对轧账金额、姓名及银行卡号，禁止重复提交转账信息如发现恶意重复提交，将罚款甚至封号</li>
      <li class="li">及时提交轧账信息，未及时提交者（超过一天）联系充值客服说明充值时间</li>
    </ul>
    <div class="stepC">
      <div class="item">
        <div class="box">
          <span class="num">1</span>
          <span class="title">转账到平台官方指定收款账号</span>
        </div>
        <div class="con">
          <ul class="depositInfo-list">
            <li class="li">
              收款户名
              <span class="value">{{ receivablesInfo.realName }}</span>
            </li>
            <li class="li">
              收款账户
              <span class="value">{{ receivablesInfo.cardCode }}</span>
            </li>
            <li class="li">
              收款银行
              <span class="value">{{ receivablesInfo.bankName }} {{ receivablesInfo.subbranchName }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="item">
        <div class="box">
          <span class="num">2</span>
          <span class="title">转账到平台官方指定收款账号</span>
        </div>
        <div class="con">
          <button class="btn" @click="openDialogDeposit">提交打款信息</button>
        </div>
      </div>
      <div class="item">
        <div class="box">
          <span class="num">3</span>
          <span class="title">人工审核</span>
        </div>
        <div class="con" />
      </div>
    </div>
    <div>
      <div class="red-txt" style="margin-bottom:12px">充值审核时间为：9:00~21:00</div>
      <table class="table" width="90%">
        <tr>
          <th>提交时间</th>
          <th>转账银行</th>
          <th>打款人</th>
          <th>打款金额</th>
          <th>审核状态</th>
          <th>审核时间</th>
        </tr>
        <tr v-for="(item,index) in depositList" :key="index">
          <td>{{ item.createTime }}</td>
          <td>{{ item.bankName }}</td>
          <td>{{ item.realName }}</td>
          <td>{{ item.money }}</td>
          <td>{{ item.status===1?'待审核':item.status===2?'已完成':'已拒绝' }}</td>
          <td>{{ item.examineTime }}</td>
        </tr>
      </table>
    </div>
    <div style="text-align: center;width: 100%;margin-top: 30px">
      <el-pagination
        :hide-on-single-page="true"
        :current-page.sync="pageCur"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="pageTotal"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-show="dialogDeposit" class="dialog">
      <div class="dialog-wrap md">
        <div class="dialog-title">提交打款信息</div>
        <div class="dialog-close" @click="dialogDeposit=false" />
        <div class="dialog-con form">
          <div class="form-item">
            <div class="form-required">*</div>
            <div class="form-label">转账银行</div>
            <el-select v-model="addForm.bankName" filterable placeholder="请选择银行" class="form-block">
              <el-option
                v-for="item in bankOptions"
                :key="item.id"
                :label="item.bankName"
                :value="item.bankName"
              />
            </el-select>
          </div>
          <div class="form-item">
            <div class="form-required">*</div>
            <div class="form-label">银行卡号</div>
            <el-input
              v-model="addForm.cardCode "
              class="form-block"
              type="text"
              placeholder="请输入银行卡号（后四位即可）"
              @input="handleInputId($event)"
            />
          </div>
          <div class="form-item">
            <div class="form-required">*</div>
            <div class="form-label">打款人姓名</div>
            <el-input v-model="addForm.realName" class="form-block" placeholder="请输入打款人姓名" />
          </div>
          <div class="form-item">
            <div class="form-required">*</div>
            <div class="form-label">转账金额</div>
            <el-input v-model="addForm.money" class="form-block" type="text" placeholder="转账金额" maxlength="" @input="handleInputId2($event)" />
          </div>
          <div class="form-item">
            <div class="form-required">*</div>
            <span class="form-label">转账截图</span>
            <div class="form-block">
              <el-upload
                ref="imgUpload"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :http-request="uploadImage"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <div class="red-txt">请上传转账截图，方便快速审核</div>
            </div>
          </div>
        </div>
        <div class="dialog-bot">
          <button class="btn" @click="dialogDeposit=false">取消</button>
          <button v-re-click class="btn" @click="onSubmit">提交</button>
        </div>
      </div>
    </div>
    <div class="pagination">
      <span class="total">共{{ pageTotal }}页</span>
      <a class="prev" @click="handleChangePage(false)">上一页</a>
      <span class="cur">{{ pageNum }}&nbsp;/&nbsp;{{ pageTotal?pageTotal:1 }}</span>
      <a class="next" @click="handleChangePage(true)">下一页</a>
      <input v-model="pageIn" class="ipt" type="text">
      <button class="btn" @click="handlePageIn">跳转</button>
    </div>
  </div>
</template>

<script>
var Bucket = 'test-1252901182'
var Region = 'ap-guangzhou'
var protocol = location.protocol === 'https:' ? 'https:' : 'http:'
var prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/'

import {
  getDepositList,
  addDeposit,
  getBankList,
  getCosToken,
  getReceivablesInfo
} from '@/api/index'
export default {
  name: 'Deposit',
  data() {
    return {
      pageIn: null,
      pageCur: 1,
      pageSize: 10,
      pageNum: 1,
      pageTotal: 10,
      depositList: [],
      cosToken: '',
      dialogDeposit: false,
      imageUrl: '',
      bankOptions: [],
      addForm: {
        cardCode: '',
        bankName: '',
        money: '',
        realName: '',
        img: ''
      },
      cos: null,
      receivablesInfo: {
        bankName: '',
        cardCode: '',
        realName: '',
        subbranchName: ''
      }
    }
  },
  created() {
    this.getBank()
    this.init()
    this.getReceivables()
  },
  methods: {
    init() {
      console.log('跳转 ')
      var data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getDepositList(data).then(response => {
        if (response.code === 0) {
          this.depositList = response.data.rows
          this.pageTotal = Math.ceil(response.data.total / this.pageSize)
          console.log('sji', response.data)
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
    getAuthorization: function(options, callback) {
      var method = (options.Method || 'get').toLowerCase()
      var key = options.Key || ''
      var pathname = key.indexOf('/') === 0 ? key : '/' + key
      // const urlHeard = process.env.VUE_APP_BASE_API
      const urlHeard = 'https://web.dxer168.com/api/'
      var url = urlHeard + 'common/getCosToken'
      var xhr = new XMLHttpRequest()
      var data = {
        method: method,
        pathname: pathname
      }
      xhr.open('GET', url, true)
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.onload = function(e) {
        if (e.target.responseText === 'action deny') {
          this.$message({
            message: 'action deny',
            type: 'warning',
            showClose: true,
            duration: 2000
          })
        } else {
          callback(e.target.responseText)
        }
      }
      xhr.send(JSON.stringify(data))
    },
    uploadImage: function(e) {
      var _self = this
      var file = e.file
      var Key = 'images/' + file.name // 这里指定上传目录和文件名
      this.getAuthorization({ Method: 'PUT', Key: Key }, function(auth) {
        var url = prefix + Key
        var xhr = new XMLHttpRequest()
        xhr.open('PUT', url, true)
        xhr.setRequestHeader('Authorization', auth)
        xhr.onload = function() {
          if (xhr.status === 200 || xhr.status === 206) {
            _self.$message({
              message: '上传成功',
              type: 'success',
              showClose: true,
              duration: 2000
            })
            _self.addForm.img = url
            _self.imageUrl = url

            // callback(null, {url: url, ETag: ETag});
          } else {
            _self.$message({
              message: '文件 ' + Key + ' 上传失败，状态码：' + xhr.status,
              type: 'warning',
              showClose: true,
              duration: 2000
            })
          }
        }
        xhr.onerror = function() {
          _self.$message({
            message:
                                '文件 ' + Key + ' 上传失败，请检查是否没配置 CORS 跨域规则',
            type: 'warning',
            showClose: true,
            duration: 2000
          })
        }
        xhr.send(file)
      })
    },
    // 翻页
    handleChangePage(type) {
      if (type) {
        if (this.pageNum < this.pageTotal) {
          this.pageNum++
          this.init()
        }
      } else {
        if (this.pageNum > 1) {
          this.pageNum--
          this.init()
        }
      }
    },
    // 跳转页面
    handlePageIn() {
      console.log('teak')
      if (this.pageIn <= this.pageTotal && this.pageIn > 0) {
        this.pageNum = this.pageIn
        console.log('tiaozhuan ')
        this.init()
      } else if (this.pageIn > this.pageTotal) {
        this.pageNum = 1
        this.init()
      }
    },
    getBank() {
      getBankList().then(response => {
        if (response.code === 0) {
          this.bankOptions = response.data
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
    getReceivables() {
      getReceivablesInfo().then(response => {
        if (response.code === 0) {
          this.receivablesInfo = response.data
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg/png";
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // return isJPG && isLt2M;
      return isLt2M
    },
    openDialogDeposit() {
      this.$refs.imgUpload.clearFiles()
      this.dialogDeposit = true
      this.addForm = {
        cardCode: '',
        bankName: '',
        money: '',
        realName: '',
        img: ''
      }
      this.imageUrl = null
    },
    onSubmit() {
      if (!this.addForm.bankName) {
        this.$message({
          message: '请选择银行',
          type: 'warning'
        })
        return
      }

      if (!this.addForm.cardCode) {
        this.$message({
          message: '请输入银行卡号',
          type: 'warning'
        })
        return
      }
      // var bankPattern = /^([1-9]{1})(\d{14}|\d{18})$/;
      // if (!bankPattern.test(this.addForm.cardCode)) {
      //   this.$message({
      //     message: "请输入正确的银行卡号",
      //     type: "warning"
      //   });
      //   return;
      // }

      if (!this.addForm.realName) {
        this.$message({
          message: '请输入打款人姓名',
          type: 'warning'
        })
        return
      }
      if (this.addForm.money <= 0) {
        this.$message({
          message: '请输入打款金额',
          type: 'warning'
        })
        return
      }
      if (!this.imageUrl) {
        this.$message({
          message: '请输入打款截图',
          type: 'warning'
        })
        return
      }
      this.submit()
    },
    submit() {
      this.addForm.img = this.imageUrl
      var data = this.addForm
      addDeposit(data).then(response => {
        if (response.code === 0) {
          this.$message({
            message: '信息提交成功',
            type: 'success',
            showClose: true,
            duration: 2000
          })
          this.init()
          this.dialogDeposit = false
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
    handleCurrentChange() {
      this.init()
    },
    handleInputId(e) {
      this.addForm.cardCode = e.replace(/[^\d]/g, '')
    },
    handleInputId2(e) {
      e = e.replace(/[^\d.]/g, '')
      e = e.replace(/\.{2,}/g, '.')
      e = e.replace(/^\./g, '')
      e = e
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      e = e.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.addForm.money = e.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    }
  }
}
</script>

<style scoped>
    .form {
        line-height: 40px;
    }
    .form .form-label {
        width: 6em;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .avatar-uploader>>>.el-upload {
        border: 1px dashed #ccc;
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
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
</style>

