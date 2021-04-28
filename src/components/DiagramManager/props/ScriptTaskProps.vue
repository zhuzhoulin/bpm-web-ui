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
      <el-form-item v-show="show" label="文档">
        <el-input
          v-model="documentation"
          type="textarea"
          placeholder="请输入文档内容"
          :autosize="{minRows:4,maxRows:10}"
          maxlength="300"
          show-word-limit
        />
      </el-form-item>

      <el-divider />

      <el-form-item v-show="show" label="脚本类型">
        <el-select
          v-model="scriptFormat"
        >
          <el-option
            v-for="(items,index) in scriptFormatOptions"
            :key="index"
            :label="items.label"
            :value="items.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="保存变量">
        <el-input v-model="resultVariable" />
      </el-form-item>
      <el-form-item v-show="show" label="脚本">
        <el-input
          v-model="script"
          type="textarea"
          placeholder="请输入脚本"
          :autosize="{minRows:4,maxRows:10}"

          show-word-limit
        />
      </el-form-item>
      <el-form-item v-show="show">
        <span>注意以下名称是保留名称，不能用作变量名称 out，out：print，lang：import，context，elcontext</span>
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
      documentation: '',
      scriptFormat: 'javascript',
      scriptFormatOptions: [
        { label: 'javascript', value: 'javascript' },
        { label: 'groovy', value: 'groovy' }
      ],
      script: '',
      show: true,
      resultVariable: '',
      resource: ''
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
    scriptFormat: function(newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, {
        scriptFormat: newVal
      })
    },
    script: function(newVal, oldVal) {
      bpmnHelper.updateProperties(this.element, { 'script': newVal })
    },
    resultVariable: function(newVal, oldVal) {
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, {
        resultVariable: newVal
      })
    },
    documentation: function(newVal, oldVal) {
      bpmnHelper.updateDocumentation(this.bpmnModeler(), this.element, newVal)
    },
    element: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal.type === 'bpmn:ScriptTask') {
            const businessObject = newVal.businessObject
            this.name = businessObject.name
            this.scriptFormat = bpmnHelper.getPropertie(this.element, 'scriptFormat') || 'javascript'
            this.resultVariable = bpmnHelper.getPropertie(this.element, 'resultVariable') || ''
            this.script = bpmnHelper.getPropertie(this.element, 'script') || ''
            if (!Array.isArray(bpmnHelper.getPropertie(this.element, 'bpmn:documentation')[0].text)) {
              this.documentation = bpmnHelper.getPropertie(this.element, 'bpmn:documentation')[0].text || ''
            } else {
              this.documentation = ''
            }
          }
        }
      },
      immediate: true,
      deep: true

    }
  },
  mounted() {

  },
  created() {

  },
  methods: {

  }
}
</script>
<style>

</style>
