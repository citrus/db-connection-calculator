<template>
  <p class="has-text-centered">
    <copy-to-clipboard :content="href">
      🔗Copy Link
    </copy-to-clipboard>
  </p>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import querystring from 'querystring'
import CopyToClipboard from './copy-to-clipboard'
export default {
  components: {
    CopyToClipboard
  },
  computed: {
    ...mapState([ 'remote' ]),
    ...mapGetters([ 'config' ]),
    href () {
      const qs = querystring.stringify({
        remote: this.remote,
        config: querystring.stringify(this.config)
      })
      return `${window.location.origin}?${qs}`
    }
  }
}
</script>
