<template>
  <div v-loading="loading">
    <el-container>
      <el-header v-if="show" class="header">
        {{ processInfo.processName }}
      </el-header>
      <el-main>
        <FormBuild
          v-if="show"
          ref="bpm2"
          :options.sync="userInfo"
          :default-vaule.sync="tempDefaultUserValue"
        />
        <el-divider />

        <FormBuild
          v-if="show"
          ref="bpm"
          :options="jsonDataProps"
          :dynamic-data="dynamicDataProps"
          :default-vaule="defaultValue"
          @buildSubmit="handleSubmit"
        />
      </el-main>

      <el-footer>
        <el-form>
          <el-form-item>
            <el-button
              @click="getData"
            >获取数据</el-button>
            <el-button plain @click="startApply">{{ $t('action.submit') }}</el-button>
            <el-button plain @click="saveDraft">{{ $t('action.saveDraft') }}</el-button>
            <el-button plain @click="resetFields">{{ $t('action.reset') }}</el-button>
          </el-form-item>
        </el-form>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { generateTitle } from '@/utils/i18n'
import { saveDraftApply, startApply } from '@/api/process/apply'

import { getProcessByKey, initFormData } from '@/api/process/process'
import store from '@/store'

export default {
  name: 'Start',
  props: {
    defaultUserValue: {
      type: Object,
      required: true,
      default: null
    },
    tempDefaultValue: {
      type: Object,
      required: false,
      default: null
    },
    tempProcessKey: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      show: false,
      defaultValue: {},
      processKey: '',
      processName: '',
      processId: '',
      formKey: '',
      applyId: 0,
      processInfo: {},
      tempDefaultUserValue: {},
      formData: [{
        'type': 'input',
        'label': '输入框',
        'options': {
          'label': '输入框',
          'minWidth': 10,
          'width': 100,
          'defaultValue': '',
          'placeholder': '请输入',
          'clearable': false,
          'hidden': false,
          'disabled': false
        },
        'model': 'input_1593338728959',
        'key': 'input_1593338728959',
        'rules': [
          {
            'required': false,
            'message': '必填项',
            'trigger': 'blur'
          }
        ]
      }],
      config: {
        labelPosition: 'right',
        labelWidth: 15
      },
      loading: false,
      dynamicDataProps: {
        dataKey: [
          {
            label: '动态数据1',
            value: 1
          },
          {
            label: '动态数据2',
            value: 2
          },
          {
            label: '动态数据3',
            value: 3
          }
        ]
      },
      userInfo: {

        'config': {
          'labelPosition': 'right',
          'labelWidth': 'auto'
        },
        'list': [
          {
            'type': 'card',
            'label': '基本信息',
            'list': [
              {
                'type': 'table',
                'label': '表格布局',
                'trs': [
                  {
                    'tds': [
                      {
                        'colspan': 1,
                        'rowspan': 1,
                        'list': [
                          {
                            'type': 'input',
                            'label': '公司',
                            'options': {
                              'label': '输入框',
                              'minWidth': 10,
                              'width': 'auto',
                              'defaultValue': store.getters.user.user.companyName,
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'applyCompanyName',
                            'key': 'applyCompanyName',
                            'rules': [
                              {
                                'required': false,
                                'message': '必填项',
                                'trigger': 'blur'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        'colspan': 1,
                        'rowspan': 1,
                        'list': [
                          {
                            'type': 'input',
                            'label': '部门',
                            'options': {
                              'label': '输入框',
                              'minWidth': 10,
                              'width': 'auto',
                              'defaultValue': store.getters.user.user.deptName,
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'applyDeptName',
                            'key': 'applyDeptName',
                            'rules': [
                              {
                                'required': false,
                                'message': '必填项',
                                'trigger': 'blur'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'tds': [
                      {
                        'colspan': 1,
                        'rowspan': 1,
                        'list': [
                          {
                            'type': 'input',
                            'label': '姓名',
                            'options': {
                              'label': '输入框',
                              'minWidth': 10,
                              'width': 'auto',
                              'defaultValue': store.getters.user.user.realName,
                              'placeholder': '',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'applyUserNickname',
                            'key': 'applyUserNickname',
                            'rules': [
                              {
                                'required': false,
                                'message': '必填项',
                                'trigger': 'blur'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        'colspan': 1,
                        'rowspan': 1,
                        'list': [
                          {
                            'type': 'input',
                            'label': '工号',
                            'options': {
                              'label': '输入框',
                              'minWidth': 10,
                              'width': 'auto',
                              'defaultValue': store.getters.user.user.userId,
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'applyUserId',
                            'key': 'applyUserId',
                            'rules': [
                              {
                                'required': false,
                                'message': '必填项',
                                'trigger': 'blur'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ],
                'options': {
                  'bordered': true,
                  'bright': false,
                  'small': true,
                  'customStyle': ''
                },
                'key': 'table_1593338286417'
              }
            ],
            'key': 'card_1593338191935',
            'options': {}
          }
        ]
      },
      jsonDataProps: {
        'config': {
          'labelPosition': 'right',
          'labelWidth': 10
        },
        'list': [
          {
            'type': 'card',
            'label': '表单信息',
            'list': this.formData,
            'key': 'card_1593338665035',
            'options': {}
          }
        ]
      }
    }
  },
  computed: {

  },
  watch: {
    formData: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.formData = newValue
          this.jsonDataProps.list[0].list = newValue
        })
      },
      deep: true
    },
    dynamicDataProps: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.dynamicDataProps = newValue
        })
      },
      deep: true
    },
    tempDefaultValue: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.defaultValue = newValue
        })
      }
    },
    defaultUserValue: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.tempDefaultUserValue = {
            'applyCompanyName': newValue.applyCompanyName,
            'applyDeptName': newValue.applyDeptName,
            'applyUserNickname': newValue.applyUserNickname,
            'applyUserId': newValue.applyUserId
          }
        })
      }
    },
    tempProcessKey: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.processKey = newValue
          this.getProcessByKey()
          this.initFormData()
        })
      }
    }

  }, mounted() {
    this.tempDefaultUserValue = {
      'applyCompanyName': this.defaultUserValue.applyCompanyName,
      'applyDeptName': this.defaultUserValue.applyDeptName,
      'applyUserNickname': this.defaultUserValue.applyUserNickname,
      'applyUserId': this.defaultUserValue.applyUserId
    }
  },
  created() {
    this.processKey = this.tempProcessKey
    this.getProcessByKey()
    this.initFormData()
  },
  methods: {

    initFormData() {
      const that = this
      that.loading = true

      const param = that.processKey
      initFormData(param).then(response => {
        if (response.data.formJsonData !== '' &&
        response.data.formJsonData !== undefined &&
        response.data.formJsonData !== []) {
          var json = JSON.parse(response.data.formJsonData)

          that.$nextTick(() => {
            that.formData = json.list
            that.jsonDataProps.list[0].list = that.formData
            that.dynamicDataProps = JSON.parse(JSON.stringify(response.data.dynamicDataMap))
            that.formKey = response.data.formKey
            that.processId = response.data.processId
            that.processName = response.data.processName
            that.loading = false
            this.show = true
          })
        }

        // that.$nextTick(() => {
        //   that.loading = false
        // })
      })
    },

    getProcessByKey() {
      const that = this
      const param = that.processKey
      getProcessByKey(param).then(response => {
        that.processInfo = response.data
        // that.$nextTick(() => {
        //   that.loading = false
        // })
      })
    },
    generateTitle,

    clickFormButton(type) {
      this.$refs.bpm.$refs.buildForm.validate((valid) => {
        if (valid) {
          console.log('success')
        } else {
          console.log('error')
        }
      })
      this.$refs.bpm.clickFormButton(type)
    },
    resetFields() {
      this.$refs.bpm.$refs.buildForm.resetFields()
    },
    startApply() {
      this.loading = true
      const param = {
        tenantId: store.getters.tenantId,
        processKey: this.processKey,
        formKey: this.formKey,
        startUserId: store.getters.userId,
        applyId: this.applyId,
        data: this.$refs.bpm.getFormData()
      }
      this.$refs.bpm.$refs.buildForm.validate((valid) => {
        if (valid) {
          startApply(param).then(response => {
            console.log(response)
            this.$nextTick(() => {
              this.loading = false
              this.$router.push({ path: '/apply' || '/' })
            })
          })
            .catch(err => {
              this.$nextTick(() => {
                this.loading = false
              })
              console.log(err, '失败')
            })
        } else {
          this.$message.error('数据校验失败！')
        }
      })
    },
    saveDraft() {
      const param = {
        tenantId: store.getters.tenantId,
        processKey: this.processKey,
        formKey: this.formKey,
        startUserId: store.getters.userId,
        applyId: this.applyId,
        data: this.$refs.bpm.getFormData()
      }
      this.loading = true
      this.$refs.bpm.$refs.buildForm.validate((valid) => {
        if (valid) {
          saveDraftApply(param).then(response => {
            this.$nextTick(() => {
              this.applyId = response.data
              this.loading = false
              this.$message.success('保存成功！')
            })
          })
            .catch(err => {
              this.$nextTick(() => {
                this.loading = false
              })
              console.log(err, '失败')
            })
        } else {
          this.$message.error('数据校验失败！')
        }
      })
    },
    handleSubmit(p) {
      // 通过表单提交按钮触发，获取promise对象
      console.log('sss:' + JSON.stringify(p))
      p()
        .then(res => {
          // 获取数据成功
          alert(JSON.stringify(res))
        })
        .catch(err => {
          this.$nextTick(() => {
            this.loading = false
          })
          console.log(err, '校验失败')
        })
    },
    getData() {
      console.log(this.$refs.bpm.getFormData())

      alert(JSON.stringify(this.$refs.bpm.getFormData()))
    }
  }
}
</script>
<style scoped>

.header{
     height: 60px;
    font-size: 24;
    font-size: large;
    line-height: 60px;
    font-weight: 500;
    text-align: center;
}
</style>
