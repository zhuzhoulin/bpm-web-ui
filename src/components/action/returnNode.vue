<template>
  <div id="app">
    <el-form ref="returnNodeForm" :model="returnNode" label-width="auto" :rules="rules">
      <el-form-item label="退回节点">
        <el-select v-model="returnNode.nodeId" placeholder="请选择退回节点" clearable>
          <el-option
            v-for="(item, index) in returnNodeList"
            :key="index"
            :label="item.nodeName"
            :value="item.nodeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('returnNodeForm')">  {{ $t('table.confirm') }}</el-button>
        <el-button @click="cancel">{{ $t('table.cancel') }}</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
// import store from '@/store'
import { getReturnNode } from '@/api/process/userTask'
export default {
  name: 'ReturnNode',
  components: { },
  props: {
    taskId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      returnNode: {
        nodeId: null
      },
      returnNodeList: [],
      returnNodeMap: {},
      rules: {
        nodeId: [
          { required: true, message: '请选择节点', trigger: 'change' }
        ]
      },
      userOptions: [

      ]
    }
  },
  computed: {

  },
  watch: {
    taskId: {
      handler(newValue, oldValue) {
        this.getReturnNode()
      },
      deep: true
    }
  },
  mounted() {

  },
  created() {
    this.getReturnNode()
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('save', this.returnNode.nodeId, this.returnNodeMap[this.returnNode.nodeId])
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      this.$emit('close')
    },
    getReturnNode() {
      console.log('1111111111111')
      const param = this.taskId
      getReturnNode(param).then(response => {
        this.$nextTick(() => {
          this.returnNodeList = response.data
          for (const key in response.data) {
            this.returnNodeMap[response.data[key].nodeId] = response.data[key].nodeName
          }
        })
      })
        .catch(err => {
          console.log(err, '失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
