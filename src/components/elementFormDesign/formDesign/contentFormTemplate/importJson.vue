<template>
  <div class="json-box-view">
    <codemirror
      ref="myEditor"
      v-model="importJson.json"
      style="height:100%;"
    />
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
export default {
  name: 'ImportJson',
  components: { codemirror },
  props: {
    importJson: {
      type: Object,
      required: true
    }
  }

}
</script>

<style scoped>

</style>
