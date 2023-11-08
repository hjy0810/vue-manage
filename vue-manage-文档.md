## vue manage 文档

### 依赖和配置

#### element-ui

#### sass、node-sass 和 sass-loader
后两个需要注意版本问题
解决方案来源于：[使用vue-cli初始化一个vue2的项目后，在该项目中引入sass编写css样式的步骤及踩坑](https://blog.csdn.net/weixin_42375150/article/details/130658309)
GitHub上 node-sass 和 sass-loader 版本对照表：[https://github.com/sass/node-sass](https://github.com/sass/node-sass)
```
npm install sass -D
node -v //v16.20.0，需要选择的 node-sass 版本为6.0+
npm install node-sass@6.0.1 --save-dev
npm install sass-loader@10.2.0 --save-dev
```
lang='scss'
#### normalize.css 
```
npm install --save normalize.css
//use in main.js
import 'normalize.css'
```
#### js-cookie 处理vuex持久化
```
npm install js-cookie --save
```
#### svg-sprite-loader 处理svg
```
npm install svg-sprite-loader --save
```
封装svg-icon组件
how to use:[如何在 Vue 项目中优雅的使用 icon ？](https://mp.weixin.qq.com/s/8Tr1GtE4J1PVa8PYvCUgXw)

#### mockjs 模拟数据
```
npm install mockjs --save-dev 
```
使用mockjs时，使用CommonJS模块语法
#### axios
```
 npm install axios
```

#### screenfull 全屏
```
// 其他版本报错，需要webpack配置
npm install screenfull@4.2.0 --save
// use
import screenfull from 'screenfull/dist/screenfull'
```
#### nprogress 
```
npm install --save nprogress 
```
#### eslint eslint-plugin-vue
```
npm install --save-dev eslint eslint-plugin-vue
```


### 问题总结
#### How to Share Variables Between Javascript and Sass
1. scss 文件导出scss变量
```
//variable.scss
:export{
  menuBg:$menu-bg; //需要冒号
}
```
2. 在vue的<script>中引入，并把它变成响应式数据
```
import variable from '@/styles/variable.scss'
//
computed: {
    variables() {
      return variables
    }
  }
```
#### 带命名空间的store，使用时前面加上命名前缀
#### 递归组件，要有name属性

#### sidebar 采用固定定位，flex的bug是在页面向下滑动脱离 app-container 区域时，上方会有留白，下方同理

#### 组件上绑定原生事件无法触发
```js
// Screenfull.vue
<svg-icon :icon-class="isFullscreen ? 'exit-fullscreen':'fullscreen'" @click="handleScreenFull"/>

//svgIcon.vue
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>
```
方案1: 使用事件修饰符 .native
方案2: 自组件使用  v-on="$listeners" 将父组件所有事件绑定到字组件的最外层元素上

### ERROR
#### Error: Cannot find module 'babel-preset-es2015'
原因：element按需引入
```  
// babel.config.js
presets: [
    '@vue/cli-plugin-babel/preset',
    ["es2015", { "modules": false }]
  ]
```
解决方案：修改babel.config.js的内容，将es2015改为@babel/preset-env
```
presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ]
```

#### Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
import 和 module.exports的混用导致，前者ES6，后者commonJS，webpack会报错

#### element-ui 日期组件报错
tips：保证后台和前端日期格式的一致
  format="yyyy-MM-dd" //显示的数据格式
  value-format="yyyy-MM-dd"  //绑定的数据格式

#### Redirected when going from "/login?redirect=%2Fdashboard" to "/dashboard" via a navigation guard.
// vue-router 特定版本(3.0-3.2)在导航守卫调用 next({ ...to, replace: true }) 会报重定向会经过路由守卫的错误
// https://github.com/PanJiaChen/vue-element-admin/issues/2764
解决方案：
1. 换vue-router版本
2. 
```
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
```
