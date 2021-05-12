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
          <el-form-item label="规则名称 ">
            <el-input
              v-model="listQuery.ruleName"
              placeholder="请输入规则名称 "
            />
          </el-form-item>
          <el-form-item label="规则类型 1 人员规则 ">
            <el-select
              v-model="listQuery.ruleType"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                key="深圳"
                label="选项1"
                value="深圳"
              />
              <el-option
                key="上海"
                label="选项2"
                value="上海"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="流程编号 ">
            <el-input
              v-model="listQuery.processId"
              placeholder="请输入流程编号 "
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
            label="规则 guid "
            prop="ruleId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="规则名称 "
            prop="ruleName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="规则编号 "
            prop="ruleCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="规则类型 1 人员规则 "
            prop="ruleType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="流程编号 "
            prop="processId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="角色组编号 "
            prop="roleGroupId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="角色编号 "
            prop="roleId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="用户编号 "
            prop="userId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="规则表达式 "
            prop="ruleExpression"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="规则动作 "
            prop="ruleAction"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
            label="人员工号 "
            prop="ruleUsers"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[12].visible"
            label="备注 "
            prop="remarks"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[13].visible"
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
            v-if="columns[14].visible"
            label="操作工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[15].visible"
            label="操作姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[16].visible"
            label="创建时间 "
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[17].visible"
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
            label="规则 guid :"
            prop="ruleId"
          >
            <el-input
              v-model="form.ruleId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则名称 :"
            prop="ruleName"
          >
            <el-input
              v-model="form.ruleName"
              placeholder="请输入规则名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则编号 :"
            prop="ruleCode"
          >
            <el-input
              v-model="form.ruleCode"
              placeholder="请输入规则编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则类型 1 人员规则 :"
            prop="ruleType"
          >
            <el-select
              v-model="form.ruleType"
              placeholder="请选择"
            >
              <el-option
                key="深圳"
                label="选项1"
                value="深圳"
              />
              <el-option
                key="上海"
                label="选项2"
                value="上海"
              />

            </el-select>
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
            <el-input-number
              v-model="form.processId"
              placeholder="请输入流程编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色组编号 :"
            prop="roleGroupId"
          >
            <el-input-number
              v-model="form.roleGroupId"
              placeholder="请输入角色组编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色编号 :"
            prop="roleId"
          >
            <el-input-number
              v-model="form.roleId"
              placeholder="请输入角色编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="用户编号 :"
            prop="userId"
          >
            <el-input-number
              v-model="form.userId"
              placeholder="请输入用户编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则表达式 :"
            prop="ruleExpression"
          >
            <el-input
              v-model="form.ruleExpression"
              placeholder="请输入规则表达式 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则动作 :"
            prop="ruleAction"
          >
            <el-input
              v-model="form.ruleAction"
              placeholder="请输入规则动作 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="人员工号 :"
            prop="ruleUsers"
          >
            <el-input
              v-model="form.ruleUsers"
              placeholder="请输入人员工号 "
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
            v-if="true"
            label="操作工号 :"
            prop="operatorId"
          >
            <el-input-number
              v-model="form.operatorId"
              placeholder="请输入操作工号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作姓名 :"
            prop="operatorName"
          >
            <el-input
              v-model="form.operatorName"
              placeholder="请输入操作姓名 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
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
            v-if="true"
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
            label="规则 guid :"
            prop="ruleId"
          >
            <el-input
              v-model="updateForm.ruleId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则名称 :"
            prop="ruleName"
          >
            <el-input
              v-model="updateForm.ruleName"
              placeholder="请输入规则名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则编号 :"
            prop="ruleCode"
          >
            <el-input
              v-model="updateForm.ruleCode"
              placeholder="请输入规则编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则类型 1 人员规则 :"
            prop="ruleType"
          >
            <el-select
              v-model="updateForm.ruleType"
              placeholder="请选择"
            >
              <el-option
                key="深圳"
                label="选项1"
                value="深圳"
              />
              <el-option
                key="上海"
                label="选项2"
                value="上海"
              />
            </el-select>
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
            label="角色组编号 :"
            prop="roleGroupId"
          >
            <el-input
              v-model="updateForm.roleGroupId"
              placeholder="请输入角色组编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色编号 :"
            prop="roleId"
          >
            <el-input
              v-model="updateForm.roleId"
              placeholder="请输入角色编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="用户编号 :"
            prop="userId"
          >
            <el-input
              v-model="updateForm.userId"
              placeholder="请输入用户编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则表达式 :"
            prop="ruleExpression"
          >
            <el-input
              v-model="updateForm.ruleExpression"
              placeholder="请输入规则表达式 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="规则动作 :"
            prop="ruleAction"
          >
            <el-input
              v-model="updateForm.ruleAction"
              placeholder="请输入规则动作 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="人员工号 :"
            prop="ruleUsers"
          >
            <el-input
              v-model="updateForm.ruleUsers"
              placeholder="请输入人员工号 "
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
            v-if="true"
            label="操作工号 :"
            prop="operatorId"
          >
            <el-input
              v-model="updateForm.operatorId"
              placeholder="请输入操作工号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作姓名 :"
            prop="operatorName"
          >
            <el-input
              v-model="updateForm.operatorName"
              placeholder="请输入操作姓名 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
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
            v-if="true"
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
  getProcessRuleListPage,
  saveProcessRule,
  updateProcessRule,
  deleteById,
  download
} from '@/api/process/processRule'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

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
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: ['operatorId', 'createTime'],
      // 列信息
      columns: [
        { key: 0, value: 'ruleId', label: '规则 guid ', visible: true },
        { key: 1, value: 'ruleName', label: '规则名称 ', visible: true },
        { key: 2, value: 'ruleCode', label: '规则编号 ', visible: true },
        {
          key: 3,
          value: 'ruleType',
          label: '规则类型 1 人员规则 ',
          visible: true
        },
        { key: 4, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 5, value: 'processId', label: '流程编号 ', visible: true },
        { key: 6, value: 'roleGroupId', label: '角色组编号 ', visible: true },
        { key: 7, value: 'roleId', label: '角色编号 ', visible: true },
        { key: 8, value: 'userId', label: '用户编号 ', visible: true },
        {
          key: 9,
          value: 'ruleExpression',
          label: '规则表达式 ',
          visible: true
        },
        { key: 10, value: 'ruleAction', label: '规则动作 ', visible: true },
        { key: 11, value: 'ruleUsers', label: '人员工号 ', visible: true },
        { key: 12, value: 'remarks', label: '备注 ', visible: true },
        { key: 13, value: 'validState', label: '状态 ', visible: true },
        { key: 14, value: 'operatorId', label: '操作工号 ', visible: true },
        { key: 15, value: 'operatorName', label: '操作姓名 ', visible: true },
        { key: 16, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 17, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        ruleName: undefined,
        ruleType: undefined,
        processId: undefined
      },
      input: '',
      form: {
        ruleId: undefined, // 规则 guid
        ruleName: undefined, // 规则名称
        ruleCode: undefined, // 规则编号
        ruleType: undefined, // 规则类型 1 人员规则
        tenantId: undefined, // 租户编号
        processId: undefined, // 流程编号
        roleGroupId: undefined, // 角色组编号
        roleId: undefined, // 角色编号
        userId: undefined, // 用户编号
        ruleExpression: undefined, // 规则表达式
        ruleAction: undefined, // 规则动作
        ruleUsers: undefined, // 人员工号
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作工号
        operatorName: undefined, // 操作姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        ruleId: undefined, // 规则 guid
        ruleName: undefined, // 规则名称
        ruleCode: undefined, // 规则编号
        ruleType: undefined, // 规则类型 1 人员规则
        tenantId: undefined, // 租户编号
        processId: undefined, // 流程编号
        roleGroupId: undefined, // 角色组编号
        roleId: undefined, // 角色编号
        userId: undefined, // 用户编号
        ruleExpression: undefined, // 规则表达式
        ruleAction: undefined, // 规则动作
        ruleUsers: undefined, // 人员工号
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作工号
        operatorName: undefined, // 操作姓名
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
        ruleId: [],
        ruleName: [],
        ruleCode: [],
        ruleType: [],
        tenantId: [],
        processId: [],
        roleGroupId: [],
        roleId: [],
        userId: [],
        ruleExpression: [],
        ruleAction: [],
        ruleUsers: [],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        ruleId: [],
        ruleName: [],
        ruleCode: [],
        ruleType: [],
        tenantId: [],
        processId: [],
        roleGroupId: [],
        roleId: [],
        userId: [],
        ruleExpression: [],
        ruleAction: [],
        ruleUsers: [],
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
    getList() {
      this.listLoading = true
      getProcessRuleListPage(this.listQuery)
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
          const id = row.ruleId
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
              saveProcessRule(_this.form)
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
              updateProcessRule(_this.updateForm)
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
        ruleId: undefined, // 规则 guid
        ruleName: undefined, // 规则名称
        ruleCode: undefined, // 规则编号
        ruleType: undefined, // 规则类型 1 人员规则
        tenantId: undefined, // 租户编号
        processId: undefined, // 流程编号
        roleGroupId: undefined, // 角色组编号
        roleId: undefined, // 角色编号
        userId: undefined, // 用户编号
        ruleExpression: undefined, // 规则表达式
        ruleAction: undefined, // 规则动作
        ruleUsers: undefined, // 人员工号
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作工号
        operatorName: undefined, // 操作姓名
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

<style  rel="stylesheet/scss" lang="scss" scoped>
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
