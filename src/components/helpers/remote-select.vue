<template>
  <div class="field select is-fullwidth is-small">
    <select v-model="remote">
      <option>production</option>
      <option>staging</option>
    </select>
  </div>
</template>

<script>
export default {
  computed: {
    remote: {
      get () {
        return this.$store.state.remote
      },
      set (remote) {
        this.$store.commit('remote.change', remote)
      }
    }
  }
}
</script>
