import { asyncRoutes, constantRoutes } from '@/router'
import { deepClone } from '@/utils'

/**
 * 通过roles递归过滤 asyncRoutes
 * @param {Object} routes
 * @returns
 */
function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const temp = deepClone(route)
    // 没有 meta
    if (hasPermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }
      res.push(temp)
    }
  })
  return res
}

/**
 * 没有权限:当前 route.meta.roles 存在，并且其中不包含当前权限列表 roles 中的每一项
 * 有权限:
 *    1. 路由中没有标注 meta.roles 数组
 *    2. 标注了，并且包含 当前权限列表 roles 中的任意一项
 * @param {*} roles
 * @param {*} route
 * @returns
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      let accessRoutes
      if (roles.includes('admin')) {
        // admin 用户拥有所有权限
        accessRoutes = asyncRoutes || []
      } else {
        // 不是 admin 用户，执行异步路由的过滤
        accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
