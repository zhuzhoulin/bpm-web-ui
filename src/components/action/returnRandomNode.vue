<template>
  <div id="app">
    <el-form ref="returnRandomNodeForm" :model="node" label-width="auto" :rules="rules">
      <el-form-item label="退回节点">
        <el-select v-model="node.nodeId" placeholder="请选择退回节点" clearable>
          <el-option
            v-for="(item, index) in returnNodeList"
            :key="index"
            :label="item.nodeName"
            :value="item.nodeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('returnRandomNodeForm')">  {{ $t('table.confirm') }}</el-button>
        <el-button @click="cancel">{{ $t('table.cancel') }}</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
// import store from '@/store'
import { getRandomJumpNode } from '@/api/process/userTask'

export default {
  name: 'ReturnRandom',
  components: { },
  props: {
    taskId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      node: {
        nodeId: null
      },
      returnNodeList: [],
      returnNodeMap: [],
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
        this.getRandomJumpNode()
      },
      deep: true
    }
  },
  mounted() {

  },
  created() {
    this.getRandomJumpNode()
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('save', this.node.nodeId, this.node.nodeName)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      this.$emit('close')
    },
    getRandomJumpNode() {
      const param = this.taskId
      getRandomJumpNode(param).then(response => {
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
