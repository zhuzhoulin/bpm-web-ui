<template>
  <div>

    <div style="width: 100%; height: 100%; overflow-y: auto; overflow-x: hidden">
      {{ formOptions.config }}
      <el-form
        ref="buildForm"
        :label-width="formOptions.config.autoLabelWidth ? 'auto': formOptions.config.labelWidth+'%'"
        :inline="formOptions.config.inline"
        size="small"
        :model="formData"
        :label-position="formOptions.config.labelPosition"
        class="finalForm"
        :rules="rules"
      >
        <FinalForm
          v-for="(item, i) in formOptions.list"
          ref="a"
          :key="i"
          :disabled="disabled"

          :item="item"
          :layout="formOptions.config"
          :form-data="formData"
          :dynamic-data="dynamicData"
          :child-table-columns="childTableColumns"
          @clickFormButton="clickFormButton"
          @onSuccess="(response, file, fileList, model)=>{$emit('onSuccess',response, file, fileList,model)}"
          @beforeUpload="(file, model)=>{$emit('beforeUpload', file,model)}"
        />
      </el-form>

    </div>
  </div>
</template>

<script>
import FinalForm from './buildFormNode'
export default {
  name: 'FormBuild',
  components: { FinalForm },
  props: {
    options: {
      type: Object,
      required: true
    },
    defaultValue: {
      type: Object,
      default: () => ({})
    },
    dynamicData: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formOptions: {},
      formDataJsonView: false,
      formData: {},
      childTableColumns: [], // 子表添加一行的数据
      clearFormData: {},
      rules: {}
    }
  },
  watch: {
    defaultValue: {
      handler(newValue) {
        this.formData = newValue
      },
      deep: true
    },
    options: {
      handler(newValue) {
        // 当传入数据改变时,formDesign会基于传入数据的克隆副本做一系列改变,formDesign的数据流是单向的,不管传入的是引用类型还是普通类型
        this.formOptions = JSON.parse(JSON.stringify(newValue))
        console.log('@@@@@@@@@@@@2:' + this.formOptions)
        this.formDataMap()
        this.rulesMap()
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.formDataMap()
    this.rulesMap()
  },
  methods: {
    getFormData() {
      return this.formData
    },
    clickFormButton(type) {
      if (type === 'submit') {
        this.$refs.buildForm.validate((valid) => {
          if (valid) {
            this.$emit('buildSubmit', this.formData)
          } else {
            return false
          }
        })
      }
      if (type === 'clear') {
        this.$refs.buildForm.resetFields()
      }
    },
    formDataMap() {
      if (JSON.stringify(this.defaultValue) !== '{}') {
        this.formData = JSON.parse(JSON.stringify(this.defaultValue))
        return
      }
      const duplicate = []
      const mapFormData = (formData, array) => {
        // 查重model
        const duplicating = (duplicate, control) => {
          if (duplicate.includes(control.model)) {
            this.$message({
              showClose: true,
              message: `${control.key}控件数据字段重复(会导致字段重复的控件value值联动)`,
              type: 'error',
              duration: 0
            })
          } else {
            duplicate.push(control.model)
          }
        }

        if (array === undefined) {
          return
        }
        array.forEach((item) => {
          if (item.model) {
            if (item.type === 'number' || item.type === 'slider') {
              duplicating(duplicate, item)
              formData[item.model] = item.options.numberDefaultValue
            } else if (item.type === 'uploadImg') {
              duplicating(duplicate, item)
              formData[item.model] = item.options.fileList
            } else if (item.type === 'checkbox') {
              duplicating(duplicate, item)
              formData[item.model] = item.options.checkboxDefaultValue
            } else if (item.type === 'date' || item.type === 'time' || item.type === 'datetime') {
              if (item.options.isChooseTimes === '1') {
                duplicating(duplicate, item)
                formData[item.model] = item.options.defaultValue
              } else {
                duplicating(duplicate, item)
                formData[item.model] = item.options.rangeDefaultValue
              }
            } else if (item.type === 'uploadImg' || item.type === 'uploadFile') {
              duplicating(duplicate, item)
              formData[item.model] = item.options.fileList
            } else if (item.type === 'switch') {
              duplicating(duplicate, item)
              formData[item.model] = item.options.switchValue
            } else if (item.type === 'progress') {
              duplicating(duplicate, item)
              formData[item.model] = item.options.defaultPercentage
            } else if (item.type === 'tree') {
              duplicating(duplicate, item)
              formData[item.model] = item.options.multipleDefaultValue
            } else if (item.type === 'select' || item.type === 'cascader' || item.type === 'treeSelect') {
              duplicating(duplicate, item)
              item.options.multiple ? formData[item.model] = item.options.multipleDefaultValue : formData[item.model] = item.options.defaultValue
            } else if (item.type === 'childTable' || item.type === 'childTablePage') {
              duplicating(duplicate, item)
              formData[item.model] = []

              // 映射出childTable增加一行的数据格式,保存到一个数组,并且添加model值以便遍历查取
              const childTableColumns = mapFormData({}, item.list)
              const obj = JSON.parse(JSON.stringify(childTableColumns))
              formData[item.model].push(obj)
              this.childTableColumns.push({
                ...obj,
                model: item.model
              })
              item.options.pageTotal = item.type === 'childTablePage' ? item.list.length : 0
              // 如果不是子表单带分页，则设置一个最大的页数
              item.options.pageSize = item.type === 'childTablePage' ? item.options.pageSize : 100000
            } else {
              duplicating(duplicate, item)
              formData[item.model] = item.options.defaultValue
            }
          } else if (item.type === 'grid') {
          // 处理格栅布局
            item.columns.forEach((item, i) => {
              mapFormData(formData, item.list)
            })
          } else if (item.type === 'tabs') {
          // 处理标签页布局
            item.columns.forEach((item, i) => {
              mapFormData(formData, item.list)
            })
          } else if (item.type === 'card') {
          // 处理卡片布局
            mapFormData(formData, item.list)
          } else if (item.type === 'table') {
          // 处理卡片布局
            item.trs.forEach((tr) => {
              tr.tds.forEach((td) => {
                mapFormData(formData, td.list)
              })
            })
          }
        })
        return formData
      }
      this.formData = mapFormData({}, this.formOptions.list)
    },
    rulesMap() {
      const ruleFn = (pattern, message) => {
        // 柯利化返回验证函数
        return (rule, value, callback) => {
          // eslint-disable-next-line no-eval
          const reg = pattern ? eval(pattern) : ''
          if (reg && !reg.test(value)) {
            callback(new Error(message))
          } else {
            callback()
          }
        }
      }
      const mapRules = (rules, array) => {
        if (array === undefined) {
          return
        }
        // 映射出element需要的验证rules
        array.forEach((child, i) => {
          if (child.model) {
            if (child.type === 'childTable' || child.type === 'childTablePage') {
              return
            }
            // 把rule深克隆
            const rule = JSON.parse(JSON.stringify(child.rules))
            rules[child.model] = rule.map((item, i) => {
              if (i === 0) {
                return item
              } else {
                return {
                  validator: ruleFn(item.pattern, item.message),
                  trigger: 'blur'
                }
              }
            })
          } else if (child.type === 'grid' || child.type === 'tabs') {
            child.columns.forEach((item, i) => {
              mapRules(rules, item.list)
            })
          } else if (child.type === 'card') {
            mapRules(rules, child.list)
          } else if (child.type === 'table') {
            // 处理卡片布局
            child.trs.forEach((tr) => {
              tr.tds.forEach((td) => {
                mapRules(rules, td.list)
              })
            })
          }
        })
        return rules
      }
      this.rules = mapRules({}, this.formOptions.list)
    }
  }
}
</script>
