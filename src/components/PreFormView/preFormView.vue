<template>
  <div class="formView">
    <FormBuild
      ref="bpm"
      :options.sync="options"
      :dynamic-data.sync="dynamicData"
      :default-value="defaultValue"
    />

    <el-divider />
    <div slot="footer" class="dialog-footer">
      <el-button small @click="close">
        关闭
      </el-button>
    </div>
  </div>
</template>

<script>

import deepClone from 'clone-deep'
import FormBuild from '../elementFormDesign/formBuild'
// import TFormBuild from '../elementFormDesign/formDesign/components/tFormBuild'

export default {
  name: 'PreFormView',
  components: { FormBuild },
  props: {
    formInfo: {
      type: Object,
      require: true,
      default: null
    },
    width: {
      type: String,
      require: false,
      default: '850'
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
      dynamicData: {},
      options: {
        config: {
          labelPosition: 'left',
          labelWidth: 15
        },
        list: []
      },
      defaultValue: {

      },
      defaultOption: {
        config: {
          labelPosition: 'left',
          labelWidth: 15
        },
        list: []
      },
      formViewVisible: false
    }
  },
  computed: {

  },
  watch: {
    formInfo: {
      handler(newValue, oldValue) {
        this.form = deepClone(newValue)
        this.setData(this.form)
      },
      deep: true
    }
  },
  mounted() {
  },
  created() {
    this.setData(this.formInfo)
  },
  methods: {
    getData() {
      console.log(this.$refs.bpm.getFormData())
    },
    close() {
      const that = this

      that.$emit('closePreViewDialog')
    },
    setData(formInfo) {
      this.form = deepClone(this.formInfo)
      if (this.form && this.form.formData) {
        this.$nextTick(() => {
          this.options = JSON.parse(this.form.formData)
        })
      } else {
        this.$nextTick(() => {
          this.options = this.defaultOption
        })
      }
    }
  }
}
</script>

<style scoped>
.design {
  height: 100%;
}
</style>
