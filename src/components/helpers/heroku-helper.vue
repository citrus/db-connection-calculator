<template>
  <footer class="footer">
    <pre class="heroku-helper code is-6">{{ code }}</pre>
    <copy-to-clipboard :content="code">Copy Code</copy-to-clipboard>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CopyToClipboard from './copy-to-clipboard'
export default {
  components: {
    CopyToClipboard
  },
  computed: {
    ...mapState([ 'remote' ]),
    ...mapGetters([
      'config',
      'webConnections',
      'sidekiqConnections',
      'connections',
      'redisClientConnections',
      'redisServerSize'
    ]),
    code () {
      return `heroku ps:scale web=${this.config.web_dynos} sidekiq=${this.config.sidekiq_dynos} -r ${this.remote}
heroku config:set WEB_CONCURRENCY=${this.config.web_concurrency} RAILS_MAX_THREADS=${this.config.web_threads} SIDEKIQ_CONCURRENCY=${this.config.sidekiq_concurrency} SIDEKIQ_CLIENT_SIZE=${this.config.redis_client_size} SIDEKIQ_SERVER_SIZE=${this.redisServerSize} -r ${this.remote}`
    }
  }
}
</script>

<style>
footer.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 0;
}
.footer .button {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
