<template>
  <footer class="footer">
    <pre class="heroku-helper code is-6">heroku ps:scale web={{ config.web_dynos }} sidekiq={{ config.sidekiq_dynos }} -r {{ remote }}
heroku config:set WEB_CONCURRENCY={{ config.web_concurrency }} RAILS_MAX_THREADS={{ config.web_threads }} SIDEKIQ_CONCURRENCY={{ config.sidekiq_concurrency }} SIDEKIQ_CLIENT_SIZE={{redisClientSize}} SIDEKIQ_SERVER_SIZE={{redisServerSize}} -r {{ remote }}</pre>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState([ 'remote' ]),
    ...mapGetters([
      'config',
      'webConnections',
      'sidekiqConnections',
      'connections',
      'redisClientConnections',
      'redisClientSize',
      'redisServerSize'
    ])
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
</style>
