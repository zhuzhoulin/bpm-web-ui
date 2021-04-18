<template>
  <div>
    <el-form
      :inline="true"
      label-width="80px"
      size="small"
    >
      <el-form-item label="目标命名空间">
        <el-input v-model="targetNamespace" readonly />
      </el-form-item>
      <el-form-item v-show="isShow" label="标签版本">
        <el-input v-model="versionTag" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-show="isShow" v-model="isExecutable">是否可执行</el-checkbox>
      </el-form-item>
      <el-form-item v-show="isShow" label="任务优先级">
        <el-input v-model="taskPriority" />
      </el-form-item>
      <el-form-item v-show="isShow" label="工作优先级">
        <el-input v-model="jobPriority" />
      </el-form-item>
      <el-form-item v-show="isShow" label="候选开始组">
        <el-select v-model="candidateStarterGroups" multiple filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-show="isShow" label="候选开始用户">
        <el-input v-model="candidateStarterUsers" />
      </el-form-item>
      <el-form-item v-show="isShow" label="历史生存时间">
        <el-input v-model="historyTimeToLive" />
      </el-form-item>
      <el-form-item v-show="isShow" label="监听器配置">
        <el-input v-model="historyTimeToLive" />
      </el-form-item>
      <el-form-item v-show="true" label="文档">
        <el-input v-model="documentation" type="textarea" @change="updateProperties('documentation',$event )" />  <!-- documentation   ? -->
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import bpmnHelper from '../js/helper/BpmnHelper'

export default {
  props: ['element'],
  inject: ['bpmnModeler'],
  data() {
    return {
      targetNamespace: '',
      isShow: true,
      versionTag: '',
      isExecutable: true,
      taskPriority: '',
      jobPriority: '',
      candidateStarterGroups: '',
      candidateStarterUsers: '',
      historyTimeToLive: '',
      documentation: '',
      options: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }]
    }
  },
  mounted() {
    // const modelInfo = this.$root.params.modelInfo
    // const modelId = modelInfo.modelId
    const bpmnModeler = this.bpmnModeler()
    const definition = bpmnModeler._definitions
    if (definition) {
      this.targetNamespace = definition.targetNamespace
    }

    // this.$emit('updateProperties', { commonProperties: { id: modelId, name: modelInfo.name }})
  },
  methods: {

    updateProperties(property, value) {
      bpmnHelper.updateDocumentation(this.bpmnModeler(), this.element, value)
      //   const data = {}
      //   data[property] = value

      //   const bpmnModeler = this.bpmnModeler()

      //   // const canvas = bpmnModeler.get('canvas')
      //   const oldRoot = bpmnModeler._definitions.rootElements[0]

    //   if (!oldRoot) return
    //   //   var businessObject = oldRoot.businessObject
    //   //   if (property === 'documentation') {
    //   //     /* 更新备注 */
    //   //     var comments = businessObject.$model.create('bpmn:Documentation', {
    //   //       text: value
    //   //     })
    //   //     businessObject[property] = [comments]
    //   //   } else if (businessObject.hasOwnProperty(property)) {
    //   //     businessObject[property] = value
    //   //   } else {
    //   //     businessObject[property] = value
    //   //   }
    //   //   /* 先清空旧节点 */
    //   //   canvas.setRootElement(null, true)
    //   //   /* 设置新节点 */
    //   //   canvas.setRootElement(oldRoot, true)
    //   // const modeling = bpmnModeler.get('modeling')
    //   if (property === 'documentation') {
    //     var comments = oldRoot.$model.create('bpmn:Documentation', {
    //       text: value
    //     })
    //     data[property] = [comments]
    //   }
    //   const modeling = bpmnModeler.get('modeling')
    //   console.log('updateProperties data:' + JSON.stringify(data))
    //   modeling.updateProperties(this.element, data)
    //   console.log('bpmnModeler:' + bpmnModeler)
    }
  }
}
</script>
<style>

</style>
