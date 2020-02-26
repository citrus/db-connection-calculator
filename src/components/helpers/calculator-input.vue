<template>
  <div class="field">
    <label class="label">{{ title }}</label>
    <div class="control columns">
      <div class="column">
        <input v-model="value" type="range" class="slider is-small is-fullwidth" min="0" :max="max" step="1">
      </div>
      <div class="column is-4">
        <input v-model="value" type="number" class="input has-text-centered">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    title: String,
    item: String,
    max: {
      type: Number,
      default: 32
    }
  },
  computed: {
    ...mapGetters([ 'config' ]),
    value: {
      get () {
        return this.config[this.item]
      },
      set (value) {
        this.$store.commit('config.item.set', {
          item: this.item,
          value: value
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  border-color: transparent;
  box-shadow: none;
  outline-width: none;
  &:hover,
  &:focus {
    border: none;
    border-color: transparent;
    box-shadow: none;
  }
}
.column {
  padding: 0.15rem 0.75rem;
}
</style>
