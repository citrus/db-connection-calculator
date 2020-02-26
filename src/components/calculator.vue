<template>
  <div class="calculator">
    <div class="box">
      <h5 class="title is-5">Web</h5>
      <calculator-input title="Dynos" item="web_dynos" />
      <calculator-input title="Concurrency" item="web_concurrency" />
      <calculator-input title="Max Threads" item="web_threads" />
    </div>
    <div class="box">
      <h5 class="title is-5">Sidekiq</h5>
      <calculator-input title="Dynos" item="sidekiq_dynos" />
      <calculator-input title="Concurrency" item="sidekiq_concurrency" />
    </div>
    <div class="box">
      <h5 class="title is-5">Redis</h5>
      <calculator-input title="Max Connections" item="redis_max_connections" :max="1000" />
    </div>
  </div>
</template>

<script>
import CalculatorInput from './helpers/calculator-input'
export default {
  components: {
    CalculatorInput
  }
}
</script>
