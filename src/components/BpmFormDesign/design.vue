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
        // 渲染JSON
        // this.$refs.bpm.setDesignData(this.form.formData)
      },
      deep: true
    }
  },
  mounted() {
    console.log('design ---mounted --- ')
    this.setDesignData(this.formInfo)
    // this.form = deepClone(this.formInfo)
    // console.log('form --- ' + JSON.stringify(this.form))

    // if (this.form && this.form.formData) {
    //   this.$nextTick(() => {
    //     this.$refs.bpm.setDesignData(JSON.parse(this.formInfo.formData))
    //   })
    // } else {
    //   this.$refs.bpm.setDesignData(this.defaultValue)
    // }
  },
  created() {
    console.log('design ---start --- ')
  },
  methods: {
    setDesignData(formInfo) {
      this.form = deepClone(this.formInfo)
      if (this.form && this.form.formData) {
        this.$nextTick(() => {
          this.$refs.bpm.setDesignData(JSON.parse(this.formInfo.formData))
        })
      } else {
        this.$refs.bpm.setDesignData(this.defaultValue)
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
        // that.$nextTick(() => {
        //   // that.loading = false
        // })
        // that.handleReset()
        // that.$emit('closeFormDesignDialog')
        // that.$emit('queryList')
      })
    },
    handleReset() {
      const that = this
      that.$refs.bpm.deleteAll()
      // that.$refs.bpm.data.list = []
    },
    handleClose() {
      console.log('handleClose')

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
