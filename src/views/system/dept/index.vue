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
          <el-form-item label="部门编号 ">
            <el-input
              v-model="listQuery.deptId"
              placeholder="请输入部门编号 "
            />
          </el-form-item>
          <el-form-item label="部门编码 ">
            <el-input
              v-model="listQuery.deptCode"
              placeholder="请输入部门编码 "
            />
          </el-form-item>
          <el-form-item label="部门名称 ">
            <el-input
              v-model="listQuery.deptName"
              placeholder="请输入部门名称 "
            />
          </el-form-item>
          <el-form-item label="所属公司编码 ">
            <el-input
              v-model="listQuery.companyId"
              placeholder="请输入所属公司编码 "
            />
          </el-form-item>
          <el-form-item label="归属业务条线 ">
            <el-input
              v-model="listQuery.businessLine"
              placeholder="请输入归属业务条线 "
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
            label="部门编号 "
            prop="deptId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="部门编码 "
            prop="deptCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="部门名称 "
            prop="deptName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="所属公司编码 "
            prop="companyId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="所属公司编码 "
            prop="companyCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="归属业务条线 "
            prop="businessLine"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="所属租户 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="上级部门编号 "
            prop="deptParentId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="上级部门编码 "
            prop="deptParentCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="部门层级 "
            prop="deptLevel"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="部门类型 "
            prop="deptType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
            label="部门类型编码 "
            prop="deptTypeCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[12].visible"
            label="备注 "
            prop="remark"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[13].visible"
            label="排序 "
            prop="deptOrder"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[14].visible"
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
            v-if="columns[15].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[16].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[17].visible"
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[18].visible"
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
            label="部门编号 :"
            prop="deptId"
          >
            <el-input
              v-model="form.deptId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门编码 :"
            prop="deptCode"
          >
            <el-input
              v-model="form.deptCode"
              placeholder="请输入部门编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门名称 :"
            prop="deptName"
          >
            <el-input
              v-model="form.deptName"
              placeholder="请输入部门名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属公司编码 :"
            prop="companyId"
          >
            <el-input
              v-model="form.companyId"
              placeholder="请输入所属公司编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属公司编码 :"
            prop="companyCode"
          >
            <el-input
              v-model="form.companyCode"
              placeholder="请输入所属公司编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="归属业务条线 :"
            prop="businessLine"
          >
            <el-input
              v-model="form.businessLine"
              placeholder="请输入归属业务条线 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属租户 :"
            prop="tenantId"
          >
            <el-input
              v-model="form.tenantId"
              placeholder="请输入所属租户 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="上级部门编号 :"
            prop="deptParentId"
          >
            <el-input
              v-model="form.deptParentId"
              placeholder="请输入上级部门编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="上级部门编码 :"
            prop="deptParentCode"
          >
            <el-input
              v-model="form.deptParentCode"
              placeholder="请输入上级部门编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门层级 :"
            prop="deptLevel"
          >
            <el-input
              v-model="form.deptLevel"
              placeholder="请输入部门层级 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门类型 :"
            prop="deptType"
          >
            <el-input
              v-model="form.deptType"
              placeholder="请输入部门类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门类型编码 :"
            prop="deptTypeCode"
          >
            <el-input
              v-model="form.deptTypeCode"
              placeholder="请输入部门类型编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remark"
          >
            <el-input
              v-model="form.remark"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="排序 :"
            prop="deptOrder"
          >
            <el-input
              v-model="form.deptOrder"
              placeholder="请输入排序 "
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
            label="部门编号 :"
            prop="deptId"
          >
            <el-input
              v-model="updateForm.deptId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门编码 :"
            prop="deptCode"
          >
            <el-input
              v-model="updateForm.deptCode"
              placeholder="请输入部门编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门名称 :"
            prop="deptName"
          >
            <el-input
              v-model="updateForm.deptName"
              placeholder="请输入部门名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属公司编码 :"
            prop="companyId"
          >
            <el-input
              v-model="updateForm.companyId"
              placeholder="请输入所属公司编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属公司编码 :"
            prop="companyCode"
          >
            <el-input
              v-model="updateForm.companyCode"
              placeholder="请输入所属公司编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="归属业务条线 :"
            prop="businessLine"
          >
            <el-input
              v-model="updateForm.businessLine"
              placeholder="请输入归属业务条线 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属租户 :"
            prop="tenantId"
          >
            <el-input
              v-model="updateForm.tenantId"
              placeholder="请输入所属租户 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="上级部门编号 :"
            prop="deptParentId"
          >
            <el-input
              v-model="updateForm.deptParentId"
              placeholder="请输入上级部门编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="上级部门编码 :"
            prop="deptParentCode"
          >
            <el-input
              v-model="updateForm.deptParentCode"
              placeholder="请输入上级部门编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门层级 :"
            prop="deptLevel"
          >
            <el-input
              v-model="updateForm.deptLevel"
              placeholder="请输入部门层级 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门类型 :"
            prop="deptType"
          >
            <el-input
              v-model="updateForm.deptType"
              placeholder="请输入部门类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="部门类型编码 :"
            prop="deptTypeCode"
          >
            <el-input
              v-model="updateForm.deptTypeCode"
              placeholder="请输入部门类型编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remark"
          >
            <el-input
              v-model="updateForm.remark"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="排序 :"
            prop="deptOrder"
          >
            <el-input
              v-model="updateForm.deptOrder"
              placeholder="请输入排序 "
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
  getDeptListPage,
  saveDept,
  updateDept,
  deleteById,
  download
} from '@/api/system/dept'
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
        { key: 0, value: 'deptId', label: '部门编号 ', visible: true },
        { key: 1, value: 'deptCode', label: '部门编码 ', visible: true },
        { key: 2, value: 'deptName', label: '部门名称 ', visible: true },
        { key: 3, value: 'companyId', label: '所属公司编码 ', visible: true },
        { key: 4, value: 'companyCode', label: '所属公司编码 ', visible: true },
        {
          key: 5,
          value: 'businessLine',
          label: '归属业务条线 ',
          visible: true
        },
        { key: 6, value: 'tenantId', label: '所属租户 ', visible: true },
        {
          key: 7,
          value: 'deptParentId',
          label: '上级部门编号 ',
          visible: true
        },
        {
          key: 8,
          value: 'deptParentCode',
          label: '上级部门编码 ',
          visible: true
        },
        { key: 9, value: 'deptLevel', label: '部门层级 ', visible: true },
        { key: 10, value: 'deptType', label: '部门类型 ', visible: true },
        {
          key: 11,
          value: 'deptTypeCode',
          label: '部门类型编码 ',
          visible: true
        },
        { key: 12, value: 'remark', label: '备注 ', visible: true },
        { key: 13, value: 'deptOrder', label: '排序 ', visible: true },
        { key: 14, value: 'validState', label: '状态 ', visible: true },
        { key: 15, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 16, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 17, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 18, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        deptId: undefined,
        deptCode: undefined,
        deptName: undefined,
        companyId: undefined,
        businessLine: undefined
      },
      input: '',
      form: {
        deptId: undefined, // 部门编号
        deptCode: undefined, // 部门编码
        deptName: undefined, // 部门名称
        companyId: undefined, // 所属公司编码
        companyCode: undefined, // 所属公司编码
        businessLine: undefined, // 归属业务条线
        tenantId: undefined, // 所属租户
        deptParentId: undefined, // 上级部门编号
        deptParentCode: undefined, // 上级部门编码
        deptLevel: undefined, // 部门层级
        deptType: undefined, // 部门类型
        deptTypeCode: undefined, // 部门类型编码
        remark: undefined, // 备注
        deptOrder: undefined, // 排序
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        deptId: undefined, // 部门编号
        deptCode: undefined, // 部门编码
        deptName: undefined, // 部门名称
        companyId: undefined, // 所属公司编码
        companyCode: undefined, // 所属公司编码
        businessLine: undefined, // 归属业务条线
        tenantId: undefined, // 所属租户
        deptParentId: undefined, // 上级部门编号
        deptParentCode: undefined, // 上级部门编码
        deptLevel: undefined, // 部门层级
        deptType: undefined, // 部门类型
        deptTypeCode: undefined, // 部门类型编码
        remark: undefined, // 备注
        deptOrder: undefined, // 排序
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
        deptId: [],
        deptCode: [
          { required: true, message: '请输入部门编码', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请输入所属公司编码', trigger: 'blur' }
        ],
        companyCode: [
          { required: true, message: '请输入所属公司编码', trigger: 'blur' }
        ],
        businessLine: [],
        tenantId: [],
        deptParentId: [],
        deptParentCode: [],
        deptLevel: [],
        deptType: [],
        deptTypeCode: [],
        remark: [],
        deptOrder: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        deptId: [],
        deptCode: [
          { required: true, message: '请输入部门编码', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请输入所属公司编码', trigger: 'blur' }
        ],
        companyCode: [
          { required: true, message: '请输入所属公司编码', trigger: 'blur' }
        ],
        businessLine: [],
        tenantId: [],
        deptParentId: [],
        deptParentCode: [],
        deptLevel: [],
        deptType: [],
        deptTypeCode: [],
        remark: [],
        deptOrder: [],
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
      getDeptListPage(this.listQuery)
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
          const id = row.deptId
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
              saveDept(_this.form)
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
              updateDept(_this.updateForm)
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
        deptId: undefined, // 部门编号
        deptCode: undefined, // 部门编码
        deptName: undefined, // 部门名称
        companyId: undefined, // 所属公司编码
        companyCode: undefined, // 所属公司编码
        businessLine: undefined, // 归属业务条线
        tenantId: undefined, // 所属租户
        deptParentId: undefined, // 上级部门编号
        deptParentCode: undefined, // 上级部门编码
        deptLevel: undefined, // 部门层级
        deptType: undefined, // 部门类型
        deptTypeCode: undefined, // 部门类型编码
        remark: undefined, // 备注
        deptOrder: undefined, // 排序
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
