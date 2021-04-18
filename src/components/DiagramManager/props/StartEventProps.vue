<template>
  <div>
    <el-form
      :inline="true"
      label-width="80px"
      size="small"
    >
      <el-form-item v-show="false" label="编号">
        <el-input v-model="id" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item v-show="false" label="表单标识">
        <el-input v-model="formKey" />
      </el-form-item>
      <el-form-item v-show="false" label="文档">
        <el-input v-model="documentation" type="textarea" />
      </el-form-item>
      <el-form-item v-show="false" label="启动流程的人的id">
        <el-input v-model="initiator" />
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
      id: this.element.id || '',
      name: '',
      formKey: '',
      formFields: '',
      documentation: '',
      initiator: ''
    }
  },

  watch: {
    id(newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, {
        id: newVal
      })
    },
    name(newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, {
        name: newVal
      })
    },
    element: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal.type === 'bpmn:StartEvent') { // 防止修改其他子组件的属性
            this.name = newVal.name
          }
        }
      }

    }
  }
}
</script>
<style>

</style>
