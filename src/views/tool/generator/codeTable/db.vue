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
          <el-form-item label="数据源名称">
            <el-input
              v-model="listQuery.dbName"
              placeholder="请输入数据源名称 "
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
            label="数据源编号 "
            prop="dbId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="数据源名称 "
            prop="dbName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="url "
            prop="dbUrl"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="用户名 "
            prop="dbUsername"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="密码 "
            prop="dbPassword"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="数据源类型 "
            prop="dbType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="登记目录 "
            prop="dbCatalog"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="数据源库名 "
            prop="dbSchemaName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="驱动名称 "
            prop="dbDriverName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="租户编号 "
            prop="tenantId"
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
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[15].visible"
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
            label="数据源编号 :"
            prop="dbId"
          >
            <el-input
              v-model="form.dbId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="数据源名称 :"
            prop="dbName"
          >
            <el-input
              v-model="form.dbName"
              placeholder="请输入数据源名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="url :"
            prop="dbUrl"
          >
            <el-input
              v-model="form.dbUrl"
              placeholder="jdbc:mysql://ip:port/dbName"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="用户名 :"
            prop="dbUsername"
          >
            <el-input
              v-model="form.dbUsername"
              placeholder="请输入用户名 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="密码 :"
            prop="dbPassword"
          >
            <el-input
              v-model="form.dbPassword"
              show-password
              placeholder="请输入密码 "
            />
          </el-form-item>

          <el-row>
            <el-col :span="10">
              <el-form-item
                v-if="true"
                label="数据源类型 :"
                prop="dbType"
              >
                <el-select
                  v-model="form.dbType"
                  placeholder="请输入数据源类型"
                >
                  <el-option
                    v-for="mode in dbTypeList"
                    :key="mode.value"
                    :label="mode.label"
                    :value="mode.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item v-if="true">
                <span style="color:red"> 目前只有MYSQL驱动，其他需新增驱动！</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            v-if="true"
            label="驱动名称 :"
            prop="dbDriverName"
          >
            <el-input
              v-model="form.dbDriverName"
              placeholder="请输入驱动名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="登记目录 :"
            prop="dbCatalog"
          >
            <el-input
              v-model="form.dbCatalog"
              placeholder="请输入登记目录 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="数据源库名 :"
            prop="dbSchemaName"
          >
            <el-input
              v-model="form.dbSchemaName"
              placeholder="请输入数据源库名 "
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
            <el-input
              v-model="form.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态:"
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
            @click="testConn"
          >测试连接</el-button>
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
            label="数据源编号 :"
            prop="dbId"
          >
            <el-input
              v-model="updateForm.dbId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="数据源名称 :"
            prop="dbName"
          >
            <el-input
              v-model="updateForm.dbName"
              placeholder="请输入数据源名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="url :"
            prop="dbUrl"
          >
            <el-input
              v-model="updateForm.dbUrl"
              placeholder="请输入url "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="用户名 :"
            prop="dbUsername"
          >
            <el-input
              v-model="updateForm.dbUsername"
              placeholder="请输入用户名 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="密码 :"
            prop="dbPassword"
          >
            <el-input
              v-model="updateForm.dbPassword"
              show-password
              placeholder="请输入密码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="数据源类型 :"
            prop="dbType"
          >
            <el-select
              v-model="updateForm.dbType"
              placeholder="请输入数据源类型"
            >
              <el-option
                v-for="mode in dbTypeList"
                :key="mode.value"
                :label="mode.label"
                :value="mode.value"
              />
            </el-select>

          </el-form-item>
          <el-form-item
            v-if="true"
            label="驱动名称 :"
            prop="dbDriverName"
          >
            <el-input
              v-model="updateForm.dbDriverName"
              placeholder="请输入驱动名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="登记目录 :"
            prop="dbCatalog"
          >
            <el-input
              v-model="updateForm.dbCatalog"
              placeholder="请输入登记目录 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="数据源库名 :"
            prop="dbSchemaName"
          >
            <el-input
              v-model="updateForm.dbSchemaName"
              placeholder="请输入数据源库名 "
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
            label="状态:"
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
            @click="testConn"
          >测试连接</el-button>
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
  getDbConfigListPage,
  saveDbConfig,
  updateDbConfig,
  deleteById,
  download
} from '@/api/generator/dbConfig'
import { testConn } from '@/api/generator/codeTable'
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
      dbTypeList: [
        { label: 'MySql数据库', value: 'mysql' },
        { label: 'MariaDB数据库', value: 'mariadb' },
        { label: 'Oracle数据库', value: 'oracle' },
        { label: 'DB2数据库', value: 'db2' },
        { label: 'H2数据库', value: 'h2' },
        { label: 'HSQL数据库', value: 'hsql' },
        { label: 'SQLite数据库', value: 'sqlite' },
        { label: 'Postgre数据库', value: 'postgresql' },
        { label: 'SQLServer2005数据库', value: 'sqlserver2005' },
        { label: 'SQLServer数据库', value: 'sqlserver' },
        { label: '达梦数据库', value: 'dm' }
      ],
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: [],
      // 列信息
      columns: [
        { key: 0, value: 'dbId', label: '数据源编号', visible: true },
        { key: 1, value: 'dbName', label: '数据源名称', visible: true },
        { key: 2, value: 'dbUrl', label: 'url', visible: true },
        { key: 3, value: 'dbUsername', label: '用户名', visible: true },
        { key: 4, value: 'dbPassword', label: '密码', visible: true },
        { key: 5, value: 'dbType', label: '数据源类型', visible: true },
        { key: 6, value: 'dbCatalog', label: '登记目录', visible: true },
        { key: 7, value: 'dbSchemaName', label: '数据源库名', visible: true },
        { key: 8, value: 'dbDriverName', label: '驱动名称', visible: true },
        { key: 9, value: 'tenantId', label: '租户编号', visible: true },
        { key: 10, value: 'remarks', label: '备注', visible: true },
        {
          key: 11,
          value: 'validState',
          label: '状态 1 有效 0 失效',
          visible: true
        },
        { key: 12, value: 'operatorId', label: '操作人工号', visible: true },
        { key: 13, value: 'operatorName', label: '操作人姓名', visible: true },
        { key: 14, value: 'createTime', label: '创建时间', visible: true },
        { key: 15, value: 'updateTime', label: '更新时间', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        dbName: undefined
      },
      input: '',
      form: {
        dbId: undefined, // 数据源编号
        dbName: undefined, // 数据源名称
        dbUrl: undefined, // url
        dbUsername: undefined, // 用户名
        dbPassword: undefined, // 密码
        dbType: 'mysql', // 数据源类型
        dbCatalog: undefined, // 登记目录
        dbSchemaName: undefined, // 数据源库名
        dbDriverName: 'com.mysql.cj.jdbc.Driver', // 驱动名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态 1 有效 0 失效
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        dbId: undefined, // 数据源编号
        dbName: undefined, // 数据源名称
        dbUrl: undefined, // url
        dbUsername: undefined, // 用户名
        dbPassword: undefined, // 密码
        dbType: undefined, // 数据源类型
        dbCatalog: undefined, // 登记目录
        dbSchemaName: undefined, // 数据源库名
        dbDriverName: undefined, // 驱动名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态 1 有效 0 失效
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
        dbId: [],
        dbName: [
          { required: true, message: '请输入数据源名称', trigger: 'blur' }
        ],
        dbUrl: [{ required: true, message: '请输入url', trigger: 'blur' }],
        dbUsername: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        dbPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        dbType: [
          { required: true, message: '请输入数据源类型', trigger: 'blur' }
        ],
        dbCatalog: [],
        dbSchemaName: [],
        dbDriverName: [
          { required: true, message: '请输入驱动名称', trigger: 'blur' }
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
        dbId: [],
        dbName: [
          { required: true, message: '请输入数据源名称', trigger: 'blur' }
        ],
        dbUrl: [{ required: true, message: '请输入url', trigger: 'blur' }],
        dbUsername: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        dbPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        dbType: [
          { required: true, message: '请输入数据源类型', trigger: 'blur' }
        ],
        dbCatalog: [],
        dbSchemaName: [],
        dbDriverName: [
          { required: true, message: '请输入驱动名称', trigger: 'blur' }
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
    testConn() {
      const _this = this
      let param = {}
      if (_this.dialogStatus === 'create') {
        param = {
          dbUrl: _this.form.dbUrl, // url
          dbUsername: _this.form.dbUsername, // 用户名
          dbPassword: _this.form.dbPassword, // 密码
          dbDriverName: _this.form.dbDriverName // 驱动名称
        }
      } else {
        param = {
          dbUrl: _this.updateForm.dbUrl, // url
          dbUsername: _this.updateForm.dbUsername, // 用户名
          dbPassword: _this.updateForm.dbPassword, // 密码
          dbDriverName: _this.updateForm.dbDriverName // 驱动名称
        }
      }
      testConn(param)
        .then((response) => {
          if (response.code === 200) {
            _this.$message.success('连接成功！')
          } else {
            _this.$message.error(response.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getList() {
      this.listLoading = true
      getDbConfigListPage(this.listQuery)
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
          const id = row.dbId
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
              saveDbConfig(_this.form)
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
              updateDbConfig(_this.updateForm)
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
        dbId: undefined, // 数据源编号
        dbName: undefined, // 数据源名称
        dbUrl: undefined, // url
        dbUsername: undefined, // 用户名
        dbPassword: undefined, // 密码
        dbType: 'mysql', // 数据源类型
        dbCatalog: undefined, // 登记目录
        dbSchemaName: undefined, // 数据源库名
        dbDriverName: 'com.mysql.cj.jdbc.Driver', // 驱动名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态 1 有效 0 失效
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
