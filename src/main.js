import Vue from 'vue'
import querystring from 'querystring'
import store from './store'
import App from './App.vue'


Vue.config.productionTip = false

try {
  let qs = window.location.search.replace('?', '')
  qs = querystring.parse(qs)
  qs.config = querystring.parse(qs.config)
  if (qs && qs.remote && qs.config) {
    store.commit('config.set', qs)
  }
} catch (e) {
  // ignore error
  console.warn(e)
}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
