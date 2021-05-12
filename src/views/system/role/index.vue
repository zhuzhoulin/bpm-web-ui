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
          <el-form-item label="角色编码 ">
            <el-input
              v-model="listQuery.roleCode"
              placeholder="请输入角色编码 "
            />
          </el-form-item>
          <el-form-item label="角色名称 ">
            <el-input
              v-model="listQuery.roleName"
              placeholder="请输入角色名称 "
            />
          </el-form-item>
          <el-form-item label="角色简称 ">
            <el-input
              v-model="listQuery.roleAbbr"
              placeholder="请输入角色简称 "
            />
          </el-form-item>
          <el-form-item label="归属公司编号 ">
            <el-input
              v-model="listQuery.companyId"
              placeholder="请输入归属公司编号 "
            />
          </el-form-item>
          <el-form-item label="归属部门编号 ">
            <el-input
              v-model="listQuery.deptId"
              placeholder="请输入归属部门编号 "
            />
          </el-form-item>
          <el-form-item label="状态  ">
            <el-switch
              v-model="listQuery.validState"
              :active-value="1"
              :inactive-value="0"
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
            label="角色编号 "
            prop="roleId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="角色编码 "
            prop="roleCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="角色名称 "
            prop="roleName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="角色级别 "
            prop="roleLevel"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="角色简称 "
            prop="roleAbbr"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="角色别名 "
            prop="roleAliasName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="归属公司编号 "
            prop="companyId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="归属部门编号 "
            prop="deptId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="备注 "
            prop="remarks"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
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
            v-if="columns[11].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[12].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[13].visible"
            label="更新时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[14].visible"
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
            label="角色编号 :"
            prop="roleId"
          >
            <el-input
              v-model="form.roleId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色编码 :"
            prop="roleCode"
          >
            <el-input
              v-model="form.roleCode"
              placeholder="请输入角色编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色名称 :"
            prop="roleName"
          >
            <el-input
              v-model="form.roleName"
              placeholder="请输入角色名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色级别 :"
            prop="roleLevel"
          >
            <el-input
              v-model="form.roleLevel"
              placeholder="请输入角色级别 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色简称 :"
            prop="roleAbbr"
          >
            <el-input
              v-model="form.roleAbbr"
              placeholder="请输入角色简称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色别名 :"
            prop="roleAliasName"
          >
            <el-input
              v-model="form.roleAliasName"
              placeholder="请输入角色别名 "
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
            label="归属公司编号 :"
            prop="companyId"
          >
            <el-input
              v-model="form.companyId"
              placeholder="请输入归属公司编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="归属部门编号 :"
            prop="deptId"
          >
            <el-input
              v-model="form.deptId"
              placeholder="请输入归属部门编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <el-input
              v-model="form.remarks"
              type="textarea"
              autosize
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态  :"
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
            label="角色编号 :"
            prop="roleId"
          >
            <el-input
              v-model="updateForm.roleId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色编码 :"
            prop="roleCode"
          >
            <el-input
              v-model="updateForm.roleCode"
              placeholder="请输入角色编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色名称 :"
            prop="roleName"
          >
            <el-input
              v-model="updateForm.roleName"
              placeholder="请输入角色名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色级别 :"
            prop="roleLevel"
          >
            <el-input
              v-model="updateForm.roleLevel"
              placeholder="请输入角色级别 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色简称 :"
            prop="roleAbbr"
          >
            <el-input
              v-model="updateForm.roleAbbr"
              placeholder="请输入角色简称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色别名 :"
            prop="roleAliasName"
          >
            <el-input
              v-model="updateForm.roleAliasName"
              placeholder="请输入角色别名 "
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
            label="归属公司编号 :"
            prop="companyId"
          >
            <el-input
              v-model="updateForm.companyId"
              placeholder="请输入归属公司编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="归属部门编号 :"
            prop="deptId"
          >
            <el-input
              v-model="updateForm.deptId"
              placeholder="请输入归属部门编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <el-input
              v-model="updateForm.remarks"
              type="textarea"
              autosize
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态  :"
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
  getRoleListPage,
  saveRole,
  updateRole,
  deleteById,
  download
} from '@/api/system/role'
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
      defaultHideColumns: [
        'operatorId',
        'createTime',
        'operatorId',
        'createTime'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'roleId', label: '角色编号 ', visible: true },
        { key: 1, value: 'roleCode', label: '角色编码 ', visible: true },
        { key: 2, value: 'roleName', label: '角色名称 ', visible: true },
        { key: 3, value: 'roleLevel', label: '角色级别 ', visible: true },
        { key: 4, value: 'roleAbbr', label: '角色简称 ', visible: true },
        { key: 5, value: 'roleAliasName', label: '角色别名 ', visible: true },
        { key: 6, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 7, value: 'companyId', label: '归属公司编号 ', visible: true },
        { key: 8, value: 'deptId', label: '归属部门编号 ', visible: true },
        { key: 9, value: 'remarks', label: '备注 ', visible: true },
        { key: 10, value: 'validState', label: '状态  ', visible: true },
        { key: 11, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 12, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 13, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 14, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        roleCode: undefined,
        roleName: undefined,
        roleAbbr: undefined,
        companyId: undefined,
        deptId: undefined,
        roleGroupCode: undefined,
        roleGroupName: undefined,
        businessLine: undefined,
        validState: undefined
      },
      input: '',
      form: {
        roleId: undefined, // 角色编号
        roleCode: undefined, // 角色编码
        roleName: undefined, // 角色名称
        roleLevel: undefined, // 角色级别
        roleAbbr: undefined, // 角色简称
        roleAliasName: undefined, // 角色别名
        tenantId: undefined, // 租户编号
        companyId: undefined, // 归属公司编号
        deptId: undefined, // 归属部门编号
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        roleId: undefined, // 角色编号
        roleCode: undefined, // 角色编码
        roleName: undefined, // 角色名称
        roleLevel: undefined, // 角色级别
        roleAbbr: undefined, // 角色简称
        roleAliasName: undefined, // 角色别名
        tenantId: undefined, // 租户编号
        companyId: undefined, // 归属公司编号
        deptId: undefined, // 归属部门编号
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
        roleId: [],
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleLevel: [],
        roleAbbr: [
          { required: true, message: '请输入角色简称', trigger: 'blur' }
        ],
        roleAliasName: [],
        tenantId: [],
        companyId: [
          { required: true, message: '请输入归属公司编号', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请输入归属部门编号', trigger: 'blur' }
        ],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        roleId: [],
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleLevel: [],
        roleAbbr: [
          { required: true, message: '请输入角色简称', trigger: 'blur' }
        ],
        roleAliasName: [],
        tenantId: [],
        companyId: [
          { required: true, message: '请输入归属公司编号', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请输入归属部门编号', trigger: 'blur' }
        ],
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
      getRoleListPage(this.listQuery)
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
    handleDelete(row) {
      const _this = this
      _this
        .$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(function() {
          const id = row.roleId
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
              saveRole(_this.form)
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
              updateRole(_this.updateForm)
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
        roleId: undefined, // 角色编号
        roleCode: undefined, // 角色编码
        roleName: undefined, // 角色名称
        roleLevel: undefined, // 角色级别
        roleAbbr: undefined, // 角色简称
        roleAliasName: undefined, // 角色别名
        tenantId: undefined, // 租户编号
        companyId: undefined, // 归属公司编号
        deptId: undefined, // 归属部门编号
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
