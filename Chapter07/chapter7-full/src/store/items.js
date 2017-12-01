import http from '../utils/http'

export default {
  namespaced: true,

  state () {
    return {
      items: [],
      loading: false,
      searchText: '',
    }
  },

  getters: {
    items: state => {
      if (state.searchText) {
        const reg = new RegExp(state.searchText.trim().toLowerCase().replace(/\s+/g, '|'))
        return state.items.filter(
          item => item.title.toLowerCase().search(reg) !== -1
        )
      } else {
        return state.items
      }
    },
    itemsMap: state => state.items.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {}),
    loading: state => state.loading,
    searchText: state => state.searchText,
  },

  mutations: {
    items (state, value) {
      state.items = value
    },
    loading (state, value) {
      state.loading = value
    },
    searchText (state, value) {
      state.searchText = value
    },
  },

  actions: {
    async fetchItems ({ commit }) {
      commit('loading', true)
      const result = await http.get('items')
      commit('items', result.data)
      commit('loading', false)
    },

    setSearchText ({ commit }, value) {
      commit('searchText', value)
    },
  },
}
