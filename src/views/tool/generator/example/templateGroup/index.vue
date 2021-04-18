<template>
  <div class="app-container">
    <div>
      <div
        v-if="showSearch"
        class="filter-container"
      >
        <el-form
          :inline="true"
          :model="listQuery"
        >
          <el-form-item label="模板组编码">
            <el-input
              v-model="listQuery.templateGroupCode"
              placeholder="请输入模板组编码 "
            />
          </el-form-item>
          <el-form-item label="模板组名称">
            <el-input
              v-model="listQuery.templateGroupName"
              placeholder="请输入模板组名称 "
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-waves
            type="success"
            icon="el-icon-search"
            @click="getList"
          >查询</el-button>
          <el-button
            v-waves
            icon="el-icon-download"
            @click="download"
          >导出</el-button>
          <el-button
            v-waves
            type="primary"
            icon="el-icon-plus"
            @click="handleCreate"
          >添加</el-button>
        </span>
      </div>
      <div class="table-container">
        <el-row
          :gutter="10"
          class="mb8"
        >
          <right-toolbar
            :show-search.sync="showSearch"
            :columns="columns"
            :default-hide-columns.sync="defaultHideColumns"
            @queryTable="getList"
          />
        </el-row>
        <el-table
          v-loading="listLoading"
          :data="list"
          size="mini"
          element-loading-text="Loading"
          fit
          border
          highlight-current-row
        >
          <el-table-column
            align="center"
            label="序号"
            width="95"
            sortable
          >
            <template slot-scope="scope">
              {{ (listQuery.pageIndex - 1 ) * listQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[0].visible"
            label="模板组编号 "
            prop="templateGroupId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="模板组编码 "
            prop="templateGroupCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="模板组名称 "
            prop="templateGroupName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="备注 "
            prop="remarks"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="状态"
            prop="validState"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[6].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[9].visible"
            label="更新时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            min-width="180px"
          >
            <template slot-scope="scope">
              <el-button
                v-waves
                size="mini"
                type="primary"
                icon="el-icon-edit"
                plain
                @click="handleUpdate(scope.row)"
              >编辑</el-button>
              <el-button
                v-waves
                size="mini"
                type="danger"
                icon="el-icon-delete"
                plain
                @click="handleDelete(scope.row)"
              >禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page-footer">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.pageIndex"
            :limit.sync="listQuery.pageSize"
            style="float:right;"
            @pagination="getList"
          />
        </div>
      </div>

      <el-dialog
        v-if="dialogVisible"
        :title="titleMap[dialogStatus]"
        :visible.sync="dialogVisible"
        width="40%"
        append-to-body
        @close="handleDialogClose"
      >
        <el-form
          ref="dataForm"
          :model="form"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item
            v-if="true"
            label="模板组编号 :"
            prop="templateGroupId"
          >
            <el-input
              v-model="form.templateGroupId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="模板组编码 :"
            prop="templateGroupCode"
          >
            <el-input
              v-model="form.templateGroupCode"
              placeholder="请输入模板组编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="模板组名称 :"
            prop="templateGroupName"
          >
            <el-input
              v-model="form.templateGroupName"
              placeholder="请输入模板组名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="租户编号 :"
            prop="tenantId"
          >
            <el-input
              v-model="form.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <QuillEditor
              v-model="form.remarks"
              placeholder="请输入备注"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态 :"
            prop="validState"
          >
            <el-switch
              v-model="form.validState"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="操作人工号 :"
            prop="operatorId"
          >
            <el-input
              v-model="form.operatorId"
              placeholder="请输入操作人工号 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="操作人姓名 :"
            prop="operatorName"
          >
            <el-input
              v-model="form.operatorName"
              placeholder="请输入操作人姓名 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="创建时间 :"
            prop="createTime"
          >
            <el-date-picker
              v-model="form.createTime"
              type="date"
              placeholder="请输入创建时间 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="更新时间 :"
            prop="updateTime"
          >
            <el-date-picker
              v-model="form.updateTime"
              type="date"
              placeholder="请输入更新时间 "
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-waves
            @click="dialogVisible = false"
          >取 消</el-button>
          <el-button
            v-waves
            type="primary"
            @click="submitForm"
          >确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        v-if="updateDialogVisible"
        :title="titleMap[dialogStatus]"
        :visible.sync="updateDialogVisible"
        width="80%"
        append-to-body
        @close="handleDialogClose"
      >
        <el-form
          ref="updateDataForm"
          :model="updateForm"
          :rules="updateRules"
          label-width="auto"
          class="demo-ruleForm"
        >

          <el-row>
            <el-col :span="12">
              <el-form-item
                v-if="true"
                label="模板组编号 :"
                prop="templateGroupId"
              >
                <el-input
                  v-model="updateForm.templateGroupId"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                v-if="true"
                label="模板组编码 :"
                prop="templateGroupCode"
              >
                <el-input
                  v-model="updateForm.templateGroupCode"
                  placeholder="请输入模板组编码 "
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                v-if="true"
                label="模板组名称 :"
                prop="templateGroupName"
              >
                <el-input
                  v-model="updateForm.templateGroupName"
                  placeholder="请输入模板组名称 "
                />
              </el-form-item>

            </el-col>
            <el-col :span="12">
              <el-form-item
                v-if="true"
                label="租户编号 :"
                prop="tenantId"
              >
                <el-input
                  v-model="updateForm.tenantId"
                  placeholder="请输入租户编号 "
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <QuillEditor
              v-model="updateForm.remarks"
              placeholder="请输入备注"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态 :"
            prop="validState"
          >
            <el-switch
              v-model="updateForm.validState"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="操作人工号 :"
            prop="operatorId"
          >
            <el-input
              v-model="updateForm.operatorId"
              placeholder="请输入操作人工号 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="操作人姓名 :"
            prop="operatorName"
          >
            <el-input
              v-model="updateForm.operatorName"
              placeholder="请输入操作人姓名 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="创建时间 :"
            prop="createTime"
          >
            <el-date-picker
              v-model="updateForm.createTime"
              type="date"
              placeholder="请输入创建时间 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="更新时间 :"
            prop="updateTime"
          >
            <el-date-picker
              v-model="updateForm.updateTime"
              type="date"
              placeholder="请输入更新时间 "
            />
          </el-form-item>

          <el-divider content-position="left">模板</el-divider>

          <el-form-item>
            <el-button @click="addTab(editableTabsValue)">
              新增模板
            </el-button>
            <el-button @click="updateTab(editableTabsValue)">
              编辑模板
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              :tab-position="tabPosition"
              @tab-click="handleClick"
              @tab-remove="removeTab"
            >
              <el-tab-pane
                v-for="(item,index) in editableTabs"
                :key="item.outputFileName"
                :label="item.templateName"
                :name="index + ''"

                stretch
              >
                <GeneratorCodemirror
                  :id="'codemirror'+index"
                  :ref="'codemirror'+index"
                  :value.sync="item.templateContent"
                  :language.sync="language"
                />
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-waves
            @click="updateDialogVisible = false"
          >取 消</el-button>
          <el-button
            v-waves
            type="primary"
            @click="submitForm"
          >确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        v-if="templateUpdateDialogVisible"
        append-to-body
        title="修改模板"
        :visible.sync="templateUpdateDialogVisible"
        width="40%"
      >
        <el-form
          ref="updateTemplateDataForm"
          :model="updateTemplateForm"
          :rules="updateTemplateRules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item
            v-if="true"
            label="模板名称 :"
            prop="templateName"
          >
            <el-input
              v-model="updateTemplateForm.templateName"
              placeholder="请输入模板名称 "
            />
          </el-form-item>
          <!-- <el-form-item
            v-if="true"
            label="模板内容 :"
            prop="templateContent"
          >
            <el-input
              type="textarea"
              v-model="updateTemplateForm.templateContent"
              autosize
              placeholder="请输入模板内容 "
            ></el-input>
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="模板类型 :"
            prop="templateType"
          >
            <el-switch
              v-model="updateTemplateForm.templateType"
              :active-value="1"
              :inactive-value="0"
              active-text="后端"
              inactive-text="前端"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="输出文件名称:"
            prop="outputFileName"
          >
            <el-input
              v-model="updateTemplateForm.outputFileName"
              placeholder="输出文件名称  如：/src/api/%s.js"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="模板路径 :"
            prop="templatePath"
          >
            <el-input
              v-model="updateTemplateForm.templatePath"
              placeholder="请输入模板路径 如：/templates/api.ftl "
            />
          </el-form-item>

          <el-form-item
            v-if="true"
            label="租户编号 :"
            prop="tenantId"
          >
            <el-input
              v-model="updateTemplateForm.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <el-input
              v-model="updateTemplateForm.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="templateUpdateDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitUpdateTemplate"
          >确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        v-if="templateSaveDialogVisible"
        append-to-body
        title="新增模板"
        :visible.sync="templateSaveDialogVisible"
        width="40%"
      >
        <el-form
          ref="saveTemplateForm"
          :model="saveTemplateForm"
          :rules="saveTemplateRules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item
            v-if="true"
            label="模板名称 :"
            prop="templateName"
          >
            <el-input
              v-model="saveTemplateForm.templateName"
              placeholder="请输入模板名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="模板类型 :"
            prop="templateType"
          >
            <el-switch
              v-model="saveTemplateForm.templateType"
              :active-value="1"
              :inactive-value="0"
              active-text="后端"
              inactive-text="前端"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="输出文件名称:"
            prop="outputFileName"
          >
            <el-input
              v-model="saveTemplateForm.outputFileName"
              placeholder="输出文件名称  如：/src/api/%s.js"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="模板路径 :"
            prop="templatePath"
          >
            <el-input
              v-model="saveTemplateForm.templatePath"
              placeholder="请输入模板路径 如：/templates/api.ftl "
            />
          </el-form-item>

          <el-form-item
            v-if="true"
            label="租户编号 :"
            prop="tenantId"
          >
            <el-input
              v-model="saveTemplateForm.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <el-input
              v-model="saveTemplateForm.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="templateSaveDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitSaveTemplate"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getTemplateGroupListPage,
  saveTemplateGroup,
  updateTemplateGroup,
  deleteById,
  download
} from '@/api/generator/templateGroup'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

import { getTemplateList, saveTemplate, updateTemplate } from '@/api/generator/template'
import GeneratorCodemirror from '@/components/GeneratorCodemirror'

export default {
  components: { Pagination, GeneratorCodemirror },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 标签页方向
      tabPosition: 'left',
      // 默认语言
      language: 'java',
      updateTemplateForm: {
        templateId: undefined, // 模板编号
        templateName: undefined, // 模板名称
        templateContent: undefined, // 模板内容
        templateType: 1, // 模板类型 1 后端 0 前端
        outputFileName: undefined, // 自定义输入文件名称
        templatePath: undefined, // 模板路径
        templateGroupId: undefined, // 模板组编号
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1 // 状态 1 有效 0 失效
      },
      updateTemplateRules: {
        templateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        outputFileName: [
          { required: true, message: '输出文件名称', trigger: 'blur' }
        ],
        templatePath: [
          { required: true, message: '请输入模板路径', trigger: 'blur' }
        ]
      },
      templateUpdateDialogVisible: false,
      saveTemplateForm: {
        templateId: undefined, // 模板编号
        templateName: undefined, // 模板名称
        templateContent: undefined, // 模板内容
        templateType: 1, // 模板类型 1 后端 0 前端
        outputFileName: undefined, // 自定义输入文件名称
        templatePath: undefined, // 模板路径
        templateGroupId: undefined, // 模板组编号
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1 // 状态 1 有效 0 失效
      },
      saveTemplateRules: {
        templateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        outputFileName: [
          { required: true, message: '输出文件名称', trigger: 'blur' }
        ],
        templatePath: [
          { required: true, message: '请输入模板路径', trigger: 'blur' }
        ]
      },
      templateSaveDialogVisible: false,
      editableTabs: [],
      editableTabsValue: 0,

      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: ['createTime'],
      // 列信息
      columns: [
        {
          key: 0,
          value: 'templateGroupId',
          label: '模板组编号',
          visible: true
        },
        {
          key: 1,
          value: 'templateGroupCode',
          label: '模板组编码',
          visible: true
        },
        {
          key: 2,
          value: 'templateGroupName',
          label: '模板组名称',
          visible: true
        },
        { key: 3, value: 'tenantId', label: '租户编号', visible: true },
        { key: 4, value: 'remarks', label: '备注', visible: true },
        {
          key: 5,
          value: 'validState',
          label: '状态 1 有效 0 失效',
          visible: true
        },
        { key: 6, value: 'operatorId', label: '操作人工号', visible: true },
        { key: 7, value: 'operatorName', label: '操作人姓名', visible: true },
        { key: 8, value: 'createTime', label: '创建时间', visible: true },
        { key: 9, value: 'updateTime', label: '更新时间', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        templateGroupCode: undefined,
        templateGroupName: undefined
      },
      input: '',
      form: {
        templateGroupId: undefined, // 模板组编号
        templateGroupCode: undefined, // 模板组编码
        templateGroupName: undefined, // 模板组名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        templateGroupId: undefined, // 模板组编号
        templateGroupCode: undefined, // 模板组编码
        templateGroupName: undefined, // 模板组名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        templateGroupId: [],
        templateGroupCode: [
          { required: true, message: '请输入模板组编码', trigger: 'blur' }
        ],
        templateGroupName: [
          { required: true, message: '请输入模板组名称', trigger: 'blur' }
        ],
        tenantId: [],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        templateGroupId: [],
        templateGroupCode: [
          { required: true, message: '请输入模板组编码', trigger: 'blur' }
        ],
        templateGroupName: [
          { required: true, message: '请输入模板组名称', trigger: 'blur' }
        ],
        tenantId: [],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getTemplateList(row) {
      this.listLoading = true
      const param = {
        templateGroupId: row.templateGroupId
      }
      getTemplateList(param).then(response => {
        this.editableTabs = response.data
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false

        console.log(err)
      })
    },
    handleClick(tab, event) {
      console.log(tab.index[0])

      this.$refs[`codemirror${tab.index}`][0].codemirrorChange()

      if (this.editableTabs[tab.index].outputFileName.endsWith('java')) {
        this.$refs[`codemirror${tab.index}`][0].changeMode('x-java')
      } else if (tab.label.endsWith('js')) {
        this.$refs[`codemirror${tab.index}`][0].changeMode('javascript')
      } else if (tab.label.endsWith('vue')) {
        this.$refs[`codemirror${tab.index}`][0].changeMode('x-vue')
      } else if (tab.label.endsWith('xml')) {
        this.$refs[`codemirror${tab.index}`][0].changeMode('xml')
      } else {
        this.$refs[`codemirror${tab.index}`][0].changeMode('x-sql')
      }
    },
    submitSaveTemplate() {
      const _this = this
      _this.$refs['saveTemplateForm'].validate((valid) => {
        if (valid) {
          _this
            .$confirm('确定保存吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(function() {
              const param = _this.saveTemplateForm
              param.templateGroupId = _this.saveTemplateForm.templateId
              saveTemplate(param)
                .then((response) => {
                  if (response.code === 200) {
                    const newTabName = ++_this.editableTabs.length + ''
                    _this.editableTabs.push({
                      outputFileName: _this.saveTemplateForm.templateName,
                      remarks: _this.saveTemplateForm.remarks,
                      templateContent: _this.saveTemplateForm.templateContent,
                      templateGroupId: _this.updateForm.templateGroupId,
                      templateId: _this.saveTemplateForm.templateId,
                      templateName: _this.saveTemplateForm.templateName,
                      templatePath: _this.saveTemplateForm.templatePath,
                      templateType: _this.saveTemplateForm.templateType,
                      tenantId: _this.saveTemplateForm.tenantId,
                      validState: _this.saveTemplateForm.validState
                    })
                    _this.editableTabsValue = newTabName
                    _this.$message.success(response.message)
                    _this.templatSaveDialogVisible = false
                  } else {
                    _this.$message.error(response.message)
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            })
        }
      })
    },
    submitUpdateTemplate() {
      const _this = this
      _this.$refs['updateTemplateDataForm'].validate((valid) => {
        if (valid) {
          _this
            .$confirm('确定保存吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(function() {
              updateTemplate(_this.updateTemplateForm)
                .then((response) => {
                  if (response.code === 200) {
                    const index = _this.editableTabsValue
                    console.log('index:' + index)
                    const param = {}
                    param.outputFileName = _this.updateTemplateForm.templateName
                    param.remarks = _this.updateTemplateForm.remarks
                    param.templateContent =
                      _this.updateTemplateForm.templateContent
                    param.templateGroupId =
                      _this.updateForm.templateGroupId
                    param.templateId = _this.updateTemplateForm.templateId
                    param.templateName = _this.updateTemplateForm.templateName
                    param.templatePath = _this.updateTemplateForm.templatePath
                    param.templateType = _this.updateTemplateForm.templateType
                    param.tenantId = _this.updateTemplateForm.tenantId
                    param.validState = _this.updateTemplateForm.validState
                    _this.editableTabs[index] = param
                    _this.$message.success(response.message)
                    _this.templateUpdateDialogVisible = false
                  } else {
                    _this.$message.error(response.message)
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            })
        }
      })
    },
    updateTab(targetName) {
      this.updateTemplateForm = this.editableTabs[this.editableTabsValue]
      this.templateUpdateDialogVisible = true
    },
    addTab(targetName) {
      this.templateSaveDialogVisible = true
    },
    removeTab(targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
    getList() {
      this.listLoading = true
      getTemplateGroupListPage(this.listQuery)
        .then((response) => {
          this.list = response.data.list
          this.total = response.data.total
          this.listLoading = false
        })
        .catch((err) => {
          this.listLoading = false
          console.log(err)
        })
    },
    download() {
      download(this.listQuery)
        .then((response) => {})
        .catch((err) => {
          console.log(err)
        })
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.updateForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.getTemplateList(row)
      this.updateDialogVisible = true
    },
    handleDelete(row) {
      const _this = this
      _this
        .$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(function() {
          const id = row.templateGroupId
          deleteById(id).then((response) => {
            if (response.code === 200) {
              _this.getList()
              _this.$message.success(response.message)
            } else {
              _this.$message.error(response.message)
            }
          })
        })
    },
    submitForm() {
      const _this = this
      const refForm =
        _this.dialogStatus === 'create' ? 'dataForm' : 'updateDataForm'
      _this.$refs[`${refForm}`].validate((valid) => {
        if (valid) {
          this.$confirm('确定操作吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function() {
            if (_this.dialogStatus === 'create') {
              saveTemplateGroup(_this.form)
                .then((response) => {
                  if (response.code === 200) {
                    _this.getList()
                    _this.$message.success(response.message)
                    _this.dialogVisible = false
                  } else {
                    _this.$message.error(response.message)
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            } else {
              updateTemplateGroup(_this.updateForm)
                .then((response) => {
                  if (response.code === 200) {
                    _this.getList()
                    _this.$message.success(response.message)
                    _this.updateDialogVisible = false
                  } else {
                    _this.$message.error(response.message)
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          })
        }
      })
    },
    resetForm() {
      this.form = {
        templateGroupId: undefined, // 模板组编号
        templateGroupCode: undefined, // 模板组编码
        templateGroupName: undefined, // 模板组名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      }
    },
    // 监听dialog关闭时的处理事件
    handleDialogClose() {
      const refForm =
        this.dialogStatus === 'create' ? 'dataForm' : 'updateDataForm'
      if (this.$refs[[`${refForm}`]]) {
        this.$refs[[`${refForm}`]].clearValidate() // 清除整个表单的校验
      }
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">
.page-footer {
  margin-top: 20px;
  width: 100%;
  height: 50px;
}
.filter-container {
  padding-bottom: 10px;
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}
.el-col {
  border-radius: 4px;
  align-items: stretch;
}
</style>
