<template>
  <div>
    <el-form-item label="编号" required>
      <el-input v-model="id" />
    </el-form-item>
    <el-form-item label="名称" required>
      <el-input v-model="name" />
    </el-form-item>
    <el-form-item v-show="true" label="调用子流程">
      <el-input v-model="calledElement" />
    </el-form-item>
    <el-form-item v-show="true" label="文档">
      <el-input v-model="documentation" type="textarea" />
    </el-form-item>
    <el-form-item v-show="false" label="多实例类型">
      <el-select v-model="multiinstance_type"> <!--相当于bpmn2.0标准中的isSequential-->
        <el-option label="非多实例" value="None" />
        <el-option label="同时进行" value="Parallel" />
        <el-option label="顺序进行" value="Sequential" />
      </el-select>
    </el-form-item>
    <el-form-item v-show="false" label="基数 (多实例)"><!--后端暂时没用到-->
      <el-input v-model="multiinstance_cardinality" />
    </el-form-item>
    <el-form-item v-show="false" label="元素的变量(多实例)"><!--后端暂时没用到-->
      <el-input v-model="multiinstance_variable" />
    </el-form-item>
  </div>

</template>
<script>
const forEach = require('lodash/forEach')
const find = require('lodash/find')
import { findObjFromArrayByField, isNeedUpdate } from '../js/util/CommonUtils'
import bpmnHelper from '../js/helper/BpmnHelper'
import { NodeTypeMap } from '../js/static'

export default {
  props: ['element'],
  inject: ['bpmnModeler'],
  data() {
    return {
      modeling: null,
      id: this.element.id || '',
      name: '',
      calledElement: '',
      documentation: '',
      multiinstance_type: '',
      multiinstance_cardinality: null,
      multiinstance_variable: null
    }
  },
  watch: {
    name: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, {
          name: newVal
        })
      }
    },
    // 监控的元素的变化
    element: {
      deep: true,
      immediate: true,
      handler: function(newVal, oldVal) {
        debugger
        const bpmnModeler = this.bpmnModeler()
        const modeling = bpmnModeler.get('modeling')
        const businessObject = newVal.businessObject
        this.name = businessObject.name
        this.calledElement = businessObject.get('calledElement') || ''
        this.documentation = businessObject.get('documentation') || ''
        // this.multiinstance_type = businessObject.get('multiinstance_type') || 'None';
        modeling.updateProperties(newVal, {
          name: this.name,
          calledElement: this.calledElement,
          documentation: this.documentation
          // 'multiinstance_type':this.multiinstance_type,
        })
      }
    },

    documentation: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, { 'activiti:documentation': newVal })
      }
    },
    calledElement: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, { 'calledElement': newVal })
      }
    }
    // multiinstance_type: {
    //     handler(newVal, oldVal) {
    //         this.modeling.updateProperties(this.element,{'multiinstance_type':newVal});
    //     }
    // },

  },
  mounted() {
    const bpmnModeler = this.bpmnModeler()
    this.modeling = bpmnModeler.get('modeling')
  },
  methods: {

  }
}
</script>
