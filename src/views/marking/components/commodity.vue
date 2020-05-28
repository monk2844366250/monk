<template>
    <div>
        免费打标次数：{{useCount.count}}/{{useCount.allCount}}
        <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
            <el-form-item label="关键词" prop="keyWord">
                <el-input v-model="form.keyWord" style="width: 300px" size="small" placeholder="请输入商品关键词"></el-input>
                <span>商品标题中必须包含关键词</span>
            </el-form-item>
            <el-form-item label="商品ID" prop="goodsId">
                <el-input v-model="form.goodsId" style="width: 300px" placeholder="请输入商品ID" size="small"></el-input>

                <span>商品ID 如: 566081372583</span>
            </el-form-item>
            <el-form-item label="旺旺号" prop="wwNums">
                <el-input v-model="form.wwNums"
                          style="width: 300px"
                          type="textarea"
                          :autosize="{ minRows: 10, maxRows: 10}"></el-input>
                <span>
                    旺旺号可填写一个或多个,每一行只能填写一个旺旺号
                </span>

            </el-form-item>

            <el-form-item label="定时">
                <!-- <el-time-picker
                        arrow-control
                        v-model="form.tTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        size="small"
                        style="width: 300px">
                </el-time-picker> -->
                <el-date-picker
                v-model="form.tTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 300px">
                </el-date-picker>
            </el-form-item>
            <div>
                <el-button v-re-click class="btn-theme" type="primary" style="width:300px;margin-left:80px;" @click.native.prevent="handleAddYwMarkingCompe">提交</el-button>
                <span style="color: red">金币 = 0.5金币*旺旺数</span>
            </div>

        </el-form>
    </div>

</template>

<script>
    import {addYwMarkingCompe,selectYwTrialNumber} from '@/api/marking'
    export default {
        name: "commodity",
        data(){
            return{
                form:{
                    keyWord:null,
                    goodsId:null,
                    wwNums:null,
                    tTime:null,
                    type:1
                },
                useCount:{
                    count:null,
                    allCount:5,
                },
                formRules:{
                    keyWord: [{ required: true, message: '请输入关键词',trigger: 'blur'}],
                    goodsId: [{ required: true, message: '请输入商品ID',trigger: 'blur' }],
                    wwNums: [{ required: true,message: '请输入旺旺号', trigger: 'blur' }],
                },

            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                selectYwTrialNumber({type:1}).then(response=>{
                    if (response.code ===0){
                        const {data} = response
                        this.useCount.count = data.count;
                        this.useCount.allCount = data.allCount;
                    }else{
                        this.$message({
                            message: response.msg,
                            type: 'warning',
                            showClose: true,
                            duration: 2000
                        })
                    }
                });
            },
            restForm(){
                this.form={
                    keyWord:null,
                    goodsId:null,
                    wwNums:null,
                    tTime:null,
                    type:2
                }
            },
            handleAddYwMarkingCompe(){
                if (this.useCount.count === this.useCount.allCount){
                    this.$message({
                        message: '打标次数已用完！',
                        type: "warning",
                        showClose: true,
                        duration: 2000
                    });
                    return;
                }
              this.$refs.form.validate(valid => {
                  if (valid) {
                      var data = Object.assign({},this.form)
                      data.wwNums = data.wwNums.replace('\n',',')
                      addYwMarkingCompe(data).then(response=>{
                          if (response.code ===0){
                              this.$message({
                                  message: '提交成功',
                                  type: 'success',
                                  showClose: true,
                                  duration: 2000
                              })
                              this.init()
                              this.restForm()
                          }else{
                              this.$message({
                                  message: response.msg,
                                  type: 'warning',
                                  showClose: true,
                                  duration: 2000
                              })
                          }
                      });
                  } else {
                      console.log('error submit!!')
                      return false
                  }
              })
          }
        }
    }
</script>

<style scoped>

</style>
