<template>

  <div id="app-container">
    <el-container v-loading="renderDiagramLoading" style="min-height: 700px ;width:100% ;">
      <el-tabs
        v-model="activeName"
        type="card"
        style="width:100% ;height:100%"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="流程设计"
          name="first"
        >

          <div id="processDesign" ref="processDesign" class="processDesign">
            <el-header style="height: auto;">
              <designHeader
                v-if="bpmnModeler"
                id="designHeader"
                ref="designHeader"
                class="designHeader"
                :bpmn-modeler.sync="bpmnModeler"
                :process-info.sync="processInfo"
                @renderDiagram="renderDiagram"
                @queryList="queryList"
                @close="closeDiagramDialog"
              />
            </el-header>
            <div class="centerClass">

              <el-container>

                <!-- <el-row> -->
                <el-main v-loading="renderDiagramLoading" width="80%" style="border: 1px solid #DCDFE6;width:100% ;height:100%">

                  <!-- <el-aside width="70%" style="float:left"> -->
                  <div
                    ref="content"
                    class="containers"
                  >
                    <div
                      ref="canvas"
                      class="canvas"
                    />
                  </div>
                  <!-- </el-aside> -->
                </el-main>
                <el-aside width="30%" style="min-width:350px">
                  <!-- <el-col :span="6"> -->
                  <designRight
                    v-if="bpmnModeler"
                    id="designRight"
                    ref="designRight"
                    :process-info.sync="processInfo"
                    :bpmn-modeler.sync="bpmnModeler"
                    class="designRight"
                  />
                  <!-- </el-col> -->
                </el-aside>
                <!-- </el-row> -->

              </el-container>
            </div>
            <!-- <designFooter id="designFooter" ref="designFooter" class="designFooter" /> -->
          </div>

        </el-tab-pane>
        <el-tab-pane
          label="流程设置"
          name="five"
        >
          <processSetting ref="processSetting" :process-detail-id.sync="processDetailId" :process-info.sync="processInfo" />
        </el-tab-pane>
        <el-tab-pane
          label="流程规则"
          name="second"
        >
          <processRule ref="processRule" />
        </el-tab-pane>
        <el-tab-pane
          label="变量管理"
          name="third"
        >
          <varDict
            v-if="showVarDict"
            ref="varDict"
            :process-info.sync="processInfo"
            :bpmn-modeler.sync="bpmnModeler"
          />
        </el-tab-pane>
        <el-tab-pane
          label="BPMNXML"
          name="fourth"
        >
          <bpmnXml v-if="showBpmn" ref="bpmnXml" :process-diagram-xml.sync="processDiagramXml" /></el-tab-pane>

      </el-tabs>

    </el-container>
  </div>
</template>
<script>

import designHeader from './header.vue'
import designRight from './right.vue'
import bpmnXml from './bpmnxml.vue'
import varDict from '../../views/system/variableDict'
import processSetting from './processSetting'
import processRule from './processRule'
import BpmnModeler from '../custom-modeler'

import customControlsModule from '../custom-modeler/custom'
import minimapModule from '../minimap'
import customTranslate from '../i18n-bpmn/customTranslate'
import Ids from 'ids'
import { defaultDiagramXML } from '../../resources/diagram/newDiagram'

// 校验
import transactionBoundariesModule from 'bpmn-js-transaction-boundaries'
import lintModule from '../bpmn-js-bpmnlint/lib'
import bpmnlintConfig from '../../../.bpmnlintrc'
import moddleDescriptor from './js/flowable.json'
import tokenSimulation from 'bpmn-js-token-simulation/lib/viewer'

export default {
  name: 'DiagramManager',
  components: {
    designRight,
    designHeader,
    bpmnXml,
    varDict,
    processSetting,
    processRule
  },
  props: {
    newProcessDiagramXml: {
      type: String,
      required: true,
      default: null
    },
    processInfo: {
      type: Object,
      require: true,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    processDetailId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      bpmnModeler: null,
      container: null,
      canvas: null,
      processDiagramXml: '',
      renderDiagramLoading: true,
      activeName: 'first',
      showVarDict: false,
      showBpmn: true
    }
  },
  computed: {

  },
  beforeCreate() {
  },
  created() {
  },
  mounted() {
    this.container = this.$refs.content
    const canvas = this.$refs.canvas
    const customTranslateModule = {
      translate: ['value', customTranslate]
    }
    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        customTranslateModule,
        customControlsModule,
        // 缩略图工具栏
        minimapModule,
        // alignToOriginModule,
        // 显示事务边界
        transactionBoundariesModule,
        lintModule,
        tokenSimulation
      ],
      moddleExtensions: {
        flowable: moddleDescriptor
      },
      linting: {
        bpmnlint: bpmnlintConfig
      },
      keyboard: {
        bindTo: document.body
      }
    })

    // 去除LOGO
    const bjsIoLogo = document.querySelector('.bjs-powered-by')
    while (bjsIoLogo.firstChild) {
      bjsIoLogo.removeChild(bjsIoLogo.firstChild)
    }
    document.querySelector('.djs-palette').style.display = 'inline-block'

    if (this.newProcessDiagramXml === '') {
      var xml = defaultDiagramXML
      xml = xml.replace(/Process_1/g, this.processInfo.processKey)
      xml = xml.replace(/Process_name_1/g, this.processInfo.processName)
      xml = xml.replace(/UserTask_Id/g, new Ids([32, 36, 1]).nextPrefixed('UserTask_'))
      xml = xml.replace(/SequenceFlow_Id/g, new Ids([32, 36, 1]).nextPrefixed('SequenceFlow_'))
      this.renderDiagram(xml)
    } else {
      this.renderDiagram(this.newProcessDiagramXml)
    }

    this.renderDiagramLoading = false
  },
  methods: {
    queryList() {
      this.$emit('queryList')
    },
    closeDiagramDialog() {
      this.$emit('closeDiagramDialog')
    },
    renderDiagram(xml) {
      if (xml === '') {
        xml = defaultDiagramXML
        xml = xml.replace(/Process_1/g, this.processInfo.processKey)
        xml = xml.replace(/Process_name_1/g, this.processInfo.processName)
        xml = xml.replace(/UserTask_Id/g, new Ids([32, 36, 1]).nextPrefixed('UserTask_'))
        xml = xml.replace(/SequenceFlow_Id/g, new Ids([32, 36, 1]).nextPrefixed('SequenceFlow_'))
      }

      this.bpmnModeler.importXML(xml, err => {
        if (err) {
          console.log('init diagram error' + err)
          window.alert(' 请选择正确的bpmn 或 XML 文件 ！' + err)
          return
        } else {
          console.log('init diagram success!')
          // 让图能自适应屏幕
          this.bpmnModeler.get('canvas').zoom('fit-viewport')
          // 设置 流程图预览速度
          this.bpmnModeler.get('animation').setAnimationSpeed(1.5)
          document.getElementsByClassName('toggle-mode')[0].innerHTML = '流程模拟 <span class="toggle"><i class="fa fa-toggle-off"></i></span>'
        }
      })
    },
    handleClick(tab, event) {
      this.showVarDict = false
      if (tab.name === 'first') {
        this.getProcessDiagramXML()
      } else if (tab.name === 'fourth') {
        this.getProcessDiagramXML()
        this.$refs.bpmnXml.codemirrorChange()
      } else if (tab.name === 'third') {
        this.$nextTick(() => {
          this.showVarDict = true
        })
      } else if (tab.name === 'second') {
        this.getProcessDiagramXML()
      }
    },
    getProcessDiagramXML() {
      if (this.bpmnModeler._customElements != null && this.bpmnModeler._customElements.length > 0) {
      // 将自定义的元素 加入到 _definitions
        this.bpmnModeler._definitions.rootElements[0].flowElements = this.bpmnModeler._definitions.rootElements[0].flowElements.concat(this.bpmnModeler._customElements[0])
      }

      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (err) {
          this.$message.error(err)
        } else {
          this.processDiagramXml = xml.replace(/ns0:/g, 'flowable:')
        }
      })
    }

  }
}
</script>
<style lang='scss'>
/*左边工具栏以及编辑节点的样式*/
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

@import "../bpmn-js-bpmnlint/assets/css/bpmn-js-bpmnlint.css";
/** 缩略图样式 */
@import "~diagram-js-minimap/assets/diagram-js-minimap.css";
@import "~bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css";

* {
  box-sizing: border-box;
}

 .processDesign {
     border: solid 1px #cccccc;
     width: 98%;
     min-width: 1080px;
     margin: 10px auto;
 }
  .centerClass{
     min-height: 600px;
     min-width: 600px;
     overflow-x: scroll;
 }
 .designHeader {
    //  height: 45px;
    //  line-height: 45px;
      margin: 0px auto;
    // border: solid 1px #666;
 }
 .designFooter {
     height: 100px;
    // border: solid 1px #666;
 }
 .designRight{
    min-height: 600px;
    position: relative;
    border-top: solid 1px #cccccc;
    border-bottom: solid 1px #cccccc;
    border-left: solid 1px #cccccc;
    margin-left: 10px;
}
 .designLeft{
    position: relative;
   // border: solid 1px #666;
}
.bjsl-button {
    top: 20px;
    height: 30px;
}
 //缩略图
.djs-minimap {
  position: absolute;
  top: 20px;
  right: 10px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  border: solid 1px #ccc;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
}
.djs-minimap .map {
    width: 250px;
    height: 150px;
}

.djs-minimap:not(.open) .toggle {
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: url("../../assets/diagram_images/minmap.svg") 0 0 no-repeat;
}

.djs-minimap.open .toggle:before {
  content: "关闭";
}
.djs-minimap:not(.open) .toggle:before {
  content: "";
}

.content {
  position: relative;
  width: 100%;
  height: 100%;

  > .message {
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;

    font-size: 16px;
    color: #111;

    .note {
      vertical-align: middle;
      text-align: center;
      display: table-cell;
    }

    &.error {
      .details {
        max-width: 500px;
        font-size: 12px;
        margin: 20px auto;
        text-align: left;
        color: #BD2828;
      }

      pre {
        border: solid 1px #BD2828;
        background: #fefafa;
        padding: 10px;
        color: #BD2828;
      }
    }
  }
  &:not(.with-error) .error,
  &.with-error .intro,
  &.with-diagram .intro {
    display: none;
  }

  .canvas {
    position: relative;
    float: left;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 750px;
    border: 1px solid red;
  }

  .properties-panel-parent {
    display: none;
  }

  &.with-diagram {
    .canvas,
    .properties-panel-parent  {
      display: block;
    }
  }
}

.djs-container svg:nth-child(3){
  height: 100%;
  min-height: 600px;
  border: 1px solid  #cccccc;
  //background: url('../../assets/diagram_images/bg.svg') #fff;
  background: white;
  overflow: auto;
  background-image: linear-gradient(
      90deg,
      rgba(220, 220, 220, 0.5) 6%,
      transparent 0
    ),
    linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
  background-size: 12px 12px;
  width: 100%;
  height: calc(100vh - 82px);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
// .containers {
//   background: white;
//   overflow: auto;
//   background-image: linear-gradient(
//       90deg,
//       rgba(220, 220, 220, 0.5) 6%,
//       transparent 0
//     ),
//     linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
//   background-size: 12px 12px;
//   width: 100%;
//   height: calc(100vh - 82px);
//   -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
// }

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
    bottom: 15px;
    right: 15px;
    z-index: 100;
    overflow: hidden;
    background-color: rgba(255,255,255,0.9);
    border: solid 1px #ccc;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
}

.io-zoom-reset {
    margin-bottom: 10px;
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

.io-editing-tools {
    width: auto;
    position: absolute;
    right: 5px;
    top: 5px;
    display: none;
    z-index: 100;
}

.fullscreenIcon  {
  cursor: pointer;
  background: url("../../assets/diagram_images/fullscreen.svg") 0 0 no-repeat;;

}

.keyboardIcon {
  cursor: pointer;
  background: url("../../assets/diagram_images/keyboard.svg")  0 0 no-repeat;;
}
.control button {
  padding: 0;
  outline: none;
  cursor: pointer;
  font-size: 22px;
  line-height: 26px;
  color: #555;
  background: none;
  border: none;
}

.bjsl-button-error {
    background-color: #cc3300;
    color: red;
    background: url(/static/img/error.b6429213.svg) 0 0 no-repeat;
}
</style>
