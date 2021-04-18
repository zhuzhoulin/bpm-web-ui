<template>
  <div>

    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="基本属性" name="first">
        <el-form
          :inline="true"
          label-width="150px"
          size="small"
        >
          <el-form-item v-show="true" label="编号" :show-overflow-tooltip="true">
            <el-input v-model="id" disabled />
          </el-form-item>
          <el-form-item label="流程名称" required :show-overflow-tooltip="true">
            <el-input v-model="name" disabled />
          </el-form-item>
          <el-form-item v-show="true" label="命名空间" :show-overflow-tooltip="true">
            <el-input v-model="targetNamespace" disabled />
          </el-form-item>
          <el-form-item label="候选开始组">
            <el-input v-model="candidateStarterGroups" @change="updateProperties('candidateStarterGroups',$event )" />
          </el-form-item>
          <el-form-item label="候选开始用户">
            <el-input v-model="candidateStarterUsers" @change="updateProperties('candidateStarterUsers',$event )" />
          </el-form-item>
          <el-form-item v-show="true" label="文档">

            <el-input v-model="documentation" type="textarea" @change="updateDocumentation($event)" />  <!-- documentation   ? -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="监听器" name="second">
        <el-form
          :inline="true"
          label-width="150px"
          size="small"
        >
          <el-form-item label="事件类型">
            <el-select v-model="eventType" placeholder="请选择" multiple>
              <el-option label="开始" value="start" />
              <el-option label="结束" value="end" />
            </el-select>
          </el-form-item>
          <el-form-item v-show="isShow" label="监听器类型">
            <el-select v-model="listenerType" placeholder="请选择">
              <el-option label="java类" value="class" />
              <el-option label="表达式" value="expression" />
              <el-option label="代理表达式" value="delegateExpression" />
              <!-- <el-option label="脚本" value="script" /> -->
            </el-select>
          </el-form-item>
          <el-form-item v-show="isShow" :label="listenerValueLabel">
            <el-input v-model="listenerValue" />
          </el-form-item>
          <el-form-item v-show="isShow" label="监听器" />
        </el-form>
        <el-table
          v-show="isShow"
          :data="executionListenerList"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="编号">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="事件">
            <template slot-scope="scope">
              {{ scope.row.eventType }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="类型类型">
            <template slot-scope="scope">
              {{ scope.row.listenerType }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="值">
            <template slot-scope="scope">
              {{ scope.row.listenerValue }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script> import bpmnHelper from '../js/helper/BpmnHelper'
import elementHelper from '../js/helper/ElementHelper'
export default {
  // 依赖注入
  props: ['element'],
  inject: ['bpmnModeler', 'params'],
  data() {
    return {
      id: '',
      name: '',
      process_namespace: '',
      documentation: '',
      targetNamespace: '',
      activeName: 'first',
      candidateStarterGroups: '',
      candidateStarterUsers: '',
      listenerType: '',
      eventType: '',
      listenerValue: '',
      executionListenerList: [],
      isShow: false,
      listenerValueLabel: 'Java类'

    }
  },
  watch: {
    id(newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, { 'id': newVal })
    },
    name(newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, { 'name': newVal })
    },
    // 监控element值，当发生改变时获取响应的属性
    element: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          const bpmnModeler = this.bpmnModeler()
          if (!newVal.businessObject) {
            return
          }

          this.id = newVal.businessObject.get('id')
          this.name = newVal.businessObject.get('name')
          // 初始化赋值
          const modeling = bpmnModeler.get('modeling')
          modeling.updateProperties(this.element, { 'name': this.name })
          // modeling.updateProperties(this.element, { 'process_namespace': this.process_namespace })
          // modeling.updateProperties(this.element, { 'process_id': this.id })

          this.setDefaultProcess(this.element)
        }
      }
    },
    eventType(newVal, oldVal) {
      if (newVal) {
        this.isShow = true
      }
    },
    listenerType(newVal, oldVal) {
      if (newVal === 'class') {
        this.listenerValueLabel = 'java类'
      } else if (newVal === 'expression') {
        this.listenerValueLabel = '表达式'
      } else if (newVal === 'delegateExpression') {
        this.listenerValueLabel = '代理表达式'
      }
    },
    listenerValue(newVal, oldVal) {
      console.log('listenerValue：' + newVal)
      if (newVal) {
        const bpmnModeler = this.bpmnModeler()
        const bpmnFactory = bpmnModeler.get('bpmnFactory')
        let extensionElements = this.element.businessObject.get('extensionElements')
        if (!extensionElements) {
          extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory)
        }
        const length = extensionElements.get('values').length
        for (let i = 0; i < length; i++) {
          // 清除旧值
          if (!extensionElements.get('values')[i] || extensionElements.get('values')[i].$type === 'flowable:ExecutionListener') {
            extensionElements.get('values').splice(i, 1)
          }
        }
        this.eventType.forEach(evt => {
          const executionListener = elementHelper.createElement('flowable:ExecutionListener', null, this.element, bpmnFactory)
          executionListener.$attrs['event'] = evt
          executionListener.$attrs[this.listenerType] = newVal
          extensionElements.get('values').push(executionListener)
        })
        const modeling = bpmnModeler.get('modeling')
        modeling.updateProperties(this.element, {
          extensionElements: extensionElements
        })
        this.setDefaultExtensionElement(this.element)
      }
    }
  },
  mounted() {
    const bpmnModeler = this.bpmnModeler()
    const definition = bpmnModeler._definitions
    if (definition) {
      this.targetNamespace = definition.targetNamespace
    }
    this.setDefaultProcess(this.element)
  },
  methods: {
    setDefaultExtensionElement(element) {
      const extensionElements = bpmnHelper.getPropertie(element, 'extensionElements')
      this.executionListenerList = []
      if (extensionElements) {
        const length = extensionElements.get('values').length
        for (let i = 0; i < length; i++) {
          // 清除旧值
          if (extensionElements.get('values')[i] && extensionElements.get('values')[i].$type === 'flowable:ExecutionListener') {
            const executionListener = {}
            executionListener['eventType'] = extensionElements.get('values')[i].$attrs['event']
            executionListener['listenerType'] = extensionElements.get('values')[i].$type
            executionListener['listenerValue'] = extensionElements.get('values')[i].$attrs['script'] ||
                            extensionElements.get('values')[i].$attrs['class'] ||
                            extensionElements.get('values')[i].$attrs['delegateExpression']

            this.executionListenerList.push(executionListener)
          }
        }
      }
    },
    setDefaultProcess(element) {
      const candidateStarterGroups = bpmnHelper.getPropertie(element, 'candidateStarterGroups')
      this.candidateStarterGroups = candidateStarterGroups || ''
      const candidateStarterUsers = bpmnHelper.getPropertie(element, 'candidateStarterUsers')
      this.candidateStarterUsers = candidateStarterUsers || ''

      const documentation = bpmnHelper.getPropertie(element, 'documentation')
      if (documentation && documentation.length > 0) {
        this.documentation = documentation[0].text
      } else {
        this.documentation = ''
      }
      this.setDefaultExtensionElement(element)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    updateDocumentation(value) {
      console.log(value)
      bpmnHelper.updateDocumentation(this.bpmnModeler(), this.element, value)
    },
    updateProperties(property, value) {
      const data = {}
      data[property] = value

      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      //   console.log('updateProperties data:' + JSON.stringify(data))
      modeling.updateProperties(this.element, data)
    }
  }
}

</script>
