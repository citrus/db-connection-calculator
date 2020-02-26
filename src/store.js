import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const persist = (key, value) => {
  window.localStorage.setItem(`calculator.${key}`, JSON.stringify(value))
}

const restore = (key, fallback) => {
  try {
    const data = JSON.parse(window.localStorage.getItem(`calculator.${key}`))
    return data || fallback
  } catch (e) {
    console.warn(e)
  }
}

const DEFAULT_CONFIG = {
  web_dynos: 1,
  web_concurrency: 2,
  web_threads: 16,
  sidekiq_dynos: 1,
  sidekiq_concurrency: 20,
  redis_max_connections: 200
}

export default new Vuex.Store({
  strict: true,
  state: {
    config: {
      production: restore('production', { ...DEFAULT_CONFIG }),
      staging: restore('staging', { ...DEFAULT_CONFIG }),
    },
    remote: restore('remote', 'staging')
  },
  mutations: {
    'config.set': (state, { key, data }) => {
      if (data) {
        Vue.set(state.config, key, data)
      }
    },
    'config.item.set': (state, { item, value }) => {
      const config = state.config[state.remote]
      Vue.set(config, item, parseInt(value))
      persist(state.remote, config)
    },
    'remote.change': (state, remote) => {
      state.remote = remote
      persist('remote', remote)
    }
  },
  getters: {
    config: state => state.config[state.remote],
    webConnections: (state, getters) => {
      const { web_dynos, web_concurrency, web_threads } = getters.config
      return web_dynos * web_concurrency * web_threads
    },
    sidekiqConnections: (state, getters) => {
      const { sidekiq_dynos, sidekiq_concurrency } = getters.config
      return sidekiq_dynos * sidekiq_concurrency
    },
    connections: (state, getters) => {
      return getters.webConnections + getters.sidekiqConnections
    },
    redisClientConnections: (state, getters) => {
      const { web_dynos, web_concurrency, web_threads } = getters.config
      return web_dynos * web_concurrency * (web_threads / 2)
    },
    redisClientSize: (state, getters) => {
      const size = Math.floor(getters.webConnections / getters.redisClientConnections)
      return isNaN(size) ? 0 : size
    },
    redisServerSize: (state, getters) => {
      const size = Math.floor((getters.config.redis_max_connections - (getters.redisClientConnections - 2)) / getters.config.sidekiq_dynos)
      return isFinite(size) ? size : '∞'
    }
  }
})
