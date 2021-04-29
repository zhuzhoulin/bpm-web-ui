<template>
  <div>
    <div style="width: 100%; max-height: 600px; overflow-y: auto; overflow-x: hidden;">
      <Codemirror
        v-if="formDataJsonView"
        :json="JSON.stringify(formData, null, '\t')"
      />

      <el-form
        v-else

        ref="buildForm"
        :model="formData"
        :label-position.sync="formOptions.config.labelPosition"
        :inline.sync="formOptions.config.inline"
        :size.sync="formOptions.config.size"
        class="finalForm"
        :rules="rules"
      >

        <FinalForm
          v-for="(item, i) in formOptions.list"
          :key="i"
          :item="item"
          :layout="formOptions.config"
          :data-list="formOptions.list"
          :form-data="formData"
          :dynamic-data="dynamicData"
          :child-table-columns="childTableColumns"
          @formDataMap="formDataMap"
          @onSuccess="(response, file, fileList)=>{$emit('onSuccess',response, file, fileList)}"
        />
      </el-form>
    </div>
    <el-button type="primary" style="margin-top: 10px" @click="handleJsonView">
      {{ formDataJsonView?'展示表单':'展示数据' }}
    </el-button>
    <el-button v-if="!formDataJsonView" type="primary" style="margin-top: 10px" @click="handleSubmit('buildForm')">
      提交模拟
    </el-button>
  </div>
</template>

<script>
import FinalForm from '../../../formBuild/buildFormNode'
import Codemirror from '../codemirrorVue'
import '../../../styles/form-build.less'
export default {
  name: 'Index',
  components: { FinalForm, Codemirror },
  props: {
    options: {
      type: Object,
      required: true
    },
    defaultValue: {
      type: Object,
      default: () => {}
    },
    dynamicData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {},
      formOptions: JSON.parse(JSON.stringify(this.options)),
      dataList: JSON.parse(JSON.stringify(this.options)).list,
      formDataJsonView: false,
      childTableColumns: [],
      rules: {}
    }
  },
  watch: {
    options: {
      handler(newValue, oldValue) {
        this.formOptions = JSON.parse(JSON.stringify(newValue))
        this.dataList = this.formOptions.list
      },
      deep: true
    },
    dataList: {
      handler(newValue, oldValue) {
        this.dataList = newValue
        this.formDataMap()
        this.rulesMap()
      },
      deep: true
    }
  },
  created() {
    this.formDataMap()
    this.rulesMap()
  },
  mounted() {
    this.dataList = this.formOptions.list
  },
  methods: {
    handleSubmit(formName) {
      if (!this.formDataJsonView) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              showClose: true,
              message: `模拟提交成功`,
              type: 'success'
            })
          } else {
            return false
          }
        })
      }
    },
    handleJsonView(formName) {
      this.formDataJsonView = !this.formDataJsonView
    },
    formDataMap() {
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
      this.formData = mapFormData({}, this.dataList)
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
      this.rules = mapRules({}, this.dataList)
    }
  }
}
</script>
