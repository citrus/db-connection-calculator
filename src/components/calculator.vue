<template>
  <div class="calculator">
    <h1 class="title is-4 has-text-centered">Connection Calculator</h1>
    <div class="box">
      <h5 class="title is-5">Web</h5>
      <div class="field">
        <label class="label">Dyno Count</label>
        <div class="control">
          <input v-model="web.dynos" type="number" class="input" @input="save">
        </div>
      </div>
      <div class="field">
        <label class="label">Web Concurrency</label>
        <div class="control">
          <input v-model="web.concurrency" type="number" class="input" @input="save">
        </div>
      </div>
      <div class="field">
        <label class="label">Max Threads</label>
        <div class="control">
          <input v-model="web.threads" type="number" class="input" @input="save">
        </div>
      </div>
    </div>
    <div class="box">
      <h5 class="title is-5">Sidekiq</h5>
      <div class="field">
        <label class="label">Dyno Count</label>
        <div class="control">
          <input v-model="sidekiq.dynos" type="number" class="input" @input="save">
        </div>
      </div>
      <div class="field">
        <label class="label">Concurrency</label>
        <div class="control">
          <input v-model="sidekiq.concurrency" type="number" class="input" @input="save">
        </div>
      </div>
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
      <p class="forumula is-6 has-text-centered">({{ web.dynos }} * {{web.concurrency}} * {{web.threads}}) + ({{sidekiq.dynos}} * {{sidekiq.concurrency}})</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
.forumula {
  font-family: Courier, monospace;
}
</style>
