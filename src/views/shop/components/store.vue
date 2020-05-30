<template>
  <div class="store">
    <el-button class="btn-theme" size="small" @click="(handelShowAdd())">+新增店铺</el-button>
    <div style="margin: 10px 0">
      <span style="color:#6666FF;font-size: 14px">温馨提示：</span>
      <span style="color: #97A8BE;font-size: 14px">商家账户可绑定多个店铺，切忌绑定他人店铺，恶搞同行，如有发现封号处理。</span>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%;"
      pageersize="10"
    >
      <el-table-column label="店铺类型" align="center">
        <template slot-scope="scope">
          <!--<img src="../../../assets/web/tbc.png" style="width: 20px;position: relative;top: 4px;">-->
          <span>{{ scope.row.storeTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.storeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺网址" align="center">
        <template slot-scope="{row}">
          <el-button
            :class="'copy-'+row.id"
            type="text"
            style="color:#6666FF;"
            :data-clipboard-text="row.url"
            @click="copy(row.id)"
          >复制
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="接单间隔" align="center">
        <template slot-scope="{row}">
          <span>{{ row.intervalSet }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status===1?'待审核':row.status===2?'正常':'禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="绑定时间" align="center" width="170">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="text" style="color:#6666FF;" @click="handelShowEdit(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-pagination-->
    <!--style="text-align: center"-->
    <!--:current-page="currentPage4"-->
    <!--layout="total, prev, pager, next, jumper"-->
    <!--:total="400">-->
    <!--</el-pagination>-->

    <div class="pagination">
      <span class="total">共{{ total }}页</span>
      <a class="prev" @click="handleChangePage(false)">上一页</a>
      <span class="cur">{{ pageNum }}&nbsp;/&nbsp;{{ total?total:1 }}</span>
      <a class="next" @click="handleChangePage(true)">下一页</a>
      <input v-model="pageIn" class="ipt" type="text">
      <button class="btn" @click="handlePageIn">跳转</button>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" width="492.438px" :close-on-click-modal="false">
      <div slot="title">
        {{ type==='add'?'绑定店铺':'修改店铺' }}
      </div>
      <el-form ref="form" :model="form" label-position="top" :rules="formRules">
        <el-form-item style="display:flex;" prop="storeTypeId">
          <span slot="label" class="form-label" style="line-height: 40px;margin-right: 10px">店铺类型</span>
          <el-select
            v-model="form.storeTypeId "
            placeholder="请选择"
            size="small"
            style="width: 120px"
            @change="handleStoreType"
          >
            <el-option
              v-for="item in storeType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <span v-if="showIsTm" class="form-label" style="font-weight: 700;margin-left: 20px">是否天猫店</span>
          <el-select v-if="showIsTm" v-model="form.tmallFlag " placeholder="请选择" size="small" style="width: 100px">
            <el-option
              v-for="item in isTm"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

        </el-form-item>
        <el-form-item prop="storeName">
          <span slot="label" class="form-label">店铺名称 <span class="form-span">（务必跟手机端手机店铺名一致）</span></span>
          <el-input v-model="form.storeName" autocomplete="off" size="small" />
        </el-form-item>
        <el-form-item prop="url" class="valiUrl">
          <span slot="label" class="form-label">店铺网址<span class="form-span">（务必填写正确的首页网址）</span></span>
          <el-input
            v-model="form.url"
            autocomplete="off"
            size="small"
            maxlength="255"
            @blur="inputBlur"
          />
        </el-form-item>

        <el-form-item style="margin: 30px 0 30px 0">
          <span slot="label" class="form-label"><span style="color: #F56C6C;margin-right: 4px;">*</span>发货地址<span class="form-span">（使用平台快递或者误发真包按此地址处理，务必真实填写）</span></span>
          <div style="overflow: hidden;">
            <el-form-item style="margin-bottom: 20px;display: block;float:left;width: 30%" prop="name" class="valiName" :style="marginBottom">
              <el-input
                v-model="form.name"
                autocomplete="off"
                size="small"
                placeholder="发货人姓名"
              />
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;display: block;float:right;width: 69%" prop="phone" class="valiPhone" :style="marginBottom">
              <el-input
                v-model="form.phone"
                autocomplete="off"
                size="small"
                placeholder="发货人手机号码"
              />
            </el-form-item>
          </div>
          <div style="display: flex;justify-content:space-between;">
            <v-distpicker
              :province="form.province"
              :city="form.city"
              :area="form.area"
              @province="onChangeProvince"
              @city="onChangeCity"
              @area="onChangeArea"
            />

          </div>
          <el-form-item prop="address">
            <el-input
              v-model="form.address"
              autocomplete="off"
              size="small"
              maxlength="30"
              placeholder="请填写店铺实际发货地的详细地址..."
            />
          </el-form-item>
        </el-form-item>
        <br>
        <el-form-item prop="dataNum">
          <span slot="label" class="form-label">接单间隔</span>
          <el-input v-model="form.dataNum" autocomplete="off" type="number" size="small" style="width: 30%" min="30" max="60">
            <template slot="append">天</template>
          </el-input>
          <span>（最小30天，最大60天）</span>
        </el-form-item>
        <div>
          <p style="color: #97A8BE"><span style="color: #6666FF">温馨提示：</span>接单间隔是指同一个用户在同一个店铺内的接单天数间隔，最小间隔天数30天，最大间隔天数60天，
            如商家不设置天数，系统默认间隔天数为30天，商家可根据实际情况自行选择。如商家需设置不同店铺之间的接单限制，请联系客服处理。</p>

        </div>
        <!-- <el-form-item style="text-align: center">
        <el-button @click="claerbuttom(form)">取 消</el-button>
        <el-button v-if="type==='add'" type="primary" @click="handleAddStore">确 定</el-button>
        <el-button v-if="type==='edit'" type="primary" @click="handleEditStore">确 定</el-button>
      </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="claerbuttom(form)">取 消</el-button>
        <el-button v-if="type==='add'" type="primary" @click="handleAddStore">确 定</el-button>
        <el-button v-if="type==='edit'" type="primary" @click="handleEditStore">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStoreList, addStore, getStoreTypeList, editStore } from '@/api/shop'
import VDistpicker from 'v-distpicker'
import Clipboard from 'clipboard'

export default {
  name: 'Store',
  components: { VDistpicker },
  data() {
    var valiAddress = (rule, value, callback) => { // 包含小数的数字
      if (!this.form.address || !this.form.area || !this.form.city || !this.form.name || !this.form.phone || !this.form.province) {
        callback(new Error('请输入完整地址'))
      } else {
        callback()
      }
    }
    var valiPhone = (rule, value, callback) => {
      const phone = this.form.phone
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        callback(new Error('手机号码有误，请重填！'))
        this.marginBottom = 'margin-bottom: 20px'
      } else {
        this.marginBottom = ''
        callback()
      }
    }
    var valiDataNum = (rule, value, callback) => { // 包含小数的数字
      const reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g
      if (!reg.test(value)) {
        callback(new Error('请输入时间'))
      } else if (value < 30 || value > 60) {
        callback(new Error('请输入正确的时间'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      showStore: '',
      marginBottom: '',
      total: 1,
      pageNum: 1,
      pageIn: null,
      pageSize: 10,
      form: {
        address: null,
        area: null,
        city: null,
        dataNum: null,
        name: null,
        phone: null,
        province: null,
        storeId: null,
        storeName: '',
        storeTypeId: '',
        storeTypeName: '',
        tmallFlag: 2,
        url: ''
      },
      formRules: {
        storeTypeId: [
          { required: true, message: '请选择店铺类型', trigger: 'blur' }
        ],
        storeName: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入店铺网址', trigger: 'blur' }
        ],
        dataNum: [
          { required: true, message: '请输入正确的时间', trigger: 'blur' },
          { validator: valiDataNum, trigger: 'blur' }
        ],
        address: [
          { validator: valiAddress, trigger: 'blur' }
        ],
        phone: [
          { validator: valiPhone, trigger: 'blur' }
        ]
      },
      pac: '',
      dialogFormVisible: false,
      currentPage4: 1,
      storeType: [],
      isTm: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        }
      ],
      showIsTm: false,
      type: 'add'

    }
  },
  created() {
    this.init()
  },
  mounted() {
    // var code1 = window.location.href.match(/\?dialogFormVisible=(.*)/)[1]// 取 ?dialogFormVisible=后面所有字符串
    var arrList = window.location.href.match(/\?dialogFormVisible=(.*)/)// 取 ?dialogFormVisible=后面所有字符串
    console.log('arrList, arrList', arrList)
    if (arrList !== null) {
      console.log('arrList, arrList', arrList)
      var code1 = arrList[1]
      if (!(code1 === true)) {
        this.dialogFormVisible = true
      } else if (code1 === true) {
        this.dialogFormVisible = false
        return this.dialogFormVisible
      }
    }
  },
  methods: {
    init() {
      var pagesdata = { pageNum: this.pageNum, pageSize: this.pageSize }
      getStoreList(pagesdata).then(response => {
        this.tableData = response.data.rows
        // this.total = Math.ceil(this.tableData.length / 10)
        this.total = Math.ceil(response.data.total / this.pageSize)
      })
      getStoreTypeList().then(response => {
        this.storeType = response.data
        console.log('this.this.storeType', this.storeType)
      })
      this.form = {
        address: null,
        area: null,
        city: null,
        dataNum: null,
        name: null,
        phone: null,
        province: null,
        storeId: null,
        storeName: '',
        storeTypeId: '',
        storeTypeName: '',
        tmallFlag: 2,
        url: ''
      }
    },
    // 跳转页面
    handlePageIn() {
      if (this.pageIn <= this.total && this.pageIn > 0) {
        this.pageNum = this.pageIn
        this.init()
      } else if (this.pageIn > this.total) {
        this.pageNum = 1
      }
    },
    // 分页
    handleChangePage(type) {
      if (type) {
        if (this.pageNum < this.total) {
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
    // 店铺网址
    inputBlur(e) {
      if (e.target.value.indexOf('.taobao.com') === -1) {
        console.log(e.target.value)
        this.$message({
          message: '商品链接不正确请重新输入',
          type: 'warning'
        })
        return
      }
    },
    copy(id) {
      const clipboard = new Clipboard('.copy-' + id)
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        clipboard.destroy()
      })
    },
    // 判断是否显示是否为天猫店铺
    handleStoreType(val) {
      this.storeType.map(item => {
        if (item.id === val) {
          this.form.storeTypeName = item.name
          if (item.name === '淘宝') {
            this.showIsTm = true
          } else {
            this.showIsTm = false
          }
        }
      })
    },

    // 确定新增店铺
    handleAddStore() {
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      // var patt1 = new RegExp(/\s+/g)
      // if (!patt1.test(this.form.storeName)) {
      //   this.form.storeName.replace(/\s+/g, '')
      // }
      console.log('店铺数据123', this.form)
      this.form.storeName = this.form.storeName.replace(/^\s*|\s*$/g, '')
      const dataList = {
        address: this.form.address,
        area: this.form.area,
        province: this.form.province,
        storeName: this.form.storeName,
        storeTypeId: this.form.storeTypeId,
        storeTypeName: this.form.storeTypeName,
        city: this.form.city,
        dataNum: this.form.dataNum,
        name: this.form.name,
        phone: this.form.phone,
        tmallFlag: this.form.tmallFlag,
        url: this.form.url
      }
      console.log('店铺数据', dataList)
      if (dataList.storeTypeId) {
        if (dataList.dataNum < 30 || dataList.dataNum > 60) {
          this.$message({
            message: '请输入正确的接单时间间隔',
            type: 'warning'
          })
        } else {
          addStore(dataList).then(response => {
            if (response.code === 0) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.init()
            } else if (response.code === 301) {
              this.$message({
                message: '店铺名称信息填写不正确',
                type: 'warning'
              })
            } else {
              this.$message({
                message: response.msg,
                type: 'warning'
              })
            }
          })
        }
      } else {
        this.$message({
          message: '请依次输入，确保店铺类型等不为空',
          type: 'warning'
        })
      }

      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    initData() {
      this.form = {
        address: null,
        area: null,
        city: null,
        dataNum: null,
        name: null,
        phone: null,
        province: null,
        storeId: null,
        storeName: '',
        storeTypeId: '',
        storeTypeName: '',
        tmallFlag: 2,
        url: ''
      }
    },
    // 新增店铺方法
    handelShowAdd() {
      this.type = 'add'
      this.dialogFormVisible = true
      this.init()
    },
    handelShowEdit(val) {
      this.showStore = val
      this.form = {
        address: val.address,
        area: val.area,
        city: val.city,
        dataNum: val.intervalSet,
        name: val.name,
        phone: val.phone,
        province: val.province,
        storeName: val.storeName,
        storeTypeId: val.storeTypeId,
        storeTypeName: val.storeTypeName,
        tmallFlag: val.tmallFlag,
        url: val.url,
        storeId: val.id
      }
      this.type = 'edit'
      this.dialogFormVisible = true
      this.showStorePage()
    },
    showStorePage() {
      console.log('sure', this.showStore)
      if (this.showStore.storeTypeName === '淘宝') {
        this.showIsTm = true
      } else {
        this.showIsTm = false
      }
    },
    handleEditStore() {
      this.$refs.form.validate(valid => {
        if (valid) {
          editStore(this.form).then(response => {
            if (response.code === 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.init()
            } else {
              this.$message({
                message: response.msg,
                type: 'warning'
              })
            }
          })
        } else {
          this.$message({
            message: '请输入要求的内容',
            type: 'warning'
          })
          return false
        }
      })
    },
    onChangeProvince(a) {
      if (a.value !== '省') { this.form.province = a.value }
    },
    onChangeCity(a) {
      if (a.value !== '市') { this.form.city = a.value }
    },
    onChangeArea(a) {
      if (a.value !== '区') { this.form.area = a.value }
    },
    claerbuttom(formName) {
      // var that = this
      this.dialogFormVisible = false
      // this.$nextTick(() => {
      // })
      this.initData()
    }
  }
}
</script>

<style scoped>
  .form-label {
    color: #97A8BE;
    font-size: 15px;
  }

  .form-span {
    color: #6B6B6B;
    font-size: 12px
  }

  .store >>> .el-form--label-top .el-form-item__label {
    padding: 0 0 5px;
    line-height: 5px;
  }

  .store >>> .distpicker-address-wrapper select {
    color: #97A8BE;
    width: 148px;
    height: 32px;
    font-size: inherit;
    padding: 0 .75rem;
  }
  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /deep/ input[type="number"] {
    -moz-appearance: textfield;
  }
  .valiPhone >>> .el-form-item__error{
     right: 0!important;
    left: auto;
  }
</style>
