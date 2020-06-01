<template>
  <div>
    <div class="shop" />
    <el-row :gutter="10">
      <el-col :span="3">
        <div class="side">
          <div class="sideHead">
            <div class="avatarWrap" src="circleUrl">
              <img v-if="imageUrl" src="../../assets/images/homeAvatar.jpg" class="avatar">
            </div>
            <span class="idNo">{{ userDataId }}</span>
          </div>
          <div class="sideNav">
            <router-link
              :to="{ path:'/admin/shop/notice'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/notice') > -1 || nowPath.indexOf('/admin/shop/noticeDetail') > -1}]"
              @click.native="jump('/admin/shop/notice')"
            >
              <svg-icon class="icon" icon-class="gonggao" />
              公告中心
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/activity'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/activity') > -1}]"
              @click.native="jump('/admin/shop/activity')"
            >
              <svg-icon class="icon" icon-class="zhifeiji" />
              发布任务
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/store'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/store') > -1}]"
              @click.native="jump('/admin/shop/store')"
            >
              <svg-icon class="icon" icon-class="dianpu" />
              店铺管理
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/recharge'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/recharge') > -1}]"
              @click.native="jump('/admin/shop/recharge')"
            >
              <svg-icon class="icon" icon-class="chongzhi" />
              账户充值
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/funds'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/funds') > -1}]"
              @click.native="jump('/admin/shop/funds')"
            >
              <svg-icon class="icon" icon-class="zijinmingxi" />
              资金明细
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/task'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/task') > -1}]"
              @click.native="jump('/admin/shop/task')"
            >
              <svg-icon class="icon" icon-class="renwuguanli" />
              任务管理
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/order'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/order') > -1}]"
              @click.native="jump('/admin/shop/order')"
            >
              <svg-icon class="icon" icon-class="dingdanguanli" />
              订单管理
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/express'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/express') > -1}]"
              @click.native="jump('/admin/shop/express')"
            >
              <svg-icon class="icon" icon-class="kuaidiguanli" />
              补单空包
            </router-link>
            <router-link
              v-if="auxiliaryFlag"
              :to="{ path:'/admin/shop/parcel'}"
              :class="['item',{'cur':nowPath==='/admin/shop/parcel'}]"
              @click.native="jump('/admin/shop/parcel')"
            >
              <svg-icon class="icon" icon-class="kuaidi" />
              快递代发
            </router-link>
            <router-link
              v-if="auxiliaryFlag"
              :to="{ path:'/admin/shop/parcelMng'}"
              :class="['item',{'cur':nowPath==='/admin/shop/parcelMng'}]"
              @click.native="jump('/admin/shop/parcelMng')"
            >
              <svg-icon class="icon" icon-class="daifa" />
              代发管理
            </router-link>
            <router-link
              v-if="auxiliaryFlag"
              :to="{ path:'/admin/shop/single'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/single') > -1}]"
              @click.native="jump('/admin/shop/single')"
            >
              <svg-icon class="icon" icon-class="chongzhi" />
              单号管理
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/appeal'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/appeal') > -1}]"
              @click.native="jump('/admin/shop/appeal')"
            >
              <svg-icon class="icon" icon-class="gantanhao" />
              申诉中心
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/extend'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/extend') > -1}]"
              @click.native="jump('/admin/shop/extend')"
            >
              <svg-icon class="icon" icon-class="qrcode" />
              我的推广
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/blacklist'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/blacklist') > -1}]"
              @click.native="jump('/admin/shop/blacklist')"
            >
              <svg-icon class="icon" icon-class="heimingdan" />
              黑名单
            </router-link>
            <router-link
              :to="{ path:'/admin/shop/feedback'}"
              :class="['item',{'cur':nowPath.indexOf('/admin/shop/feedback') > -1}]"
              @click.native="jump('/admin/shop/feedback')"
            >
              <svg-icon class="icon" icon-class="yijianfankui" />
              意见反馈
            </router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="mainNav">
          <router-link
            v-for="(item, index) in viewTab"
            :key="index"
            :to="{ path:item.path}"
            :class="['item',{'cur':nowPath===item.path}]"
          >
            {{ item.title }}
            <svg-icon v-if="index!==0" class="icon icon-close" icon-class="guanbi" @click.prevent.stop="delViewTags(item)" />
          </router-link>

        </div>

        <div class="page-load">
          <router-view :key="key" />
          <!--<notice v-if="activeTab === 'notice'" @detail="handleNoticDetail"></notice>-->
          <!--<notice-detail v-if="activeTab === 'noticeDetail'" :noticeId="noticeId"></notice-detail>-->
          <!--<activity v-if="activeTab === 'activity'"></activity>-->
          <!--<store v-if="activeTab === 'store'"></store>-->
          <!--<deposit v-if="activeTab === 'recharge'"></deposit>-->
          <!--<funds v-if="activeTab === 'funds'"></funds>-->
          <!--<task v-if="activeTab === 'task'" @detail="handleTaskDetail"></task>-->
          <!--<task-detail v-if="activeTab === 'taskDetail'" ></task-detail>-->
          <!--<order v-if="activeTab === 'order'" @detail="handleOrderDetail"></order>-->
          <!--<order-detail v-if="activeTab === 'orderDetail'" ></order-detail>-->
          <!--<parcel v-if="activeTab === 'parcel'" ></parcel>-->
          <!--<parcel-mng v-if="activeTab === 'parcelMng'" ></parcel-mng>-->
          <!--<single v-if="activeTab === 'single'" ></single>-->
          <!--<appeal v-if="activeTab === 'appeal'" ></appeal>-->
          <!--<extend v-if="activeTab === 'extend'" ></extend>-->
          <!--<blacklist v-if="activeTab === 'blacklist'" ></blacklist>-->
          <!--<feedback v-if="activeTab === 'feedback'" ></feedback>-->
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'

export default {
  name: 'Shop',
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      activeTab: 'notice',
      noticeId: '',
      nowPath: '',
      auxiliaryFlag: '',
      viewTab: [],
      userDataId: '',
      userDataImg: '',
      imageUrl: ''
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { path } = to
    if (this.viewTab.some(v => v.path === path)) { next() } else if (this.viewTab.length >= 999) {
      this.$message({
        message: '页签不超过8个',
        type: 'warning'
      })
    } else {
      this.addViewTags(to)
      next()
    }
  },
  watch: {

    key: function(val) {
      this.nowPath = this.$route.path
    }
  },
  created() {
    this.nowPath = this.$route.path
    this.viewTab = this.$store.getters.view
    this.auxiliaryFlag = this.$store.getters.auxiliaryFlag
    if (!this.viewTab.some(v => v.path === this.nowPath)) {
      this.addViewTags(this.$route)
    }
  },
  mounted() {
    this.userId()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {

    },
    // // 路由跳转
    jump(url) {
      // 判断是否是当前路由
      console.log('跳转')
      if (url === this.$route.path) {
        this.$router.push({
          path: '/blankpage',
          query: url
        })
      } else {
        this.$router.push({
          path: url
        })
      }
    },
    userId() {
      var myCookie = document.cookie
      var arr = myCookie.split('=')
      for (var i = 0; i <= arr.length; i++) {
        if (arr[i] === 'Admin-Token') {
          var num = arr[i + 1]
        }
      }
      var token = 'token=' + num
      getInfo(token).then(response => {
        this.userDataId = 'ID:' + response.data.id
        this.imageUrl = response.data.avatar
        if (this.imageUrl === null) {
          this.imageUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
      })
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    addViewTags(to) {
      const { path } = to
      if (this.viewTab.some(v => v.path === path)) return

      if (path) {
        const view = {
          path: to.path,
          title: to.meta.title
        }
        this.$store.dispatch('addView', view)
      }
      // return false
    },
    delViewTags(url) {
      const { path } = url
      if (path) {
        const view = {
          path: url.path,
          title: url.title
        }
        this.$store.dispatch('delView', view).then(() => {
          if (this.isActive(view)) {
            // this.$router.push({ path: '/admin/shop/notice' })
            this.$router.go(-1)
          }
        })
      }
      // return false
    },
    handleMenu(menu, name) {
      if (this.viewTab.length >= 999) {
        if (this.viewTab.some(v => v.key === menu)) {
          this.activeTab = menu
        } else {
          this.$message({
            message: '页签不超过8个',
            type: 'warning'
          })
        }
      } else {
        this.activeTab = menu
        if (menu !== 'notice') {
          this.addView(menu, name)
        }
      }
    },
    handleTab(menu) {
      this.activeTab = menu
      console.log('handleTab的this.activeTab数据', this.activeTab)
    },
    addView(menu, name) {
      if (this.viewTab.some(v => v.key === menu)) return
      if (this.viewTab.length >= 999) {
        this.$message({
          message: '页签不超过999个',
          type: 'warning'
        })
        return
      }
      this.viewTab.push({
        'name': name,
        'key': menu
      })
      this.viewTab = this.viewTab.slice(-3)
      console.log('标签页123', this.viewTab)
    },
    delView(index, item) {
      if (this.activeTab === item.key) {
        this.viewTab.splice(index, 1)
        console.log('路由显示', this.viewTab)
        this.viewTab = this.viewTab.slice(-3)
        console.log('标签页', this.viewTab)
        const change = index - 1
        if (change >= 0) {
          this.activeTab = this.viewTab[change].key
        } else {
          this.activeTab = 'notice'
        }
      } else {
        this.viewTab.splice(index, 1)
        this.viewTab = this.viewTab.slice(-8)
      }
    },
    handleNoticDetail(val) {
      this.addView('noticeDetail', '公告详情')
      this.activeTab = 'noticeDetail'
      this.noticeId = val
    },
    handleTaskDetail(val) {
      this.addView('taskDetail', '任务详情')
      this.activeTab = 'taskDetail'
    },
    handleOrderDetail(val) {
      this.addView('orderDetail', '订单详情')
      this.activeTab = 'orderDetail'
    }
  }
}
</script>

<style scoped>
    .icon {
        font-size: 19px;
        color: #E7E7E7;
    }

    .icon-close {
        color: #6666FF;
    }

    .page-load {
        position: relative;
        /* min-height: 683px; */
        min-height: 732px;
        padding: 40px;
        font-size: 16px;
        background-color: white;
        box-sizing: border-box;
    }

</style>
