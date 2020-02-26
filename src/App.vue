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
<style lang="sass">
  @import '~bulma-slider'
</style>
<style>
.container {
  padding: 40px 40px 110px 40px;
  width: 400px;
}
</style>
