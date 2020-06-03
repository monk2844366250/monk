<template>
  <el-container class="shop">
    <el-header style="padding: 0; margin-bottom: 40px;height:120px; background-color: white">
      <div class="admin-info">
        <div class="container">
          <el-dropdown style="margin-right:24px;" @command="handleCommand">
            <span class="el-dropdown-link">
              <!-- 账户： -->
              {{ username }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="password">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出帐号</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <span style="margin-right:44px;">161641616816<i class="el-icon-arrow-down el-icon--right"></i></span> -->
          <span style="margin-right:104px">
            账户余额：
            <span class="red-txt">{{ balance }}</span> 元
          </span>
        </div>
      </div>
      <el-row :gutter="20" class="head-title">
        <el-col :span="4">
          <img style="width: 120px; height: 100%;" :src="logoUrl" fit="contain">
        </el-col>
        <el-col v-if="expressFlag" :span="3">
          <router-link
            :to="{ path:'/admin/college'}"
            :class="{'menu-active':(nowPath.indexOf('/admin/college') > -1 )}"
          >电商学院
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link :to="{ path:'/admin/marking'}" :class="{'menu-active':(nowPath === '/admin/marking')}">商品打标
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link :to="{ path:'/admin/audit'}" :class="{'menu-active':(nowPath === '/admin/audit')}">审号工具
          </router-link>
        </el-col>
        <el-col v-if="expressFlag" :span="3">
          <div @click="handleXiaoLu">电商工具</div>
        </el-col>
        <el-col v-if="expressFlag" :span="3">
          <router-link :to="{ path:'/admin/resources'}" :class="{'menu-active':(nowPath === '/admin/resources')}">电商资源
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link :to="{ path:'/admin/shop/notice'}" :class="{'menu-active':(nowPath === '/admin/shop/notice')}">
            商家中心
          </router-link>
        </el-col>
        <el-col :span="2">
          <router-link :to="{ path:'/admin/deposit'}" :class="{'menu-active':(nowPath === '/admin/deposit')}">充值
          </router-link>
        </el-col>
        <el-col :span="3">
          <router-link :to="{ path:'/admin/helpcenter'}" :class="{'menu-active':(nowPath === '/admin/helpcenter')}">帮助中心
          </router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding-left: 0;padding-right: 0;padding-top: 0;width: 1100px;margin: auto">
      <chat />
      <section class="app-main">
        <router-view :key="key" />
        <div style="width:300px;margin:0 auto; padding:20px 0;" />
      </section>
    </el-main>
  </el-container>
</template>

<script>
const url = require('@/assets/web/logo.png')
import chat from '@/components/chat'

export default {
  name: 'Admin',
  components: {
    chat
  },
  data() {
    return {
      logoUrl: url,
      nowPath: '',
      banlance: null,
      username: null,
      expressFlag: null
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
    balance: {
      get() {
        return this.$store.getters.balance
      },
      set(val) {
        this.$store.commit('SET_BALANCE', val)
      }
    }
  },
  watch: {
    key: function(val) {
      this.nowPath = this.$route.path
    }
  },
  created() {
    this.nowPath = this.$route.path
    this.balance = this.$store.getters.balance
    this.username = this.$store.getters.username
    this.expressFlag = this.$store.getters.expressFlag
  },
  methods: {
    handleXiaoLu() {
      this.$message({
        message: '正在开发中，敬请期待！',
        type: 'warning',
        showClose: true,
        duration: 3000
      })
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('Logout', this.loginForm).then(() => {
          this.$router.push({ path: '/login' })
        })
      } else if (command === 'password') {
        this.$router.push({ path: '/password' })
      }
    }
  }
}
</script>

<style scoped>
  .shop {
    background-color: rgb(242, 242, 242);
  }

  .head-title {
    width: 1100px;
    margin: auto !important;
    display: flex;
    align-items: center;
    height: 72px;
  }

  .app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .menu-active {
    color: red;
    padding-bottom: 8px;
    position: relative;
  }

  .menu-active:after {
    content: "";
    display: block;
    width: 35px;
    height: 2px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: red;
  }

  .admin-info {
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
  }

  .admin-info .container {
    height: 56px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
