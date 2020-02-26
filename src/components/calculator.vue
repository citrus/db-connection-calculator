<template>
  <div class="calculator">
    <h1 class="title is-4 has-text-centered">Connection Calculator</h1>
    <div class="box">
      <h5 class="title is-5">Web</h5>
      <calculator-input title="Dynos" v-model="web.dynos" />
      <calculator-input title="Concurrency" v-model="web.concurrency" />
      <calculator-input title="Max Threads" v-model="web.threads" />
    </div>
    <div class="box">
      <h5 class="title is-5">Sidekiq</h5>
      <calculator-input title="Dynos" v-model="sidekiq.dynos" />
      <calculator-input title="Concurrency" v-model="sidekiq.concurrency" />
    </div>
    <div class="box">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total</p>
            <p class="title">{{ connections }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Web</p>
            <p class="title">{{ webConnections }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Sidekiq</p>
            <p class="title">{{ sidekiqConnections }}</p>
          </div>
        </div>
      </nav>
      <p class="code is-6 has-text-centered">({{ web.dynos }} * {{web.concurrency}} * {{web.threads}}) + ({{sidekiq.dynos}} * {{sidekiq.concurrency}})</p>
    </div>
    <pre class="code is-6">heroku ps:scale web={{ web.dynos }} sidekiq={{sidekiq.dynos}} -r production
heroku config:set WEB_CONCURRENCY={{web.concurrency}} RAILS_MAX_THREADS={{web.threads}} SIDEKIQ_CONCURRENCY={{sidekiq.concurrency}} -r production</pre>
  </div>
</template>

<script>
import CalculatorInput from './calculator-input'
export default {
  components: {
    CalculatorInput
  },
  data () {
    return {
      web: {
        dynos: 1,
        concurrency: 2,
        threads: 16
      },
      sidekiq: {
        dynos: 1,
        concurrency: 20
      }
    }
  },
  computed: {
    webConnections () {
      const { dynos, concurrency, threads } = this.web
      return dynos * concurrency * threads
    },
    sidekiqConnections () {
      const { dynos, concurrency } = this.sidekiq
      return dynos * concurrency
    },
    connections () {
      return this.webConnections + this.sidekiqConnections
    }
  },
  created () {
    try {
      const data = JSON.parse(window.localStorage.getItem('conneciton-count-data'))
      this.web = data.web
      this.sidekiq = data.sidekiq
    } catch (e) {
      console.warn(e)
    }
  },
  methods: {
    save () {
      const data = {
        web: this.web,
        sidekiq: this.sidekiq
      }
      window.localStorage.setItem('conneciton-count-data', JSON.stringify(data))
    }
  }
}
</script>

<style>
.code {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  font-family: Courier, monospace;
}
</style>
