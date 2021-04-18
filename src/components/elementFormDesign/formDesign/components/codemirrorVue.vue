<template>
  <div class="json-box-view">
    <codemirror
      ref="myEditor"
      style="height:100%;"
      :value="json"
    />
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
    import('codemirror/mode/javascript/javascript')
    import('codemirror/mode/vue/vue')
export default {
  name: 'CodemirrorVue',
  components: { codemirror },
  props: {
    json: {
      type: String
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>

</style>
