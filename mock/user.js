const tokens = {
  admin: {
    token: 'admin-token'
  },
  normal: {
    token: 'normal-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: '超级管理员',
    avatar: 'https://img.zcool.cn/community/019fb65925bc32a801216a3ef77f7b.png@1280w_1l_2o_100sh.png',
    name: 'Super-Admin'
  },
  'normal-token': {
    roles: ['normal'],
    introduction: '普通用户',
    avatar: 'https://img2.baidu.com/it/u=351990390,4250122652&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    name: 'Normal-User'
  }
}

module.exports = [
  // user login
  {
    url: '/mock/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 403,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/mock/user/info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 403,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/mock/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
