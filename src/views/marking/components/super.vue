<template>
    <div>
        今日可用免费打标次数：{{useCount.count}}/{{useCount.allCount}}
        <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
            <el-form-item label="关键词" prop="keyWord">
                <el-input v-model="form.keyWord" style="width: 300px" size="small" placeholder="请输入商品关键词"></el-input>
                <span>商品标题中必须包含关键词</span>
            </el-form-item>
            <el-form-item label="商品ID" prop="goodsId">
                <el-input v-model="form.goodsId" style="width: 300px" placeholder="请输入商品ID" size="small"></el-input>

                <span>商品ID 如: 566081372583</span>
            </el-form-item>
            <el-form-item label="展示价" prop="price">
                <el-input v-model="form.price" style="width: 300px" placeholder="请输入商品搜索展示价" size="small"></el-input>
                <span>为了标签更精准请填写正确的展示价</span>
            </el-form-item>

            <div>
                <el-button class="btn-theme" type="primary" style="width:300px;margin-left:80px;" @click="handleQr" v-re-click>
                    生成超级标签二维码
                </el-button>
            </div>

            <canvas id="canvas2" ref="qrcode" class="qrcode"></canvas>
            <div style="width: 300px;margin-left: 80px;text-align: center; margin-top:12px; ">
                <el-button v-if="qrShow" type="primary" class="btn-theme" @click="dowloadQr" v-re-click>保存</el-button>
            </div>



        </el-form>
    </div>
</template>

<script>
    import QRCode from 'qrcode'
    import {addYwMarkingSuper, selectYwTrialNumber} from '@/api/marking'

    export default {
        name: "super",
        data() {
            var valiNumberPass1 = (rule, value, callback) => {//包含小数的数字
                let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
                if (value === '') {
                    callback(new Error('请输入内容'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入数字'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    keyWord: null,
                    goodsId: null,
                    price: null,
                    codeImg: null,
                },
                useCount: {
                    count: null,
                    allCount: null,
                },
                formRules: {
                    keyWord: [{required: true, message: '请输入关键词', trigger: 'blur'}],
                    goodsId: [{required: true, message: '请输入商品ID', trigger: 'blur'}],
                    price: [
                        {required: true, message: '请输入展示价', trigger: 'blur'},
                        {validator:valiNumberPass1, message: '请输入数字', trigger: 'blur'}
                    ],
                },
                qrShow: false,
                qrUrl: 'https://re.m.taobao.com/search?keyword='
            }
        },
        created() {

            this.init();
        },
        methods: {
            init() {
                selectYwTrialNumber({type: 3}).then(response => {
                    if (response.code === 0) {
                        const {data} = response
                        this.useCount.count = data.count;
                        this.useCount.allCount = data.allCount;
                    } else {
                        this.$message({
                            message: response.msg,
                            type: 'warning',
                            showClose: true,
                            duration: 2000
                        })
                    }
                });
            },
            handleQr() {
                if (this.useCount.count === this.useCount.allCount) {
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
                        var _self = this;
                        var priceUp = parseFloat(this.form.price) + 5;
                        var priceDown = parseFloat(this.form.price) - 5;
                        priceDown = priceDown < 0? 0:priceDown;
                        var qrUrlCopy = this.qrUrl + this.form.keyWord + '&' + priceDown + '~' + priceUp
                        QRCode.toCanvas(canvas2, qrUrlCopy, function (error) {
                            if (error) console.error(error)
                            console.log('success!');
                            _self.qrShow = true;
                        })
                        this.form.codeImg = qrUrlCopy
                        this.handlAddYwMarkingSuper();
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            dowloadQr() {
                var canvasData = document.getElementById('canvas2');
                console.log(canvasData.toDataURL());
                // canvasData = canvasData.getContext('2d');
                var a = document.createElement("a");
                var event = new MouseEvent("click"); // 创建一个单击事件
                a.href = canvasData.toDataURL();
                a.download = "二维码";
                a.dispatchEvent(event); // 触发a的单击事件
            },

            handlAddYwMarkingSuper() {
                var data = Object.assign({}, this.form)
                var canvasData = document.getElementById('canvas2');
                data.codeImg = canvasData.toDataURL();
                parseFloat(data.price).toFixed(2);
                addYwMarkingSuper(data).then(response => {
                    if (response.code === 0) {
                        this.$message({
                            message: '提交成功',
                            type: 'success',
                            showClose: true,
                            duration: 2000
                        })
                        this.init()
                    } else {
                        this.$message({
                            message: response.msg,
                            type: 'warning',
                            showClose: true,
                            duration: 2000
                        })
                    }
                });


            }
        }
    }
</script>

<style scoped>
    .qrcode {
        width: 300px !important;
        height: 300px !important;
        margin-left: 80px;
    }
</style>
