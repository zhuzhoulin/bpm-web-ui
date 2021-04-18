<template>
  <div id="app-container" v-loading="loading">
    <div id="ProcessSetting" ref="ProcessSetting">

      <el-container style="width:100%;">
        <el-main>
          <el-form ref="form" :model="form" label-width="300px">
            <el-form-item label="申请标题规则">
              <el-input v-model="form.applyTitleRule" />
            </el-form-item>
            <el-form-item label="是否自动完成首个用户节点任务">
              <el-switch
                v-model="form.autoCompleteFirstNode"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" @click="onSubmit"> {{ $t('table.confirm') }}</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>

  </div>
</template>
<script>
import deepClone from 'clone-deep'

import { updateProcessDetail, getProcessDetailById } from '@/api/process/processDetail'
import store from '@/store'
export default {
  name: 'ProcessSetting',
  components: {
    // diagramManager
  },
  props: {
    processDetailId: {
      type: Number,
      required: true,
      default: null
    },
    processInfo: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      form: {
        applyTitleRule: '',
        autoCompleteFirstNode: 1
      },
      loading: false,
      tempProcessDetailId: this.processDetailId,
      processId: null
    }
  },
  computed: {

  },
  watch: {
    processDetailId: {
      handler(newValue, oldValue) {
        this.tempProcessDetailId = newValue
      },
      deep: true
    },
    processInfo: {
      handler(newValue, oldValue) {
        // console.log('newValue:' + JSON.stringify(newValue))
        this.process = deepClone(newValue)
      },
      deep: true
    }
  },
  mounted() {
  },
  created() {
    this.process = deepClone(this.processInfo)
    this.getProcessDetailById()
  },
  methods: {
    getProcessDetailById() {
      const that = this
      that.loading = true

      getProcessDetailById(that.tempProcessDetailId).then(response => {
        that.form.applyTitleRule = response.data.applyTitleRule
        that.form.autoCompleteFirstNode = response.data.autoCompleteFirstNode
        that.processId = response.data.processId
      }).catch(err => {
        console.log(err, '失败')
      }).finally(
        that.$nextTick(() => {
          that.loading = false
        })
      )
    },
    onSubmit() {
      const that = this
      that.loading = true
      const param = {
        tenantId: store.getters.tenantId,
        processDetailId: that.tempProcessDetailId,
        applyTitleRule: that.form.applyTitleRule,
        autoCompleteFirstNode: that.form.autoCompleteFirstNode,
        processId: that.process.processId
      }
      updateProcessDetail(param).then(response => {
        if (response.data > 0) {
          that.$message.success('保存成功')
        }
      }).catch(err => {
        console.log(err, '失败')
      }).finally(
        that.$nextTick(() => {
          that.loading = false
        })
      )
    }
  }
}
</script>

<style lang="scss">
</style>

