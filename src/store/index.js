import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

// require all files in a directory
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './xxx.js' => xxx
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // get module
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// console.log(modules,1121);

export default new Vuex.Store({
  modules,
  getters
})
