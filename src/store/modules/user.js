import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setLongToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getCosToken } from "@/api/index";
const user = {
  state: {
    token: getToken(),
    username: '',
    avatar: '',
    balance: '',
    brokerageBalance: '',
    freezeBalance: '',
    reSetData: '', // 存放重新发布数据
    orderData: '', // 存放订单详情数据
    auxiliaryFlag: true,
    expressFlag: true
  },

  mutations: {
    // RESET_STATE: (state) => {
    //   Object.assign(state, getDefaultState())
    // },
    // set_orderData是订单详情的存放数据
    SET_RESETDATA: (state, reSetData) => {
      state.reSetData = reSetData
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AUXILIARY_FLAG: (state, auxiliaryFlag) => {
      state.auxiliaryFlag = auxiliaryFlag
    },
    SET_EXPRESSFLAG: (state, expressFlag) => {
      state.expressFlag = expressFlag
    },
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_BALANCE: (state, balance) => {
      state.balance = balance
    },
    SET_BROKERAGEBALANCE: (state, brokerageBalance) => {
      state.brokerageBalance = brokerageBalance
    },
    SET_FREEZEBALANCE: (state, freezeBalance) => {
      state.freezeBalance = freezeBalance
    },
    SET_ORDERDATA: (state, orderData) => {
      state.orderData = orderData
    },
  },

  actions: {
    // fileToken

    // user login
    Login({ commit }, userInfo) {
      // const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        var remember = userInfo.remember
        delete userInfo.remember
        login(userInfo).then(response => {
          if (response.code !== 0) {
            reject(response)
          } else {
            const { data } = response
            var token = data
            commit('SET_TOKEN', token)
            if (remember) {
              setLongToken(token)
            } else {
              setToken(token)
            }

            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // get user info
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { username, avatar, balance, brokerageBalance, freezeBalance, auxiliaryFlag, expressFlag } = data

          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
          commit('SET_BALANCE', balance)
          commit('SET_BROKERAGEBALANCE', brokerageBalance)
          commit('SET_FREEZEBALANCE', freezeBalance)
          commit('SET_AUXILIARY_FLAG', auxiliaryFlag)
          commit('SET_EXPRESSFLAG', expressFlag)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // user logout
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          // commit('RESET_STATE')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // remove token
    ResetToken({ commit }) {
      return new Promise(resolve => {
        removeToken() // must remove  token  first
        // commit('RESET_STATE')
        resolve()
      })
    }
  }
}

export default user
