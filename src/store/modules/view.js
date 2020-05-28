const view = {
  state: {
    curView: '',
    allView: [{
      path: '/admin/shop/notice',
      title: '公告中心'
    }]
  },
  mutations: {
    ADD_VIEW: (state, viewTab) => {
      state.allView.push(Object.assign({}, viewTab, {
        title: viewTab.title || ''
      }))
    },
    DEL_VIEW: (state, viewTab) => {
      for (const [i, v] of state.allView.entries()) {
        if (v.path === viewTab.path && i !== 0) {
          state.allView.splice(i, 1)
          break
        }
      }
    }

  },
  actions: {
    addView({ commit }, viewTab) {
      commit('ADD_VIEW', viewTab)
    },
    delView({ commit }, viewTab) {
      return new Promise(resolve => {
        commit('DEL_VIEW', viewTab)
        resolve()
      })
    }
  }
}

export default view
