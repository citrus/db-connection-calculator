<template>
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
    <p class="code is-6 has-text-centered">
      ({{ config.web_dynos }} * {{ config.web_concurrency }} * {{ config.web_threads }}) + ({{ config.sidekiq_dynos }} * {{ config.sidekiq_concurrency }})
    </p>
    <hr/>
    <nav class="level is-marginless">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Client Size</p>
          <p class="title">{{ config.redis_client_size }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Client Connections</p>
          <p class="title">{{ redisClientConnections }}</p>
        </div>
      </div>
    </nav>
    <p class="code is-6 has-text-centered">
      {{ redisClientConnections }} = {{ config.redis_client_size }} * ({{ config.web_dynos }} * {{ config.web_concurrency }})
    </p>
    <hr/>
    <nav class="level is-marginless">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Server Size</p>
          <p class="title" v-if="redisServerSize > 1">{{ redisServerSize }}</p>
          <p class="title has-text-danger" v-else>&#xd8;</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Server Connections</p>
          <p class="title">{{ redisServerConnections }}</p>
        </div>
      </div>
    </nav>
    <p class="code is-6 has-text-centered">
      {{ redisServerSize }} = ({{ config.redis_max_connections }} - {{ redisClientConnections }} - {{ SIDEKIQ_RESERVED }}) / {{ config.sidekiq_dynos }}
    </p>
  </div>
</template>

<script>
import { SIDEKIQ_RESERVED } from '@/store'
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      SIDEKIQ_RESERVED
    }
  },
  computed: {
    ...mapState([ 'remote' ]),
    ...mapGetters([
      'config',
      'webConnections',
      'sidekiqConnections',
      'connections',
      'redisClientSize',
      'redisClientConnections',
      'redisServerConnections',
      'redisServerSize'
    ])
  }
}
</script>
