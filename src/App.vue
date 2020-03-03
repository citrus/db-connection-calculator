<template>
  <div id="app" class="container">
    <h1 class="title is-4 has-text-centered">Connection Calculator</h1>
    <remote-select />
    <calculator />
    <br/>
    <totals />
    <link-helper />
    <heroku-helper />
  </div>
</template>

<script>
import RemoteSelect from './components/helpers/remote-select'
import Calculator from './components/calculator.vue'
import Totals from './components/helpers/totals'
import LinkHelper from './components/helpers/link-helper'
import HerokuHelper from './components/helpers/heroku-helper'
export default {
  name: 'App',
  components: {
    RemoteSelect,
    Calculator,
    Totals,
    LinkHelper,
    HerokuHelper
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
  width: 420px;
}
.code {
  font-family: Courier, monospace;
}
</style>
