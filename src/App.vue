<template>
  <div id="app" class="container">
    <calculator />
  </div>
</template>

<script>
import Calculator from './components/calculator.vue'
export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>

<style lang="sass" src="bulma"></style>

<style>
.container {
  padding: 40px;
  max-width: 400px;
}
</style>
