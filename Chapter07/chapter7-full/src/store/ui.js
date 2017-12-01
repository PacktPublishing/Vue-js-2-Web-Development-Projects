export default {
  namespaced: true,

  state () {
    return {
      showCart: false,
    }
  },

  getters: {
    showCart: state => state.showCart,
  },

  mutations: {
    showCart (state, value) {
      state.showCart = value
    },
  },

  actions: {
    setShowCart ({ commit }, value) {
      commit('showCart', value)
    },
  },
}
