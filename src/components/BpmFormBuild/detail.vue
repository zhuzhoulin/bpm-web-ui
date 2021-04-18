<template>
  <div v-loading="loading">
    <el-container v-if="show">
      <el-header class="header">
        {{ processInfo.processName }}
      </el-header>
      <el-main v-if="show">
        <FormBuild
          ref="bpm2"
          :options.sync="userInfo"
        />
        <el-divider />

        <FormBuild
          ref="bpm"
          :disabled="disabled"
          :options.sync="jsonDataProps"
          :dynamic-data.sync="dynamicDataProps"
          :default-value.sync="defaultValue"
          @buildSubmit="handleSubmit"
        />

        <el-divider />

        <el-tabs v-if="showHistory" v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="审批记录时间线" name="first">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in historyData"
                :key="index"
                :timestamp="item.createTime"
                placement="top"
              >
                <el-card>
                  <h4> {{ item.taskName }} - {{ item.approveRealName }}</h4>
                  <p> {{ item.approveOpinion }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>

          </el-tab-pane>
          <el-tab-pane label="查看流程图" name="second">
            <showApplyDiagram
              v-if="applyInfo.applyId > 0"
              :apply-id.sync="applyInfo.applyId"
            />
          </el-tab-pane>

          <el-tab-pane label="审批记录" name="third">
            <div id="history">
              <el-table
                v-if="historyData.length > 0"
                :data="historyData"
                stripe
                style="width: 100%"
              >
                <el-table-column align="center" :label="$t('historyList.id')" width="95">
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('historyList.approveRealName')" align="center" width="200">
                  <template slot-scope="scope">
                    {{ scope.row.approveRealName }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('historyList.taskName')" align="center" width="200">
                  <template slot-scope="scope">
                    {{ scope.row.taskName }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('historyList.createTime')" align="center" width="200">
                  <template slot-scope="scope">
                    {{ scope.row.createTime }}
                  </template>
                </el-table-column>
                <el-table-column :label="$t('historyList.approveOpinion')" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.approveOpinion }}
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>

        <el-divider />

        <el-tabs v-if="showApprove" type="border-card">
          <el-tab-pane label="审批操作">
            <el-form ref="approveForm" :model="approveForm" :rules="rules" label-width="auto">
              <el-form-item :label="$t('approve.nodeName')">
                <el-input v-model="approveForm.taskName" disabled />
              </el-form-item>
              <el-form-item :label="$t('approve.nodeUserName')">
                <el-input v-model="approveForm.taskUserName" disabled />
              </el-form-item>
              <el-form-item :label="$t('approve.approveOpinion')" prop="approveOpinion">
                <el-input
                  v-model="approveForm.approveOpinion"
                  type="textarea"
                  placeholder="请输入内容"
                  :autosize="{minRows:4,maxRows:10}"
                  maxlength="300"
                  show-word-limit
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>

      <el-footer>
        <el-form v-if="showAction">
          <el-form-item>
            <!-- <el-button v-if="start" @click="getData">获取数据</el-button> -->
            <el-button v-if="start" plain @click="saveDraft">{{ actionTypeMap['draft'] }}</el-button>
            <el-button v-if="start" plain @click="clickFormButton('clear')">{{ $t('action.reset') }}</el-button>
            <el-button v-if="start || nodeActionContainsStart || nodeActionContainsPass" plain @click="clickFormButton('submit')">{{ actionTypeMap['pass'] }}</el-button>
            <el-button v-if="nodeActionContainsReject" plain @click="approveReject">{{ actionTypeMap['reject'] }}</el-button>
            <el-button v-if="nodeActionContainsCounterSign" plain @click="showcounterSign">{{ actionTypeMap['counterSign'] }}</el-button>
            <el-button v-if="nodeActionContainsTempNode" plain @click="approveAddTempNode">{{ actionTypeMap['addTempNode'] }}</el-button>
            <el-button v-if="nodeActionContainsAddSign" plain @click="showAddSign">{{ actionTypeMap['addSign'] }}</el-button>
            <el-button v-if="nodeActionContainsReturnNode" plain @click="returnNodeDialog">{{ actionTypeMap['returnNode'] }}</el-button>
            <el-button v-if="nodeActionContainsreturnRandom" plain @click="showRandomReturnNode">{{ actionTypeMap['returnRandomNode'] }}</el-button>
            <el-button plain @click="showPersonSign">{{ actionTypeMap['personSign'] }}</el-button>

          </el-form-item>
        </el-form>
        <el-divider v-if="showAction" />
      </el-footer>

      <div>
        <el-dialog
          v-if="showAddTempNodeDialog.visible"
          :width="showAddTempNodeDialog.width"
          :title="showAddTempNodeDialog.title"
          :visible.sync="showAddTempNodeDialog.visible"
          append-to-body
          :before-close="handleClose"
        >
          <div>
            <select-user
              v-if="showAddTempNodeDialog.visible"
              ref="selectUser"
              :visible.sync="showAddTempNodeDialog.visible"
              :default-users.sync="defaultSelectedUsers"
              @save="saveApproveAddTempNode"
              @close="closeApproveAddTempNode"
            />
          </div>
        </el-dialog>

        <el-dialog
          v-if="counterSignDialog.visible"
          :width="counterSignDialog.width"
          :title="counterSignDialog.title"
          :visible.sync="counterSignDialog.visible"
          append-to-body
          :before-close="handleClose"
        >
          <div>
            <select-user
              v-if="counterSignDialog.visible"
              ref="selectUser"
              :visible.sync="counterSignDialog.visible"
              :default-users.sync="defaultSelectedUsers"
              @save="counterSign"
              @close="closeCounterSign"
            />
          </div>
        </el-dialog>
      </div>

      <div>
        <el-dialog
          v-if="showReturnNodeDialog.visible"
          :title="showReturnNodeDialog.title"
          :visible.sync="showReturnNodeDialog.visible"
          :width="showReturnNodeDialog.width"
          append-to-body
          center
          :before-close="handleClose"
        >
          <returnNode
            v-if="showReturnNodeDialog.visible"
            ref="returnNode"
            :task-id="userTaskInfo.taskId"
            @save="approveReturn"
            @close="closeReturnNode"
          />
        </el-dialog>
      </div>

      <div>
        <el-dialog
          v-if="showRandomReturnNodeDialog.visible"
          :title="showRandomReturnNodeDialog.title"
          :visible.sync="showRandomReturnNodeDialog.visible"
          :width="showRandomReturnNodeDialog.width"
          append-to-body
          center
          :before-close="handleClose"
        >
          <returnRandomNode
            v-if="showRandomReturnNodeDialog.visible"
            ref="returnRandomNode"
            :task-id="userTaskInfo.taskId"
            @save="approveRandomReturn"
            @close="closeRandomReturnNode"
          />

        </el-dialog>
      </div>
      <div>
        <el-dialog
          v-if="addSignDialog.visible"
          :title="addSignDialog.title"
          :visible.sync="addSignDialog.visible"
          :width="addSignDialog.width"
          append-to-body
          center
        >

          <add-sign v-if="addSignDialog.visible" ref="addSignDialog" @close="closeAddSign" @save="approveAddSign" />
        </el-dialog>
      </div>

      <div>
        <el-dialog
          v-if="personSignDialog.visible"
          :title="personSignDialog.title"
          :visible.sync="personSignDialog.visible"
          :width="personSignDialog.width"
          append-to-body
          center
        >

          <person-sign v-if="personSignDialog.visible" ref="personSignDialog" @close="closePersonSign" @save="approvePersonSign" />
        </el-dialog>
      </div>
    </el-container>
  </div>
</template>
<script>
import { generateTitle } from '@/utils/i18n'
import store from '@/store'
import { startApply, saveDraftApply, getApplyDetail, getApproveDetail } from '@/api/process/apply'
import { completeTask, getRandomJumpNode, getReturnNode } from '@/api/process/userTask'

import deepClone from 'clone-deep'
import showApplyDiagram from '@/components/ShowDiagram/showApplyDiagram.vue'
import { defaultDiagramXML } from '../../resources/diagram/newDiagram'
import selectUser from '@/components/common/selectUser.vue'
import addSign from '@/components/action/addSign.vue'
import returnNode from '@/components/action/returnNode.vue'
import personSign from '@/components/action/personEsign.vue'

import returnRandomNode from '@/components/action/returnRandomNode.vue'
import { getDictListByDictCode } from '@/api/system/dict'

export default {
  name: 'Detail',
  components: { showApplyDiagram, selectUser, addSign, returnNode, returnRandomNode, personSign },
  props: {
    data: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      actionTypeList: [],
      actionTypeMap: {},
      defaultSelectedUsers: [2, 3],
      showAddTempNodeDialog: {
        title: '新增临时节点',
        visible: false,
        width: '70%',
        name: '', // 组件名,
        loading: false,
        fullscreen: false,
        closeOnPressEscape: false,
        direction: 'rtl'
      },
      counterSignDialog: {
        title: '选择会签人员',
        visible: false,
        width: '70%',
        name: '', // 组件名,
        loading: false,
        fullscreen: false,
        closeOnPressEscape: false
      },
      addSignDialog: {
        title: '加签',
        visible: false,
        width: '',
        name: '', // 组件名,
        loading: false
      },
      personSignDialog: {
        title: '签字',
        visible: false,
        width: '',
        name: '', // 组件名,
        loading: false
      },
      showReturnNodeDialog: {
        title: '退回',
        visible: false,
        width: '',
        name: '', // 组件名,
        loading: false
      },
      showRandomReturnNodeDialog: {
        title: '任意节点跳转',
        visible: false,
        width: '',
        name: '', // 组件名,
        loading: false
      },
      returnNodeList: [],
      returnNodeMap: [],
      returnNode: {
        nodeUsers: '',
        nodeId: null
      },
      returnNodeRule: {

      },
      defaultValue: {},

      rules: {
        approveAction: [
          { required: true, message: '请输入审批动作', trigger: 'blur' },
          { min: 1, message: '长度最少为1个字符', trigger: 'blur' }
        ],
        approveOpinion: [
          { required: true, message: '请输入意见', trigger: 'blur' },
          { min: 1, message: '长度最少为1个字符', trigger: 'blur' }
        ]
      },
      diagramXml: defaultDiagramXML,
      approveForm: {

      },
      activeName: 'first',
      historyData: {
      },
      FormData: {
        applyId: 0,
        taskId: 0
      },
      show: false,
      disabled: true,
      taskType: null,
      processKey: 'pig_test1',
      tempApplyId: 0,
      processInfo: {
        processName: ''
      },
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
                              'minWidth': 80,
                              'width': 100,
                              'defaultValue': '',
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'input_1593338290701',
                            'key': 'input_1593338290701',
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
                              'minWidth': 80,
                              'width': 100,
                              'defaultValue': '',
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'input_1593338293284',
                            'key': 'input_1593338293284',
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
                              'minWidth': 80,
                              'width': 100,
                              'defaultValue': '',
                              'placeholder': '',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'input_1593338296767',
                            'key': 'input_1593338296767',
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
                              'minWidth': 80,
                              'width': 100,
                              'defaultValue': '',
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'input_1593338298502',
                            'key': 'input_1593338298502',
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
      tempUserInfo: {
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
      },
      nodeInfo: {

      },
      businessData: {

      },
      applyInfo: {

      },
      applyUserInfo: {

      },
      userTaskInfo: {

      },
      showApprove: false,
      showHistory: true

    }
  },
  computed: {
    start() {
      if (!this.taskType) {
        return
      }
      return this.taskType === 'start'
    },
    /** 当前节点包含 发起动作 */
    nodeActionContainsStart() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('start') > -1
    },
    /** 当前节点包含 草稿动作 */
    nodeActionContainsDraft() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('draft') > -1
    },
    /** 当前节点包含 审批通过动作 */
    nodeActionContainsPass() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('pass') > -1
    },
    /** 当前节点包含 不同意 动作 */

    nodeActionContainsReject() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('reject') > -1
    },
    /** 当前节点包含 加签 动作 */
    nodeActionContainsAddSign() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('addSign') > -1
    },
    /** 当前节点包含 会签 动作 */
    nodeActionContainsCounterSign() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('counterSign') > -1
    },
    /** 当前节点包含 临时节点 动作 */
    nodeActionContainsTempNode() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('addTempNode') > -1
    },
    /** 当前节点包含 退回 动作 */
    nodeActionContainsReturnNode() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('returnNode') > -1
    },
    /** 当前节点包含 任意节点跳转 动作 */
    nodeActionContainsreturnRandom() {
      if (!this.nodeInfo || !this.nodeInfo.actionList) {
        return
      }
      return this.nodeInfo.actionList.indexOf('returnRandomNode') > -1
    }
  },
  watch: {

    formData: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.formData = newValue
          const temp = deepClone(newValue)
          console.log(temp)
          if (Array.isArray(temp)) {
            temp.unshift({
              'type': 'input',
              'label': '申请单号',
              'options': {
                'label': '申请单号',
                'minWidth': 10,
                'width': 100,
                'defaultValue': '',
                'placeholder': '',
                'clearable': false,
                'hidden': false,
                'disabled': true
              },
              'model': 'applySn',
              'key': 'applySn',
              'rules': [
                {
                  'required': false,
                  'message': '必填项',
                  'trigger': 'blur'
                }
              ]
            })
          }

          this.jsonDataProps.list[0].list = temp
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

    data: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.formData = deepClone(newValue)
          this.disabled = this.formData.disabled || false
          this.showApprove = this.formData.showApprove || false
          this.showHistory = this.formData.showHistory || true
          this.taskType = this.formData.taskType
          this.showAction = this.formData.showAction || false

          if (this.formData) {
            if (this.formData.applyId && this.formData.applyId > 0) {
              this.getApplyDetail()
            } else if (this.formData.taskId && this.formData.taskId > 0) {
              this.getApproveDetail()
            }
          }
        })
      },
      deep: true
    },
    tempUserInfo: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.userInfo = newValue
        })
      },
      deep: true
    }

  }, mounted() {

  },
  created() {
    this.getNodeAction()
    this.formData = deepClone(this.data)
    if (this.formData) {
      if (this.formData.applyId && this.formData.applyId > 0) {
        this.getApplyDetail()
      } else if (this.formData.taskId && this.formData.taskId > 0) {
        this.getApproveDetail()
      }
    }
    this.disabled = this.formData.disabled || false
    this.showApprove = this.formData.showApprove || false
    this.showHistory = this.formData.showHistory || true

    this.showAction = this.formData.showAction || false

    this.taskType = this.formData.taskType
  },
  methods: {
    getNodeAction() {
      const param = 'pig:dict:nodeAction'
      getDictListByDictCode(param).then(response => {
        console.log(response.data)
        this.actionTypeList = response.data
        for (const key in response.data) {
          this.actionTypeMap[response.data[key].value] = response.data[key].label
        }
      }).catch(_ => {})
    },
    getReturnNode() {
      const param = this.userTaskInfo.taskId
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
    },
    getRandomJumpNode() {
      const param = this.userTaskInfo.taskId
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
    },

    showPersonSign() {
      const that = this
      that.$nextTick(() => {
        that.personSignDialog.visible = true
      })
    },
    closePersonSign() {
      const that = this
      that.$nextTick(() => {
        that.personSignDialog.visible = false
      })
    },
    approvePersonSign(signType, nodeUsers) {

    },
    showAddSign() {
      const that = this
      that.$nextTick(() => {
        that.addSignDialog.visible = true
      })
    },
    closeAddSign() {
      const that = this
      that.$nextTick(() => {
        that.addSignDialog.visible = false
      })
    },
    approveAddSign(signType, nodeUsers) {
      const that = this
      if (!nodeUsers) {
        that.$message.error('请选择加签人员')
        return
      }
      that.addSignDialog.visible = false
      that.approveForm.approveAction = 'approveAddSign'
      if (!that.approveForm.approveOpinion) {
        that.approveForm.approveOpinion = '加签'
      }
      const extBusinessData = [
        { 'name': 'signType', 'value': signType },
        { 'name': 'nodeUsers', 'value': nodeUsers }]

      that.completeTask(extBusinessData)
    },
    showRandomReturnNode() {
      const that = this
      that.$nextTick(() => {
        that.showRandomReturnNodeDialog.visible = true
        that.getRandomJumpNode()
      })
    },
    closeRandomReturnNode() {
      const that = this
      that.$nextTick(() => {
        that.showRandomReturnNodeDialog.visible = false
      })
    },

    approveRandomReturn(nodeId, nodeName) {
      const that = this
      if (!nodeId) {
        that.$message.error('请选择跳转节点！')
        return
      }
      that.showRandomReturnNodeDialog.visible = false
      if (!that.approveForm.approveOpinion) {
        that.approveForm.approveOpinion = '跳转'
      }
      that.approveForm.approveAction = 'approveRandomReturn'
      const extBusinessData = [{ 'name': 'nodeId', 'value': nodeId }]
      that.$confirm('确定 跳转 至【' + nodeName + '】 节点？')
        .then(_ => {
          that.completeTask(extBusinessData)
        })
        .catch(_ => {})
    },
    returnNodeDialog() {
      const that = this
      that.$nextTick(() => {
        that.showReturnNodeDialog.visible = true
        that.getReturnNode()
      })
    },
    closeReturnNode() {
      const that = this
      that.$nextTick(() => {
        that.showReturnNodeDialog.visible = false
      })
    },
    approveReturn(nodeId, nodeName) {
      const that = this
      if (!nodeId) {
        that.$message.error('请选择退回节点！')
        return
      }
      that.showReturnNodeDialog.visible = false
      if (!that.approveForm.approveOpinion) {
        that.approveForm.approveOpinion = '退回'
      }
      that.approveForm.approveAction = 'approveReturn'
      const extBusinessData = [{ 'name': 'nodeId', 'value': nodeId }]
      that.$confirm('确定 退回 至【' + nodeName + '】 节点？')
        .then(_ => {
          that.completeTask(extBusinessData)
        })
        .catch(_ => {})
    },
    handleClose(done) {
      this.$confirm(this.$t('action.confirmClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    approveAddTempNode() {
      const that = this
      that.$nextTick(() => {
        that.showAddTempNodeDialog.visible = true
      })
    },
    closeApproveAddTempNode() {
      const that = this
      that.$nextTick(() => {
        that.showAddTempNodeDialog.visible = false
      })
    },
    saveApproveAddTempNode(selectNodeUsers, selectNameList) {
      const that = this
      if (!selectNodeUsers) {
        that.$message.error('请选择节点人员！')
        return
      }
      that.showAddTempNodeDialog.visible = false
      if (!that.approveForm.approveOpinion) {
        that.approveForm.approveOpinion = '新增临时节点'
      }
      that.approveForm.approveAction = 'approveAddTempNode'
      const extBusinessData = [{ 'name': 'nodeUsers', 'value': selectNodeUsers }]
      that.$confirm('确定新增 临时节点 【' + selectNameList + '】？')
        .then(_ => {
          that.completeTask(extBusinessData)
        })
        .catch(_ => {})
    },
    showcounterSign() {
      const that = this
      that.$nextTick(() => {
        that.counterSignDialog.visible = true
      })
    },
    closeCounterSign() {
      const that = this
      that.$nextTick(() => {
        that.counterSignDialog.visible = false
      })
    },
    counterSign(selectNodeUsers, selectNameList) {
      const that = this
      if (!selectNodeUsers) {
        that.$message.error('请选择会签人员！')
        return
      }
      if (!that.approveForm.approveOpinion) {
        that.approveForm.approveOpinion = '会签'
      }
      that.counterSignDialog.visible = false
      that.approveForm.approveAction = 'approveCounterSign'
      const extBusinessData = [{ 'name': 'assigneeList', 'value': selectNodeUsers }]
      that.$confirm('确定新增会签人员【' + selectNameList + '】？')
        .then(_ => {
          that.completeTask(extBusinessData)
        })
        .catch(_ => {})
    },
    approveReject() {
      const that = this
      that.approveForm.approveAction = 'approveReject'
      that.$confirm(this.$t('action.confirmReject'))
        .then(_ => {
          that.completeTask()
        })
        .catch(_ => {})
    },
    /**
     * param tempParamArray 额外数据 eq [{name:xx,value:xx}]
     */
    completeTask(tempParamArray) {
      const that = this
      that.loading = true
      const param = {
        taskId: that.userTaskInfo.taskId,
        approveActionCode: that.approveForm.approveAction,
        approveOpinion: that.approveForm.approveOpinion,
        businessData: that.$refs.bpm.getFormData()
      }

      that.$refs['approveForm'].validate((valid) => {
        if (valid) {
          // 如果有额外参数 则加上
          if (Array.isArray(tempParamArray)) {
            const tempBusinessData = param.businessData
            for (var i = 0; i < tempParamArray.length; i++) {
              tempBusinessData[tempParamArray[i].name] = tempParamArray[i].value
            }
            param.businessData = tempBusinessData
          }

          completeTask(param).then(response => {
            console.log(response)
            that.$nextTick(() => {
              that.loading = false
              that.$emit('close')
              that.$emit('queryList')
            })
          })
            .catch(err => {
              that.$nextTick(() => {
                that.loading = false
                that.$emit('close')
                that.$emit('queryList')
              })
              console.log(err, '失败')
            })
        } else {
          that.$nextTick(() => {
            that.loading = false
          })
          return
        }
      })
    },

    print() {
      window.print()
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getApproveDetail() {
      const that = this
      that.loading = true
      getApproveDetail(that.formData.taskId).then(response => {
        console.log(response)
        that.$nextTick(() => {
          that.setResponseValue(response.data)
          that.loading = false
          that.show = true
        })
      })
        .catch(err => {
          console.log(err, '失败')
        })
    },

    getApplyDetail() {
      const that = this
      that.loading = true
      getApplyDetail(that.formData.applyId).then(response => {
        console.log(response)
        that.$nextTick(() => {
          that.setResponseValue(response.data)
          that.loading = false
          that.show = true
        })
      })
        .catch(err => {
          console.log(err, '失败')
        })
    },
    setResponseValue(data) {
      const that = this
      that.processInfo = { processName: data.applyInfo.processName || '' }
      that.applyInfo = deepClone(data.applyInfo) || {}
      that.nodeInfo = deepClone(data.nodeInfo) || {}
      that.businessData = deepClone(data.businessData) || {}
      that.applyUserInfo = deepClone(data.applyUserInfo) || {}
      that.userTaskInfo = deepClone(data.userTaskInfo) || {}
      that.historyData = deepClone(data.historyList) || []
      that.defaultValue = that.businessData
      that.approveForm = {
        taskName: that.userTaskInfo.taskName,
        taskUserName: store.getters.user.user.realName,
        approveAction: that.userTaskInfo.taskType,
        formKey: that.userTaskInfo.formKey,
        approveOpinion: ''
      }

      // 如果当前节点未设置审批页面，则默认使用申请页面，则许将当前页面设置 只读
      if (!that.approveForm.formKey && this.taskType !== 'draft') {
        that.disabled = true
      }

      if (data.dynamicFormData && data.dynamicFormData.formJsonData !== '') {
        var json = JSON.parse(data.dynamicFormData.formJsonData)
        that.formData = json.list
        that.jsonDataProps.list[0].list = that.formData
        that.dynamicDataProps = JSON.parse(JSON.stringify(data.dynamicFormData.dynamicDataMap))
      }

      that.tempUserInfo = {

        'config': {
          'labelPosition': 'right',
          'labelWidth': 15
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
                              'width': 100,
                              'defaultValue': this.applyUserInfo.companyName || store.getters.user.user.companyName,
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'input_1593338290701',
                            'key': 'input_1593338290701',
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
                              'width': 100,
                              'defaultValue': this.applyUserInfo.deptName || store.getters.user.user.deptName,
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'input_1593338293284',
                            'key': 'input_1593338293284',
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
                              'width': 100,
                              'defaultValue': '',
                              'placeholder': this.applyUserInfo.realName || store.getters.user.user.realName,
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'input_1593338296767',
                            'key': 'input_1593338296767',
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
                              'width': 100,
                              'defaultValue': this.applyUserInfo.userId || store.getters.user.user.userId,
                              'placeholder': '请输入',
                              'clearable': false,
                              'hidden': false,
                              'disabled': true
                            },
                            'model': 'input_1593338298502',
                            'key': 'input_1593338298502',
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
      }
    },
    startApply() {
      this.loading = true
      const param = {
        tenantId: store.getters.tenantId,
        processKey: this.processKey,
        formKey: this.nodeInfo.formKey || this.applyInfo.formKey,
        startUserId: store.getters.userId,
        applyId: this.applyInfo.applyId,
        data: this.$refs.bpm.getFormData()
      }
      startApply(param).then(response => {
        console.log(response)
        this.$nextTick(() => {
          this.loading = false
          this.$emit('close')
          this.$emit('queryList')
        })
      })
        .catch(err => {
          this.$nextTick(() => {
            this.loading = false
          })
          console.log(err, '失败')
        })
    },

    saveDraft() {
      const param = {
        tenantId: store.getters.tenantId,
        processKey: this.processKey,
        formKey: this.nodeInfo.formKey || this.applyInfo.formKey,
        startUserId: store.getters.userId,
        applyId: this.applyInfo.applyId,
        data: this.$refs.bpm.getFormData()
      }
      this.loading = true
      saveDraftApply(param).then(response => {
        this.$nextTick(() => {
          this.loading = false
        })
      })
        .catch(err => {
          this.$nextTick(() => {
            this.loading = false
          })
          console.log(err, '失败')
        })
    },

    generateTitle,
    clickFormButton(type) {
      this.$refs.bpm.clickFormButton(type)
    },
    handleSubmit(p) {
      // 通过表单提交按钮触发，获取promise对象
      console.log('sss:' + JSON.stringify(p))

      if (this.taskType === 'draft') {
        this.startApply()
      }

      if (this.taskType === 'toDo') {
        this.completeTask()
      }

      // p()
      //   .then(res => {
      //     // 获取数据成功
      //     alert(JSON.stringify(res))
      //   })
      //   .catch(err => {
      //     console.log(err, '校验失败')
      //   })
    },
    getData() {
      console.log(this.$refs.bpm.getFormData())

      alert(JSON.stringify(this.$refs.bpm.getFormData()))

      // // 通过函数获取数据
      // this.$refs.bpm.getFormData()
      //   .then(res => {
      //     // 获取数据成功

      //   })
      //   .catch(err => {
      //     console.log(err, '校验失败')
      //   })
    }
  }
}
</script>
<style scoped>

.header{    height: 60px;
    font-size: 24;
    font-size: large;
    line-height: 60px;
    font-weight: 500;
    text-align: center;
}
</style>
