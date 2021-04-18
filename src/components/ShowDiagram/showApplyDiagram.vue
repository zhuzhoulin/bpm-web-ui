
<template>
  <div ref="content" v-loading="loading" class="containers">
    <div ref="canvas" class="canvas" />
    <div class="io-zoom-controls">

      <ul class="io-zoom-reset io-control io-control-list">
        <li>
          <button title="原始大小" @click="zoom(1.0)">
            <i class="el-icon-s-help" />
          </button>
        </li>
      </ul>

      <ul class="io-zoom io-control io-control-list">
        <li>
          <button title="缩小" @click="zoom(-0.1)">
            <span class="el-icon-remove-outline" />
          </button>
        </li>
        <li>
          <hr>
        </li>
        <li>
          <button title="放大" @click="zoom(0.1)">
            <span class="el-icon-circle-plus-outline" />
          </button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

// import BpmnViewer from 'bpmn-js/lib/Modeler'
import BpmnViewer from '../custom-modeler'
// import BpmnViewer from '../bpmn-js/lib/Modeler'

// import BpmnViewer from '../bpmn-js'
import { getProcessDiagramByApplyId } from '@/api/process/processDiagram'

export default {
  name: 'ShowDiagram',
  components: {
  },
  props: {
    applyId: {
      type: Number,
      required: true,
      default: null
    }
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      modeling: null,
      canvas: null,
      processName: '',
      processDiagramXml: null,
      state: {
        scale: 1 // 流程图比例
      },
      fullscreen: false,
      loading: true,
      nodeMap: {}
    }
  },
  computed: {
  },
  watch: {
    applyId: {
      handler(newValue, oldValue) {
        console.log(newValue)
        this.renderDiagram(newValue)
      }
    }
  },
  mounted() {
    this.container = this.$refs.content
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas
    this.bpmnModeler = new BpmnViewer({
      container: canvas,
      height: '400px'
    })

    const bjsIoLogo = document.querySelector('.bjs-powered-by')
    while (bjsIoLogo.firstChild) {
      bjsIoLogo.removeChild(bjsIoLogo.firstChild)
    }
    document.querySelector('.djs-palette').style.display = 'none'
    this.modeling = this.bpmnModeler.get('modeling')
    this.$nextTick(() => {
      this.getProcessDiagramByApplyId()
    })
  },
  methods: {
    getProcessDiagramByApplyId() {
      this.$nextTick(() => {
        const that = this
        that.loading = true
        const param = that.applyId
        getProcessDiagramByApplyId(param).then(response => {
          console.log(response)
          that.processDiagramXml = response.data.processXml
          that.$nextTick(() => {
            that.renderDiagram(that.processDiagramXml)
            that.nodeMap = response.data.nodeMap
          })
        }).finally(result => {
          that.loading = false
        })
      })
    },
    setNodeColor() {
      var elementRegistry = this.bpmnModeler.get('elementRegistry')

      // 执行代码

      for (var node in this.nodeMap) {
        var shape = elementRegistry.get(this.nodeMap[node].nodeId)
        if (!shape) continue
        this.modeling.updateProperties(shape, {
          name: this.nodeMap[node].nodeName
        })
        if (this.nodeMap[node].approved) {
          this.modeling.setColor(shape, {
            fill: 'white',
            stroke: 'green'
          })
        }
        if (this.nodeMap[node].current) {
          this.modeling.setColor(shape, {
            fill: 'white',
            stroke: 'red'
          })
        }
      }
    },

    // 流程图放大缩小
    zoom(radio) {
      console.log('handleZoom () ' + radio)
      const newScale = radio === 1.0
        ? 1.0 // 不输入radio则还原
        : this.state.scale + radio <= 0.2 // 最小缩小倍数
          ? 0.2
          : this.state.scale + radio

      this.bpmnModeler.get('canvas').zoom(newScale)
      this.state.scale = newScale
    },
    renderDiagram(xml) {
      if (xml === 'undefined' || xml === null || xml === '') {
        this.$message.error('请先绘制流程图！')
        this.$emit('close')
        return
      }

      this.bpmnModeler.importXML(xml, err => {
        if (err) {
          this.$message.error('请选择正确的bpmn 或 XML 文件 ！' + err)
        } else {
          console.log('init diagram success!')
          // 让图能自适应屏幕
          // this.bpmnModeler.get('canvas').zoom('fit-viewport')
          this.bpmnModeler.get('canvas').zoom(1.2)
          this.$nextTick(() => {
            this.setNodeColor()
          })
        }
      })
    },
    checkIsNullOrEmpty(value) {
    // 正则表达式用于判斷字符串是否全部由空格或换行符组成
      var reg = /^\s*$/
      // 返回值为true表示不是空字符串
      return (value != null && value !== undefined && !reg.test(value))
    }

  }
}
</script>

<style lang='scss'>
/*左边工具栏以及编辑节点的样式*/
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
body,
html {

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  font-size: 12px;

  height: 100%;
  max-height: 100%;
  padding: 0;
  margin: 0;
}

a:link {
  text-decoration: none;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
}

.io-zoom-controls {
    width: auto;
    position: absolute;
    bottom: 50px;
}

.io-zoom-reset {
    margin-bottom: 10px;
}
.io-control-list {
    list-style: none;
    padding: 5px;
    margin: 0;
}
.io-control-list {
    list-style: none;
    padding: 5px;
    margin: 0;
}
.bjs-powered-by, .cjs-powered-by, .djs-powered-by, .io-control {
    background: #FFF;
    border-radius: 2px;
    border: solid 1px #E0E0E0;
    padding: 5px;
}
ul {
    padding-left: 30px;
}
* {
    box-sizing: border-box;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}

ul li button {
    cursor:pointer;
}

</style>
