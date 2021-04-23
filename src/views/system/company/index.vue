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
          <el-form-item label="公司编号 ">
            <el-input
              v-model="listQuery.companyId"
              placeholder="请输入公司编号 "
            />
          </el-form-item>
          <el-form-item label="公司编码 ">
            <el-input
              v-model="listQuery.companyCode"
              placeholder="请输入公司编码 "
            />
          </el-form-item>
          <el-form-item label="上级公司编号 ">
            <el-input
              v-model="listQuery.companyParentId"
              placeholder="请输入上级公司编号 "
            />
          </el-form-item>
          <el-form-item label="公司名称 ">
            <el-input
              v-model="listQuery.companyName"
              placeholder="请输入公司名称 "
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
            label="公司编号 "
            prop="companyId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="公司编码 "
            prop="companyCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="上级公司编号 "
            prop="companyParentId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="上级公司编码 "
            prop="companyParentCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="公司名称 "
            prop="companyName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="公司简称 "
            prop="companyAbbr"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="公司层级 "
            prop="companyLevel"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="排序 "
            prop="companyOrder"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="公司展示图标 "
            prop="companyIcon"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="公司展示url "
            prop="companyUrl"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
            label="经营状态 "
            prop="companyStatus"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[12].visible"
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
            v-if="columns[13].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[14].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[15].visible"
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[16].visible"
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
            label="公司编号 :"
            prop="companyId"
          >
            <el-input
              v-model="form.companyId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司编码 :"
            prop="companyCode"
          >
            <el-input
              v-model="form.companyCode"
              placeholder="请输入公司编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="上级公司编号 :"
            prop="companyParentId"
          >
            <el-input
              v-model="form.companyParentId"
              placeholder="请输入上级公司编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="上级公司编码 :"
            prop="companyParentCode"
          >
            <el-input
              v-model="form.companyParentCode"
              placeholder="请输入上级公司编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司名称 :"
            prop="companyName"
          >
            <el-input
              v-model="form.companyName"
              placeholder="请输入公司名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司简称 :"
            prop="companyAbbr"
          >
            <el-input
              v-model="form.companyAbbr"
              placeholder="请输入公司简称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司层级 :"
            prop="companyLevel"
          >
            <el-input
              v-model="form.companyLevel"
              placeholder="请输入公司层级 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="排序 :"
            prop="companyOrder"
          >
            <el-input
              v-model="form.companyOrder"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司展示图标 :"
            prop="companyIcon"
          >
            <el-input
              v-model="form.companyIcon"
              placeholder="请输入公司展示图标 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司展示url :"
            prop="companyUrl"
          >
            <el-input
              v-model="form.companyUrl"
              placeholder="请输入公司展示url "
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
            label="经营状态 :"
            prop="companyStatus"
          >
            <el-input
              v-model="form.companyStatus"
              placeholder="请输入经营状态 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="有效状态；0表示无效，1表示有效 :"
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
            label="公司编号 :"
            prop="companyId"
          >
            <el-input
              v-model="updateForm.companyId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司编码 :"
            prop="companyCode"
          >
            <el-input
              v-model="updateForm.companyCode"
              placeholder="请输入公司编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="上级公司编号 :"
            prop="companyParentId"
          >
            <el-input
              v-model="updateForm.companyParentId"
              placeholder="请输入上级公司编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="上级公司编码 :"
            prop="companyParentCode"
          >
            <el-input
              v-model="updateForm.companyParentCode"
              placeholder="请输入上级公司编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司名称 :"
            prop="companyName"
          >
            <el-input
              v-model="updateForm.companyName"
              placeholder="请输入公司名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司简称 :"
            prop="companyAbbr"
          >
            <el-input
              v-model="updateForm.companyAbbr"
              placeholder="请输入公司简称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司层级 :"
            prop="companyLevel"
          >
            <el-input
              v-model="updateForm.companyLevel"
              placeholder="请输入公司层级 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="排序 :"
            prop="companyOrder"
          >
            <el-input
              v-model="updateForm.companyOrder"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司展示图标 :"
            prop="companyIcon"
          >
            <el-input
              v-model="updateForm.companyIcon"
              placeholder="请输入公司展示图标 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="公司展示url :"
            prop="companyUrl"
          >
            <el-input
              v-model="updateForm.companyUrl"
              placeholder="请输入公司展示url "
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
            label="经营状态 :"
            prop="companyStatus"
          >
            <el-input
              v-model="updateForm.companyStatus"
              placeholder="请输入经营状态 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="有效状态；0表示无效，1表示有效 :"
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
  getCompanyListPage,
  saveCompany,
  updateCompany,
  deleteById,
  download
} from '@/api/system/company'
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
      defaultHideColumns: [],
      // 列信息
      columns: [
        { key: 0, value: 'companyId', label: '公司编号 ', visible: true },
        { key: 1, value: 'companyCode', label: '公司编码 ', visible: true },
        {
          key: 2,
          value: 'companyParentId',
          label: '上级公司编号 ',
          visible: true
        },
        {
          key: 3,
          value: 'companyParentCode',
          label: '上级公司编码 ',
          visible: true
        },
        { key: 4, value: 'companyName', label: '公司名称 ', visible: true },
        { key: 5, value: 'companyAbbr', label: '公司简称 ', visible: true },
        { key: 6, value: 'companyLevel', label: '公司层级 ', visible: true },
        { key: 7, value: 'companyOrder', label: '排序 ', visible: true },
        { key: 8, value: 'companyIcon', label: '公司展示图标 ', visible: true },
        { key: 9, value: 'companyUrl', label: '公司展示url ', visible: true },
        { key: 10, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 11, value: 'companyStatus', label: '经营状态 ', visible: true },
        {
          key: 12,
          value: 'validState',
          label: '有效状态；0表示无效，1表示有效 ',
          visible: true
        },
        { key: 13, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 14, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 15, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 16, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        companyId: undefined,
        companyCode: undefined,
        companyParentId: undefined,
        companyName: undefined
      },
      input: '',
      form: {
        companyId: undefined, // 公司编码
        companyCode: undefined, // 公司编码
        companyParentId: undefined, // 上级公司编号
        companyParentCode: undefined, // 上级公司编码
        companyName: undefined, // 公司名称
        companyAbbr: undefined, // 公司简称
        companyLevel: undefined, // 公司层级
        companyOrder: undefined, // 排序
        companyIcon: undefined, // 公司展示图标
        companyUrl: undefined, // 公司展示url
        tenantId: undefined, // 租户编号
        companyStatus: undefined, // 经营状态
        validState: 1, // 有效状态；0表示无效，1表示有效
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        companyId: undefined, // 公司编码
        companyCode: undefined, // 公司编码
        companyParentId: undefined, // 上级公司编号
        companyParentCode: undefined, // 上级公司编码
        companyName: undefined, // 公司名称
        companyAbbr: undefined, // 公司简称
        companyLevel: undefined, // 公司层级
        companyOrder: undefined, // 排序
        companyIcon: undefined, // 公司展示图标
        companyUrl: undefined, // 公司展示url
        tenantId: undefined, // 租户编号
        companyStatus: undefined, // 经营状态
        validState: 1, // 有效状态；0表示无效，1表示有效
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
        companyId: [],
        companyCode: [
          { required: true, message: '请输入公司编码', trigger: 'blur' }
        ],
        companyParentId: [],
        companyParentCode: [],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companyAbbr: [
          { required: true, message: '请输入公司简称', trigger: 'blur' }
        ],
        companyLevel: [],
        companyOrder: [],
        companyIcon: [],
        companyUrl: [],
        tenantId: [],
        companyStatus: [
          { required: true, message: '请输入经营状态', trigger: 'blur' }
        ],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        companyId: [],
        companyCode: [
          { required: true, message: '请输入公司编码', trigger: 'blur' }
        ],
        companyParentId: [],
        companyParentCode: [],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        companyAbbr: [
          { required: true, message: '请输入公司简称', trigger: 'blur' }
        ],
        companyLevel: [],
        companyOrder: [],
        companyIcon: [],
        companyUrl: [],
        tenantId: [],
        companyStatus: [
          { required: true, message: '请输入经营状态', trigger: 'blur' }
        ],
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
      getCompanyListPage(this.listQuery)
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
          const id = row.companyId
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
              saveCompany(_this.form)
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
              updateCompany(_this.updateForm)
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
        companyId: undefined, // 公司编码
        companyCode: undefined, // 公司编码
        companyParentId: undefined, // 上级公司编号
        companyParentCode: undefined, // 上级公司编码
        companyName: undefined, // 公司名称
        companyAbbr: undefined, // 公司简称
        companyLevel: undefined, // 公司层级
        companyOrder: undefined, // 排序
        companyIcon: undefined, // 公司展示图标
        companyUrl: undefined, // 公司展示url
        tenantId: undefined, // 租户编号
        companyStatus: undefined, // 经营状态
        validState: 1, // 有效状态；0表示无效，1表示有效
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
