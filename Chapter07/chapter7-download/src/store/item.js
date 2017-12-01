import http from '../utils/http'

export default {
  namespaced: true,

  state () {
    return {
      comments: [],
      commentsLoading: false,
      details: null,
      detailsLoading: false,
      error: false,
      itemId: null,
    }
  },

  getters: {
    comments: state => state.comments,
    commentsLoading: state => state.commentsLoading,
    details: state => state.details,
    detailsLoading: state => state.detailsLoading,
    error: state => state.error,
  },

  mutations: {
    addComment (state, value) {
      state.comments.push(value)
    },
    cleanComments (state) {
      state.comments = state.comments.filter(
        comment => comment.id !== -1
      )
    },
    comments (state, value) {
      state.comments = value
    },
    commentsLoading (state, value) {
      state.commentsLoading = value
    },
    details (state, value) {
      state.details = value
    },
    detailsLoading (state, value) {
      state.detailsLoading = value
    },
    error (state, value) {
      state.error = value
    },
    itemId (state, value) {
      state.itemId = value
    },
  },

  actions: {
    async fetchStoreItemDetails ({ commit }, { id }) {
      commit('itemId', id)
      commit('error', null);
      commit('commentsLoading', true)
      commit('detailsLoading', true)

      try {
        let result = await http.get(`items/${id}`)
        commit('details', result.data)
        commit('detailsLoading', false)

        result = await http.get(`comments?itemId=${id}`)
        commit('comments', result.data)
        commit('commentsLoading', false)
      } catch (e) {
        commit('error', e)
        commit('detailsLoading', false)
        commit('commentsLoading', false)
      }
    },

    async sendComment ({ state, commit }, { text }) {
      const data = {
        text,
        itemId: state.itemId,
      }
      commit('addComment', {
        id: -1,
        ...data,
      })
      try {
        const result = await http.post('comments', data)
        commit('cleanComments')
        commit('addComment', {
          id: result.data.id,
          ...data,
        })
      } catch (e) {
        commit('cleanComments')
        throw e
      }
    },
  },
}
