<template>
  <div>
    <div class="audit-title">基本信息</div>
    <div class="table-style">
      <div class="table-title bl1 bt1 br1">买家</div>
      <div class="table-content bt1">{{resData.wangwang}}</div>
      <div class="table-title bl1 bt1 br1">买家信誉</div>
      <div class="table-content bt1">{{resData.buyerGoodNum}}</div>
      <div class="table-title bl1 bt1 br1">商家信誉</div>
      <div class="table-content bt1 br1">{{resData.sellerTotalNum}}</div>

      <div class="table-title bl1 bt1 br1">性别</div>
      <div class="table-content bt1">{{resData.gender}}</div>
      <div class="table-title bl1 bt1 br1">收到好评率</div>
      <div class="table-content bt1">{{resData.receivedRate}}</div>
      <div class="table-title bl1 bt1 br1">注册日期</div>
      <div class="table-content bt1 br1">{{resData.wwcreatedStr}}</div>

      <div class="table-title bl1 bt1 br1">淘龄</div>
      <div class="table-content bt1">{{resData.taoling?resData.taoling+"年+":""}}</div>
      <div class="table-title bl1 bt1 br1">买家总周平均</div>
      <div class="table-content bt1" style="padding-right: 30px">
        {{resData.weekCreditAverage}}
        <el-popover
          placement="top-start"
          title
          width="200"
          trigger="hover"
          content="买家账户注册起到现在总的周平均评价点数"
        >
          <svg-icon
            slot="reference"
            icon-class="wenhao"
            style=" font-size: 25px;position: absolute;right: 4px;top: 7px;color: red"
          />
        </el-popover>
      </div>
      <div class="table-title bl1 bt1 br1">查询日期</div>
      <div class="table-content bt1 br1">{{curDate}}</div>
      <!-- <div class="table-content-one bl1 bt1 br1" v-html="resData.renZheng"></div> -->

      <div class="table-title bl1 bt1 br1">实名认证</div>
      <div class="table-content bt1">{{realName}}</div>
      <div class="table-title bl1 bt1 br1">会员等级</div>
      <div class="table-content bt1 br1 table-content-long">
        <span class="red-txt">{{vip}}</span>
        <img v-if="level&&level==1" src="@/assets/images/level.png" />
        <img v-if="level&&level==2" src="@/assets/images/level2.png" />
      </div>

      <div class="table-title bl1 bt1 br1">给出好评率</div>
      <div class="table-content bt1">{{resData.sentRate?resData.sentRate+"%":""}}</div>
      <div class="table-title bl1 bt1 br1">给出中差评数</div>
      <div class="table-content-long bt1 br1">{{resData.badTotal}}</div>

      <div class="table-title bl1 bt1 br1 bb1">周查询</div>
      <div
        class="table-content-big-long bt1 bb1 br1 red-txt"
        style="text-align:left;padding-left:24px;"
      >{{resData.weekCount?"该用户近一周查询商家数："+ resData.weekCount +" &nbsp;&nbsp;&nbsp;" +"上一周查询商家数："+resData.countBefore:""}}</div>
    </div>

    <div class="audit-title">近期购买记录</div>
    <div class="table-style">
      <div class="table-title bl1 bt1 br1">时间范围</div>
      <div
        class="table-content bt1 br1 table-content-record"
        style="background-color: rgb(242,242,242);"
      >{{resData.purchaseRecords[0]?resData.purchaseRecords[0].startDate+' 至 '+resData.purchaseRecords[0].endDate:""}}</div>
      <div
        class="table-content bt1 br1 table-content-record"
        style="background-color: rgb(242,242,242);"
      >{{resData.purchaseRecords[1]?resData.purchaseRecords[1].startDate+' 至 '+resData.purchaseRecords[1].endDate:""}}</div>
      <div
        class="table-content bt1 br1 table-content-record"
        style="background-color: rgb(242,242,242);"
      >{{resData.purchaseRecords[2]?resData.purchaseRecords[2].startDate+' 至 '+resData.purchaseRecords[2].endDate:""}}</div>
      <div
        class="table-content bt1 br1 table-content-record"
        style="background-color: rgb(242,242,242);"
      >{{resData.purchaseRecords[3]?resData.purchaseRecords[3].startDate+' 至 '+resData.purchaseRecords[3].endDate:""}}</div>

      <div class="table-title bl1 bt1 br1 bb1">购买记录</div>
      <div
        class="table-content bt1 bb1 br1 table-content-record red-txt"
      >{{resData.purchaseRecords[0]?"购物确认收货数："+resData.purchaseRecords[0].count:"无购买记录"}}</div>
      <div
        class="table-content bt1 bb1 br1 table-content-record red-txt"
      >{{resData.purchaseRecords[1]?"购物确认收货数："+resData.purchaseRecords[1].count:""}}</div>
      <div
        class="table-content bt1 bb1 br1 table-content-record red-txt"
      >{{resData.purchaseRecords[2]?"购物确认收货数："+resData.purchaseRecords[2].count:""}}</div>

      <div
        class="table-content bt1 bb1 br1 table-content-record red-txt"
      >{{resData.purchaseRecords[3]?"购物确认收货数："+resData.purchaseRecords[3].count:""}}</div>
    </div>

    <div class="audit-title">用户被打标记录</div>
    <div class="table-style">
      <div class="table-title bl1 bt1 br1 table-content-record2">打标类型</div>
      <div
        class="table-content bt1 br1 table-content-record2"
        style="background-color: rgb(242,242,242);padding-right: 30px"
      >
        狐狸
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="用各种方式骗你钱了！跑单，威胁，骗子，打假，差评，淘客等！"
        >
          <svg-icon
            slot="reference"
            icon-class="wenhao"
            style=" font-size: 25px;position: absolute;right: 4px;top: 7px;color: red"
          />
        </el-popover>
      </div>
      <div
        class="table-content bt1 br1 table-content-record2"
        style="background-color: rgb(242,242,242);padding-right: 30px"
      >
        降权处理
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="被稽查系统判定虚假交易过导致商家单品降权的帐号，下面的数字为降权店铺数量，实际降权的店铺数是大于等于显示出来的数字的！"
        >
          <svg-icon
            slot="reference"
            icon-class="wenhao"
            style=" font-size: 25px;position: absolute;right: 4px;top: 7px;color: red"
          />
        </el-popover>
      </div>
      <div
        class="table-content bt1 br1 table-content-record2"
        style="background-color: rgb(242,242,242);padding-right: 30px"
      >
        云黑名单
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="显示数量是这个号代表被淘宝服务市场第三方应用（比如**店长，*牛，旺店**，爱**易等）拦截过的号，可能是差评，敲诈，骗子类的一些恶人，云黑名单来自于第三方应用海量的黑号数据库！"
        >
          <svg-icon
            slot="reference"
            icon-class="wenhao"
            style=" font-size: 25px;position: absolute;right: 4px;top: 7px;color: red"
          />
        </el-popover>
      </div>

      <div class="table-title bl1 bt1 br1 bb1 table-content-record2">打标次数</div>
      <div class="table-content bt1 bb1 br1 table-content-record2">{{resData.fox}}</div>
      <div class="table-content bt1 bb1 br1 table-content-record2">{{resData.jiangNum}}</div>
      <div class="table-content bt1 bb1 br1 table-content-record2">{{resData.yunBlack}}</div>
    </div>

    <div class="audit-title">
      相关类目
      <el-popover
        placement="top-start"
        width="200"
        trigger="hover"
        content="突破官方限制，透视买家的精准人群画像，实时查询买家曾浏览过、购买过的类目产品，透视类目消费水平、权重分，分析账号在类目上的需求程度，补单轻松高权重！"
      >
        <span slot="reference" class="audit-tag">标签玩法</span>
        <!-- <svg-icon slot="reference" icon-class="wenhao" style=" font-size: 25px;color: red" /> -->
      </el-popover>
    </div>
    <div class="table-style">
      <div class="table-title bl1 bt1 bb1 br1 table-content-record3">标签名称</div>
      <div class="table-title bt1 bb1 table-content-record3">所属类目</div>
      <div class="table-title bl1 bt1 br1 bb1 table-content-record3">权重分</div>
      <div
        v-if="findList.length>0"
        v-for="(item,index) in findList"
        style="display: flex"
        :key="index"
      >
        <div class="table-content bl1 bb1 br1 table-content-record3">{{item.name}}</div>
        <div class="table-content bb1 br1 table-content-record3">{{item.path}}</div>
        <div class="table-content bb1 br1 table-content-record3">{{item.fen}}</div>
      </div>
    </div>

    <div class="audit-title">常见问题</div>
    <div>
      <h5>1.查黑号的数据是否准确？</h5>调用千万级黑号数据库，大数据采集，数据真实且精准，可以有效排除市面上大部分的降权黑号、狂刷号、狐狸号。
    </div>
    <div>
      <h5>2.相关类目是什么？有什么作用？</h5>买家曾浏览过、购买过或是猜你喜欢出现过的类目产品，通过该功能可以看出买家的最近标签是什么，可以用于判断一个号的相关类目标签以及消费力度，提高我们补单的标签效果。
    </div>
    <div style="margin-bottom: 50px">
      <h5>3.如何选择一个优质的买家号？</h5>买家信誉2心以上，注册时间大于半年，周平均在3以下，周查询在20以下，必须要实名认证。购买记录一个月内不超过40个确认收货；狐狸、降权处置、云黑名单的号一律排除
      ；相关类目有符合自己类目标签的号优先。
    </div>
  </div>
</template>

<script>
import { getAuditkResultList, getAuditkFindList } from "@/api/auditk";
import { parseTime } from "@/utils/index";

export default {
  name: "result",
  props: {
    searchKey: ""
    // resData: {},
    // findList: []
  },
  data() {
    return {
      resData: {
        renZheng: "",
        sentRate: "",
        gender: "",
        sellerTotalNum: "",
        buyerGoodNum: "",
        jiangNum: "",
        wangwang: "",
        tbvip_level: "",
        countBefore: "",
        weekCount: "",
        fox: "",
        wwcreatedStr: "",
        isOk: "",
        weekCreditAverage: "",
        badTotal: "",
        receivedRate: "",
        purchaseRecords: [],
        yunBlack: "",
        taoling: ""
      },
      findList: [],
      curDate: "",
      realName: "",
      level: "",
      vip: ""
    };
  },
  methods: {
    getFind() {
      var data = { wwNum: this.searchKey };
      getAuditkFindList(data).then(response => {
        if (response.code === 0) {
          this.findList = JSON.parse(response.msg).data;
        } else {
          this.findList = [];
          this.$message({
            message: response.msg,
            type: "warning",
            showClose: true,
            duration: 2000
          });
        }
      });
    },
    getResult() {
      var data = { wwNum: this.searchKey };
      getAuditkResultList(data).then(response => {
        this.$emit("resultBack");
        if (response.code === 0) {
          var res2 = JSON.parse(response.msg);
          console.log(res2);
          if (res2.code == 0) {
            this.resData = res2.data;
            this.getFind();
            this.strToReal();
            this.curDate = parseTime(new Date());
          } else {
            this.$message({
              message: res2.msg,
              type: "warning",
              showClose: true,
              duration: 2000
            });
            this.curDate = "";
            this.findList = [];
          }
        } else {
          this.$message({
            message: response.msg,
            type: "warning",
            showClose: true,
            duration: 2000
          });
          this.curDate = "";
          this.findList = [];
        }
      });
    },
    strToReal() {
      var str = this.resData.renZheng;
      var strReal = str.match(/green">(\S*)<\/span>/);
      var strlv1 = str.match(/ddc18d">(\S*)<\/span>/);
      var strlv2 = str.match(/ff7c00">(\S*)<\/span>/);
      var strvip = str.match(/fa7c02">(\S*)<\/span>/);
      if (strReal) this.realName = strReal[1];
      if (strvip) {
        var str2 = strvip[1].replace("会员", "");
        this.vip = str2;
      }
      if (strlv1) this.level = 1;
      if (strlv2) this.level = 2;
      // this.realName=strReal?strReal[1]:"";
      // this.level=strlv1?strlv1[1]:"";
      // this.level2=strlv2?strlv2[1]:"";
      // this.level2=strvip?strlv2[1]:"";
    }
  }
};
</script>

<style scoped>
.audit-title {
  color: rgb(102, 102, 255);
  border-left: 5px solid rgb(102, 102, 255);
  padding-left: 5px;
  font-size: 18px;
  margin-top: 20px;
}

.table-style {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
}

.table-title {
  width: 145px;
  height: 40px;
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  background-color: rgb(242, 242, 242);
}

.table-content {
  width: 215px;
  height: 40px;
  text-align: center;
  padding: 10px 0;
  position: relative;
}

.table-content-long {
  width: 575px;
  height: 40px;
  text-align: left;
  padding: 10px 0;
  text-align: left;
  padding-left: 24px;
  display: flex;
  align-items: center;
}
.table-content-long img {
  margin-left: 6px;
}

.table-content-one strong {
  width: 215px;
  display: block;
}

.table-content-big-long {
  width: 935px;
  height: 40px;
  text-align: center;
  padding: 10px 0;
}

.table-content-record {
  width: 233px;
}

.table-content-record2 {
  width: 269.8px;
}

.table-content-record3 {
  width: 180px;
}
.table-content-record3:nth-child(3n + 2) {
  width: 720px;
}

.br1 {
  border-right: 1px solid rgb(188, 188, 188);
}

.bl1 {
  border-left: 1px solid rgb(188, 188, 188);
}

.bt1 {
  border-top: 1px solid rgb(188, 188, 188);
}

.bb1 {
  border-bottom: 1px solid rgb(188, 188, 188);
}
.audit-tag {
  margin-left: 24px;
  color: #c00;
  border: 1px solid #c00;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
