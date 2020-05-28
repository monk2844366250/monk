import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import LayoutAdmin from '@/views/adminLayout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/password',
    component: () => import('@/views/login/password'),
    hidden: true
  },
  {
    path: '/admin',
    component: LayoutAdmin,
    redirect: '/admin/college',
    children: [{
      path: 'college',
      name: 'college',
      component: () => import('@/views/college/index')
    },
    {
      path: '/blankpage',
      name: '/blankpage',
      component: () => import('@/views/shop/components/blankpage')
    }, {
      path: 'college/detail',
      name: 'collegeDetail',
      component: () => import('@/views/college/detail')
    }, {
      path: 'marking',
      name: 'marking',
      component: () => import('@/views/marking/index')
    }, {
      path: 'audit',
      name: 'audit',
      component: () => import('@/views/audit/index')
    }, {
      path: 'deposit',
      name: 'shopDeposit',
      component: () => import('@/views/deposit/index')
    }, {
      path: 'resources',
      name: 'resources',
      component: () => import('@/views/resources/index')
    }, {
      path: 'helpcenter',
      name: 'helpcenter',
      component: () => import('@/views/helpcenter/index')
    }, {
      path: 'shop',
      redirect: '/admin/shop/notice',
      component: () => import('@/views/shop/index'),
      children: [{
        path: 'notice',
        name: 'notice',
        meta: {
          title: '公告中心'
        },
        component: () => import('@/views/shop/components/notice')
      }, {
        path: 'noticeDetail/:noticeId',
        name: 'noticeDetail',
        meta: {
          title: '公告详情'
        },
        component: () => import('@/views/shop/components/noticeDetail')
      }, {
        path: 'activity',
        name: 'activity',
        meta: {
          title: '发布任务'
        },
        component: () => import('@/views/shop/components/activity')
      }, {
        path: 'store',
        name: 'store',
        meta: {
          title: '店铺管理'
        },
        component: () => import('@/views/shop/components/store')
      }, {
        path: 'recharge',
        name: 'recharge',
        meta: {
          title: '账户充值'
        },
        component: () => import('@/views/shop/components/deposit')
      }, {
        path: 'funds',
        name: 'funds',
        meta: {
          title: '资金明细'
        },
        component: () => import('@/views/shop/components/funds')
      }, {
        path: 'task',
        name: 'task',
        meta: {
          title: '任务管理'
        },
        component: () => import('@/views/shop/components/task')
      }, {
        path: 'taskDetail/:taskId',
        name: 'taskDetail',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskDetail')
      }, {
        path: 'order',
        name: 'order',
        meta: {
          title: '订单管理'
        },
        component: () => import('@/views/shop/components/order')
      }, {
        path: 'orderDetail/:taskId',
        name: 'orderDetail',
        meta: {
          title: '订单详情'
        },
        component: () => import('@/views/shop/components/orderDetail')
      }, {
        path: 'express',
        name: 'express',
        meta: {
          title: '快递管理'
        },
        component: () => import('@/views/shop/components/express')
      }, {
        path: 'parcel',
        name: 'parcel',
        meta: {
          title: '快递代发'
        },
        component: () => import('@/views/shop/components/parcel')
      }, {
        path: 'parcelMng',
        name: 'parcelMng',
        meta: {
          title: '代发管理'
        },
        component: () => import('@/views/shop/components/parcelMng')
      }, {
        path: 'single',
        name: 'single',
        meta: {
          title: '单号管理'
        },
        component: () => import('@/views/shop/components/single')
      }, {
        path: 'appeal',
        name: 'appeal',
        meta: {
          title: '申诉中心'
        },
        component: () => import('@/views/shop/components/appeal')
      }, {
        path: 'extend',
        name: 'extend',
        meta: {
          title: '我的推广'
        },
        component: () => import('@/views/shop/components/extend')
      }, {
        path: 'blacklist',
        name: 'blacklist',
        meta: {
          title: '黑名单'
        },
        component: () => import('@/views/shop/components/blacklist')
      }, {
        path: 'feedback',
        name: 'feedback',
        meta: {
          title: '意见反馈'
        },
        component: () => import('@/views/shop/components/feedback')
      }, {
        path: 'components/resjtb',
        name: 'resjtb',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/resjtb')
      }, {
        path: 'components/resjjd',
        name: 'resjjd',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/resjjd')
      }, {
        path: 'components/resjtbwjt',
        name: 'resjtbwjt',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/resjtbwjt')
      }, {
        path: 'components/retbll',
        name: 'retbll',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/retbll')
      }, {
        path: 'components/retbtb',
        name: 'retbtb',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/retbtb')
      }, {
        path: 'components/retbtk',
        name: 'retbtk',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/retbtk')
      }, {
        path: 'components/retbys',
        name: 'retbys',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/retbys')
      }, {
        path: 'components/retbzp',
        name: 'retbzp',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/retbzp')
      }, {
        path: 'components/retbcjbq',
        name: 'retbcjbq',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/retbcjbq')
      }, {
        path: 'components/retbdb',
        name: 'retbdb',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/retbdb')
      }, {
        path: 'components/rejdll',
        name: 'rejdll',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/rejdll')
      }, {
        path: 'components/rejdtb',
        name: 'rejdtb',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/rejdtb')
      }, {
        path: 'components/rejdys',
        name: 'rejdys',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/rejdys')
      }, {
        path: 'components/repddll',
        name: 'repddll',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/repddll')
      }, {
        path: 'components/resjpdd',
        name: 'resjpdd',
        meta: {
          title: '重新发布'
        },
        component: () => import('@/views/shop/components/reactivityComponents/resjpdd')
      }, {
        path: 'components/reactivity',
        name: 'reactivity',
        meta: {
          title: '发布任务'
        },
        component: () => import('@/views/shop/components/reactivity')
      }, {
        path: 'components/repay',
        name: 'repay',
        meta: {
          title: '发布任务'
        },
        component: () => import('@/views/shop/components/reactivityComponents/repay')
      }, {
        path: 'components/tasksjtb',
        name: 'tasksjtb',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasksjtb')
      }, {
        path: 'components/tasksjjd',
        name: 'tasksjjd',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasksjjd')
      }, {
        path: 'components/tasksjtbwjt',
        name: 'tasksjtbwjt',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasksjtbwjt')
      }, {
        path: 'components/tasktbll',
        name: 'tasktbll',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasktbll')
      }, {
        path: 'components/tasktbtb',
        name: 'tasktbtb',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasktbtb')
      }, {
        path: 'components/tasktbtk',
        name: 'tasktbtk',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasktbtk')
      }, {
        path: 'components/tasktbys',
        name: 'tasktbys',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasktbys')
      }, {
        path: 'components/tasktbzp',
        name: 'tasktbzp',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasktbzp')
      }, {
        path: 'components/tasktbcjbq',
        name: 'tasktbcjbq',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasktbcjbq')
      }, {
        path: 'components/tasktbdb',
        name: 'tasktbdb',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasktbdb')
      }, {
        path: 'components/taskjdll',
        name: 'taskjdll',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/taskjdll')
      }, {
        path: 'components/taskjdtb',
        name: 'taskjdtb',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/taskjdtb')
      }, {
        path: 'components/taskjdys',
        name: 'taskjdys',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/taskjdys')
      }, {
        path: 'components/taskpddll',
        name: 'taskpddll',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/taskpddll')
      }, {
        path: 'components/tasksjpdd',
        name: 'tasksjpdd',
        meta: {
          title: '任务详情'
        },
        component: () => import('@/views/shop/components/taskactivityComponents/tasksjpdd')
      }]

    }]

  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
