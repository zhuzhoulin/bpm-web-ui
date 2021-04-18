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
      <el-form-item label="流程顺序">
        <el-input v-model="process_order" placeholder="请选择" @focus="openDialog" /> <!-- sequenceFlowOrder -->
      </el-form-item>
      <el-form-item v-show="false" label="表单标识">
        <el-input v-model="formKey" />
      </el-form-item>
      <el-form-item v-show="false" label="文档">
        <el-input v-model="documentation" type="textarea" />
      </el-form-item>
      <el-dialog
        title="更改'流程顺序'值"
        :visible.sync="dialogVisible"
        :modal="false"
        width="500px"
        @close="closeDialog"
      >
        <el-container>
          <el-main>
            <el-container>
              <ol>
                <li v-for="(item,index) in outgoingSequenceFlow" :key="item.id" :value="item.id">
                  {{ index+1 }}. 至连线 {{ item.targetTitle }}
                  <el-button v-if="index > 0" type="primary" icon="el-icon-top" @click="moveUp(index)" />
                  <el-button v-if="index < outgoingSequenceFlow.length - 1" type="primary" icon="el-icon-bottom" @click="moveDown(index)" />
                </li>
              </ol>
            </el-container>
          </el-main>
          <el-footer style="textAlign:right">
            <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveSequenceOrder">保存并关闭</el-button>
          </el-footer>
        </el-container>
      </el-dialog>
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
      process_order: '无连线顺序设置',
      formKey: '',
      documentation: '',
      dialogVisible: false,
      outgoingSequenceFlow: []
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
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
      this.outgoingSequenceFlow = []
      const element = this.element
      const that = this
      if (element) {
        const outgoingNodes = element.outgoing
        for (let i = 0; i < outgoingNodes.length; i++) {
          const targetActivity = outgoingNodes[i].target
          that.outgoingSequenceFlow.push({
            id: outgoingNodes[i].id,
            targetTitle: targetActivity.name,
            targetType: targetActivity.type
          })
        }
      } else {
        console.log('Programmatic error: no selected shape found')
      }
      let orderedOutgoingSequenceFlow = []
      const bo = bpmnHelper.getBo(this.element)
      if (bo.$attrs.sequenceFlowOrder && bo.$attrs.sequenceFlowOrder.length > 0) {
        that.process_order = '连线排序设置'
        const sequenceFlowOrderList = bo.$attrs.sequenceFlowOrder
        // Loop the list of sequence flow that was saved  in the json model and match them with the outgoing sequence flow found above
        for (let flowIndex = 0; flowIndex < sequenceFlowOrderList.length; flowIndex++) {
          // find the sequence flow in the outgoing sequence flows.
          for (let outgoingFlowIndex = 0; outgoingFlowIndex < that.outgoingSequenceFlow.length; outgoingFlowIndex++) {
            if (that.outgoingSequenceFlow[outgoingFlowIndex].id === sequenceFlowOrderList[flowIndex]) {
              orderedOutgoingSequenceFlow.push(that.outgoingSequenceFlow[outgoingFlowIndex])
              that.outgoingSequenceFlow.splice(outgoingFlowIndex, 1)
              break
            }
          }
        }

        // Now all the matching sequence flow we're removed from the outgoing sequence flow list
        // We can simply apply the remaining ones (these are new vs. the time when the values were saved to the model)
        orderedOutgoingSequenceFlow = orderedOutgoingSequenceFlow.concat(that.outgoingSequenceFlow)
      } else {
        orderedOutgoingSequenceFlow = that.outgoingSequenceFlow
      }

      that.outgoingSequenceFlow = orderedOutgoingSequenceFlow
    },
    moveUp(index) {
      const temp = this.outgoingSequenceFlow[index]
      this.$set(this.outgoingSequenceFlow, index, this.outgoingSequenceFlow[index - 1])
      this.$set(this.outgoingSequenceFlow, index - 1, temp)
    },

    // Move down click handler
    moveDown(index) {
      const temp = this.outgoingSequenceFlow[index]
      // 使用$set，vue对数组的修改监听不到
      this.$set(this.outgoingSequenceFlow, index, this.outgoingSequenceFlow[index + 1])
      this.$set(this.outgoingSequenceFlow, index + 1, temp)
    },
    closeDialog() {
      this.dialogVisible = false
    },
    saveSequenceOrder() {
      const outgoingSequenceFlow = this.outgoingSequenceFlow
      let sequenceFlowOrder = []
      if (outgoingSequenceFlow.length > 0) {
        this.process_order = '连线排序设置'
        for (let flowIndex = 0; flowIndex < outgoingSequenceFlow.length; flowIndex++) {
          sequenceFlowOrder.push(outgoingSequenceFlow[flowIndex].id)
        }
      } else {
        sequenceFlowOrder = []
      }
      const bpmnModeler = this.bpmnModeler()
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, {
        sequenceFlowOrder: sequenceFlowOrder
      })
      this.dialogVisible = false
    }
  }
}
</script>
