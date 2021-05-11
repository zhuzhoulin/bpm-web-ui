<template>
  <div class="design">
    <FormDesign
      ref="bpm"
      :show-toolbars-text="true"
      :default-value="defaultValue"
      @save="handleSave"
      @close="handleClose"
    />
  </div>
</template>

<script>
import { updateForm } from '@/api/form/form'
import deepClone from 'clone-deep'

export default {
  name: 'BpmFormDesign',
  props: {
    formInfo: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      form: {
        formId: null,
        formKey: null,
        formName: null,
        remarks: null,
        tenantId: null,
        formData: null
      },

      defaultValue: {
        config: {
          labelPosition: 'left',
          labelWidth: 15,
          customWidth: '',
          autoLabelWidth: false, // 子表单有问题
          inline: false,
          size: 'default'
        },
        list: []
      }
    }
  },
  computed: {},
  watch: {
    formInfo: {
      handler(newValue, oldValue) {
        this.form = deepClone(newValue)
        this.setDesignData(this.form)
      },
      deep: true
    }
  },
  mounted() {
    console.log('design ---mounted --- ')

    this.setDesignData(this.formInfo)
  },
  created() {
  },
  methods: {
    setDesignData(formInfo) {
      const that = this
      that.form = deepClone(formInfo)
      if (that.form && that.form.formData) {
        that.$nextTick(() => {
          that.$refs.bpm.setDesignData(JSON.parse(formInfo.formData))
        })
      } else {
        that.$refs.bpm.setDesignData(that.defaultValue)
      }
    },
    deleteAll() {
      this.data.list = []
    },
    handleSave(value) {
      const that = this

      const formData = deepClone(value)
      const dynamicKeyList = this.getDynamicKeyList(value)
      formData.dynamicKeyList = dynamicKeyList

      that.form.formData = JSON.stringify(formData)
      const postData = {
        formData: this.form.formData,
        formKey: this.form.formKey,
        tenantId: this.form.tenantId,
        formId: this.form.formId
      }
      updateForm(postData).then((response) => {
        that.$message.success('保存成功!')
      })
    },
    handleReset() {
      const that = this
      that.$refs.bpm.deleteAll()
    },
    handleClose() {
      const that = this
      that.$refs.bpm.handleClose()
    },
    getDynamicKeyList(data) {
      var dynamicKeyList = []
      if (data === null || data === undefined || data === '') {
        return dynamicKeyList
      }
      data.list.forEach((item, i) => {
        if (
          item.type === 'select' ||
          item.type === 'checkbox' ||
          item.type === 'cascader' ||
          item.type === 'tree' ||
          item.type === 'treeSelect' ||
          item.type === 'radio'
        ) {
          if (item.options.dynamic && item.options.dynamicKey !== '') {
            dynamicKeyList.push(item.options.dynamicKey)
          }
        }
      })
      return dynamicKeyList
    }
  }
}
</script>

<style scoped>
.design {
  height: 100%;
}
</style>
