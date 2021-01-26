import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/',
    component: Layout,
    redirect: '/report/single',
    meta: {
      title: '报表查询',
      icon: 'dashboard'
    },
    children: [
      {
        path: '/report/single',
        name: 'SingleWell',
        component: () => import('@/views/api/report/SingleWell.vue'),
        meta: { title: '单井台账', icon: 'dashboard' }
      },
      {
        path: '/report/detail',
        name: 'AccountDetail',
        component: () => import('@/views/api/report/AccountDetail.vue'),
        meta: { title: '账目明细', icon: 'dashboard' }
      },
      {
        path: '/report/workload',
        name: 'WorkloadAccount',
        component: () => import('@/views/api/report/WorkloadAccount.vue'),
        meta: { title: '工作统计', icon: 'dashboard' }
      },
      {
        path: '/report/daily-report',
        name: 'DailyReport',
        component: () => import('@/views/api/report/DailyReport.vue'),
        meta: { title: '每日报表', icon: 'dashboard' }
      }
    ]
  }
  // {
  //   path: '/order/in',
  //   component: Layout,
  //   meta: {
  //     title: '回收管理',
  //     icon: 'form'
  //   },
  //   children: [
  //     {
  //       path: 'input',
  //       name: 'OrderInInput',
  //       component: () => import('@/views/api/order/OrderInInput.vue'),
  //       meta: { title: '回收单录入', icon: 'form' }
  //     },
  //     {
  //       path: 'modify',
  //       name: 'OrderInModify',
  //       component: () => import('@/views/api/order/OrderInModify.vue'),
  //       meta: { title: '回收单修改', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/order/out',
  //   component: Layout,
  //   meta: {
  //     title: '出库管理',
  //     icon: 'form'
  //   },
  //   children: [
  //     {
  //       path: 'input',
  //       name: 'OrderInInput',
  //       component: () => import('@/views/api/order/OrderOutInput.vue'),
  //       meta: { title: '出库单录入', icon: 'form' }
  //     },
  //     {
  //       path: 'modify',
  //       name: 'OrderOutModify',
  //       component: () => import('@/views/api/order/OrderOutModify.vue'),
  //       meta: { title: '出库单修改', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/order/internal',
  //   component: Layout,
  //   meta: {
  //     title: '调拨管理',
  //     icon: 'form'
  //   },
  //   children: [
  //     {
  //       path: 'input',
  //       name: 'OrderInternalInput',
  //       component: () => import('@/views/api/order/OrderInternalInput.vue'),
  //       meta: { title: '调拨单录入', icon: 'form' }
  //     },
  //     {
  //       path: 'modify',
  //       name: 'OrderInternalModify',
  //       component: () => import('@/views/api/order/OrderInternalModify.vue'),
  //       meta: { title: '调拨单修改', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/general',
  //   component: Layout,
  //   name: '综合管理',
  //   meta: {
  //     title: '综合管理',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'product',
  //       name: 'ProductDetailSetting',
  //       component: () => import('@/views/api/product/ProductDetailSetting.vue'),
  //       meta: { title: '管材规格', icon: 'nested' }
  //     },
  //     {
  //       path: 'area',
  //       name: 'AreaSetting',
  //       component: () => import('@/views/api/area/AreaSetting.vue'),
  //       meta: { title: '井场信息', icon: 'nested' }
  //     },
  //     {
  //       path: 'store-account',
  //       name: 'StoreAccount',
  //       component: () => import('@/views/api/store/StoreAccount.vue'),
  //       meta: { title: '库存盘点', icon: 'nested' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   meta: {
  //     title: '系统管理',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: '个人信息', icon: 'user' }
  //     }
  //     // {
  //     //   path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //     //   meta: { title: '账号分配', icon: 'example' }
  //     // },
  //     // {
  //     //   path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //     //   meta: { title: '账号分配', icon: 'example' }
  //     // }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  {
    path: '/order/in',
    component: Layout,
    meta: {
      title: '回收管理',
      icon: 'form',
      roles: ['ROLE_ADMIN']
    },
    children: [
      {
        path: 'input',
        name: 'OrderInInput',
        component: () => import('@/views/api/order/OrderInInput.vue'),
        meta: { title: '回收单录入', icon: 'form', roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'modify',
        name: 'OrderInModify',
        component: () => import('@/views/api/order/OrderInModify.vue'),
        meta: { title: '回收单修改', icon: 'form', roles: ['ROLE_ADMIN'] }
      }
    ]
  },
  {
    path: '/order/out',
    component: Layout,
    meta: {
      title: '出库管理',
      icon: 'form', roles: ['ROLE_ADMIN']
    },
    children: [
      {
        path: 'input',
        name: 'OrderOutInput',
        component: () => import('@/views/api/order/OrderOutInput.vue'),
        meta: { title: '出库单录入', icon: 'form', roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'modify',
        name: 'OrderOutModify',
        component: () => import('@/views/api/order/OrderOutModify.vue'),
        meta: { title: '出库单修改', icon: 'form', roles: ['ROLE_ADMIN'] }
      }
    ]
  },
  {
    path: '/order/internal',
    component: Layout,
    meta: {
      title: '调拨管理',
      icon: 'form', roles: ['ROLE_ADMIN']
    },
    children: [
      {
        path: 'input',
        name: 'OrderInternalInput',
        component: () => import('@/views/api/order/OrderInternalInput.vue'),
        meta: { title: '调拨单录入', icon: 'form', roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'modify',
        name: 'OrderInternalModify',
        component: () => import('@/views/api/order/OrderInternalModify.vue'),
        meta: { title: '调拨单修改', icon: 'form', roles: ['ROLE_ADMIN'] }
      }
    ]
  },
  {
    path: '/general',
    component: Layout,
    name: '综合管理',
    meta: {
      title: '综合管理',
      icon: 'nested', roles: ['ROLE_ADMIN']
    },
    children: [
      {
        path: 'product',
        name: 'ProductDetailSetting',
        component: () => import('@/views/api/product/ProductDetailSetting.vue'),
        meta: { title: '管材规格', icon: 'nested', roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'area',
        name: 'AreaSetting',
        component: () => import('@/views/api/area/AreaSetting.vue'),
        meta: { title: '井场信息', icon: 'nested', roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'store-account',
        name: 'StoreAccount',
        component: () => import('@/views/api/store/StoreAccount.vue'),
        meta: { title: '库存盘点', icon: 'nested', roles: ['ROLE_ADMIN'] }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: '系统设置',
    meta: {
      title: '系统设置',
      icon: 'example', roles: ['ROLE_ADMIN']
    },
    children: [
      {
        path: 'personal-setting',
        name: 'PersonalSetting',
        component: () => import('@/views/api/setting/PersonalSetting.vue'),
        meta: { title: '个人设置', icon: 'user', roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'account-setting',
        name: 'AccountSetting',
        component: () => import('@/views/api/setting/AccountSetting.vue'),
        meta: { title: '账号管理', icon: 'example', roles: ['ROLE_ADMIN'] }
      }
    ]
  }
]
export const errorRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  { path: '*', redirect: '/404', hidden: true }
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
