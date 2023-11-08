const Mock = require('mockjs')
const Random = Mock.Random

const employeeList = []
const COUNT = 100

// 扩展展位符
// Random.extend({
//   job: function() {
//       const jobs = ['实习生','技术人员','产品经理']
//       return this.pick(jobs)
//   }
// })
Mock.Random.extend({
  phone: function() {
    var phonePrefix = ['132', '135', '189'] // 自定义前缀
    return this.pick(phonePrefix) + Mock.mock(/\d{8}/) // Number()
  }
})

for (let i = 0; i < COUNT; i++) {
  employeeList.push(Mock.mock({
    id: '@increment',
    name: Random.cname(),
    IDNumber: Random.id(),
    age: Random.integer(20, 50),
    phone: '@phone',
    gender: '@integer(0,1)',
    job: '@integer(0,3)',
    entryDate: '@date',
    address: `${Random.province()}-${Random.city()}-${Random.county()}`
  }))
}

module.exports = [
  {
    url: '/mock/employee/list',
    method: 'get',
    response: config => {
      let resList = []
      const total = employeeList.length
      const { limit = 10, page = 1, name, job, gender } = config.query

      resList = employeeList.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
        if (job && item.job !== +job) return false
        if (gender && item.gender !== +gender) return false
        return true
      })
      resList = resList.filter((item, index) => (index < limit * page && index >= limit * (page - 1)))

      // console.log(resList,123);
      return {
        code: 200,
        data: {
          total,
          list: resList
        }
      }
    }
  },
  {
    url: '/mock/employee/create',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: 'create success'
      }
    }
  },
  {
    url: '/mock/employee/delete',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: 'delete success'
      }
    }
  },
  {
    url: '/mock/employee/update',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: 'update success'
      }
    }
  }
]
