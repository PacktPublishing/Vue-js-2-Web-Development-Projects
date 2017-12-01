export default {
  namespaced: true,

  state () {
    return {
      center: {
        lat: 48.8538302,
        lng: 2.2982161,
      },
      userPosition: null,
      zoom: 15,
    }
  },

  getters: {
    center: state => state.center,
    userPosition: state => state.userPosition,
    zoom: state => state.zoom,
  },

  mutations: {
    center (state, value) {
      state.center = value
    },
    userPosition (state, value) {
      state.userPosition = value
    },
    zoom (state, value) {
      state.zoom = value
    },
  },

  actions: {
    async centerOnUser ({ dispatch, getters }) {
      const position = getters.userPosition
      if (position) {
        dispatch('setCenter', position)
      }
    },

    setBounds ({ dispatch }, value) {
      console.log('updateBounds')
      dispatch('posts/fetchPosts', {
        mapBounds: value,
      }, {
        root: true,
      })
    },

    setCenter ({ commit }, value) {
      commit('center', value)
    },

    setUserPosition ({ dispatch, commit, getters }, value) {
      const position = getters.userPosition
      commit('userPosition', value)
      // Initial center on user position
      if (!position) {
        dispatch('centerOnUser')
      }
    },

    setZoom ({ commit }, value) {
      commit('zoom', value)
    },
  },
}
