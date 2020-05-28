const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  balance: state => state.user.balance,
  reSetData: state => state.user.reSetData,
  brokerageBalance: state => state.user.brokerageBalance,
  freezeBalance: state => state.user.freezeBalance,
  auxiliaryFlag: state => state.user.auxiliaryFlag,
  expressFlag: state => state.user.expressFlag,
  view: state => state.view.allView
}
export default getters
