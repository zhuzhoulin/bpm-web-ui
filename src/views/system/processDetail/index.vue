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
          label-width="auto"
        >
          <el-form-item label="流程编号 ">
            <el-input
              v-model="listQuery.processId"
              placeholder="请输入流程编号 "
            />
          </el-form-item>
          <el-form-item label="默认版本号 ">
            <el-input
              v-model="listQuery.definitionId"
              placeholder="请输入默认版本号 "
            />
          </el-form-item>
          <el-form-item label="发布状态 ">
            <el-select
              v-model="listQuery.publishStatus"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in dictOption1"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
            label="流程详细编号 "
            prop="processDetailId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="流程编号 "
            prop="processId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="流程数据 "
            prop="processXml"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="默认版本号 "
            prop="definitionId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="申请标题规则 "
            prop="applyTitleRule"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="流程到期时间 "
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.applyDueDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[7].visible"
            label="完成发起节点 "
            prop="autoCompleteFirstNode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="发布状态 "
            prop="publishStatus"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ dictMap1[scope.row.publishStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[9].visible"
            label="主版本 "
            prop="mainVersion"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="备注 "
            prop="remarks"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
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
            v-if="columns[12].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[13].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[14].visible"
            label="创建时间 "
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[15].visible"
            label="更新时间 "
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
            min-width="200px"
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
        :title="titleMap[dialogStatus]"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
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
            label="流程详细编号 :"
            prop="processDetailId"
          >
            <el-input
              v-model="form.processDetailId"
              disabled
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
            label="流程编号 :"
            prop="processId"
          >
            <el-input
              v-model="form.processId"
              placeholder="请输入流程编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="流程数据 :"
            prop="processXml"
          >
            <el-input
              v-model="form.processXml"
              type="textarea"
              autosize
              placeholder="请输入流程数据 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="默认版本号 :"
            prop="definitionId"
          >
            <el-input
              v-model="form.definitionId"
              placeholder="请输入默认版本号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="申请标题规则 :"
            prop="applyTitleRule"
          >
            <el-input
              v-model="form.applyTitleRule"
              placeholder="请输入申请标题规则 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="流程到期时间 :"
            prop="applyDueDate"
          >
            <el-date-picker
              v-model="form.applyDueDate"
              type="date"
              placeholder="请输入流程到期时间 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="完成发起节点 :"
            prop="autoCompleteFirstNode"
          >
            <el-switch
              v-model="form.autoCompleteFirstNode"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="发布状态 :"
            prop="publishStatus"
          >
            <el-select
              v-model="form.publishStatus"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in dictOption1"
                :key="index"
                :label="item.label"
                :value="item.value"
              />

            </el-select>
          </el-form-item>
          <el-form-item
            v-if="true"
            label="主版本 :"
            prop="mainVersion"
          >
            <el-switch
              v-model="form.mainVersion"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <el-input
              v-model="form.remarks"
              placeholder="请输入备注 "
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
        :title="titleMap[dialogStatus]"
        :visible.sync="updateDialogVisible"
        width="40%"
        :before-close="handleClose"
        @close="handleDialogClose"
      >
        <el-form
          ref="updateDataForm"
          :model="updateForm"
          :rules="updateRules"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item
            v-if="true"
            label="流程详细编号 :"
            prop="processDetailId"
          >
            <el-input
              v-model="updateForm.processDetailId"
              disabled
            />

          </el-form-item>
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
          <el-form-item
            v-if="true"
            label="流程编号 :"
            prop="processId"
          >
            <el-input
              v-model="updateForm.processId"
              placeholder="请输入流程编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="流程数据 :"
            prop="processXml"
          >
            <el-input
              v-model="updateForm.processXml"
              type="textarea"
              autosize
              placeholder="请输入流程数据 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="默认版本号 :"
            prop="definitionId"
          >
            <el-input
              v-model="updateForm.definitionId"
              placeholder="请输入默认版本号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="申请标题规则 :"
            prop="applyTitleRule"
          >
            <el-input
              v-model="updateForm.applyTitleRule"
              placeholder="请输入申请标题规则 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="流程到期时间 :"
            prop="applyDueDate"
          >
            <el-date-picker
              v-model="updateForm.applyDueDate"
              type="date"
              placeholder="请输入流程到期时间 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="完成发起节点 :"
            prop="autoCompleteFirstNode"
          >
            <el-switch
              v-model="updateForm.autoCompleteFirstNode"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="发布状态 :"
            prop="publishStatus"
          >
            <el-select
              v-model="updateForm.publishStatus"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in dictOption1"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="true"
            label="主版本 :"
            prop="mainVersion"
          >
            <el-switch
              v-model="updateForm.mainVersion"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <el-input
              v-model="updateForm.remarks"
              placeholder="请输入备注 "
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
    </div>
  </div>
</template>

<script>
import {
  getProcessDetailListPage,
  saveProcessDetail,
  updateProcessDetail,
  deleteById,
  download
} from '@/api/process/processDetail'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { getDictListByDictCode } from '@/api/system/dict'

export default {
  components: { Pagination },
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
      dictOption1: [],
      dictMap1: {},
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: ['operatorId', 'createTime'],
      // 列信息
      columns: [
        {
          key: 0,
          value: 'processDetailId',
          label: '流程详细编号 ',
          visible: true
        },
        { key: 1, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 2, value: 'processId', label: '流程编号 ', visible: true },
        { key: 3, value: 'processXml', label: '流程数据 ', visible: true },
        { key: 4, value: 'definitionId', label: '默认版本号 ', visible: true },
        {
          key: 5,
          value: 'applyTitleRule',
          label: '申请标题规则 ',
          visible: true
        },
        {
          key: 6,
          value: 'applyDueDate',
          label: '流程到期时间 ',
          visible: true
        },
        {
          key: 7,
          value: 'autoCompleteFirstNode',
          label: '完成发起节点 ',
          visible: true
        },
        { key: 8, value: 'publishStatus', label: '发布状态 ', visible: true },
        { key: 9, value: 'mainVersion', label: '主版本 ', visible: true },
        { key: 10, value: 'remarks', label: '备注 ', visible: true },
        { key: 11, value: 'validState', label: '状态 ', visible: true },
        { key: 12, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 13, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 14, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 15, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        processId: undefined,
        definitionId: undefined,
        publishStatus: undefined
      },
      input: '',
      form: {
        processDetailId: undefined, // 流程详细编号
        tenantId: undefined, // 租户编号
        processId: undefined, // 流程编号
        processXml: undefined, // 流程数据
        definitionId: undefined, // 默认版本号
        applyTitleRule: undefined, // 申请标题规则
        applyDueDate: undefined, // 流程到期时间
        autoCompleteFirstNode: undefined, // 完成发起节点
        publishStatus: undefined, // 发布状态
        mainVersion: undefined, // 主版本
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        processDetailId: undefined, // 流程详细编号
        tenantId: undefined, // 租户编号
        processId: undefined, // 流程编号
        processXml: undefined, // 流程数据
        definitionId: undefined, // 默认版本号
        applyTitleRule: undefined, // 申请标题规则
        applyDueDate: undefined, // 流程到期时间
        autoCompleteFirstNode: undefined, // 完成发起节点
        publishStatus: undefined, // 发布状态
        mainVersion: undefined, // 主版本
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
        processDetailId: [],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        processId: [
          { required: true, messages: '请输入流程编号', trigger: 'blur' }
        ],
        processXml: [],
        definitionId: [],
        applyTitleRule: [],
        applyDueDate: [],
        autoCompleteFirstNode: [],
        publishStatus: [
          { required: true, messages: '请输入发布状态', trigger: 'change' }
        ],
        mainVersion: [],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        processDetailId: [],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        processId: [
          { required: true, messages: '请输入流程编号', trigger: 'blur' }
        ],
        processXml: [],
        definitionId: [],
        applyTitleRule: [],
        applyDueDate: [],
        autoCompleteFirstNode: [],
        publishStatus: [
          { required: true, messages: '请输入发布状态', trigger: 'change' }
        ],
        mainVersion: [],
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
    this.getDict1()
  },
  methods: {
    getDict1() {
      const dictCode = 'pig:dict:publishStatus'
      getDictListByDictCode(dictCode).then((response) => {
        this.$nextTick(() => {
          const option = []
          for (const key in response.data) {
            option.push({
              label: response.data[key].label,
              value: response.data[key].value
            })
            this.dictMap1[response.data[key].value] = response.data[key].label
          }
          this.dictOption1 = option
        })
      })
    },
    getList() {
      this.listLoading = true
      getProcessDetailListPage(this.listQuery)
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
      this.updateDialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确定关闭吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((_) => {
          done()
        })
        .catch((_) => {})
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
          const id = row.processDetailId
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
              saveProcessDetail(_this.form)
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
              updateProcessDetail(_this.updateForm)
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
        processDetailId: undefined, // 流程详细编号
        tenantId: undefined, // 租户编号
        processId: undefined, // 流程编号
        processXml: undefined, // 流程数据
        definitionId: undefined, // 默认版本号
        applyTitleRule: undefined, // 申请标题规则
        applyDueDate: undefined, // 流程到期时间
        autoCompleteFirstNode: undefined, // 完成发起节点
        publishStatus: undefined, // 发布状态
        mainVersion: undefined, // 主版本
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
</style>
