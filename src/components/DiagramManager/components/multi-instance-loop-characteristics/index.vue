<template>
  <div class="app-container">
    <div class="container-info">
      <el-form
        :inline="true"
        label-width="120px"
        size="small"
      >
        <el-form-item
          label="执行方式"
          required
        >
          <el-select v-model="sequential">
            <!--相当于bpmn2.0标准中的isSequential-->
            <el-option
              label="并行执行"
              value="parallel"
            />
            <el-option
              label="顺序执行"
              value="sequential"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="通过比例"
          required
        >
          <el-select
            v-model="proportion"
            placeholder="请选择"
          >
            <el-option
              v-for="item in proportionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import elementHelper from '../../js/helper/ElementHelper'
import bpmHelper from '../../js/helper/BpmHelper'

export default {
  name: 'MultiInstanceLoopCharacteristics',
  props: ['element'],
  inject: ['bpmnModeler'],
  data() {
    return {
      sequential: 'parallel',
      proportion: '100',
      proportionOptions: [
        {
          value: '0',
          label: '0%'
        },
        {
          value: '1',
          label: '1%'
        },
        {
          value: '10',
          label: '10%'
        },
        {
          value: '20',
          label: '20%'
        },
        {
          value: '30',
          label: '30%'
        },
        {
          value: '40',
          label: '40%'
        },
        {
          value: '50',
          label: '50%'
        },
        {
          value: '60',
          label: '60%'
        },
        {
          value: '70',
          label: '70%'
        },
        {
          value: '80',
          label: '80%'
        },
        {
          value: '90',
          label: '90%'
        },
        {
          value: '100',
          label: '100%'
        }
      ]
    }
  },
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  },
  watch: {
    // 监视元素变化
    element: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (!newVal) return

        console.log(newVal)
        const businessObject = newVal.businessObject
        const bpmnModeler = this.bpmnModeler()
        const bpmnFactory = bpmnModeler.get('bpmnFactory')
        let extensionElements = businessObject.get('extensionElements')

        if (!extensionElements) {
          extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory)
        }
        const length = extensionElements.get('values').length
        let customProperties
        for (let i = 0; i < length; i++) {
          if (extensionElements.get('values')[i] && extensionElements.get('values')[i].$type === 'flowable:CustomProperties') {
            customProperties = extensionElements.get('values')[i]
          }
        }
        if (!customProperties) {
          customProperties = elementHelper.createElement('flowable:CustomProperties', null, this.element, bpmnFactory)
          extensionElements.get('values').push(customProperties)
        }

        const modeling = bpmnModeler.get('modeling')
        modeling.updateProperties(this.element, {
          extensionElements: extensionElements
        })

        if (bpmHelper.getPropertieByName(customProperties, 'sequential')) {
          this.sequential = bpmHelper.getPropertieByName(customProperties, 'sequential')
        } else {
          bpmHelper.createOrUpdateCustomProperties(newVal, bpmnModeler, 'sequential', this.sequential)
        }

        if (bpmHelper.getPropertieByName(customProperties, 'proportion')) {
          this.proportion = bpmHelper.getPropertieByName(customProperties, 'proportion')
        } else {
          bpmHelper.createOrUpdateCustomProperties(newVal, bpmnModeler, 'proportion', this.proportion)
        }
      }
    },
    sequential: {
      handler(newVal, oldVal) {
        console.log('sequential')
        console.log(this.element)
        console.log(this.bpmnModeler())
        bpmHelper.createOrUpdateCustomProperties(this.element, this.bpmnModeler(), 'sequential', newVal)
      }
    },
    proportion: {
      handler(newVal, oldVal) {
        bpmHelper.createOrUpdateCustomProperties(this.element, this.bpmnModeler(), 'proportion', newVal)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
