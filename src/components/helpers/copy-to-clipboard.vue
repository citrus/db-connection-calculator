<template>
  <button @click.prevent="copyToClipboard" class="button">
    <template v-if="status">{{ status }}</template>
    <slot v-else>Copy</slot>
  </button>
</template>

<script>
import copy from 'copy-to-clipboard'
const STATUS = {
  copied: '👍Copied',
  failed: 'Copy failed. 👎'
}
export default {
  props: {
    content: String
  },
  data () {
    return {
      status: null
    }
  },
  methods: {
    copyToClipboard () {
      const result = copy(this.content)
      this.flashMessage(result)
    },
    flashMessage (success) {
      this.status = success ? STATUS.copied : STATUS.failed
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.status = null
      }, 1000)
    }
  }
}
</script>
