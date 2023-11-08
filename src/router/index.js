import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/layout'

/**
 *  property description
 *  hidden:true  =>  在sidebar中隐藏
 *  meta:{
 *    title => 菜单名称
 *    icon => 菜单icon
 *    roles => 权限标识数组
 *  }
 *
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/tree',
    component: Layout,
    redirect: '/tree/tree1',
    meta: { title: '普通权限路由', icon: 'tree' },
    children: [
      {
        path: 'tree1',
        name: 'Tree1',
        component: () => import('@/views/tree/tree1'),
        meta: { title: 'Tree 1' }
      },
      {
        path: 'tree2',
        name: 'Tree2',
        component: () => import('@/views/tree/tree2'),
        meta: { title: 'Tree2' },
        redirect: '/tree/tree2/tree2-1',
        children: [
          {
            path: 'tree2-1',
            name: 'Tree2-1',
            component: () => import('@/views/tree/tree2/tree2-1'),
            meta: { title: 'Tree 2-1' }
          },
          {
            path: 'tree2-2',
            name: 'Tree2-2',
            component: () => import('@/views/tree/tree2/tree2-2'),
            meta: { title: 'Tree 2-2' }
          }
        ]
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    meta: { role: 'admin', title: '管理员权限路由', icon: 'user' },
    children: [
      {
        path: '/user/table',
        name: 'Table',
        component: () => import('@/views/table'),
        meta: { title: 'Table' /* icon:'table' */ }
      },
      {
        path: '/user/tab',
        name: 'Tab',
        component: () => import('@/views/tab'),
        meta: { title: 'Tab' /* icon:'tab' */ }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
