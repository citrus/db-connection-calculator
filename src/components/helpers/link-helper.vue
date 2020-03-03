<template>
  <p class="has-text-centered">
    <a :href="href" @click.prevent="copyToClipboard" class="button">{{ text }}</a>
  </p>
</template>

<script>
import querystring from 'querystring'
import copy from 'copy-to-clipboard'
import { mapState, mapGetters } from 'vuex'
const TEXT = {
  idle: '🔗Copy Link',
  copied: '👍Copied',
  failed: 'Copy failed. 👎'
}
export default {
  data () {
    return {
      text: TEXT.idle
    }
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
  },
  methods: {
    copyToClipboard () {
      const result = copy(this.href)
      this.flashMessage(result)
    },
    flashMessage (success) {
      this.text = success ? TEXT.copied : TEXT.failed
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.text = TEXT.idle
      }, 1000)
    }
  }
}
</script>
