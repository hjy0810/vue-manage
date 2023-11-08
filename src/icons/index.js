import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// icons图标自动加载
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)

// const cache = {};
// req.keys().forEach((key) => (cache[key] = req(key)));
// console.log(cache,23);

// 全局注册svg-icon组件
Vue.component('SvgIcon', SvgIcon)
