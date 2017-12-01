
/* --- HUD --- */

Vue.component('top-bar', {
  template: `<div class="top-bar" :class="'player-' + currentPlayerIndex">
    <div class="player p0">{{ players[0].name }}</div>
    <div class="turn-counter">
      <img class="arrow" src="svg/turn.svg" />
      <div class="turn">Turn {{ turn }}</div>
    </div>
    <div class="player p1">{{ players[1].name }}</div>
  </div>`,
  props: ['players', 'currentPlayerIndex', 'turn'],
  created () {
    console.log(this.players, this.currentPlayerIndex, this.turn)
  },
})

Vue.component('card', {
  template: `<div class="card" :class="'type-' + def.type" @click="play">
    <div class="title">{{ def.title }}</div>
    <img class="separator" src="svg/card-separator.svg" />
    <div class="description"><div v-html="def.description"></div></div>
    <div class="note" v-if="def.note"><div v-html="def.note"></div></div>
  </div>`,
  props: ['def'],
  methods: {
    play () {
      this.$emit('play')
    },
  },
})

Vue.component('hand', {
  template: `<div class="hand">
    <div class="wrapper">
      <transition-group name="card" tag="div" class="cards" @after-leave="handleLeaveTransitionEnd">
        <card v-for="card of cards" :key="card.uid" :def="card.def" @play="handlePlay(card)" />
      </transition-group>
    </div>
  </div>`,
  props: ['cards'],
  methods: {
    handlePlay (card) {
      this.$emit('card-play', card)
    },

    handleLeaveTransitionEnd () {
      this.$emit('card-leave-end')
    },
  },
})

/* --- OVERLAYS --- */

Vue.component('overlay', {
  template: `<div class="overlay" @click="handleClick">
    <div class="content">
      <slot></slot>
    </div>
  </div>`,
  methods: {
    handleClick () {
      this.$emit('close')
    },
  },
})

Vue.component('overlay-content-player-turn', {
  template: `<div>
    <div class="big" v-if="player.skipTurn">{{ player.name }},<br>your turn is skipped!</div>
    <div class="big" v-else>{{ player.name }},<br>your turn has come!</div>
    <div>Tap to continue</div>
  </div>`,
  props: ['player'],
})

Vue.component('overlay-content-last-play', {
  template: `<div>
    <div v-if="opponent.skippedTurn">{{ opponent.name }} turn was skipped!</div>
    <template v-else>
      <div>{{ opponent.name }} just played:</div>
      <card :def="lastPlayedCard" />
    </template>
  </div>`,
  props: ['opponent'],
  computed: {
    lastPlayedCard () {
      return getLastPlayedCard(this.opponent)
    },
  },
})

Vue.component('overlay-content-game-over', {
  template: `<div>
    <div class="big">Game Over</div>
    <player-result v-for="player in players" :player="player" />
  </div>`,
  props: ['players'],
})

Vue.component('player-result', {
  template: `<div class="player-result" :class="result">
    <span class="name">{{ player.name }}</span> is
    <span class="result">{{ result }}</span>
  </div>`,
  props: ['player'],
  computed: {
    result () {
      return this.player.dead ? 'defeated' : 'victorious'
    },
  },
})
