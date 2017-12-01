import { createApp } from './app'
import { getAutoLang } from './utils/i18n'

const locale = getAutoLang()
createApp({
  locale,
}).then(({ app, store }) => {
  // Restore the Vuex store state
  // if send by the server
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }

  // Mount the app into the page
  app.$mount('#app')
})
