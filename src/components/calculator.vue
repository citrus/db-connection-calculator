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
      <h5 class="title is-5">Redis</h5>
      <calculator-input title="Max Connections" v-model="redis.max_connections" :max="1000" />
    </div>
    <div class="box">
      <nav class="level is-marginless">
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
      <hr/>
      <nav class="level is-marginless">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Client Size</p>
            <p class="title">{{ redisClientSize }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Server Size</p>
            <p class="title">{{ redisServerSize }}</p>
          </div>
        </div>
      </nav>
      <p class="code is-6 has-text-centered">{{ redisClientConnections }} = {{ web.concurrency }} * ({{ web.threads }} / 2) * {{ web.dynos }}</p>
      <p class="code is-6 has-text-centered">{{ redisServerSize }} = ({{ redis.max_connections }} - {{ redisClientSize }} - 2) / {{ sidekiq.dynos }}</p>
    </div>
    <div class="control select is-fullwidth is-small">
      <select v-model="remote" @change="save">
        <option>production</option>
        <option>staging</option>
      </select>
    </div>
    <pre class="heroku-helper code is-6">heroku ps:scale web={{ web.dynos }} sidekiq={{ sidekiq.dynos }} -r {{ remote }}
heroku config:set WEB_CONCURRENCY={{ web.concurrency }} RAILS_MAX_THREADS={{ web.threads }} SIDEKIQ_CONCURRENCY={{ sidekiq.concurrency }} SIDEKIQ_CLIENT_SIZE={{redisClientSize}} SIDEKIQ_SERVER_SIZE={{redisServerSize}} -r {{ remote }}</pre>
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
      },
      redis: {
        max_connections: 200
      },
      remote: 'production'
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
    },
    redisClientConnections () {
      const { dynos, concurrency, threads } = this.web
      return concurrency * (threads / 2) * dynos
    },
    redisClientSize () {
      return Math.floor(this.webConnections / this.redisClientConnections)
    },
    redisServerSize () {
      return Math.floor((this.redis.max_connections - (this.redisClientConnections - 2)) / this.sidekiq.dynos)
    }
  },
  created () {
    try {
      const data = JSON.parse(window.localStorage.getItem('conneciton-count-data'))
      this.web = data.web
      this.sidekiq = data.sidekiq
      this.redis = data.redis
      this.remote = data.remote
    } catch (e) {
      console.warn(e)
    }
  },
  methods: {
    save () {
      const data = {
        web: this.web,
        sidekiq: this.sidekiq,
        redis: this.redis,
        remote: this.remote
      }
      window.localStorage.setItem('conneciton-count-data', JSON.stringify(data))
    }
  }
}
</script>

<style>
.code {
  font-family: Courier, monospace;
}
.heroku-helper {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
