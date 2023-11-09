const path = require('path')

// 定义resolve方法，获取绝对路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/vue2-manage',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development', // 生产构建时禁用 eslint-loader
  productionSourceMap: false,
  // 一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例
  // 允许对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {
    // 配置svg默认规则排除icons目录中svg文件处理
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 新增icons规则，设置svg-sprite-loader处理icons目录中svg文件
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
    // code split优化
    config.when(process.env.NODE_ENV === 'development', config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // 把 layout 单独打包，复用
          layout: {
            name: 'layout',
            test: resolve(__dirname, './src/layout'),
            priority: 40
          },
          // 把 element-ui 单独打包
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          // 将 vue 相关的库单独打包，减少node_modules的chunk体积。
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue(.*)[\\/]/,
            chunks: 'initial',
            priority: 20
          },
          // 把 node_modules 中其他的包全部打包到 libs 中
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 权重最低，优先考虑前面内容
            chunks: 'initial'
          },
          // 剩余模块打包
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 0,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
