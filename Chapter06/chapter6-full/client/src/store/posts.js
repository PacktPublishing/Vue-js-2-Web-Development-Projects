import { $fetch } from '../plugins/fetch'

let fetchPostsUid = 0

export default {
  namespaced: true,

  state () {
    return {
      // New post being created
      draft: null,
      // Bounds of the last fetching
      // To prevent refetching
      mapBounds: null,
      // Posts fetched in those map bounds
      posts: [],
      // ID of the selected post
      selectedPostId: null,
      // Fetched details for the selected post
      selectedPostDetails: null,
    }
  },

  getters: {
    draft: state => state.draft,
    posts: state => state.posts,
    // The id field on posts is '_id' (MongoDB style)
    selectedPost: state => state.posts.find(p => p._id === state.selectedPostId),
    selectedPostDetails: state => state.selectedPostDetails,
    // The draft has more priority than the selected post
    currentPost: (state, getters) => state.draft || getters.selectedPost,
  },

  mutations: {
    addPost (state, value) {
      state.posts.push(value)
    },

    addComment (state, { post, comment }) {
      post.comments.push(comment)
    },

    draft (state, value) {
      state.draft = value
    },

    likePost (state, { post, userId }) {
      const index = post.likes.indexOf(userId)
      if (index !== -1) {
        post.likes.splice(index, 1)
      } else {
        post.likes.push(userId)
      }
    },

    posts (state, { posts, mapBounds }) {
      state.posts = posts
      state.mapBounds = mapBounds
    },

    selectedPostId (state, value) {
      state.selectedPostId = value
    },

    selectedPostDetails (state, value) {
      state.selectedPostDetails = value
    },

    updateDraft (state, value) {
      Object.assign(state.draft, value)
    },
  },

  actions: {
    clearDraft ({ commit }) {
      commit('draft', null)
    },

    createDraft ({ commit }) {
      // Default values
      commit('draft', {
        title: '',
        content: '',
        position: null,
        placeId: null,
      })
    },

    async createPost ({ commit, dispatch }, draft) {
      const data = {
        ...draft,
        // We need to get the object form
        position: draft.position.toJSON(),
      }

      // Request
      const result = await $fetch('posts/new', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      dispatch('clearDraft')

      // Update the posts list
      commit('addPost', result)
      dispatch('selectPost', result._id)
    },

    async fetchPosts ({ commit, state }, { mapBounds, force }) {
      let oldBounds = state.mapBounds
      if (force || !oldBounds || !oldBounds.equals(mapBounds)) {
        const requestId = ++fetchPostsUid

        // Request
        const ne = mapBounds.getNorthEast()
        const sw = mapBounds.getSouthWest()
        const query = `posts?ne=${
          encodeURIComponent(ne.toUrlValue())
        }&sw=${
          encodeURIComponent(sw.toUrlValue())
        }`
        const posts = await $fetch(query)

        // We abort if we started another query
        if (requestId === fetchPostsUid) {
          commit('posts', {
            posts,
            mapBounds,
          })
        }
      }
    },

    async likePost ({ commit, rootGetters }, post) {
      const userId = rootGetters.user._id
      commit('likePost', {
        post,
        userId,
      })
      await $fetch(`posts/${post._id}/like`, {
        method: 'POST',
      })
    },

    'logged-in': {
      handler ({ dispatch, state }) {
        if (state.mapBounds) {
          dispatch('fetchPosts', {
            mapBounds: state.mapBounds,
            force: true,
          })
        }
        if (state.selectedPostId) {
          dispatch('selectPost', state.selectedPostId)
        }
      },
      root: true,
    },

    logout: {
      handler ({ commit }) {
        commit('posts', {
          posts: [],
          mapBounds: null,
        })
      },
      root: true,
    },

    async selectPost ({ commit, getters }, id) {
      commit('selectedPostDetails', null)
      commit('selectedPostId', id)
      const details = await $fetch(`posts/${id}`)
      commit('selectedPostDetails', details)
    },

    async sendComment({ commit, rootGetters }, { post, comment }) {
      const user = rootGetters.user
      commit('addComment', {
        post,
        comment: {
          ...comment,
          date: new Date(),
          user_id: user._id,
          author: user,
        },
      })

      await $fetch(`posts/${post._id}/comment`, {
        method: 'POST',
        body: JSON.stringify(comment),
      })
    },

    setDraftLocation ({ dispatch, getters }, { position, placeId }) {
      if (!getters.draft) {
        dispatch('createDraft')
      }
      dispatch('updateDraft', {
        position,
        placeId,
      })
    },

    unselectPost ({ commit }) {
      commit('selectedPostId', null)
    },

    updateDraft ({ dispatch, commit, getters }, draft) {
      commit('updateDraft', draft)
    },
  },
}
