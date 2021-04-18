<template>
  <div>

    <iframe v-if="$route.query.src" ref="iframe" v-loading.fullscreen.lock="fullscreenLoading" :src="$route.query.src" class="iframe" />
    <iframe v-else ref="iframe" v-loading.fullscreen.lock="fullscreenLoading" :src="urlPath" class="iframe" />

  </div>

  <!-- <div> <a>gfdfgddddddddddddddddddddddddddddddddddddddddddddddddddddd</a></div> -->
</template>

<script>
export default {
  name: 'Myiframe',
  components: {},
  data() {
    return {
      fullscreenLoading: false,
      urlPath: this.getUrlPath()
    }
  },
  watch: {
  },

  created() {
    this.urlPath = this.getUrlPath()
    this.fullscreenLoading = true
  },
  mounted() {
    this.iframeInit()
    window.onresize = () => {
      this.iframeInit()
    }
  },
  methods: {
    iframeInit() {
      const iframe = this.$refs.iframe
      const clientHeight = document.documentElement.clientHeight - 90
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.fullscreenLoading = false
        })
      } else {
        iframe.onload = () => {
          this.fullscreenLoading = false
        }
      }
    },
    getUrlPath: function() {
      return this.$route.meta.iframeUrl
    }
  }
}
</script>

<style>
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
