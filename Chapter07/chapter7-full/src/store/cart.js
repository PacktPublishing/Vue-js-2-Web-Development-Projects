// @ts-check

/**
 * Get a cart item by the store item id
 *
 * @export
 * @param {array} cartItems
 * @param {string} id
 * @returns
 */
export function getCartItemById (cartItems, id) {
  const index = cartItems.findIndex(
    item => item.id === id
  )
  let item = null
  if (index !== -1) {
    item = cartItems[index]
  }

  return {
    index,
    item,
  }
}

export default {
  namespaced: true,

  state () {
    return {
      cartItems: [],
    }
  },

  getters: {
    cartCount: state => state.cartItems.reduce((count, item) => count + item.count, 0),
    cartItems: (state, getters, rootState, rootGetters) => {
      const itemsMap = rootGetters['items/itemsMap']
      return state.cartItems.map(
        cartItem => ({
          ...cartItem,
          // Add store item data
          storeItem: itemsMap[cartItem.id],
        })
      )
    },
    cartTotal: (state, getters) => getters.cartItems.reduce((total, item) => total + item.storeItem.price * item.count, 0),
  },

  mutations: {
    addStoreItem (state, id) {
      const { item } = getCartItemById(state.cartItems, id)
      if (item && item.count < 99) {
        item.count++
      } else {
        state.cartItems.push({
          id,
          count: 1,
        })
      }
    },

    clearCart (state) {
      state.cartItems = []
    },

    removeStoreItem (state, id) {
      const { index, item } = getCartItemById(state.cartItems, id)
      if (item) {
        item.count--
        if (item.count === 0) {
          state.cartItems.splice(index, 1)
        }
      }
    },

    removeCartItem (state, id) {
      const { index } = getCartItemById(state.cartItems, id)
      if (index !== -1) {
        state.cartItems.splice(index, 1)
      }
    },

    setCartItems (state, items) {
      state.cartItems = items
    },

    setCartItemCount (state, { id, count }) {
      const { item } = getCartItemById(state.cartItems, id)
      if (item) {
        if (count < 1) {
          count = 1
        } else if (count > 99) {
          count = 99
        }
        item.count = count
      }
    },
  },

  actions: {
    init: {
      handler ({ commit }) {
        // There is no 'sessionStorage' on the server
        if (typeof sessionStorage !== 'undefined') {
          const savedItems = sessionStorage.getItem('cart-items')
          if (savedItems) {
            commit('setCartItems', JSON.parse(savedItems))
          }
        }
      },
      root: true,
    },

    addStoreItemToCart ({ commit, dispatch }, { id }) {
      commit('addStoreItem', id)
      dispatch('saveCartItems')
    },

    clearCart ({ commit, dispatch }) {
      commit('clearCart')
      dispatch('saveCartItems')
    },

    removeStoreItemFromCart ({ commit, dispatch }, { id }) {
      commit('removeStoreItem', id)
      dispatch('saveCartItems')
    },

    removeCartItem ({ commit, dispatch }, { id }) {
      commit('removeCartItem', id)
      dispatch('saveCartItems')
    },

    saveCartItems ({ state }) {
      // There is no 'sessionStorage' on the server
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('cart-items', JSON.stringify(state.cartItems))
      }
    },

    setCartItemCount ({ commit, dispatch }, { id, count }) {
      commit('setCartItemCount', { id, count })
      dispatch('saveCartItems')
    },
  },
}
