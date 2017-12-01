<template>
  <div class="production-dashboard">
    <h1>Production Dashboard</h1>

    <section class="indicators">
      <ProductionIndicator
        :value="average / 100"
        title="Average"
        :info="Math.round(average)"
      />
      <ProductionIndicator
        class="danger"
        :value="errorRate"
        title="Errors"
        :info="`${Math.round(errorRate * 100)}%`"
      />
    </section>

    <section class="list">
      <div
        v-for="item of measures"
        :key="item._id"
      >
        <div class="date">{{ item.date.toLocaleString() }}</div>
        <div class="error">{{ item.error ? 'Error' : '' }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { Measures } from '../../lib/collections'
import ProductionIndicator from './ProductionIndicator.vue'

export default {
  components: {
    ProductionIndicator,
  },

  data () {
    return {
      measures: [],
    }
  },

  meteor: {
    $subscribe: {
      'measures': [],
    },

    measures () {
      return Measures.find({}, {
        sort: { date: -1 },
      })
    },
  },

  computed: {
    length () {
      return this.measures.length
    },

    average () {
      if (!this.length) return 0
      let total = this.measures.reduce(
        (total, measure) => total += measure.value,
        0
      )
      return total / this.length
    },

    errorRate () {
      if (!this.length) return 0
      let total = this.measures.reduce(
        (total, measure) => total += measure.error ? 1 : 0,
        0
      )
      return total / this.length
    },
  },
}
</script>

