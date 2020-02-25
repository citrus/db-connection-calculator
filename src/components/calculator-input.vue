<template>
  <div class="field">
    <label class="label">{{ title }}</label>
    <div class="control columns">
      <div class="column">
        <input v-model="localValue" type="range" class="slider is-small is-fullwidth" min="0" max="32" step="1" @input="update">
      </div>
      <div class="column is-4">
        <input v-model="localValue" type="number" class="input has-text-centered" @input="update">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: [ Number, String ]
  },
  data () {
    return {
      localValue: this.value
    }
  },
  methods: {
    update () {
      this.$emit('input', this.localValue)
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
