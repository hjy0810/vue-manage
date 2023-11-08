const Mock = require('mockjs')
const employee = require('./employee')
const user = require('./user')
const { param2Obj } = require('./utils')

const mocks = [
  ...employee,
  ...user
]

function mockXHR() {
  for (const i of mocks) {
    // Mock.mock( rurl, rtype, function( options ) )
    // 记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
    Mock.mock(new RegExp(i.url), i.method, XHR2ExpressResponse(i.response))
    // Mock.mock(new RegExp(i.url),i.method || 'get',{
    //   code: 200,
    //   status: "1",
    //   message: "success",
    //   data:i.response
    // })
  }
}

function XHR2ExpressResponse(response) {
  return function(options) {
    let res = null
    const { url, body } = options
    if (response instanceof Function) {
      res = response({
        body: JSON.parse(body), // post 请求参数
        query: param2Obj(url) // get 请求参数
      })
    } else {
      res = response
    }
    return res
  }
}

module.exports = {
  mocks,
  mockXHR
}
