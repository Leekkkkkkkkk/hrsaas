const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // 头像
  staffPhoto: state => state.user.userInfo.staffPhoto,
  // 名字
  username: state => state.user.userInfo.username,
  // 公司名称
  company: state => state.user.userInfo.company
}
export default getters