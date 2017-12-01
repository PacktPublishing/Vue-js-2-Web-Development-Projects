import VueI18n from 'vue-i18n'
import langs from '../../i18n'

/**
 * Creates and loads a localization.
 *
 * @export
 * @param {string} locale
 * @returns A promise with the instance of VueI18n
 */
export async function createI18n (locale) {
  const { default: localeMessages } = await import(`../../i18n/locales/${locale}`)
  const messages = {
    [locale]: localeMessages,
  }

  const i18n = new VueI18n({
    locale,
    messages,
  })

  return i18n
}

/**
 * Detects the lang used by the user.
 *
 * @export
 * @returns The lang if present in the available locales, or 'en' if not.
 */
export function getAutoLang () {
  // IE: `window.navigator.userLanguage`
  let result = window.navigator.userLanguage || window.navigator.language
  if (result) {
    result = result.substr(0, 2)
  }
  if (langs.indexOf(result) === -1) {
    return 'en'
  } else {
    return result
  }
}
