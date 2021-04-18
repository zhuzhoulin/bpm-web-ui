<template>
  <div>
    <el-form
      :inline="true"
      label-width="80px"
      size="small"
    >
      <el-form-item label="编号" required>
        <el-input v-model="id" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item v-show="false" label="表单标识">
        <el-input v-model="fromKey" />
      </el-form-item>
      <el-form-item v-show="false" label="文档">
        <el-input v-model="documentation" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import bpmnHelper from '../js/helper/BpmnHelper'
export default {
  props: ['element'],
  inject: ['bpmnModeler'],
  data() {
    return {
      id: this.element.id || '',
      name: '',
      fromKey: '',
      documentation: ''
    }
  },

  watch: {
    id: function(newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, {
        id: newVal
      })
    },
    name: function(newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, {
        name: newVal
      })
    },
    element: {
      handler(newVal, oldVal) {
        this.name = newVal.name
        const businessObject = newVal.businessObject
        const sequenceFlowOrder = businessObject.get('sequenceFlowOrder')
        if (sequenceFlowOrder) {
          this.process_order = '连线排序设置'
        }
      },
      immediate: true,
      deep: true

    }
  }
}
</script>
<style>

</style>
