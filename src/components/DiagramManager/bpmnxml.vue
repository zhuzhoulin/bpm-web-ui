<template>
  <div id="app-container">
    <div id="bpmnxml" ref="bpmnxml">
      <div class="showBPMNXML">
        <codemirror
          id="codemirror"
          ref="codemirror"
          :value="diagramXml"
          :v-model="diagramXml"
          :options="cmOptions"
          class="code"
          @changes="codemirrorChange"
        />
      </div>
    </div>
  </div>
</template>
<script>

import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/addon/selection/active-line'
// 格式化字符串格式 并高亮显示
import vkbeautify from 'vkbeautify'

export default {
  name: 'BpmnXml',
  components: {
    codemirror
  },
  props: {
    processDiagramXml: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      diagramXml: '',
      cmOptions: {
        value: '',
        mode: 'application/xml',
        readOnly: true,
        styleActiveLine: true, // 当前行背景高亮
        lineNumbers: true, // 显示行数
        line: true,
        tabSize: 4, // tab字符的宽度，默认为4,
        autoRefresh: true
      }
    }
  },
  computed: {

  },
  watch: {
    processDiagramXml: {
      handler(newValue, oldValue) {
        this.diagramXml = vkbeautify.xml(newValue.replace(/ns0:/g, 'flowable:'))
      },
      deep: true
    }
  },
  mounted() {
    this.diagramXml = vkbeautify.xml(this.processDiagramXml.replace(/ns0:/g, 'flowable:'))
  },
  methods: {
    codemirrorChange() {
      // 解决  codemirror点击一下才显示的BUG
      setTimeout(() => {
        this.$refs.codemirror.refresh()
      }, 10)
    }
  }
}
</script>

<style lang="scss">
.showBPMNXML {
  border: solid 1px #cccccc;
  width: 98%;
  margin: 10px auto;
  font-size: 14px;
  min-height: 700px;
}
.CodeMirror {
    font-family: monospace;
    min-height: 700px;
    color: black;
    direction: ltr;
}
</style>

