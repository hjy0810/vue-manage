
const getters = {
  accessRoutes: state => state.permission.routes,
  roles: state => state.user.roles,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  opened: state => state.app.opened
}

export default getters
