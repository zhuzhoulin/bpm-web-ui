<template>
  <div>
    <div>
      <el-collapse
        v-model="activeName"
        accordion
      >
        <el-collapse-item name="1">
          <template slot="title">
            节点设置<i class="header-icon el-icon-info" />
          </template>
          <div>
            <el-form
              :inline="true"
              label-width="100px"
              size="small"
            >
              <el-form-item label="编号">
                <el-input
                  v-model="id"
                  disabled
                />
              </el-form-item>
              <el-form-item
                label="名称"
                required
              >
                <el-input v-model="name" />
              </el-form-item>
              <el-form-item label="优先级">
                <el-input
                  v-model="priority"
                  type="number"
                />
              </el-form-item>
              <el-form-item
                label="节点人员方式"
                required
              >
                <el-select
                  v-model="findUserType"
                  filterable
                  clearable
                  placeholder="请选择"
                  @change="createOrUpdateCustomProperties('findUserType',$event)"
                >
                  <el-option
                    v-for="item in nodeUserTypeSelectOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                v-if="findUserType === '1'"
                label="角色组"
              >
                <el-select
                  v-model="roleGroupCode"
                  filterable
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for=" p in roleGroupList"
                    :key="p.value"
                    :label="p.label"
                    :value="p.value"
                  />
                </el-select>
                <el-input
                  v-if="false"
                  v-model="roleGroupName"
                />

              </el-form-item>
              <el-form-item
                v-if="findUserType === '2'"
                label="角色"
              >
                <el-select
                  v-model="roleCode"
                  filterable
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for=" p in roleList"
                    :key="p.value"
                    :label="p.label"
                    :value="p.value"
                  />
                </el-select>
                <el-input
                  v-if="false"
                  v-model="roleName"
                />

              </el-form-item>
              <el-form-item
                v-if="findUserType === '3'"
                label="固定人员"
              >
                <el-input
                  v-model="userNameList"
                  style="width:150px"
                />
                <el-input v-if="false" v-model="userIdList" />
                <el-button
                  type="success"
                  size="mini"
                  @click="showSelectNodeUser"
                >选择</el-button>

              </el-form-item>
              <el-form-item
                v-if="findUserType === '4'"
                label="指定人员字段"
              >
                <el-input v-model="assigneeField" />
              </el-form-item>
              <el-form-item
                v-if="findUserType === '6'"
                label="依赖节点"
              >
                <el-select
                  v-model="relationNodeId"
                  filterable
                  placeholder="请选择"
                >

                  <el-option
                    v-for="item in userTaskList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="任务派遣">
                <el-select v-model="candidateGroups" multiple filterable placeholder="请选择">
                  <el-option
                    v-for=" p in positions"
                    :key="p.id"
                    :label="p.label"
                    :value="p.id"
                  />
                </el-select>
              </el-form-item> -->

              <el-form-item label="文档">
                <el-input
                  v-model="documentation"
                  type="textarea"
                  @change="updateDocumentation($event)"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            节点表单<i class="header-icon el-icon-info" />
          </template>
          <div>
            <el-form
              :inline="true"
              label-width="100px"
              size="small"
            >
              <el-form-item label-width="表单类型">
                <el-radio-group v-model="formType">
                  <el-radio :label="1">内置表单</el-radio>
                  <el-radio :label="2">外置表单</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="formType === 1" label="内置表单">
                <el-input
                  v-model="formName"
                  readonly
                  style="width:150px"
                />
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-search"
                  @click="showSelectDialog()"
                >选择</el-button>
              </el-form-item>
              <el-form-item v-if="formType === 2" label="外置表单url">
                <el-input
                  v-model="formKey"

                  style="width:150px"
                />

              </el-form-item>
              <el-input
                v-if="false"
                v-model="formKey"
              />
            </el-form>
          </div>
        </el-collapse-item>

        <el-collapse-item name="3">
          <template slot="title">
            节点属性<i class="header-icon el-icon-info" />
          </template>
          <div>
            <el-form
              :inline="true"
              label-width="120px"
              size="small"
            >
              <el-form-item label="选择路径">
                <el-switch
                  v-model.number="selectPath"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否"
                />
              </el-form-item>
              <el-form-item label="处理人策略">

                <el-radio-group v-model="handlerStrategy">
                  <el-radio label="skip">执行人为空跳过</el-radio>
                  <el-radio label="admin">为空时管理员处理</el-radio>
                  <el-radio label="error">为空时报错</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="执行方式"
                required
              >
                <el-select v-model="sequential">
                  <!--相当于bpmn2.0标准中的isSequential-->
                  <el-option
                    label="并行执行"
                    value="parallel"
                  />
                  <el-option
                    label="顺序执行"
                    value="sequential"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="通过比例"
                required
              >
                <el-select
                  v-model="proportion"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in proportionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                label="任务类型"
                required
              >
                <el-radio-group v-model="taskType">
                  <el-radio label="start">发起</el-radio>
                  <el-radio label="approve">审批</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="节点按钮"
                required
              >
                <el-checkbox-group
                  v-model="actionList"
                  @change="handleChange"
                >
                  <el-checkbox
                    v-for="item in actionTypeList"
                    :key="item.value"
                    :label="item.value"
                  >{{ item.label }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item name="4">
          <template slot="title">
            节点事件<i class="header-icon el-icon-info" />
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        </el-collapse-item> -->
      </el-collapse>

    </div>

    <div>
      <el-dialog
        :title="selectFormDialog.title"
        :visible.sync="selectFormDialog.visible"
        :width="selectFormDialog.width"
        :fullscreen="selectFormDialog.fullscreen"
        :close-on-press-escape="selectFormDialog.closeOnPressEscape"
        append-to-body
        center
        :before-close="handleClose"
        @close="closeSelectFormDialog"
      >
        <selectForm
          ref="selectForm"
          @setForm="setForm"
        />
      </el-dialog>

      <el-dialog
        v-if="selectNodeUserDialog.visible"
        :width="selectNodeUserDialog.width"
        :title="selectNodeUserDialog.title"
        :visible.sync="selectNodeUserDialog.visible"
        append-to-body
        :before-close="handleClose"
      >
        <div>
          <select-user
            v-if="selectNodeUserDialog.visible"
            ref="selectUser"
            :visible.sync="selectNodeUserDialog.visible"
            :default-users.sync="defaultSelectedUsers"
            @save="saveNodeUser"
            @close="closeNodeUser"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import bpmnHelper from '../js/helper/BpmnHelper'
import elementHelper from '../js/helper/ElementHelper'
import { getRoleDict, getRoleGroupDict } from '@/api/system/dict'
import store from '@/store'
import selectUser from '@/components/common/selectUser.vue'

import SelectForm from '../../../views/system/form/selectForm.vue'
import { getDictListByDictCode } from '@/api/system/dict'

// 用户任务属性组件
export default {
  components: { SelectForm, selectUser },
  props: ['element'],
  inject: ['bpmnModeler'],
  data() {
    return {
      defaultSelectedUsers: [],
      modeling: null,
      id: this.element.id || '',
      name: '',
      formKey: '',
      formName: '',
      formType: 1,
      documentation: '',
      sequential: 'parallel',
      positions: [],
      priority: '1',
      candidateGroups: '',
      selectNodeUserDialog: {
        title: '选择节点人员',
        visible: false,
        width: '70%',
        name: '', // 组件名,
        loading: false,
        fullscreen: false,
        closeOnPressEscape: false
      },
      nodeUserTypeSelectOption: [{
        value: '1',
        label: '角色组'
      }, {
        value: '2',
        label: '角色'
      }, {
        value: '3',
        label: '固定人员'
      }, {
        value: '4',
        label: '前端指定人员'
      }, {
        value: '5',
        label: '申请人'
      }, {
        value: '6',
        label: '同指定节点人员'
      }],
      findUserType: '',
      selectFormDialog: {
        title: '选择表单',
        visible: false,
        width: '900',
        name: '选择表单', // 组件名,
        loading: false,
        fullscreen: false,
        closeOnPressEscape: false
      },
      assigneeField: 'bpm_' + this.element.id + '_assignee_field',
      activeName: '1',
      userIdList: '',
      userNameList: '',
      relationNodeId: '',
      roleGroupCode: '',
      roleGroupName: '',
      roleCode: '',
      roleName: '',
      proportionOptions: [
        {
          value: '0',
          label: '0%'
        },
        {
          value: '10',
          label: '10%'
        },
        {
          value: '20',
          label: '20%'
        },
        {
          value: '30',
          label: '30%'
        },
        {
          value: '40',
          label: '40%'
        },
        {
          value: '50',
          label: '50%'
        },
        {
          value: '60',
          label: '60%'
        },
        {
          value: '70',
          label: '70%'
        },
        {
          value: '80',
          label: '80%'
        },
        {
          value: '90',
          label: '90%'
        },
        {
          value: '100',
          label: '100%'
        }
      ],
      proportion: '100',
      taskType: 'approve',
      actionList: ['pass', 'reject'],
      actionTypeList: [
        {
          value: 'start',
          label: '发起'
        },
        {
          value: 'draft',
          label: '草稿'
        },
        {
          value: 'pass',
          label: '审批'
        },
        {
          value: 'reject',
          label: '拒绝'
        },
        {
          value: 'return',
          label: '退回'
        },
        {
          value: 'skipNode',
          label: '跳转'
        }],
      handlerStrategy: 'skip',
      selectPath: '1',
      userTaskList: [],
      roleGroupList: [],
      roleList: []
    }
  },
  watch: {
    name: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, {
          name: newVal
        })
      }
    },

    // 监视元素变化
    element: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal.type === 'bpmn:UserTask') {
          const businessObject = newVal.businessObject
          this.name = businessObject.name
          this.formKey = businessObject.get('formKey') || ''

          this.priority = businessObject.get('priority') || 1

          // 设置初始值
          const bpmnModeler = this.bpmnModeler()
          const bpmnFactory = bpmnModeler.get('bpmnFactory')
          let extensionElements = businessObject.get('extensionElements')

          if (!extensionElements) {
            extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory)
          }
          const length = extensionElements.get('values').length
          let customProperties
          for (let i = 0; i < length; i++) {
            if (extensionElements.get('values')[i] && extensionElements.get('values')[i].$type === 'flowable:CustomProperties') {
              customProperties = extensionElements.get('values')[i]
            }
          }
          if (!customProperties) {
            customProperties = elementHelper.createElement('flowable:CustomProperties', null, this.element, bpmnFactory)
            extensionElements.get('values').push(customProperties)
          }

          const modeling = bpmnModeler.get('modeling')
          modeling.updateProperties(this.element, {
            extensionElements: extensionElements
          })

          this.createOrUpdateCustomProperties('selectFormKey', this.formKey)

          if (this.getPropertieByName(customProperties, 'findUserType')) {
            this.findUserType = this.getPropertieByName(customProperties, 'findUserType')
          } else {
            this.createOrUpdateCustomProperties('findUserType', this.findUserType)
          }

          if (this.getPropertieByName(customProperties, 'assigneeField')) {
            this.assigneeField = this.getPropertieByName(customProperties, 'assigneeField')
          } else {
            this.createOrUpdateCustomProperties('assigneeField', 'bpm_' + newVal.id + '_assignee_field')
          }

          if (this.getPropertieByName(customProperties, 'userIdList')) {
            this.userIdList = this.getPropertieByName(customProperties, 'userIdList')
          } else {
            this.createOrUpdateCustomProperties('userIdList', this.userIdList)
          }
          if (this.getPropertieByName(customProperties, 'userNameList')) {
            this.userNameList = this.getPropertieByName(customProperties, 'userNameList')
          } else {
            this.createOrUpdateCustomProperties('userNameList', this.userNameList)
          }
          if (this.getPropertieByName(customProperties, 'relationNodeId')) {
            this.relationNodeId = this.getPropertieByName(customProperties, 'relationNodeId')
          } else {
            this.createOrUpdateCustomProperties('relationNodeId', this.relationNodeId)
          }
          if (this.getPropertieByName(customProperties, 'roleGroupCode')) {
            this.roleGroupCode = this.getPropertieByName(customProperties, 'roleGroupCode')
          } else {
            this.createOrUpdateCustomProperties('roleGroupCode', this.roleGroupCode)
          }
          if (this.getPropertieByName(customProperties, 'roleGroupName')) {
            this.roleGroupName = this.getPropertieByName(customProperties, 'roleGroupName')
          } else {
            this.createOrUpdateCustomProperties('roleGroupName', this.roleGroupName)
          }
          if (this.getPropertieByName(customProperties, 'roleCode')) {
            this.roleCode = this.getPropertieByName(customProperties, 'roleCode')
          } else {
            this.createOrUpdateCustomProperties('roleCode', this.roleCode)
          }
          if (this.getPropertieByName(customProperties, 'relationNodeId')) {
            this.roleName = this.getPropertieByName(customProperties, 'roleName')
          } else {
            this.createOrUpdateCustomProperties('roleName', this.roleName)
          }

          if (this.getPropertieByName(customProperties, 'formName')) {
            this.formName = this.getPropertieByName(customProperties, 'formName')
          } else {
            this.createOrUpdateCustomProperties('formName', this.formName)
          }
          if (this.getPropertieByName(customProperties, 'formType')) {
            this.formType = this.getPropertieByName(customProperties, 'formType')
          } else {
            this.createOrUpdateCustomProperties('formType', this.formType)
          }

          if (this.getPropertieByName(customProperties, 'selectPath')) {
            this.selectPath = this.getPropertieByName(customProperties, 'selectPath')
          } else {
            this.createOrUpdateCustomProperties('selectPath', this.selectPath)
          }

          if (this.getPropertieByName(customProperties, 'handlerStrategy')) {
            this.handlerStrategy = this.getPropertieByName(customProperties, 'handlerStrategy')
          } else {
            this.createOrUpdateCustomProperties('handlerStrategy', this.handlerStrategy)
          }

          if (this.getPropertieByName(customProperties, 'sequential')) {
            this.sequential = this.getPropertieByName(customProperties, 'sequential')
          } else {
            this.createOrUpdateCustomProperties('sequential', this.sequential)
          }

          if (this.getPropertieByName(customProperties, 'proportion')) {
            this.proportion = this.getPropertieByName(customProperties, 'proportion')
          } else {
            this.createOrUpdateCustomProperties('proportion', this.proportion)
          }
          if (this.getPropertieByName(customProperties, 'taskType')) {
            this.taskType = this.getPropertieByName(customProperties, 'taskType')
          } else {
            this.createOrUpdateCustomProperties('taskType', this.taskType)
          }
          if (this.getPropertieByName(customProperties, 'actionList')) {
            var actionStr = this.getPropertieByName(customProperties, 'actionList') || ''
            console.log('action,:' + actionStr)
            this.actionList = actionStr.split(',')
          } else {
            this.createOrUpdateCustomProperties('actionList', this.actionList.join(',') || '')
          }
        }
      }
    },
    formKey: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, { 'formKey': newVal })
        this.createOrUpdateCustomProperties('selectFormKey', newVal)
      }
    },
    formName: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('formName', newVal)
      }
    },
    formType: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('formType', newVal)
      }
    },
    assigneeField: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('assigneeField', newVal)
      }
    },
    userIdList: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('userIdList', newVal)
      }
    },
    userNameList: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('userNameList', newVal)
      }
    },
    relationNodeId: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('relationNodeId', newVal)
      }
    },
    roleGroupCode: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('roleGroupCode', newVal)
      }
    },
    roleGroupName: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('roleGroupName', newVal)
      }
    },
    roleCode: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('roleCode', newVal)
      }
    },
    roleName: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('roleName', newVal)
      }
    },

    taskType: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('taskType', newVal)
      }
    },
    selectPath: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('selectPath', newVal)
      }
    },
    handlerStrategy: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('handlerStrategy', newVal)
      }
    },
    sequential: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('sequential', newVal)
      }
    },
    proportion: {
      handler(newVal, oldVal) {
        this.createOrUpdateCustomProperties('proportion', newVal)
      }
    },
    actionList: {
      handler(newVal, oldVal) {
        console.log('watch actionList:' + newVal)
        this.createOrUpdateCustomProperties('actionList', newVal)
      }
    },
    priority: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, { 'priority': newVal })
      }
    },
    candidateGroups: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, { 'candidateGroups': newVal })
      }
    },
    candidateUsers: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, { 'candidateUsers': newVal })
      }
    },
    assignee: {
      handler(newVal, oldVal) {
        this.modeling.updateProperties(this.element, { 'assignee': newVal })
      }
    }

  },
  mounted() {

  },
  created() {
    this.getNodeAction()
    const bpmnModeler = this.bpmnModeler()
    this.modeling = bpmnModeler.get('modeling')
    this.getRoleDict()
    this.getRoleGroupDict()
  },
  methods: {
    showSelectNodeUser() {
      const that = this
      that.$nextTick(() => {
        that.selectNodeUserDialog.visible = true
      })
    },
    saveNodeUser(selectNodeUsers, selectNameList) {
      const that = this
      if (!selectNodeUsers) {
        that.$message.error('请选择节点人员！')
        return
      }
      that.userIdList = selectNodeUsers
      that.userNameList = selectNameList
      // that.createOrUpdateCustomProperties('userIdList', selectNodeUsers)
      // that.createOrUpdateCustomProperties('selectNameList', selectNameList)

      that.selectNodeUserDialog.visible = false
    },
    closeNodeUser() {
      const that = this
      that.$nextTick(() => {
        that.selectNodeUserDialog.visible = false
      })
    },

    handleChange() {
      var actionList = this.actionList || []
      var actionArray = []
      var tempActionArray = []
      this.actionTypeList.forEach((item, index) => {
        actionArray.push(item.value)
      })
      actionList.forEach((item, index) => {
        console.log('item:' + item)
        if (actionArray.join(',').indexOf(item) > -1) {
          tempActionArray.push(item)
        }
      })
      this.actionList = tempActionArray
      console.log(this.actionList)
    },
    getNodeAction() {
      const param = 'pig:dict:nodeAction'
      getDictListByDictCode(param).then(response => {
        const dictList = []
        if (response.data !== null && response.data !== '') {
          response.data.forEach((item, index) => {
            dictList.push({
              label: item.label,
              value: item.value
            })
          })
        }
        this.actionTypeList = dictList
      }).catch(_ => { })
    },
    getRoleDict() {
      this.loading = false

      getRoleDict(store.getters.tenantId).then(response => (
        this.roleList = response.data
      )).catch(() => {
        this.loading = true
      })
    },
    getRoleGroupDict() {
      this.loading = false

      getRoleGroupDict(store.getters.tenantId).then(response => (
        this.roleGroupList = response.data

      )).catch(() => {
        this.loading = true
      })
    },
    getPropertieByName(customProperties, name) {
      return customProperties.get(name) || customProperties.$attrs[name]
    },
    getUserTaskList() {
      const that = this
      const nodeList = []
      try {
        for (var index in that.bpmnModeler()._definitions.$model.ids._seed.hats) {
          if (that.bpmnModeler()._definitions.$model.ids._seed.hats[index].$type !== 'bpmn:UserTask') continue
          nodeList.push({
            'value': that.bpmnModeler()._definitions.$model.ids._seed.hats[index].id,
            'label': that.bpmnModeler()._definitions.$model.ids._seed.hats[index].name
          })
        }
      } catch (e) {
        console.error(e)
      }
      this.userTaskList = nodeList
    },
    setForm(formKey, formName) {
      this.formKey = formKey
      this.formName = formName
      this.closeSelectFormDialog()
    },

    showSelectDialog() {
      this.selectFormDialog.visible = true
    },
    closeSelectFormDialog() {
      this.selectFormDialog.visible = false
    },

    handleClose(done) {
      this.$confirm(this.$t('action.confirmClose'))
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    remove(array, val) {
      var index = array.indexOf(val)
      if (index > -1) {
        array.splice(index, 1)
      }
    },

    updateDocumentation(value) {
      bpmnHelper.updateDocumentation(this.bpmnModeler(), this.element, value)
    },
    createOrUpdateCustomProperties(property, value) {
      if (property === 'findUserType' && value === '6') {
        this.getUserTaskList()
      }
      const that = this
      const bpmnModeler = that.bpmnModeler()
      const bpmnFactory = bpmnModeler.get('bpmnFactory')
      let extensionElements = bpmnHelper.getPropertie(that.element, 'extensionElements')
      if (!extensionElements) {
        extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory)
      }
      const length = extensionElements.get('values').length
      let customProperties
      let customPropertiesIndex = -1
      for (let i = 0; i < length; i++) {
        if (extensionElements.get('values')[i] && extensionElements.get('values')[i].$type === 'flowable:CustomProperties') {
          customProperties = extensionElements.get('values')[i]
          customPropertiesIndex = i
        }
      }
      if (!customProperties) {
        customProperties = elementHelper.createElement('flowable:CustomProperties', null, this.element, bpmnFactory)
      }

      const data = {}
      data[property] = value
      customProperties[property] = value
      if (customPropertiesIndex > -1) {
        extensionElements.get('values')[customPropertiesIndex] = customProperties
      } else {
        extensionElements.get('values').push(customProperties)
      }
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(this.element, {
        extensionElements: extensionElements
      })
    }
  }

}
</script>
<style>
</style>
