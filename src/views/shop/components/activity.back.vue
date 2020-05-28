<template>
    <div class="activity-page">
        <el-steps :active="active" finish-status="success">
            <el-step title="任务类型"></el-step>
            <el-step title="任务信息"></el-step>
            <el-step title="收费详情"></el-step>
            <el-step title="发布任务"></el-step>
        </el-steps>
        <div class="content">
            <div class="form" v-show="active===0">
                <div class="form-item">
                    <span class="form-required">*必填</span>
                    <span class="form-label">请选择店铺类型：</span>
                    <div class="form-block radio-list">

                        <el-radio-group class="item" style="margin-left: 14px" v-model="dpTypeData" fill="red"
                                        text-color="#6666FF" @change="dpType">
                            <div class="item-img"></div>
                            <el-radio label="tb" style="top: -4px;" v-for="item in storeType">
                            <img :src="item.img" class="radio-list-logo">{{ item.name }}
                        </el-radio>
                            <!--<el-radio label="tb" style="top: -4px;" >-->
                                <!--<img class="radio-list-logo">{{ item.name }}-->
                            <!--</el-radio>-->
                            <!--<el-radio label="jd" style="top: -4px;"><img src="../../../assets/web/jd.png"-->
                                                                         <!--class="radio-list-logo">京东-->
                            <!--</el-radio>-->
                            <!--<el-radio label="pdd" style="top: -4px;"><img src="../../../assets/web/pdd.png"-->
                                                                          <!--class="radio-list-logo">拼多多-->
                            <!--</el-radio>-->
                            <!--<el-radio label="albb" style="top: -4px;"><img src="../../../assets/web/albbc.png"-->
                                                                           <!--class="radio-list-logo">阿里巴巴-->
                            <!--</el-radio>-->
                        </el-radio-group>
                    </div>
                </div>
                <div class="form-item">
                    <span class="form-required">*必填</span>
                    <span class="form-label">请选择任务类型：</span>
                    <div class="form-block radio-list radio-list-y">
                        <el-radio-group v-model="tbTaskData" @change="tbTask" v-if="dpTypeData==='tb'">
                            <div class="item">
                                <div class="item-img"><img src="../../../assets/web/new.png" alt=""
                                                           class="radio-list-new"></div>
                                <div class="checkbox">
                                    <el-radio label="tbll">淘宝流量任务</el-radio>
                                </div>

                                <span class="radio-tip">（流量任务、收藏任务、加购任务、微淘直播、文章阅读 ）</span>
                            </div>

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="tbliulan">淘宝浏览任务</el-radio>

                                </div>
                                <span class="radio-tip">（真实用户浏览商品）</span>
                            </div>

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="tbsj">手机淘宝任务</el-radio>

                                </div>
                                <span class="radio-tip">（用户在手机淘宝app下单）</span>
                            </div>

                            <div class="item">
                                <div class="item-img"><img src="../../../assets/web/new.png" alt=""
                                                           class="radio-list-new"></div>
                                <div class="checkbox">
                                    <el-radio label="tbwjt">手机淘宝无截图任务</el-radio>

                                </div>
                                <span class="radio-tip">（用户在手机淘宝app下单，全程无截图）</span>
                            </div>
                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="tbtb">淘宝特别任务</el-radio>

                                </div>
                                <span class="radio-tip">（支持淘客秒拍、聚划算、淘抢购、淘金币、淘口令或其它渠道活动）</span>
                            </div>
                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="tbtk">淘宝退款任务</el-radio>

                                </div>
                                <span class="radio-tip">（用户先正常下单在商家指定的日期退款，维护店铺转化率。）</span>
                            </div>

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="tbys">淘宝预售任务</el-radio>
                                </div>
                                <span class="radio-tip">（当天加购物车，指定日期付款）</span>
                            </div>

                            <div class="item">
                                <div class="item-img"><img src="../../../assets/web/new.png" alt=""
                                                           class="radio-list-new"></div>
                                <div class="checkbox">
                                    <el-radio label="tbzp">淘宝追评任务</el-radio>
                                </div>
                                <span class="radio-tip">（用户在手机淘宝APP端操作，通过追评做评价优化。）</span>
                            </div>
                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="tbcjbq">淘宝超级标签任务</el-radio>
                                </div>
                                <span class="radio-tip">（批量打标签，增加商品权重权重。）</span>
                            </div>
                            <div class="item">
                                <div class="item-img"><img src="../../../assets/web/new.png" alt=""
                                                           class="radio-list-new"></div>
                                <div class="checkbox">
                                    <el-radio label="tbdb">淘宝打标任务</el-radio>
                                </div>
                                <span class="radio-tip">（当天加购物车提前给用户打标，指定日期付款提高补单权重）</span>
                            </div>
                        </el-radio-group>
                        <el-radio-group v-model="tbTaskData" @change="tbTask" v-if="dpTypeData==='jd'">
                            <div class="item">
                                <div class="item-img"><img src="../../../assets/web/new.png" alt=""
                                                           class="radio-list-new"></div>
                                <div class="checkbox">
                                    <el-radio label="jdll">京东流量任务</el-radio>
                                </div>

                                <span class="radio-tip">（流量任务、收藏任务、加购任务、京东直播 ）</span>
                            </div>

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="jdliulan">京东浏览任务</el-radio>

                                </div>
                                <span class="radio-tip">（真实用户浏览商品）</span>
                            </div>

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="jdsj">手机京东任务</el-radio>

                                </div>
                                <span class="radio-tip">（用户在手机京东app下单）</span>
                            </div>

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="jdtb">京东特别任务</el-radio>

                                </div>
                                <span class="radio-tip">（支持京东秒杀、渠道活动）</span>
                            </div>
                            <div class="item">
                                <div class="item-img"><img src="../../../assets/web/new.png" alt=""
                                                           class="radio-list-new"></div>
                                <div class="checkbox">
                                    <el-radio label="jdys">京东预售任务</el-radio>

                                </div>
                                <span class="radio-tip">（当天加购物车，指定日期付款）</span>
                            </div>

                        </el-radio-group>
                        <el-radio-group v-model="tbTaskData" @change="tbTask" v-if="dpTypeData==='pdd'">
                            <div class="item">
                                <div class="item-img"><img src="../../../assets/web/new.png" alt=""
                                                           class="radio-list-new"></div>
                                <div class="checkbox">
                                    <el-radio label="pddll">拼多多流量任务</el-radio>
                                </div>

                                <span class="radio-tip">（流量任务、收藏任务）</span>
                            </div>
                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="pddsj">手机拼多多任务</el-radio>

                                </div>
                                <span class="radio-tip">（用户在手机拼多多app下单）</span>
                            </div>


                        </el-radio-group>
                        <el-radio-group v-model="tbTaskData" @change="tbTask" v-if="dpTypeData==='albb'">
                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="albbsj">手机阿里巴巴任务</el-radio>
                                </div>

                                <span class="radio-tip">（用户在手机阿里巴巴app下单）</span>
                            </div>
                        </el-radio-group>
                    </div>
                </div>
                <div class="form-item" style="position: relative">
                    <span class="form-required">*必填</span>
                    <span class="form-label">请选择店铺：</span>
                    <div class="form-block radio-list radio-list-y">
                        <el-radio-group v-model="radio3">

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="3">小二家服装店</el-radio>

                                </div>

                            </div>

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="4">店铺2</el-radio>

                                </div>

                            </div>

                            <div class="item">
                                <div class="item-img"></div>
                                <div class="checkbox">
                                    <el-radio label="5">店铺3</el-radio>
                                </div>
                            </div>
                        </el-radio-group>
                    </div>
                    <el-button type="text" class="addShop">+新增店铺</el-button>
                </div>

            </div>

            <div class="form" v-show="active===1">
                <div v-if="taskInfo==='tbll'||taskInfo==='jdll'||taskInfo==='pddll'">
                    <div class="step-title">第一步：填写任务信息</div>
                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择任务类型：</span>
                        <el-radio-group v-model="tbllForm.type" @change="tbllFormType">
                            <el-radio label="ll">流量任务</el-radio>
                            <el-radio label="sc">收藏任务</el-radio>
                            <el-radio label="jg" v-if="taskInfo!=='pddll'">加购任务</el-radio>
                            <el-radio label="jdzb" v-if="taskInfo==='jdll'">京东直播</el-radio>
                            <el-radio label="wt" v-if="taskInfo==='tbll'">微淘直播</el-radio>
                            <el-radio label="wz" v-if="taskInfo==='tbll'">文章阅读</el-radio>
                        </el-radio-group>
                    </div>

                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择流量类型：</span>
                        <el-radio-group v-model="tbllForm.lltype" size="mini" class="radio-none"
                                        v-if="tbllForm.type==='ll'">
                            <el-radio label="app" border>APP流量</el-radio>
                            <el-radio label="bb" border v-if="taskInfo==='tbll'">宝贝点赞</el-radio>
                            <el-radio label="pc" border v-if="taskInfo==='tbll'">PC流量</el-radio>
                            <el-radio label="cn" border v-if="taskInfo==='tbll'">猜你喜欢</el-radio>
                            <el-radio label="mr" border v-if="taskInfo==='tbll'">每日好店</el-radio>
                            <el-radio label="tk" border v-if="taskInfo==='tbll'">淘口令</el-radio>
                            <el-radio label="tb" border v-if="taskInfo==='tbll'">淘宝客</el-radio>
                        </el-radio-group>
                        <el-radio-group v-model="tbllForm.lltype" size="mini" class="radio-none"
                                        v-if="tbllForm.type==='sc'">
                            <el-radio label="sss" border>搜索收藏</el-radio>
                            <el-radio label="sps" border>商品收藏</el-radio>
                            <el-radio label="dp" border>店铺收藏</el-radio>
                        </el-radio-group>
                        <el-radio-group v-model="tbllForm.lltype" size="mini" class="radio-none"
                                        v-if="tbllForm.type==='jg'">
                            <el-radio label="ssj" border>搜索加购</el-radio>
                            <el-radio label="spj" border>商品加购</el-radio>
                        </el-radio-group>
                        <el-radio-group v-model="tbllForm.lltype" size="mini" class="radio-none"
                                        v-if="tbllForm.type==='wt'||tbllForm.type==='jdzb'">
                            <el-radio label="zb" border>直播观看</el-radio>
                        </el-radio-group>
                        <el-radio-group v-model="tbllForm.lltype" size="mini" class="radio-none"
                                        v-if="tbllForm.type==='wz'">
                            <el-radio label="ydc" border>阅读次数</el-radio>
                            <el-radio label="ydr" border>阅读人数</el-radio>
                            <el-radio label="ydj" border>引导进店</el-radio>
                        </el-radio-group>
                    </div>

                    <div>
                        <div class="form-item" v-if="tbllForm.lltype==='ydj'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">文章链接：</span>
                            <el-input class="w400" v-model="tbllForm.input1" size="small"
                                      placeholder="  不支持没有带商品内容的文章发布"></el-input>
                            <svg-icon icon-class="wenhao"
                                      style=" font-size: 25px;color: #6666FF;margin:5px 15px 0 5px;"/>
                        </div>
                        <div class="form-item" v-if="tbllForm.lltype==='ydj'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">每天发布量：</span>
                            <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                <template slot="append">单</template>
                            </el-input>

                            <span class="form-label" style="min-width:3em;margin-left: 20px">深度浏览：</span>
                            <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                <template slot="append">单</template>
                            </el-input>
                            <el-button size="mini" class="btn-theme2" style="width: 60px;margin-left: 10px">20倍
                            </el-button>
                            <svg-icon icon-class="wenhao"
                                      style=" font-size: 25px;color: #6666FF;margin:5px 15px 0 5px;"/>
                        </div>
                        <div class="form-item" v-if="tbllForm.lltype==='ydc'||tbllForm.lltype==='ydr'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">文章链接：</span>
                            <el-input class="w400" v-model="tbllForm.input1" size="small"></el-input>
                        </div>
                        <div class="form-item" v-if="tbllForm.lltype==='zb'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">直播链接：</span>
                            <el-input class="w400" v-model="tbllForm.input1" size="small"
                                      placeholder="链接格式：¥XXXXXXX¥"></el-input>
                        </div>
                        <div class="form-item" v-if="tbllForm.lltype==='zb'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">每天发布量：</span>
                            <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                <template slot="append">单</template>
                            </el-input>
                            <div v-if="tbllForm.lltype==='zb'&&tbllForm.type!=='jdzb'" style="display: contents;">
                                <span class="form-label" style="min-width:3em;margin-left: 20px">点赞：</span>
                                <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                    <template slot="append">单</template>
                                </el-input>
                                <el-button size="mini" class="btn-theme2" style="width: 60px;margin-left: 10px">10倍
                                </el-button>
                                <el-button size="mini" class="btn-theme2" style="width: 60px">20倍</el-button>
                                <svg-icon icon-class="wenhao"
                                          style=" font-size: 25px;color: #6666FF;margin:5px 15px 0 5px;"/>
                            </div>

                        </div>
                        <div class="form-item"
                             v-if="tbllForm.lltype!=='zb'&&tbllForm.lltype!=='ydc'&&tbllForm.lltype!=='ydr'&&tbllForm.lltype!=='ydj'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">商品链接：</span>
                            <el-input class="w400" v-model="tbllForm.input1" size="small"
                                      placeholder="请输入正确的商品网页端网址"></el-input>
                            <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
                        </div>
                        <div class="form-item"
                             v-if="tbllForm.lltype!=='bb'&&tbllForm.lltype!=='zb'&&tbllForm.lltype!=='ydc'&&tbllForm.lltype!=='ydr'&&tbllForm.lltype!=='ydj'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">商品标题：</span>
                            <el-input class="w400" v-model="tbllForm.input2" size="small"
                                      placeholder="请输入正确的商品全标题"></el-input>
                            <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
                        </div>
                        <div class="form-item" v-if="tbllForm.lltype==='tk'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">淘口令：</span>
                            <el-input class="w400" v-model="tbllForm.input2" size="small"
                                      placeholder=" 淘口令格式：¥XXXXXXX¥"></el-input>
                            <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
                        </div>
                        <div class="form-item" v-for="item in tbllForm.num"
                             v-if="tbllForm.lltype==='app'||tbllForm.lltype==='pc'||tbllForm.lltype==='sss'||tbllForm.lltype==='ssj'">
                            <div class="form-action">
                                <el-button type="text" @click="tbllForm.num++"><i
                                        class="el-icon-circle-plus-outline"></i></el-button>
                                <el-button type="text" style="margin-left: 0"
                                           @click="tbllForm.num>1?tbllForm.num--:tbllForm.num"><i
                                        class="el-icon-remove-outline"></i></el-button>
                            </div>
                            <div class="form-block boder-all">
                                <div class="form-item" style="margin-left: 30px;">
                                    <span class="form-label" style="min-width:5em">关键词{{item}}：</span>
                                    <el-input class="w400" v-model="tbllForm.input2" size="small"
                                              placeholder="关键词必须为标题里面含有的文字，且区分大写"></el-input>
                                </div>
                                <div class="form-item" style="margin-left: 30px;">
                                    <span class="form-label" style="min-width:5em">每天发布量：</span>
                                    <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                        <template slot="append">单</template>
                                    </el-input>
                                    <svg-icon icon-class="wenhao" v-if="tbllForm.lltype==='app'"
                                              style=" font-size: 25px;color: #6666FF;margin:5px 15px 0 5px;"/>
                                    <div v-if="tbllForm.lltype==='app'&&taskInfo!=='jdll'&&taskInfo!=='pddll'" style="display: contents;">
                                        <span class="form-label" style="min-width:3em">展现：</span>
                                        <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                            <template slot="append">单</template>
                                        </el-input>
                                        <el-button size="mini" class="btn-theme2" style="width: 60px;margin-left: 10px">
                                            3倍
                                        </el-button>
                                        <el-button size="mini" class="btn-theme2" style="width: 60px">5倍</el-button>
                                        <svg-icon icon-class="wenhao"
                                                  style=" font-size: 25px;color: #6666FF;margin:5px 15px 0 5px;"/>
                                    </div>

                                </div>
                                <div class="clock" style="margin-left: 30px;margin-right: 5px;margin-top: 5px">
                                    <span style="color:#6666FF;font-weight: bold;font-size: 15px ">24小时细分：</span>
                                    <el-button size="mini" class="btn-theme2" style="margin-left: 10px">0-7点不分配
                                    </el-button>
                                    <el-button size="mini" class="btn-theme2" style="margin-left: 10px">24小时分配
                                    </el-button>
                                    <ul class="clock-list">
                                        <li class="item"><span class="sp1">0点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">1点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">2点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">3点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">4点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">5点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">6点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">7点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">8点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">9点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">10点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">11点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">12点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">13点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">14点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">15点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">16点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">17点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">18点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">19点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">20点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">21点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">22点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">23点</span> <input class="sp2" type="text"/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-item"
                             v-if="tbllForm.lltype==='cn'||tbllForm.lltype==='mr'||tbllForm.lltype==='tk'||tbllForm.lltype==='tb'||tbllForm.lltype==='sps'||tbllForm.lltype==='dp'||tbllForm.lltype==='spj'">
                            <div class="form-action">
                            </div>
                            <div class="form-block boder-all">
                                <div class="form-item" style="margin-left: 30px;">
                                    <span class="form-label" style="min-width:5em">每天发布量：</span>
                                    <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                        <template slot="append">单</template>
                                    </el-input>
                                </div>
                                <div class="clock" style="margin-left: 30px;margin-right: 5px;margin-top: 5px">
                                    <span style="color:#6666FF;font-weight: bold;font-size: 15px ">24小时细分：</span>
                                    <el-button size="mini" class="btn-theme2" style="margin-left: 10px">0-7点不分配
                                    </el-button>
                                    <el-button size="mini" class="btn-theme2" style="margin-left: 10px">24小时分配
                                    </el-button>
                                    <ul class="clock-list">
                                        <li class="item"><span class="sp1">0点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">1点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">2点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">3点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">4点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">5点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">6点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">7点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">8点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">9点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">10点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">11点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">12点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">13点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">14点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">15点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">16点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">17点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">18点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">19点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">20点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">21点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">22点</span> <input class="sp2" type="text"/>
                                        </li>
                                        <li class="item"><span class="sp1">23点</span> <input class="sp2" type="text"/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-item"
                             v-if="tbllForm.lltype!=='bb'&& tbllForm.lltype!=='sps'&& tbllForm.lltype!=='dp'&& tbllForm.lltype!=='spj'&&tbllForm.lltype!=='zb'&&tbllForm.lltype!=='ydc'&&tbllForm.lltype!=='ydr'&&tbllForm.lltype!=='ydj'">
                            <span class="form-required"></span>
                            <span class="form-label">自定义要求：</span>
                        </div>
                        <div class="form-item"
                             v-if="tbllForm.lltype!=='bb'&& tbllForm.lltype!=='sps'&& tbllForm.lltype!=='dp'&& tbllForm.lltype!=='spj'&&tbllForm.lltype!=='zb'&&tbllForm.lltype!=='ydc'&&tbllForm.lltype!=='ydr'&&tbllForm.lltype!=='ydj'">
                            <span class="form-required"></span>
                            <div class="form-block boder-all">
                                <div class="form-item" style="margin-left: 30px;">
                                    <span class="form-label" style="min-width:6em">停留时间</span>
                                    <el-select v-model="value" size="mini" placeholder="请选择">
                                        <el-option
                                                v-for="item in 3"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                    <span class="form-label" style="min-width:6em;margin-left: 90px">浏览副宝贝</span>
                                    <el-select v-model="value" size="mini" placeholder="请选择">
                                        <el-option
                                                v-for="item in 3"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="form-item" style="margin-left: 30px;margin-bottom: 16px">
                                    <span class="form-label" style="min-width:6em;">4G比例</span>
                                    <el-select v-model="value" size="mini" placeholder="请选择">
                                        <el-option
                                                v-for="item in 3"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                    <span class="form-label" style="min-width:6em;margin-left: 90px">查看评价</span>
                                    <el-select v-model="value" size="mini" placeholder="请选择">
                                        <el-option
                                                v-for="item in 3"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="form-item" v-if="tbllForm.lltype!=='bb'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">发布天数：</span>
                            <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                <template slot="append">天</template>
                            </el-input>
                            <el-button size="mini" class="btn-theme2" style="width: 60px;margin-left: 10px">7天
                            </el-button>
                            <el-button size="mini" class="btn-theme2" style="width: 60px">15天</el-button>
                            <el-button size="mini" class="btn-theme2" style="width: 60px">30天</el-button>
                        </div>
                        <div class="form-item"
                             v-if="tbllForm.lltype==='bb'||tbllForm.lltype==='ydc'||tbllForm.lltype==='ydr'">
                            <span class="form-required">*必填</span>
                            <span class="form-label">每天发布量：</span>
                            <el-input v-model="tbllForm.input2" size="small" style="width: 140px">
                                <template slot="append">单</template>
                            </el-input>
                        </div>
                        <div class="form-item" v-if="tbllForm.lltype==='bb'">
                            <span class="form-required"></span>
                            <span class="form-label">发布天数：</span>
                            <el-input v-model="value1" size="small" style="width: 140px" disabled>
                                <template slot="append">天</template>
                            </el-input>
                            <div class="form-err form-err-change" style="color:#97A8BE;">（默认1天且无法修改，只能发布当天的点赞）</div>
                        </div>
                        <div class="form-item">
                            <span class="form-required">*必填</span>
                            <span class="form-label">开始时间：</span>
                            <el-date-picker
                                    value-format="yyyy-MM-dd"
                                    size="small"
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">任务备注：</span>
                            <el-input v-model="tbllForm.input2" size="small" style="width: 300px"
                                      placeholder="最多20个字！"></el-input>
                        </div>
                    </div>


                </div>

                <div v-if="taskInfo==='tbliulan'||taskInfo==='tbsj'||taskInfo==='tbwjt'||taskInfo==='tbtb'||taskInfo==='tbys'
                ||taskInfo==='tbzp'||taskInfo==='tbcjbq'||taskInfo==='tbdb'||taskInfo==='jdsj'||taskInfo==='jdtb'||taskInfo==='jdys'||taskInfo==='pddsj'||taskInfo==='albbsj'">
                    <div class="step-title">第一步：填写商品信息</div>
                    <div v-for="item in addShop">
                        <el-divider v-if="item!==1">附加商品{{item-1}}</el-divider>
                        <div class="form-item">
                            <span class="form-required">*必填</span>
                            <span class="form-label">商品标题：</span>
                            <el-input class="w400" v-model="input" size="small" placeholder="请输入正确的商品全标题"></el-input>
                            <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
                        </div>
                        <div class="form-item">
                            <span class="form-required">*必填</span>
                            <span class="form-label">商品链接：</span>
                            <el-input class="w400" v-model="input2" size="small" placeholder="请输入正确的商品网页端网址"></el-input>
                            <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
                        </div>
                        <div class="form-item" style="position: relative">
                            <span class="form-required">*必填</span>
                            <span class="form-label">商品主图：</span>
                            <el-upload
                                    style="background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-popover
                                    placement="top"
                                    width="200"
                                    trigger="click"
                            >
                                <el-image
                                        style="width: 180px; height: 200px"
                                        :src="sjslShow"
                                        fit="fill"></el-image>
                                <el-button slot="reference" type="text" class="epshow">查看示例图</el-button>
                            </el-popover>

                            <div style="position: relative;width: 480px;">
                                <div class="upload-d">上传“商品主图”，确保与搜索页面展示的图片一致。</div>
                                <div class="form-err upload-e">(如上传不成功请使用谷歌浏览器)</div>
                            </div>
                        </div>
                        <div class="form-item" style="margin-top: 35px">
                            <span class="form-required">*必填</span>
                            <span class="form-label">搜索展示价：</span>
                            <el-input v-model="input3" size="small" style="width: 130px">
                                <template slot="append">元</template>
                            </el-input>
                            <span class="form-label form-label-price">实际成交价：</span>
                            <el-input v-model="input4" size="small" style="width: 130px">
                                <template slot="append">元</template>
                            </el-input>

                            <span class="form-label form-label-price">付款人数：</span>
                            <el-input v-model="input5" size="small" style="width: 130px">
                                <template slot="append">人</template>
                            </el-input>

                        </div>
                        <div class="form-item">
                            <span class="form-required">*必填</span>
                            <span class="form-label">每单拍：</span>
                            <el-input v-model="input6" size="small" style="width: 130px">
                                <template slot="append">元</template>
                            </el-input>
                        </div>
                        <div class="form-item" style="margin-top: 35px" v-if="taskInfo!=='tbliulan'">
                            <span class="form-required"></span>
                            <span class="form-label">商品是否开通淘客推广：</span>
                            <el-radio-group v-model="radio7">
                                <el-radio :label="3" style="color:#97A8BE ">是</el-radio>
                                <el-radio :label="6" style="color:#97A8BE ">否</el-radio>

                            </el-radio-group>
                        </div>

                    </div>
                    <div class="form-item" v-if="taskInfo==='tbcjbq'||taskInfo==='tbdb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">设置打标关键词：</span>
                        <el-input class="w400" v-model="input" size="small"></el-input>
                        <div class="form-err form-err-change">(为保障打标效果请与搜索关键词一致)</div>
                    </div>
                    <div class="form-item" v-if="taskInfo==='tbcjbq'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">打标二维码：</span>
                        <el-upload
                                class="avatar-uploader"
                                action=""
                                style="margin-right: 20px;background-color: #F2F2F2"
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div>
                            <el-button class="btn-theme" size="mini">生成二维码</el-button>
                        </div>
                    </div>
                    <div class="form-item" style="margin-top: 0"
                         v-if="taskInfo!=='tbliulan'&&taskInfo!=='tbtk'&&taskInfo!=='tbcjbq'&&taskInfo!=='tbdb'">
                        <span class="form-required"></span>
                        <el-button type="text" @click="addShop<3?addShop++:addShop">+新增附加商品</el-button>
                        <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加2个附加商品）</span>
                    </div>
                    <div class="step-title">第二步：填写搜索信息</div>
                    <div class="form-item" v-if="taskInfo!=='tbtb'&&taskInfo!=='jdtb'&&taskInfo!=='pddsj'&&taskInfo!=='albbsj'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">请选择店铺类型：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="margin-left: 14px;padding-top: 10px;" v-model="radio4"
                                            fill="red" text-color="#6666FF">

                                <el-radio label="1">综合</el-radio>
                                <el-radio label="2">综合直通车</el-radio>
                                <el-radio label="3">销量</el-radio>
                                <el-radio label="4">销量直通车</el-radio>
                                <el-radio label="6" v-if="taskInfo!=='jdsj'&&taskInfo!=='jdys'">视频</el-radio>
                                <el-radio label="7" v-if="taskInfo==='jdsj'||taskInfo==='jdys'">店铺</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="form-item" v-if="taskInfo==='tbtb'||taskInfo==='jdtb'||taskInfo==='pddsj'||taskInfo==='albbsj'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择排序方式：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="margin-left: 14px;padding-top: 10px;" v-model="radio4"
                                            fill="red" text-color="#6666FF">
                                <el-radio label="1">综合</el-radio>
                                <el-radio label="3" v-if="taskInfo!=='albbsj'">销量</el-radio>
                                <el-radio label="3" v-if="taskInfo==='albbsj'">成交额</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <!--<div class="form-item">-->
                        <!--<span class="form-required">*必填</span>-->
                        <!--<span class="form-label">每单拍：</span>-->
                        <!--<el-input v-model="input6" size="small" style="width: 130px">-->
                            <!--<template slot="append">元</template>-->
                        <!--</el-input>-->
                    <!--</div>-->

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">商品所在地：</span>
                        <el-input v-model="input10" size="small" style="width: 130px;margin-right: 10px"
                                  placeholder="全国">
                            <template slot="append">省</template>
                        </el-input>
                        <el-input v-model="input7" size="small" style="width: 130px">
                            <template slot="append">市</template>
                        </el-input>

                        <span class="form-required"></span>
                        <span class="form-label">筛选价格区间：</span>
                        <el-input v-model="input8" size="small" style="width: 130px">
                            <template slot="append">元</template>
                        </el-input>
                        <span style="color:#6666FF;width: 20px;font-size: 12px;text-align: center;">一</span>
                        <el-input v-model="input9" size="small" style="width: 130px">
                            <template slot="append">元</template>
                        </el-input>
                    </div>

                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">订单留言：</span>
                        <el-input v-model="input11" size="small" placeholder="最多50字！" style="width: 400px">
                        </el-input>
                        <div class="form-err" style="font-size: 12px"> （用户下单给商家的留言，谨慎使用！）</div>
                    </div>

                    <!-- <div class="step-title">第三步：设置评价类型</div>
                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择评价类型：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="padding-top: 10px;" v-model="xpjs"
                                            fill="red" text-color="#6666FF">
                                <el-radio label="pthp" style="margin-right: 10px">普通好评任务</el-radio>
                                <el-radio label="zdwz" style="margin-right: 10px">指定文字好评 <span
                                        style="color: red;font-size: 12px;">+1金币/单</span></el-radio>
                                <el-radio label="zdtp" style="margin-right: 10px">指定图片好评 <span
                                        style="color: red;font-size: 12px;">+2金币/单</span></el-radio>
                                <el-radio label="zdsp" style="margin-right: 10px">指定视频好评 <span
                                        style="color: red;font-size: 12px;">+2金币/单</span></el-radio>
                            </el-radio-group>
                        </div>
                    </div> -->
                    <div class="form-item" v-if="taskInfo==='tbtb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择活动类型：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="padding-top: 10px;" v-model="hdlx"
                                            fill="red" text-color="#6666FF">
                                <el-radio label="tqg">淘抢购</el-radio>
                                <el-radio label="jhs">聚划算</el-radio>
                                <el-radio label="tttj">天天特价</el-radio>
                                <el-radio label="tjb">淘金币</el-radio>
                                <el-radio label="qt">其他</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="form-item" v-if="taskInfo==='jdtb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择活动类型：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="padding-top: 10px;" v-model="hdlx"
                                            fill="red" text-color="#6666FF">
                                <el-radio label="tqg">京东秒杀</el-radio>
                                <el-radio label="jhs">发现好货</el-radio>
                                <el-radio label="tttj">每日特价</el-radio>
                                <el-radio label="tjb">新品首发</el-radio>
                                <el-radio label="qt">其他</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="form-item" v-if="taskInfo!=='tbtb'&& taskInfo!=='jdtb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择搜索方式：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="padding-top: 10px;" v-model="ssfs"
                                            fill="red" text-color="#6666FF">
                                <el-radio label="gjc">关键词</el-radio>
                                <el-radio label="tkl" v-if="taskInfo!=='tbcjbq'&&taskInfo!=='tbdb'">淘口令</el-radio>
                                <el-radio label="ewm" v-if="taskInfo!=='tbcjbq'&&taskInfo!=='tbdb'">二维码</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="form-item" style="position: relative" v-for="item in addewm"
                         v-if="ssfs==='ewm'&&taskInfo!=='tbtb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">搜索二维码：</span>
                        <el-upload
                                style="background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
                        <el-input v-model="input13" size="small" style="width: 140px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="form-item" style="margin-top: 0" v-if="ssfs==='ewm'&&taskInfo!=='tbtb'">
                        <span class="form-required"></span>
                        <el-button type="text" @click="addewm<11?addewm++:addewm">+增加二维码</el-button>
                        <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个二维码）</span>
                    </div>
                    <div class="form-item" v-for="item in addtkl" v-if="ssfs==='tkl'&&taskInfo!=='tbtb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">搜索淘口令：</span>
                        <el-input v-model="input12" size="small" style="width: 350px">
                        </el-input>
                        <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
                        <el-input v-model="input13" size="small" style="width: 140px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="form-item" style="margin-top: 0" v-if="ssfs==='tkl'&&taskInfo!=='tbtb'">
                        <span class="form-required"></span>
                        <el-button type="text" @click="addtkl<11?addtkl++:addtkl">+增加淘口令</el-button>
                        <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个淘口令）</span>
                    </div>
                    <div class="form-item" v-for="item in addKeyWord" v-if="ssfs==='gjc'&&taskInfo!=='tbtb'&&taskInfo!=='jdtb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">填写搜索信息：</span>
                        <el-input v-model="input12" size="small" style="width: 350px">
                        </el-input>
                        <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
                        <el-input v-model="input13" size="small" style="width: 140px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="form-item" style="margin-top: 0" v-if="ssfs==='gjc'&&taskInfo!=='tbtb'&&taskInfo!=='jdtb'">
                        <span class="form-required"></span>
                        <el-button type="text" @click="addKeyWord<11?addKeyWord++:addKeyWord">+增加关键词</el-button>
                        <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个关键词）</span>
                    </div>
                    <div class="form-item" v-for="item in 5" v-if="xpjs==='zdwz'">
                        <span class="form-required">{{ item===1?'*必填':''}}</span>
                        <span class="form-label">文字好评{{item}}：</span>
                        <el-input v-model="input14" size="small" style="width: 350px">
                        </el-input>
                    </div>
                    <div v-for="item in 3" v-if="xpjs==='zdtp'">
                        <div class="form-item">
                            <span class="form-required">{{ item===1?'*必填':''}}</span>
                            <span class="form-label">第{{item}}单：</span>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">设置照片中的商品规格：</span>
                            <el-input v-model="input14" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等">
                            </el-input>
                            <div class="form-err" style="font-size: 12px"> (规格设置务必要与图片中的商品规格保持一致)</div>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">评价图片：</span>
                            <span style="font-size: 12px;color:#bcbcbc;">（最多可添加5张图片）</span>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                                    style="background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>


                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">评语：</span>
                            <el-input v-model="input14" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等">
                            </el-input>

                        </div>
                        <el-divider></el-divider>
                    </div>
                    <div v-for="item in 3" v-if="xpjs==='zdsp'">
                        <div class="form-item">
                            <span class="form-required">{{ item===1?'*必填':''}}</span>
                            <span class="form-label">第{{item}}单：</span>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">设置照片中的商品规格：</span>
                            <el-input v-model="input14" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等">
                            </el-input>
                            <div class="form-err" style="font-size: 12px"> (规格设置务必要与图片中的商品规格保持一致)</div>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">选择视频：</span>
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">评语：</span>
                            <el-input v-model="input14" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等">
                            </el-input>

                        </div>
                        <el-divider></el-divider>
                    </div>
                    <div class="form-item" v-if="taskInfo==='tbzp'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择追评类型：：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="padding-top: 10px;" v-model="xzzp"
                                            fill="red" text-color="#6666FF">
                                <el-radio label="pthp" style="margin-right: 10px">普通好评任务</el-radio>
                                <el-radio label="zdwz" style="margin-right: 10px">指定文字好评 <span
                                        style="color: red;font-size: 12px;">+1金币/单</span></el-radio>
                                <el-radio label="zdtp" style="margin-right: 10px">指定图片好评 <span
                                        style="color: red;font-size: 12px;">+2金币/单</span></el-radio>
                                <el-radio label="zdsp" style="margin-right: 10px">指定视频好评 <span
                                        style="color: red;font-size: 12px;">+2金币/单</span></el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="form-item" v-for="item in 5" v-if="xzzp==='zdwz'&&taskInfo==='tbzp'">
                        <span class="form-required">{{ item===1?'*必填':''}}</span>
                        <span class="form-label">文字好评{{item}}：</span>
                        <el-input v-model="input14" size="small" style="width: 350px">
                        </el-input>
                    </div>
                    <div v-for="item in 3" v-if="xzzp==='zdtp'&&taskInfo==='tbzp'">
                        <div class="form-item">
                            <span class="form-required">{{ item===1?'*必填':''}}</span>
                            <span class="form-label">第{{item}}单：</span>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">设置照片中的商品规格：</span>
                            <el-input v-model="input14" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等">
                            </el-input>
                            <div class="form-err" style="font-size: 12px"> (规格设置务必要与图片中的商品规格保持一致)</div>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">评价图片：</span>
                            <span style="font-size: 12px;color:#bcbcbc;">（最多可添加5张图片）</span>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                                    style="background-color: #F2F2F2"
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>


                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">评语：</span>
                            <el-input v-model="input14" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等">
                            </el-input>

                        </div>
                        <el-divider></el-divider>
                    </div>
                    <div v-for="item in 3" v-if="xzzp==='zdsp'&&taskInfo==='tbzp'">
                        <div class="form-item">
                            <span class="form-required">{{ item===1?'*必填':''}}</span>
                            <span class="form-label">第{{item}}单：</span>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">设置照片中的商品规格：</span>
                            <el-input v-model="input14" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等">
                            </el-input>
                            <div class="form-err" style="font-size: 12px"> (规格设置务必要与图片中的商品规格保持一致)</div>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">选择视频：</span>
                            <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    style="margin-right: 20px;background-color: #F2F2F2"
                                    :show-file-list="false"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="form-item">
                            <span class="form-required"></span>
                            <span class="form-label">评语：</span>
                            <el-input v-model="input14" size="small" style="width: 350px" placeholder=" 如颜色、尺寸等">
                            </el-input>

                        </div>
                        <el-divider></el-divider>
                    </div>
                    <div class="form-item" v-if="taskInfo==='tbtb'||taskInfo==='jdtb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">设置引导图：</span>
                        <div class="form-err form-err-change"> （最多可添加3张图片，单张图片大小在3M以内选择文件）</div>
                    </div>
                    <div class="form-item" v-if="taskInfo==='tbtb'||taskInfo==='jdtb'">
                        <span class="form-required"></span>
                        <el-upload
                                class="avatar-uploader"
                                action=""
                                style="margin-right: 20px;background-color: #F2F2F2"
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-upload
                                style="margin-right: 20px;background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-upload
                                style="margin-right: 20px;background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div class="form-item" v-if="taskInfo==='tbtb'||taskInfo==='jdtb'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">设置单数：</span>
                        <el-input v-model="input6" size="small" style="width: 130px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">商品详情文字：</span>
                        <el-input v-model="input14" size="small" style="width: 350px" placeholder="最多20个字！">
                        </el-input>
                                <el-popover
          placement="top"
          width="200"
          trigger="hover"
        >
          <el-image
            style="width: 175px; height: 200px"
            :src="require('@/assets/images/shilizhutu.png')"
            fit="fill"
          />
          <el-button slot="reference" type="text" class="epshow">查看示例图</el-button>
        </el-popover>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"> <el-radio v-model="radio6" label="1"
                                                            style="color:#97A8BE;">任务发布时间</el-radio></span>
                        <el-date-picker
                                size="small"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="选择开始时间"
                                end-placeholder="选择结束时间">
                        </el-date-picker>
                        <span style="color: #6666FF;width: 50px;text-align: center;font-size: 14px">放出</span>
                        <el-input v-model="input14" size="small" style="width: 140px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="clock" style="margin-left: 44px;">
                        <span style="color:#6666FF;font-weight: bold;font-size: 15px ">24小时细分：</span>
                        <ul class="clock-list">
                            <li class="item"><span class="sp1">0点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">1点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">2点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">3点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">4点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">5点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">6点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">7点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">8点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">9点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">10点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">11点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">12点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">13点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">14点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">15点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">16点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">17点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">18点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">19点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">20点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">21点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">22点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">23点</span> <input class="sp2" type="text"/></li>
                        </ul>
                    </div>
                    <div class="step-title">第四步：筛选用户截图</div>
                    <div class="form-item" v-if="taskInfo==='tbcjbq'">
                        <span class="form-required"></span>
                        <span class="form-label">扫码结果：：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">扫码结果</el-button>
                        </div>

                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">商品货比：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">搜索结果页</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">货比一家</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">货比两家</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">货比两家</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">货比三家</el-button>
                            <span class="checkbox-tip">+0.5金币/单</span>
                        </div>
                    </div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">浏览商品：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">目标商品</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">店内商品1</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">店内商品2</el-button>
                        </div>

                    </div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">收藏加购：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">收藏目标商品</el-button>
                            <span class="checkbox-tip">+0.5金币/单</span>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">加购目标商品</el-button>
                            <span class="checkbox-tip">+0.5金币/单</span>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">关注店铺</el-button>
                            <span class="checkbox-tip">+0.5金币/单</span>
                        </div>

                    </div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">聊天下单：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">假聊截图</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">下单截图</el-button>
                        </div>

                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">评价截图：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">物流截图</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">下单截图</el-button>
                        </div>

                    </div>
                    <div class="step-title">第五步：选择增值服务</div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">常规服务</span>
                        <el-checkbox>任务置顶</el-checkbox>
                        <span style="font-size: 12px;color:#bcbcbc;">（优先派单）</span>
                        <span style="font-size: 12px;color:red; ">+2金币/任务</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">每单加赏</span>
                        <el-input v-model="input14" size="small" style="width: 100px">
                            <template slot="append">金</template>
                        </el-input>
                        <span style="font-size: 12px;color:#bcbcbc;margin-left: 10px"> (加赏佣金能调动用户的接单积极性)</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">千人千面</span>
                        <span style="color: #97A8BE;margin-right: 10px">性别：</span>
                        <el-radio-group class="item" style="margin-left: 14px;" v-model="radio8" fill="red"
                                        text-color="#6666FF">
                            <el-radio label="1" style="color: #97A8BE">男</el-radio>
                            <el-radio label="2" style="color: #97A8BE">女</el-radio>
                        </el-radio-group>
                        <span style="font-size: 12px;color:#bcbcbc;">（仅限选择性别的用户可接该任务）</span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">年龄：</span>
                        <el-radio-group class="item" style="margin-left: 14px;" v-model="radio9">
                            <el-radio label="1" style="color: #97A8BE">18-25</el-radio>
                            <el-radio label="2" style="color: #97A8BE">26-35</el-radio>
                            <el-radio label="23" style="color: #97A8BE">26-35</el-radio>
                        </el-radio-group>
                        <span style="font-size: 12px;color:#bcbcbc;">（仅限选择性别的用户可接该任务）</span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">地区：</span>
                        <span style="font-size: 12px;color:#bcbcbc;"> (勾选区域代表不能接单的区域，例如不需要新疆买家，就勾选新疆)</span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <div class="checkbox-list">
                            <el-checkbox-group v-model="checkList">
                                <div>
                                    <el-checkbox label="复选框A">上海</el-checkbox>
                                    <el-checkbox label="复选框B">江苏</el-checkbox>
                                    <el-checkbox label="复选框C">浙江</el-checkbox>
                                    <el-checkbox label="禁用">安徽</el-checkbox>
                                    <el-checkbox label="选中且禁用">江西</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框aA">北京</el-checkbox>
                                    <el-checkbox label="复选框aB">天津</el-checkbox>
                                    <el-checkbox label="复选框aC">山西</el-checkbox>
                                    <el-checkbox label="禁用a">山东</el-checkbox>
                                    <el-checkbox label="选中且禁用a">河北</el-checkbox>
                                    <el-checkbox label="选中且禁用a">内蒙古</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框As">湖南</el-checkbox>
                                    <el-checkbox label="复选框Bs">湖北</el-checkbox>
                                    <el-checkbox label="复选框dd">河南</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框sA">广东</el-checkbox>
                                    <el-checkbox label="复选框sB">广西</el-checkbox>
                                    <el-checkbox label="复选框sC">福建</el-checkbox>
                                    <el-checkbox label="复选框sd">海南</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框dA">辽宁</el-checkbox>
                                    <el-checkbox label="复选框dB">吉林</el-checkbox>
                                    <el-checkbox label="复选框dC">黑龙江</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框dAd">陕西</el-checkbox>
                                    <el-checkbox label="复选框dBd">新疆</el-checkbox>
                                    <el-checkbox label="复选框dCd">甘肃</el-checkbox>
                                    <el-checkbox label="复选框dCdg">宁夏</el-checkbox>
                                    <el-checkbox label="复选框dCds">青海</el-checkbox>

                                </div>
                                <div>
                                    <el-checkbox label="复选框dAdag">重庆</el-checkbox>
                                    <el-checkbox label="复选框dBdaf">云南</el-checkbox>
                                    <el-checkbox label="复选框dCdad">贵州</el-checkbox>
                                    <el-checkbox label="复选框dCdar">西藏</el-checkbox>
                                    <el-checkbox label="复选框dCdag">四川</el-checkbox>

                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">类目：</span>
                        <span style="font-size: 12px;color:#bcbcbc;">  (勾选类目代表可以接单的类目)</span>
                        <span style="font-size: 12px;color:red; ">+0.5金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <el-checkbox-group v-model="checkList2">
                            <div>
                                <el-checkbox label="a">服饰鞋包</el-checkbox>
                                <el-checkbox label="复选框B2">手机数码</el-checkbox>
                                <el-checkbox label="复选框C">家用电器</el-checkbox>
                                <el-checkbox label="禁用">美妆饰品</el-checkbox>
                                <el-checkbox label="选中且禁用">母婴用品</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="复选框aA">家具建材</el-checkbox>
                                <el-checkbox label="复选框aB">百货食品</el-checkbox>
                                <el-checkbox label="复选框aC">运动户外</el-checkbox>
                                <el-checkbox label="禁用a">文化娱乐</el-checkbox>
                                <el-checkbox label="选中且禁用a">生活服务</el-checkbox>

                            </div>
                            <div>
                                <el-checkbox label="复选框As">汽摩配件</el-checkbox>
                                <el-checkbox label="复选框Bs">游戏花费</el-checkbox>
                                <el-checkbox label="复选框dd">其他</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                    <div class="form-item" v-if="taskInfo!=='jdsj'&&taskInfo!=='jdtb'&&taskInfo!=='jdys'&&taskInfo!=='pddsj'&&taskInfo!=='albbsj'">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="margin-right: 10px">
                          <el-checkbox label="复选框As" style="color: #97A8BE">仅花呗号可接任务接单</el-checkbox>
                    </span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="form-item" v-if="taskInfo==='jdsj'||taskInfo==='jdtb'||taskInfo==='jdys'">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="margin-right: 10px">
                          <el-checkbox label="复选框As" style="color: #97A8BE">仅白条号可接单</el-checkbox>
                    </span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>

                    <div class="form-item" v-if="taskInfo!=='jdsj'&&taskInfo!=='jdtb'&&taskInfo!=='jdys'&&taskInfo!=='pddsj'&&taskInfo!=='albbsj'">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="margin-right: 10px">
                          <el-checkbox label="复选框As" style="color: #97A8BE">仅钻号可接任务接单</el-checkbox>
                    </span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="margin-right: 10px">
                          <el-checkbox label="复选框As" style="color: #97A8BE">仅限做过该商品浏览任务的用户接单</el-checkbox>
                    </span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">空包服务</span>
                        <span style="color: #97A8BE;margin-right: 10px">快递：</span>
                        <el-select v-model="value" size="small">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <span style="width: 30px;text-align: center;color: #97A8BE">重</span>
                        <el-input v-model="input15" size="small" style="width: 100px">
                            <template slot="append">KG</template>
                        </el-input>
                      <el-button style="margin-left: 20px" size="mini" type="danger" @click="delIncrement()">清 空</el-button>
                    </div>
                    <div class="step-title">第五步：选择增值服务</div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">添加图片说明</span>
                        <span style="font-size: 12px;color:#bcbcbc;">如有需要备注可添加图片，最多可添加3张，图片中不要显示店铺名或商品名，避免用户直接搜索！</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <el-upload
                                class="avatar-uploader"
                                action=""
                                style="margin-right: 20px;background-color: #F2F2F2"
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-upload
                                style="margin-right: 20px;background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-upload
                                style="background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">备注</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <div class="remark">
                            <p>重要！如果对任务有特殊要求，请在这里备注清楚，用户接单后会看到，最多100字（任务备注只限商家要求，平台负责传达信息不会强制要求用户按照要求执行）</p>
                        </div>
                    </div>
                </div>

                <div v-if="taskInfo==='jdliulan'">
                    <div class="step-title">第一步：填写商品信息</div>
                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">商品标题：</span>
                        <el-input class="w400" v-model="input" size="small" placeholder="请输入正确的商品全标题"></el-input>
                        <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
                    </div>
                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">商品链接：</span>
                        <el-input class="w400" v-model="input2" size="small" placeholder="请输入正确的商品网页端网址"></el-input>
                        <div class="form-err form-err-change">（仅用于平台审核，用户不可见）</div>
                    </div>
                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">商品主图：</span>
                        <el-upload
                                style="background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-button type="text" class="epshow">查看示例图</el-button>
                        <div style="position: relative;width: 480px;">
                            <div class="upload-d">上传“商品主图”，确保与搜索页面展示的图片一致。</div>
                            <div class="form-err upload-e">(如上传不成功请使用谷歌浏览器)</div>
                        </div>
                    </div>
                    <div class="form-item" style="margin-top: 35px">
                        <span class="form-required">*必填</span>
                        <span class="form-label">搜索展示价：</span>
                        <el-input v-model="input3" size="small" style="width: 130px">
                            <template slot="append">元</template>
                        </el-input>
                        <span class="form-label form-label-price">实际成交价：</span>
                        <el-input v-model="input4" size="small" style="width: 130px">
                            <template slot="append">元</template>
                        </el-input>

                        <span class="form-label form-label-price">付款人数：</span>
                        <el-input v-model="input5" size="small" style="width: 130px">
                            <template slot="append">人</template>
                        </el-input>

                    </div>


                    <div class="step-title">第二步：填写搜索信息</div>
                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">请选择店铺类型：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="margin-left: 14px;padding-top: 10px;" v-model="radio4"
                                            fill="red" text-color="#6666FF">

                                <el-radio label="1">综合</el-radio>
                                <el-radio label="2">综合直通车</el-radio>
                                <el-radio label="3">销量</el-radio>
                                <el-radio label="4">销量直通车</el-radio>
                                <el-radio label="6">店铺</el-radio>
                            </el-radio-group>
                        </div>
                    </div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">商品所在地：</span>
                        <el-input v-model="input10" size="small" style="width: 130px;margin-right: 10px"
                                  placeholder="全国">
                            <template slot="append">省</template>
                        </el-input>
                        <el-input v-model="input7" size="small" style="width: 130px">
                            <template slot="append">市</template>
                        </el-input>

                        <span class="form-required"></span>
                        <span class="form-label">筛选价格区间：</span>
                        <el-input v-model="input8" size="small" style="width: 130px">
                            <template slot="append">元</template>
                        </el-input>
                        <span style="color:#6666FF;width: 20px;font-size: 12px;text-align: center;">一</span>
                        <el-input v-model="input9" size="small" style="width: 130px">
                            <template slot="append">元</template>
                        </el-input>
                    </div>
                    <div class="form-item">
                        <span class="form-required">*必填</span>
                        <span class="form-label">选择搜索方式：</span>
                        <div class="form-block radio-list">
                            <el-radio-group class="item" style="padding-top: 10px;" v-model="ssfs"
                                            fill="red" text-color="#6666FF">
                                <el-radio label="gjc">关键词</el-radio>
                                <el-radio label="tkl">淘口令</el-radio>
                                <el-radio label="ewm">二维码</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="form-item" style="position: relative" v-for="item in addewm" v-if="ssfs==='ewm'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">搜索二维码：</span>
                        <el-upload
                                style="background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
                        <el-input v-model="input13" size="small" style="width: 140px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="form-item" style="margin-top: 0" v-if="ssfs==='ewm'">
                        <span class="form-required"></span>
                        <el-button type="text" @click="addewm<11?addewm++:addewm">+增加二维码</el-button>
                        <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个二维码）</span>
                    </div>
                    <div class="form-item" v-for="item in addtkl" v-if="ssfs==='tkl'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">搜索淘口令：</span>
                        <el-input v-model="input12" size="small" style="width: 350px">
                        </el-input>
                        <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
                        <el-input v-model="input13" size="small" style="width: 140px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="form-item" style="margin-top: 0" v-if="ssfs==='tkl'">
                        <span class="form-required"></span>
                        <el-button type="text" @click="addtkl<11?addtkl++:addtkl">+增加淘口令</el-button>
                        <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个淘口令）</span>
                    </div>
                    <div class="form-item" v-for="item in addKeyWord" v-if="ssfs==='gjc'">
                        <span class="form-required">*必填</span>
                        <span class="form-label">填写搜索信息：</span>
                        <el-input v-model="input12" size="small" style="width: 350px">
                        </el-input>
                        <span style="color: #97A8BE;width: 50px;text-align: center">添加</span>
                        <el-input v-model="input13" size="small" style="width: 140px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="form-item" style="margin-top: 0" v-if="ssfs==='gjc'">
                        <span class="form-required"></span>
                        <el-button type="text" @click="addKeyWord<11?addKeyWord++:addKeyWord">+增加关键词</el-button>
                        <span style="font-size: 12px;color:#bcbcbc;padding: 12px 0 ">（最多可添加10个关键词）</span>
                    </div>


                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"> <el-radio v-model="radio6" label="1"
                                                            style="color:#97A8BE;">任务发布时间</el-radio></span>
                        <el-date-picker
                                size="small"
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="选择开始时间"
                                end-placeholder="选择结束时间">
                        </el-date-picker>
                        <span style="color: #6666FF;width: 50px;text-align: center;font-size: 14px">放出</span>
                        <el-input v-model="input14" size="small" style="width: 140px">
                            <template slot="append">单</template>
                        </el-input>
                    </div>
                    <div class="clock" style="margin-left: 44px;">
                        <span style="color:#6666FF;font-weight: bold;font-size: 15px ">24小时细分：</span>
                        <ul class="clock-list">
                            <li class="item"><span class="sp1">0点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">1点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">2点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">3点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">4点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">5点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">6点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">7点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">8点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">9点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">10点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">11点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">12点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">13点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">14点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">15点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">16点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">17点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">18点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">19点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">20点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">21点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">22点</span> <input class="sp2" type="text"/></li>
                            <li class="item"><span class="sp1">23点</span> <input class="sp2" type="text"/></li>
                        </ul>
                    </div>
                    <div class="step-title">第四步：筛选用户截图</div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">搜索货比：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">搜索结果页</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">货比一家</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">货比两家</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">货比三家</el-button>
                            <span class="checkbox-tip">+0.5金币/单</span>
                        </div>
                    </div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">浏览商品：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">目标商品</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">店内商品1</el-button>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">店内商品2</el-button>
                        </div>

                    </div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">收藏加购：</span>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">收藏目标商品</el-button>
                            <span class="checkbox-tip">+0.5金币/单</span>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">加购目标商品</el-button>
                            <span class="checkbox-tip">+0.5金币/单</span>
                        </div>
                        <div class="checkbox-mr">
                            <el-checkbox></el-checkbox>
                            <el-button size="mini" class="checkbox-button-width">关注店铺</el-button>
                            <span class="checkbox-tip">+0.5金币/单</span>
                        </div>

                    </div>

                    <div class="step-title">第五步：选择增值服务</div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">常规服务</span>
                        <el-checkbox>任务置顶</el-checkbox>
                        <span style="font-size: 12px;color:#bcbcbc;">（优先派单）</span>
                        <span style="font-size: 12px;color:red; ">+2金币/任务</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">每单加赏</span>
                        <el-input v-model="input14" size="small" style="width: 100px">
                            <template slot="append">金</template>
                        </el-input>
                        <span style="font-size: 12px;color:#bcbcbc;margin-left: 10px"> (加赏佣金能调动用户的接单积极性)</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">千人千面</span>
                        <span style="color: #97A8BE;margin-right: 10px">性别：</span>
                        <el-radio-group class="item" style="margin-left: 14px;" v-model="radio8" fill="red"
                                        text-color="#6666FF">
                            <el-radio label="1" style="color: #97A8BE">男</el-radio>
                            <el-radio label="2" style="color: #97A8BE">女</el-radio>
                        </el-radio-group>
                        <span style="font-size: 12px;color:#bcbcbc;">（仅限选择性别的用户可接该任务）</span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">年龄：</span>
                        <el-radio-group class="item" style="margin-left: 14px;" v-model="radio9">
                            <el-radio label="1" style="color: #97A8BE">18-25</el-radio>
                            <el-radio label="2" style="color: #97A8BE">26-35</el-radio>
                            <el-radio label="23" style="color: #97A8BE">26-35</el-radio>
                        </el-radio-group>
                        <span style="font-size: 12px;color:#bcbcbc;">（仅限选择性别的用户可接该任务）</span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">地区：</span>
                        <span style="font-size: 12px;color:#bcbcbc;"> (勾选区域代表不能接单的区域，例如不需要新疆买家，就勾选新疆)</span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <div class="checkbox-list">
                            <el-checkbox-group v-model="checkList">
                                <div>
                                    <el-checkbox label="复选框A">上海</el-checkbox>
                                    <el-checkbox label="复选框B">江苏</el-checkbox>
                                    <el-checkbox label="复选框C">浙江</el-checkbox>
                                    <el-checkbox label="禁用">安徽</el-checkbox>
                                    <el-checkbox label="选中且禁用">江西</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框aA">北京</el-checkbox>
                                    <el-checkbox label="复选框aB">天津</el-checkbox>
                                    <el-checkbox label="复选框aC">山西</el-checkbox>
                                    <el-checkbox label="禁用a">山东</el-checkbox>
                                    <el-checkbox label="选中且禁用a">河北</el-checkbox>
                                    <el-checkbox label="选中且禁用a">内蒙古</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框As">湖南</el-checkbox>
                                    <el-checkbox label="复选框Bs">湖北</el-checkbox>
                                    <el-checkbox label="复选框dd">河南</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框sA">广东</el-checkbox>
                                    <el-checkbox label="复选框sB">广西</el-checkbox>
                                    <el-checkbox label="复选框sC">福建</el-checkbox>
                                    <el-checkbox label="复选框sd">海南</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框dA">辽宁</el-checkbox>
                                    <el-checkbox label="复选框dB">吉林</el-checkbox>
                                    <el-checkbox label="复选框dC">黑龙江</el-checkbox>
                                </div>
                                <div>
                                    <el-checkbox label="复选框dAd">陕西</el-checkbox>
                                    <el-checkbox label="复选框dBd">新疆</el-checkbox>
                                    <el-checkbox label="复选框dCd">甘肃</el-checkbox>
                                    <el-checkbox label="复选框dCdg">宁夏</el-checkbox>
                                    <el-checkbox label="复选框dCds">青海</el-checkbox>

                                </div>
                                <div>
                                    <el-checkbox label="复选框dAdag">重庆</el-checkbox>
                                    <el-checkbox label="复选框dBdaf">云南</el-checkbox>
                                    <el-checkbox label="复选框dCdad">贵州</el-checkbox>
                                    <el-checkbox label="复选框dCdar">西藏</el-checkbox>
                                    <el-checkbox label="复选框dCdag">四川</el-checkbox>

                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">类目：</span>
                        <span style="font-size: 12px;color:#bcbcbc;">  (勾选类目代表可以接单的类目)</span>
                        <span style="font-size: 12px;color:red; ">+0.5金/单</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <el-checkbox-group v-model="checkList2">
                            <div>
                                <el-checkbox label="a">服饰鞋包</el-checkbox>
                                <el-checkbox label="复选框B2">手机数码</el-checkbox>
                                <el-checkbox label="复选框C">家用电器</el-checkbox>
                                <el-checkbox label="禁用">美妆饰品</el-checkbox>
                                <el-checkbox label="选中且禁用">母婴用品</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="复选框aA">家具建材</el-checkbox>
                                <el-checkbox label="复选框aB">百货食品</el-checkbox>
                                <el-checkbox label="复选框aC">运动户外</el-checkbox>
                                <el-checkbox label="禁用a">文化娱乐</el-checkbox>
                                <el-checkbox label="选中且禁用a">生活服务</el-checkbox>

                            </div>
                            <div>
                                <el-checkbox label="复选框As">汽摩配件</el-checkbox>
                                <el-checkbox label="复选框Bs">游戏花费</el-checkbox>
                                <el-checkbox label="复选框dd">其他</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="margin-right: 10px">
                          <el-checkbox label="复选框As" style="color: #97A8BE">仅白条号可接单</el-checkbox>
                    </span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>

                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="margin-right: 10px">
                          <el-checkbox label="复选框As" style="color: #97A8BE">仅限做过该商品浏览任务的用户接单</el-checkbox>
                    </span>
                        <span style="font-size: 12px;color:red; ">+1金/单</span>
                    </div>
                    <div class="step-title">第五步：选择增值服务</div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label">添加图片说明</span>
                        <span style="font-size: 12px;color:#bcbcbc;">如有需要备注可添加图片，最多可添加3张，图片中不要显示店铺名或商品名，避免用户直接搜索！</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <el-upload
                                class="avatar-uploader"
                                action=""
                                style="margin-right: 20px;background-color: #F2F2F2"
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-upload
                                style="margin-right: 20px;background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-upload
                                style="background-color: #F2F2F2"
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                        >
                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <span style="color: #97A8BE;margin-right: 10px">备注</span>
                    </div>
                    <div class="form-item">
                        <span class="form-required"></span>
                        <span class="form-label"></span>
                        <div class="remark">
                            <p>重要！如果对任务有特殊要求，请在这里备注清楚，用户接单后会看到，最多100字（任务备注只限商家要求，平台负责传达信息不会强制要求用户按照要求执行）</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form" v-show="active===2">
                <div v-if="taskInfo==='tbll'">
                    <table class="table">

                        <tr>
                            <td width="50%">任务时长</td>
                            <td width="50%">1天</td>
                        </tr>
                        <tr>
                            <td>任务单数</td>
                            <td>200单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='zb'">
                            <td>直播观看价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='ydj'">
                            <td>引导进店价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='ydj'">
                            <td>深度浏览价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='ydr'">
                            <td>阅读人数价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='ydc'">
                            <td>阅读次数价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='bb'||tbllForm.lltype==='zb'">
                            <td>点赞价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='ssj'">
                            <td>搜索加购价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='spj'">
                            <td>商品加购价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='dp'">
                            <td>店铺收藏价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='sps'">
                            <td>商品收藏价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='sss'">
                            <td>搜索收藏价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='cn'">
                            <td>猜你喜欢价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='mr'">
                            <td>每日好店价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='tb'">
                            <td>每日好店价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='pc'">
                            <td>PC流量价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='app'">
                            <td>APP流量价格</td>
                            <td>0.2元/单</td>
                        </tr>
                        <tr v-if="tbllForm.lltype==='app'">
                            <td>展现价格</td>
                            <td>0.1元/单</td>
                        </tr>
                        <tr>
                            <td>合计</td>
                            <td style="color: #6666FF">60元</td>
                        </tr>
                    </table>
                    <div class="table-tatol" style="color: #97A8BE;">账户余额：<span class="main-txt spm8"
                                                                                style="color:red;">200.00</span>元
                    </div>
                </div>
                <div v-if="false">
                    <table class="table">
                        <tr>
                            <th>收费明细</th>
                            <th>数量</th>
                            <th>小计</th>
                        </tr>
                        <tr>
                            <td class="mw50">
                                <div class="flexCSB">平台服务费：<span class="value">2.8元/单</span></div>
                            </td>
                            <td>100单</td>
                            <td>280.00元</td>
                        </tr>
                        <tr>
                            <td class="mw50">
                                <div class="flexCSB">平台代发：<span class="value">3.5元/单</span></div>
                            </td>
                            <td>100单</td>
                            <td>350.00元</td>
                        </tr>
                        <tr>
                            <td class="mw50">
                                <div class="flexCSB">本金返款：<span class="value">10元/单</span></div>
                            </td>
                            <td>100单</td>
                            <td>1000.00元</td>
                        </tr>
                        <tr>
                            <td class="mw50">
                                <div class="flexCSB">千人千面：<span class="value">7金/单</span></div>
                            </td>
                            <td>100单</td>
                            <td>700.00金</td>
                        </tr>
                        <tr>
                            <td class="mw50">
                                <div class="flexCSB">任务置顶：<span class="value">5元/单</span></div>
                            </td>
                            <td>100单</td>
                            <td>500.00元</td>
                        </tr>
                        <tr>
                            <td class="mw50">
                                <div class="flexCSB">基础佣金：<span class="value">10金/单</span></div>
                            </td>
                            <td>100单</td>
                            <td>1000.00金</td>
                        </tr>
                        <tr class="last">
                            <td> 合计</td>
                            <td colspan="2"><span>本金：</span> <span class="down">1630.00</span> <span
                                    class="opp">元</span> +
                                <span>佣金：</span> <span class="down">1700.00</span> <span class="opp">金</span></td>
                        </tr>
                    </table>
                    <div class="table-tatol">账户余额：<span class="main-txt spm8">200.00</span>元</div>
                </div>


            </div>
        </div>

        <div style="text-align: center; margin-top: 65px">
            <el-button class="activity-button" style="margin-right: 80px;width: 100px" :disabled="active===0"
                       size="mini" @click="handleNextOrPre(false)">上一步
            </el-button>
            <el-button class="activity-button" style="width: 100px" v-if="active < 2" @click="handleNextOrPre(true)"
                       size="mini">下一步
            </el-button>
            <el-button class="btn-theme" v-if="active >= 2" size="mini" @click="handleSuccess">付款并发布任务</el-button>
        </div>


        <el-dialog width="25%" top="30vh" :visible.sync="dialogFormVisible">
            <p style="color:#6666FF;text-align: center;font-size: 19px;font-weight: bold ">恭喜，发布成功！</p>
        </el-dialog>

    </div>
</template>

<script>
const sjslurl = require('@/assets/web/sjsl.jpg')
import {getStoreTypeList} from '@/api/shop'
export default {
  name: "activity",
  data() {
    return {
      sjslShow:sjslurl,
      tbllForm: {
        type: 'll',
        lltype: 'app',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        num: 1,
      },
      active: 0,
      radio: '',
      radio2: '',
      radio3: '',
      radio4: '',
      radio5: '',
      radio6: '',
      radio7: '',
      radio8: '',
      radio9: '',
      radio10: '',
      input: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      input10: '',
      input11: '',
      input12: '',
      input13: '',
      input14: '',
      input15: '',
      input16: '',
      imageUrl: '',
      imageUrl2: '',
      imageUrl3: '',
      checkList: [],
      checkList2: [],
      value1: '',
      value: '',
      dialogFormVisible: false,
      options: [{
        value: '1',
        label: '韵达快递'
      }, {
        value: '2',
        label: '顺风快递'
      },],
      dpTypeData: 'tb',
      tbTaskData: 'tbll',
      taskInfo: 'tbll',
      addKeyWord: 1,
      addShop: 1,
      addtkl: 1,
      addewm: 1,
      ssfs: 'gjc',
      xpjs: 'pthp',
      xzzp: 'pthp',
      hdlx: 'tqg',
      storeType:[]
    }

  },
  created(){
    this.init()
  },
  methods: {
    init() {
      getStoreTypeList().then(response => {
        this.storeType = response.data
      })
    },
    tbTask(val) {
      this.taskInfo = val
    },
    dpType(val) {
      if (val === 'tb') {
        this.tbTaskData = 'tbll'
        this.taskInfo = 'tbll'
      } else if (val === 'jd') {
        this.tbTaskData = 'jdll'
        this.taskInfo = 'jdll'
      } else if (val === 'pdd') {
        this.tbTaskData = 'pddll'
        this.taskInfo = 'pddll'
      } else if (val === 'albb') {
        this.tbTaskData = 'albbsj'
        this.taskInfo = 'albbsj'
      }


    },
    tbllFormType(val) {
      if (val === 'll') {
        this.tbllForm.lltype = 'app'
      } else if (val === 'sc') {
        this.tbllForm.lltype = 'sss'
      } else if (val === 'jg') {
        this.tbllForm.lltype = 'ssj'
      } else if (val === 'wt' || val === 'jdzb') {
        this.tbllForm.lltype = 'zb'
      } else if (val === 'wz') {
        this.tbllForm.lltype = 'ydc'
      }


    },
    handleNextOrPre(jd) {
      if (jd) {
        if (this.active < 3)
          this.active++
      } else {
        if (this.active > 0)
          this.active--
      }
    },
    handleSuccess() {
      this.dialogFormVisible = true
      setTimeout(function() {
        this.dialogFormVisible = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
    .radio-none >>> .el-radio__input {
        display: none;
    }

    .radio-none >>> .el-radio {
        margin-right: 8px;
    }

    .radio-none >>> .el-radio__label {
        padding-left: 0;
    }

    .radio-none >>> .el-radio--mini.is-bordered {
        padding: 6px 9px 0 10px
    }

    .form .form-action {
        width: 3em;
    }

    .form .form-action i {
        font-size: 26px;
        color: #6666FF
    }

    .boder-all {
        border: 1px solid #BCBCBC
    }

    .table td {
        border: 1px solid #6666FF;
    }

    .activity-button {
        border-color: #6666FF !important;
        color: #6666FF !important;
    }

    .radio-list .item {
        padding-left: 10px;
        display: flex;
        color: #333;
    }

    .radio-list .radio {
        margin-right: 4px;
    }

    .radio-list .radio-tip {
        color: #BCBCBC;
        font-size: 14px;
    }

    .radio-list-logo {
        width: 25px;
        position: relative;
        top: 8px;
        margin-right: 5px;
    }

    .radio-list >>> .el-radio__input.is-checked + .el-radio__label {
        color: #606266;
    }

    .radio-list >>> .el-radio__input.is-checked .el-radio__inner {
        border-color: #6666FF;
        background: #6666FF;
    }

    .radio-list-new {
        width: 30px;
        height: 30px;
        position: relative;
        top: 1px;
    }

    .form .checkbox {
        margin-left: 14px;
    }

    .item-img {
        width: 30px;
        height: 30px;
    }

    .radio-list-y >>> .el-radio-button__inner, .el-radio-group {
        font-size: initial;
        display: inline-block;
        line-height: unset;
        vertical-align: middle;
    }

    .addShop {
        position: absolute;
        right: 0;
        top: 13px;
    }

    .step-title {
        margin-top: 24px;
        line-height: 32px;
        text-align: center;
        background-color: #6666FF;
        color: white;
        font-size: 16px;
    }

    .w400 {
        width: 400px;
    }

    .form .form-err-change {
        padding: 6px 0 6px 54px;
        font-size: 12px;
    }

    .avatar-uploader {
        border: 1px dashed #6666FF;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .epshow {
        position: absolute;
        left: 173px;
        bottom: -29px;
    }

    .upload-d {
        font-size: 12px;
        position: absolute;
        bottom: 0px;
        color: #bcbcbc;
    }

    .upload-e {
        position: absolute;
        bottom: 0px;
        right: 0;
        font-size: 12px;
    }

    .form .form-label {
        min-width: 7em;
    }

    .form-label-price {
        min-width: 5em !important;
        margin-left: 39px;
    }

    .form-label >>> .el-radio__input.is-checked .el-radio__inner {
        border-color: #6666FF;
        background: #6666FF;
    }

    .form-label >>> .el-radio__input.is-checked + .el-radio__label {
        color: #606266;
    }

    .clock-list {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        text-align: center;
    }

    .clock-list .item {
        margin-bottom: 16px;
        width: 7.7%;
        display: flex;
        flex-direction: column;
        border: 1px solid #6666FF;
    }

    .clock-list .sp1 {
        line-height: 32px;
        background-color: #6666FF;
        color: white;
    }

    .clock-list .sp2 {
        padding: 0 8px;
        width: 100%;
        height: 32px;
        text-align: center;
        font-size: 16px;
        color: #666;
        box-sizing: border-box;
    }

    .checkbox-mr >>> .el-checkbox__inner {
        width: 28px;
        height: 28px
    }

    .checkbox-mr >>> .el-checkbox__input.is-checked .el-checkbox__inner::after {
        transform: rotate(45deg) scaleY(3);
    }

    .checkbox-mr >>> .el-checkbox__inner::after {
        left: 9px;
        top: 7px;
        width: 8px;
    }

    .checkbox-mr {
        margin-right: 20px;
        position: relative;
        height: 54px;
    }

    .checkbox-tip {
        color: red;
        position: absolute;
        font-size: 12px;
        bottom: 0;
        width: 70px;
        right: 0;
    }

    .checkbox-button-width {
        width: 82px
    }

    .form-item >>> .el-button--mini, .el-button--mini.is-round {
        padding: 7px 7px;
    }

    .checkbox-list {
        border: 1px solid #BCBCBC;
        width: 500px;
        height: 280px;
        border-radius: 5px;
        padding: 10px
    }

    .remark {
        border: 1px dashed #BCBCBC;
        width: 500px;
        height: 100px;
        border-radius: 5px;
        padding: 10px;
        color: #BCBCBC;
        font-size: 12px
    }

    .activity-page >>> .el-dialog__header {
        padding: 0
    }

    .activity-page >>> .el-dialog__body {
    padding: 2px
  }

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /deep/ input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
