<template>
  <div id="app-container">
    <div id="right" ref="right">

      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane name="first">
          <span slot="label"><i class="el-icon-date" /> 基本信息</span>
          <el-collapse v-model="nodeActiveNames" accordion>
            <el-collapse-item name="process">
              <template slot="title">
                流程信息<i class="header-icon el-icon-info" />
              </template>
              <el-form
                :inline="true"
                :model="process"
                label-width="auto"
                size="small"
              >
                <el-form-item
                  label="名称"
                >
                  <el-input
                    v-model="process.processName"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item
                  label="KEY"
                >
                  <el-input
                    v-model="process.processKey"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item
                  label="备注"
                >
                  <el-input
                    v-model="process.remarks"
                    type="textarea"
                    :autosize="{minRows: 4, maxRows:10}"
                    :disabled="true"
                  />
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="node">
              <template slot="title">
                节点信息<i class="header-icon el-icon-info" />
              </template>
              <el-form
                :inline="true"
                :model="element"
                label-width="auto"
                size="small"
              >
                <el-form-item
                  v-if="selectNode"
                  label="节点ID"
                >
                  <el-input
                    v-model="element.id"
                    @input="idChange"
                  />
                </el-form-item>
                <el-form-item
                  v-if="selectNode"
                  label="节点名称"
                >
                  <el-input
                    v-model="elementName"
                    @input="nameChange"
                  />
                </el-form-item>

                <el-form-item
                  v-if="selectNode"
                  label="宽度"
                >
                  <el-input
                    v-model="element.width"
                    disabled
                  />
                </el-form-item>
                <el-form-item
                  v-if="selectNode"
                  label="高度"
                >
                  <el-input
                    v-model="element.height"
                    disabled
                  />
                </el-form-item>
                <el-form-item
                  v-if="selectNode"
                  label="X"
                >
                  <el-input
                    v-model="element.x"
                    disabled
                  />
                </el-form-item>
                <el-form-item
                  v-if="selectNode"
                  label="Y"
                >
                  <el-input
                    v-model="element.y"
                    disabled
                  />
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label"><i class="el-icon-setting" /> 基础设置</span>

          <div>
            <el-form label-width="auto" size="mini" label-position="top">
              <component :is="propsComponent" :key="key" :element="element" />
            </el-form>
          </div>
        </el-tab-pane>

      </el-tabs>

    </div>
  </div>
</template>
<script>
import deepClone from 'clone-deep'

import bpmnHelper from './js/helper/BpmnHelper'
import CommonProps from './props/CommonProps.vue'
import ProcessProps from './props/ProcessProps.vue'
import StartEventProps from './props/StartEventProps.vue'
import EndEventProps from './props/EndEventProps.vue'
import IntermediateThrowEventProps from './props/IntermediateThrowEventProps.vue'
import ExclusiveGatewayProps from './props/ExclusiveGatewayProps.vue'
import ParallelGatewayProps from './props/ParallelGatewayProps.vue'
import InclusiveGatewayProps from './props/InclusiveGatewayProps.vue'
import UserTaskProps from './props/UserTaskProps.vue'
import SequenceFlowProps from './props/SequenceFlowProps.vue'
import CallActivityProps from './props/CallActivityProps.vue'

export default {
  name: 'DesignRight',
  components: {
    CommonProps,
    ProcessProps,
    StartEventProps,
    EndEventProps,
    IntermediateThrowEventProps,
    ExclusiveGatewayProps,
    ParallelGatewayProps,
    InclusiveGatewayProps,
    UserTaskProps,
    SequenceFlowProps,
    CallActivityProps
  },
  provide: function() {
    return {
      bpmnModeler: this.getBpmnModeler,
      params: this.params
    }
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
      propsComponent: 'CommonProps',
      nodeActiveNames: ['process', 'node'],
      element: {},
      process: {},
      params: '',
      key: '1',
      defaultData: {

      },
      activeName: 'second',
      elementName: ''
    }
  },
  computed: {
    userTask() {
      if (!this.element) {
        return
      }
      return this.element.type === 'bpmn:UserTask'
    },
    sequenceFlow() {
      if (!this.element) {
        return
      }
      return this.element.type === 'bpmn:SequenceFlow'
    },
    selectNode() {
      if (!this.element || this.element.id === undefined) {
        return
      }
      return true
    },
    bpmnProcess() {
      if (!this.element) {
        return
      }
      return this.element.type === 'bpmn:Process'
    }
  },
  watch: {
    // element: {
    //   handler(newValue, oldValue) {
    //     console.log(':watch element:' + newValue)
    //     if (oldValue !== newValue) { this.element = deepClone(newValue) }
    //   },
    //   deep: true
    // },
    processInfo: {
      handler(newValue, oldValue) {
        // console.log('newValue:' + JSON.stringify(newValue))
        this.process = deepClone(newValue)
      },
      deep: true
    }
  },
  created() {
    this.process = deepClone(this.processInfo)
  },
  mounted() {
    this.handleModeler()
    var _this = this
    const eventBus = _this.bpmnModeler.get('eventBus')
    eventBus.on('diagram.init', function() {
      console.log('sssssssssssssssssssssssssss+ diagram.init')
    })
    var prefix = 'tokenSimulation'
    var simulationModeActive = true
    eventBus.on(prefix + '.toggleMode', function() {
      if (simulationModeActive) {
        document.getElementsByClassName('toggle-mode')[0].innerHTML = '流程模拟 <span class="toggle"><i class="fa fa-toggle-on"></i></span>'
        document.querySelector('.djs-palette').style.display = 'none'
      } else {
        document.getElementsByClassName('toggle-mode')[0].innerHTML = '流程模拟 <span class="toggle"><i class="fa fa-toggle-off"></i></span>'
        document.querySelector('.djs-palette').style.display = 'inline-block'
      }
      simulationModeActive = !simulationModeActive
    })

    // 监听流程图事件
    const events = [
      // 'element.click',
      // 'element.dblclick',
      'shape.added',
      'shape.move.end',
      'connection.removed',
      'shape.removed',
      'connection.added'
      // 'commandStack.shape.create.postExecuted',
      // 'commandStack.shape.remove.postExecuted',
      // 'commandStack.connection.create.postExecuted',
      // 'commandStack.connection.remove.postExecuted'

    /*   'element.hover',
      'element.out',
      'element.mousedown',
      'element.mouseup' */
    ]
    events.forEach(function(event) {
      eventBus.on(event, function(e) {
        var elementRegistry = _this.bpmnModeler.get('elementRegistry')
        var shape = e.element ? elementRegistry.get(e.element.id) : e.shape

        switch (event) {
          case 'shape.added':
            console.log('新增了shape')
            // 展示新增图形的属性
            _this.key = e.element.id.replace('_label', '')
            _this.propsComponent = bpmnHelper.getComponentByEleType(shape.type)
            _this.element = e.element

            break
          case 'shape.move.end':
            console.log('移动了shape')
            // 展示新增图形的属性
            _this.key = shape.id
            _this.propsComponent = bpmnHelper.getComponentByEleType(shape.type)
            _this.element = e.shape
            break
          case 'connection.added':

            break
          case 'shape.removed':
            // 展示默认的属性
            _this.propsComponent = 'CommonProps'

            break
          case 'connection.removed':

            break
          default:
            break
        }
      })
    })
  },
  methods: {
    idChange(id) {
      const modeling = this.modeler.get('modeling')
      modeling.updateProperties(this.element, { id: id })
    },
    getBpmnModeler() {
      return this.bpmnModeler
    },
    // 属性面板名称，更新回流程节点
    nameChange(name) {
      const modeling = this.bpmnModeler.get('modeling')
      modeling.updateLabel(this.element, name)
    },

    handleModeler() {
      // 监听节点选择变化,不会监听流程图的变化
      // 监听 element

      const that = this
      that.element = that.bpmnModeler.get('canvas').getRootElement()

      const eventBus = that.bpmnModeler.get('eventBus')
      const eventTypes = ['element.click', 'element.changed', 'selection.changed']

      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, function(e) {
          // that.bpmnModeler.get('comments').collapseAll()
          // that.bpmnModeler.get('comments').toggleCollapse(that.element)

          console.log(':handleModeler eventType:' + eventType)
          if (eventType === 'element.changed') {
            that.elementChanged(e)
          } else if (eventType === 'selection.changed') {
            const element = e.newSelection[0]
            if (!element || element === undefined) return
            that.element = element
          } else if (eventType === 'element.click') {
            console.log('点击了element: ' + e.element.type)
            if (!e || e.element.type === 'bpmn:Process') {
            // if (!e) {
              that.key = '1'
              that.propsComponent = 'CommonProps'
              that.element = e.element
            } else {
              // 展示新增图形的属性
              that.key = e.element.id
              that.propsComponent = bpmnHelper.getComponentByEleType(e.element.type)
              that.element = e.element
            }
          }
        })
      })
    },
    elementChanged(e) {
      const id = e.element.id.replace('_label', '')
      var shape = this.getShape(id)

      const that = this

      if (!shape) {
        // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
        console.log('无效的shape')
        // 上面已经用 shape.removed 检测了shape的删除, 要是删除shape的话这里还会被再触发一次
        console.log('删除了shape和connect')
        return
      }
      const { element } = e
      if (!element || element === undefined) return

      console.log('element.changed:' + JSON.stringify(element))
      element.businessObject.name
      if (element.type === 'bpmn:SequenceFlow') {
        that.elementName = element.name
      } else {
        that.elementName = element.businessObject.name
      }
      if (!that.isInvalid(shape.type)) {
        that.element = e.element

        if (that.isSequenceFlow(shape.type)) {
          console.log('改变了线')
        } else {
          that.setDefaultProperties()
        }
      }
    },
    isInvalid(param) { // 判断是否是无效的值
      return param === null || param === undefined || param === ''
    },
    isSequenceFlow(type) { // 判断是否是线
      return type === 'bpmn:SequenceFlow'
    }, getShape(id) {
      var elementRegistry = this.bpmnModeler.get('elementRegistry')
      return elementRegistry.get(id)
    },
    setDefaultProperties() {
      console.log('setDefaultProperties')
      const that = this
      const { element } = that
      if (element) {
        // 这里可以拿到当前点击的节点的所有属性
        const { type, businessObject } = element
        const { name } = businessObject
        if (that.verifyIsEvent(type)) {
          const eventType = businessObject.eventDefinitions ? businessObject.eventDefinitions[0]['$type'] : ''
          console.log(eventType)
        } else if (that.verifyIsTask(type)) {
          const taskType = type
          console.log(taskType)
        }

        that.element['name'] = name || that.defaultData[element.type]
      }
    },
    verifyIsEvent(type) {
      return type.includes('Event')
    },
    verifyIsTask(type) {
      return type.includes('Task')
    }
  }
}
</script>

<style lang="scss">
</style>

