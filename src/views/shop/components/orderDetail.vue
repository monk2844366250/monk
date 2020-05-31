<template>
  <div style="position:relative;">
    <div style="margin-bottom: 10px">
      <span style="font-weight: bold">订单信息</span>
      <el-button size="mini" class="btn-theme" style="float: right;padding: 3px 12px;" @click="dialogFormVisible=true">申诉</el-button>
      <span style="float: right;color: red;margin-right: 15px">任务操作问题可联系客服处理或进行申诉</span>
    </div>
    <table class="table" style="margin-bottom: 30px">
      <tr>
        <th>订单ID</th>
        <th>用户ID</th>
        <th>接单账户</th>
        <th>搜索关键词</th>
        <th>付款金额</th>
        <th>订单编号</th>
      </tr>
      <tr>
        <td v-text="order.id" />
        <td v-text="order.userId" />
        <td v-text="order.accountNum" />
        <td v-text="order.keyword" />
        <td v-text="order.userPayAmount" />
        <td v-text="order.thirdOrderNo" />
      </tr>
    </table>
    <div style="font-weight: bold;margin: 10px 0">操作进度</div>
    <table class="table">
      <tr>
        <th>任务步骤</th>
        <th>操作者</th>
        <th>操作时间</th>
        <th>内容</th>
      </tr>
      <tr v-for="item in operationStepList">
        <td>{{ item.taskStep }}</td>
        <td>{{ item.operator }}</td>
        <td>{{ item.operationTime }}</td>
        <td>
          {{ item.wordContent }}
          <!-- <div v-if="item.imgContent.length > 0" style="display:inline-block;margin:0;padding:0;">
            <img :src="childItem.imgUrl" @click="toBigImg(childItem.imgUrl)" :preview-src-list="childItem.imgUrl" style="display:inline-block;width: 30px; height: 20px;margin:0;padding:2px;">
          </div> -->
          <el-image
            style="width: 20px; height: 20px"
            :src="item.imgContent"
            :preview-src-list="[item.imgContent]"
          />
        </td>
      </tr>

    </table>

    <!-- <div v-if="toBigTrue === true" style="width:100%;height:730px;background: rgba(0, 0, 0, .25); position:fixed;top:0;left:0;">
      <img :src="urlToImg" style="position:absolute;right:80px;top:40px;width:40px;" @click="imgTOFalse">
      <img :src="toImg" style="width:500px;position:absolute;right:500px;top:100px;">
    </div> -->
    <el-dialog title="发起申诉" :visible.sync="dialogFormVisible" width="550px">
      <el-form :model="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <span style="color: #97A8BE">订单编号：</span>
              <el-input v-model="order.id" size="mini" style="width: 130px" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <!-- 申诉原因 0-全部 1-资金问题 2-任务问题 3-操作问题 -->
              <span style="color: #97A8BE">申诉原因：</span>
              <el-select v-model="value2" placeholder="请选择" size="mini" style="width: 130px">
                <el-option
                  label="资金问题"
                  value="1"
                />
                <el-option
                  label="任务问题"
                  value="2"
                />
                <el-option
                  label="操作问题"
                  value="3"
                />
              </el-select>
            </el-form-item></el-col>

        </el-row>

        <el-form-item style="width: 100%">
          <span style="color: #97A8BE">申诉说明：</span>
          <el-input
            v-model="form.textarea2"
            style="width: 100%"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item style="width: 100%">
          <span style="color: #97A8BE">申诉说明：</span><span style="color: #BCBCBC">（最多2张图片，大小在3M以内）</span>
          <el-upload
            list-type="picture"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :http-request="uploadAddImage1"
            limit="2"
          >
            <!-- <el-upload
            list-type="picture"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"

          > -->
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="mini" style="color: #6666FF" @click="dialogFormVisible = false">取消退出</el-button>
        <el-button class="btn-theme" size="mini" @click="dialogFormVisibleExp">确认提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const urlImg = require('@/assets/web/retesk.jpg')
import { addYwAppeal } from '@/api/shop'
import { uploadImage } from '@/utils'
export default {
  name: 'OrderDetail',
  data() {
    return {
      urlToImg: urlImg,
      toBigTrue: false,
      toImg: null,
      operationStepList: [{
        wordContent: '',
        taskStep: '',
        imgContent: [],
        operator: '',
        operationTime: ''
      }],
      order: {
        acceptTime: '',
        accountId: 0,
        accountNum: '',
        advanceSaleOperationState: 1,
        appendCommentImgUrl: null,
        businessDisplayFlag: 1,
        businessId: 1,
        businessName: '',
        commentAppendState: 2,
        commentTime: '',
        commissionAmount: 8.5,
        confirmTime: '',
        createBy: '',
        createTime: '',
        delFlag: 1,
        endTime: null,
        goodsDetailContent: null,
        goodsImgUrl: '',
        goodsName: '',
        goodsUrl: '',
        id: 1200,
        keyword: '',
        labelImgUrl: null,
        operationTime: '8',
        orderCancelReasonFlag: null,
        orderNo: null,
        params: {},
        principalAmount: 11,
        promotersId: 0,
        realPayCommission: 10,
        refundFlag: 1,
        refundOperationState: 1,
        refundsAmount: 11,
        refundsTime: '',
        releaseTime: '',
        remark: null,
        searchValue: null,
        startTime: null,
        status: 7,
        storeId: 59,
        storeName: '',
        storeTypeId: 1,
        substationId: 0,
        substationName: null,
        taskCommentId: 1,
        taskId: 1107,
        taskPoolId: null,
        taskReleaseTimeId: null,
        taskType: 2,
        taskTypeId: 2,
        thirdOrderNo: '',
        updateBy: '1',
        updateTime: '',
        userId: 1,
        userPayAmount: 1,
        version: 1
      },
      fileList: [],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ],
      form: {
        textarea2: ''
      },
      dialogFormVisible: false,
      input1: '',
      value2: '',
      options: [{
        value: '选项1',
        label: '选项1'
      }]
    }
  },
  //   computed{
  //       reSetData: {
  //       get() {
  //         return this.$store.getters.reSetData
  //       },
  //       set(val) {
  //         this.$store.commit('SET_RESETDATA', val)
  //       }
  //     },
  //   },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var goodsdatas = this.$route.query
      console.log('详情数据', goodsdatas)
      this.order = goodsdatas.data.order
      console.log('原水数据', this.order)
      this.operationStepList = goodsdatas.data.operationStepList
    },
    dialogFormVisibleExp() {
      console.log('asdas', this.fileList)
      const expList = {
        orderId: this.order.id,
        content: this.form.textarea2,
        type: this.value2,
        img1: this.fileList[0],
        img2: this.fileList[1]
      }
      addYwAppeal(expList).then(response => {
        console.log('12312', response)
        if (response === 0) {
          this.$message({
            message: '信息提交成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
      })
    },
    // 展示大图
    toBigImg(data) {
      console.log('展示大图')
      this.toBigTrue = true
      this.toImg = data
    },
    // 点击消失
    imgTOFalse() {
      console.log('点击消失')
      this.toBigTrue = false
    },
    handleRemove(file, fileList) {
      console.log('sdasd', file, fileList)
    },
    handlePreview(file) {
      console.log('sdasd', file)
    },
    uploadAddImage1(e) {
      this.fileList.push(uploadImage(e))
    }
  }
}
</script>

<style scoped>

</style>
