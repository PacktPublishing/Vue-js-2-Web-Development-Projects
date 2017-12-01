<template>
  <BasePage class="page-locale">
    <transition name="fade">
      <BaseLoading
        v-if="loading"
        key="loading"
        class="overlay"
      />
      <div v-else>
        <h1>{{ $t('change-lang') }}</h1>
        <div class="locales">
          <div
            v-for="lang of langs"
            :key="lang"
            class="locale"
          >
            <BaseButton
              :class="{ selected: lang === $i18n.locale }"
              @click="setLocale(lang)"
            >
              {{ $t(`lang.${lang}`) }}
            </BaseButton>
          </div>
        </div>
        <div class="toolbar">
          <BaseButton
            class="secondary"
            @click="goBack"
          >
            {{ $t('back') }}
          </BaseButton>
        </div>
      </div>
    </transition>
  </BasePage>
</template>

<script>
import langs from '../../i18n'

export default {
  data () {
    return {
      langs,
      loading: false,
    }
  },

  methods: {
    goBack () {
      this.$router.back()
    },

    async setLocale (locale) {
      this.loading = true
      if (!this.$i18n.messages[locale]) {
        const { default: messages } = await import(`../../i18n/locales/${locale}`)
        this.$i18n.setLocaleMessage(locale, messages)
      }
      this.$i18n.locale = locale
      this.loading = false
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../styles/imports"

.locales
  h-box()
  box-center()

  .locale
    padding 12px

.toolbar
  text-align center
  margin-top 32px
</style>
