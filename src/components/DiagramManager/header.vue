<template>
  <div id="app-container">
    <div id="header" ref="header" class="header">
      <div>
        <el-button-group>
          <el-button plain size="small">
            <a @click="handleOpen()">
              <input
                style="display:none"
                type="file"
                class="openFile"
                @click="onOpenFile($event)"
              >
              <svg-icon icon-class="folder-open" />
              导入
            </a>
          </el-button>
          <el-button plain size="small" @click="handleSave()"><svg-icon icon-class="save" /> 保存</el-button>
          <el-button plain size="small" @click="handleUndo()"><svg-icon icon-class="undo" /> 撤销</el-button>
          <el-button plain size="small" @click="handleRedo()"><svg-icon icon-class="redo" /> 重做</el-button>
          <el-button plain size="small" @click="handleZoom()"> <i class="el-icon-aim" /> 实际尺寸</el-button>
          <el-button plain size="small" @click="handleZoom(0.1)"> <i class="el-icon-circle-plus-outline" /> 放大</el-button>
          <el-button plain size="small" @click="handleZoom(-0.1)"> <i class="el-icon-remove-outline" /> 缩小</el-button>
          <el-button plain size="small" @click="handleDownloadXml()"> <svg-icon icon-class="download" /> 下载XML</el-button>
          <el-button plain size="small" @click="handleDownloadSvg()"> <svg-icon icon-class="picture" /> 下载SVG</el-button>
          <el-button plain size="small" @click="handleFullScreen()"> <svg-icon icon-class="fullscreen" /> 全屏</el-button>
        </el-button-group>
        <el-button-group>
          <el-button plain size="small" @click="showShortcutKeys()">  <svg-icon icon-class="key" /> 快捷键</el-button>
          <el-button plain size="small" @click="autuLayout()"> <svg-icon icon-class="gold" /> 排版</el-button>
          <el-button plain size="small" @click="align('left')"> <svg-icon icon-class="align-left" /> 左对齐</el-button>
          <el-button plain size="small" @click="align('middle')"> <svg-icon icon-class="align-center" /> 水平对齐</el-button>
          <el-button plain size="small" @click="align('right')"> <svg-icon icon-class="align-right" /> 右对齐</el-button>
          <el-button plain size="small" @click="align('top')"> <svg-icon icon-class="vertical-align-top" /> 顶部对齐</el-button>
          <el-button plain size="small" @click="align('center')"> <svg-icon icon-class="vertical-align-middle" /> 垂直对齐</el-button>
          <el-button plain size="small" @click="align('bottom')"> <svg-icon icon-class="vertical-align-bottom" /> 底部对齐</el-button>
          <el-button plain size="small" @click="validateDiagrame('bottom')"> <svg-icon icon-class="check" /> 校验</el-button>

        </el-button-group>

      </div>
    </div>
  </div>
</template>
<script>

// import { updateProcess } from '@/api/process'
import { insertOrUpdate } from '@/api/process/processDetail'

export default {
  name: 'DesignHeader',
  components: {

  },
  props: {
    bpmnModeler: {
      type: Object,
      required: true
    },
    processInfo: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {

      state: {
        scale: 1 // 流程图比例
      },
      processDiagramXml: ''
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    /**
     * 下载xml/svg
     *  @param  type  类型  svg / xml
     *  @param  data  数据
     *  @param  name  文件名称
     */
    download(type, data, name) {
      let dataTrack = ''
      const a = document.createElement('a')

      switch (type) {
        case 'xml':
          dataTrack = 'bpmn'
          break
        case 'svg':
          dataTrack = 'svg'
          break
        default:
          break
      }

      console.log(this.bpmnModeler._definitions)
      var bpmnName =
        this.bpmnModeler._definitions.rootElements[0].id ||
        this.bpmnModeler._definitions.rootElements[0].name
      var filename = bpmnName + '.' + dataTrack

      name = name || `${filename}`

      a.setAttribute(
        'href',
        `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
      )
      a.setAttribute('target', '_blank')
      a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
      a.setAttribute('download', name)

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },

    // 导入xml文件
    handleOpenFile(e) {
      const that = this
      const file = e.target.files[0]
      const reader = new FileReader()
      let data = ''
      reader.readAsText(file)
      reader.onload = function(event) {
        data = event.target.result
        that.bpmnModeler.importXML(data, err => {
          if (err) {
            console.log('init diagram error' + err)
            window.alert(' 请选择正确的bpmn 或 XML 文件 ！' + err)
            return
          } else {
            console.log('init diagram success!')
            // 让图能自适应屏幕
            that.bpmnModeler.get('canvas').zoom('fit-viewport')
            // 设置 流程图预览速度
            that.bpmnModeler.get('animation').setAnimationSpeed(1.5)
            document.getElementsByClassName('toggle-mode')[0].innerHTML = '流程模拟 <span class="toggle"><i class="fa fa-toggle-off"></i></span>'
          }
        })
      }
    },

    // 保存
    handleSave() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (err) {
          this.$message.error(err)
        } else {
          const nodeIdList = []
          try {
            for (var index in this.bpmnModeler._definitions.$model.ids._seed.hats) {
              if (this.bpmnModeler._definitions.$model.ids._seed.hats[index].$type === 'bpmn:Process') continue
              nodeIdList.push(this.bpmnModeler._definitions.$model.ids._seed.hats[index].id)
            }
          } catch (e) {
            console.error(e)
          }

          try {
            // var nodeList = []
            for (var index2 in this.bpmnModeler.get('elementRegistry').getAll()) {
              if (this.bpmnModeler.get('elementRegistry').getAll()[index2].type === 'label' ||
              this.bpmnModeler.get('elementRegistry').getAll()[index2].type === 'bpmn:Process') continue
              // nodeList.push(this.$refs.panel.elementToNodeInfo(this.bpmnModeler.get('elementRegistry').getAll()[index2]))
            }
          } catch (e) {
            console.error(e)
          }

          if (!this.bpmnModeler.get('linting')._active) {
            this.bpmnModeler.get('linting').toggle()
            this.$message.warning('当前流程未校验，现自动开启校验，如果校验无误后，请再点击保存按钮！')
            return
          }
          const validateError = Number(this.bpmnModeler.get('linting')._button.innerText.split(' Errors')[0])
          console.log('validateError:' + validateError)
          if (validateError > 0) {
            this.$message.error('当前流程未通过校验，请修改后再保存！')
            // 先放开
            // return
          }

          const postData = {
            tenantId: this.processInfo.tenantId,
            processId: this.processInfo.processId,
            processDetailId: this.processInfo.processDetailId,
            processXml: xml.replace(/ns0:/g, 'flowable:')
          }

          insertOrUpdate(postData).then(response => {
            this.$message.success('保存成功!')
            this.$nextTick(() => {
              this.processInfo.processDetailId = response.data
              this.$emit('closeDiagramDialog')
              this.$emit('queryList')
            })
          })
        }
      })
    },
    // 前进
    handleRedo() {
      this.bpmnModeler.get('commandStack').redo()
    },

    // 后退
    handleUndo() {
      this.bpmnModeler.get('commandStack').undo()
    },

    // 对齐
    align(type) {
      const selection = this.bpmnModeler.get('selection').get()

      if (selection === 'undefined' || selection === null || selection === '' || selection.length === 0) {
        this.$message.error('选择排版节点为空，请选择需对齐具体节点！')
        return
      }
      this.bpmnModeler.get('alignElements').trigger(selection, type)
    },

    // 下载SVG格式
    handleDownloadSvg() {
      this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
        console.log('err：' + err)
        this.download('svg', data)
        this.processDiagramSvg = data
      })
    },

    // 下载XML格式
    handleDownloadXml() {
      this.bpmnModeler.saveXML({ }, (err, data) => {
        if (err) {
          this.$message.error(err)
        } else {
          this.download('xml', data.replace(/ns0:/g, 'flowable:'))
        }
      })
    },

    // 流程图放大缩小
    handleZoom(radio) {
      console.log('handleZoom () ')
      const newScale = !radio
        ? 1.0 // 不输入radio则还原
        : this.state.scale + radio <= 0.2 // 最小缩小倍数
          ? 0.2
          : this.state.scale + radio
      this.bpmnModeler.get('canvas').zoom(newScale)
      this.state.scale = newScale
    },

    handleOpen() {
      document.getElementsByClassName('openFile')[0].click()
    },
    onOpenFile(files) {
      this.handleOpenFile(files)
    },
    handleFullScreen() {
      const element = document.documentElement
      // 判断是否已经是全屏
      // 如果是全屏，退出
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        // 否则，进入全屏
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      // 改变当前全屏状态
      this.fullscreen = !this.fullscreen
    },
    showShortcutKeys() {
      const showcutKeysHtml =
        '	 <table>  ' +
        '        <tbody>  ' +
        '          <tr>  ' +
        '            <td>撤销</td>  ' +
        '            <td class="binding"><code>ctrl + Z</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>重做</td>  ' +
        '            <td class="binding"><code>ctrl + ⇧ + Z</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>全选</td>  ' +
        '            <td class="binding"><code>ctrl + A</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>滚动（垂直）</td>  ' +
        '            <td class="binding"><code>ctrl + Scrolling</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>滚动（水平）</td>  ' +
        '            <td class="binding"><code>ctrl + ⇧ + Scrolling</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>直接编辑</td>  ' +
        '            <td class="binding"><code>E</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>拖拽工具</td>  ' +
        '            <td class="binding"><code>H</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>自由套索工具</td>  ' +
        '            <td class="binding"><code>L</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>空间移动工具</td>  ' +
        '            <td class="binding"><code>S</code></td>  ' +
        '          </tr>  ' +
        '        </tbody>  ' +
        '      </table>  '

      this.$alert(showcutKeysHtml, '快捷键', {
        dangerouslyUseHTMLString: true
      }).catch(e => e)
    },
    autuLayout() {
      this.getProcessDiagramXML()
      /*  const alignToOrigin = this.bpmnModeler.get('alignToOrigin')
      console.log('alignToOrigin:' + alignToOrigin)
      alignToOrigin.align() */
      var AutoLayout = require('bpmn-auto-layout')

      const autoLayout = new AutoLayout()

      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (err) {
          this.$message.error(err)
        } else {
          (async() => {
            var layoutedDiagramXML = await autoLayout.layoutProcess(xml)

            console.log('layoutedDiagramXML:' + layoutedDiagramXML)
          })()
          // vkbeautify.xml(xml.replace(/ns0:/g, 'flowable:'))
        }
      })
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
          this.processDiagramXml = xml
          // vkbeautify.xml(xml.replace(/ns0:/g, 'flowable:'))
        }
      })
    },
    getProcessDiagramSvg() {
      this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
        console.log('err：' + err)
        this.processDiagramSvg = data
      })
    },
    validateDiagrame() {
      this.bpmnModeler.get('linting').toggle()
    }
  }
}
</script>

<style lang="scss" scoped>

.el-button-group {
  margin-top: 10px;
  .el-button{
    width: 100px;
  }
}
.header{
  margin-bottom: 10px;
}

</style>

