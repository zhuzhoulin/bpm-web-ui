<template>
  <div>
    <el-form
      :inline="true"
      label-width="80px"
      size="small"
    >
      <el-form-item v-show="show" label="编号">
        <el-input v-model="id" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item v-show="show" label="表单标识">
        <el-input v-model="formKey" />
      </el-form-item>
      <el-form-item v-show="show" label="文档">
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
      formKey: '',
      documentation: '',
      show: true
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
        if (newVal !== oldVal) {
          if (newVal.type === 'bpmn:EndEvent') { // 防止修改其他子组件的属性
            this.name = newVal.name
          }
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
