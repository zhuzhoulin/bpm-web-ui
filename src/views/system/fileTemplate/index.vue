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
          <el-form-item label="租户编号 ">
            <el-input
              v-model="listQuery.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item label="模板文件名称 ">
            <el-input
              v-model="listQuery.fileName"
              placeholder="请输入模板文件名称 "
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
            label="GUID主键 "
            prop="tempalteId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="流程编号 "
            prop="processId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="模板文件名称 "
            prop="fileName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="模板文件名称 "
            prop="fileMd5Name"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="文件后缀 "
            prop="fileExtend"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="文件路径 "
            prop="filePath"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="文件大小 "
            prop="fileSize"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="备注 "
            prop="remarks"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="排序值 "
            prop="sort"
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
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[14].visible"
            label="最后一次更新时间"
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
            label="GUID主键 :"
            prop="tempalteId"
          >
            <el-input
              v-model="form.tempalteId"
              disabled
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
            label="模板文件名称 :"
            prop="fileName"
          >
            <el-input
              v-model="form.fileName"
              placeholder="请输入模板文件名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="模板文件名称 :"
            prop="fileMd5Name"
          >
            <el-input
              v-model="form.fileMd5Name"
              placeholder="请输入模板文件名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件后缀 :"
            prop="fileExtend"
          >
            <el-input
              v-model="form.fileExtend"
              placeholder="请输入文件后缀 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件路径 :"
            prop="filePath"
          >
            <el-input
              v-model="form.filePath"
              placeholder="请输入文件路径 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件大小 :"
            prop="fileSize"
          >
            <el-input
              v-model="form.fileSize"
              placeholder="请输入文件大小 "
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
            label="排序值 :"
            prop="sort"
          >
            <el-input
              v-model="form.sort"
              placeholder="请输入排序值 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态 :"
            prop="validState"
          >
            <el-input
              v-model="form.validState"
              placeholder="请输入状态 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="操作人工号 :"
            prop="operatorId"
          >
            <el-switch
              v-model="form.operatorId"
              :active-value="1"
              :inactive-value="0"
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
            label="最后一次更新时间 :"
            prop="updateTime"
          >
            <el-date-picker
              v-model="form.updateTime"
              type="date"
              placeholder="请输入最后一次更新时间 "
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
            label="GUID主键 :"
            prop="tempalteId"
          >
            <el-input
              v-model="updateForm.tempalteId"
              disabled
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
            label="模板文件名称 :"
            prop="fileName"
          >
            <el-input
              v-model="updateForm.fileName"
              placeholder="请输入模板文件名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="模板文件名称 :"
            prop="fileMd5Name"
          >
            <el-input
              v-model="updateForm.fileMd5Name"
              placeholder="请输入模板文件名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件后缀 :"
            prop="fileExtend"
          >
            <el-input
              v-model="updateForm.fileExtend"
              placeholder="请输入文件后缀 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件路径 :"
            prop="filePath"
          >
            <el-input
              v-model="updateForm.filePath"
              placeholder="请输入文件路径 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件大小 :"
            prop="fileSize"
          >
            <el-input
              v-model="updateForm.fileSize"
              placeholder="请输入文件大小 "
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
            label="排序值 :"
            prop="sort"
          >
            <el-input
              v-model="updateForm.sort"
              placeholder="请输入排序值 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态 :"
            prop="validState"
          >
            <el-input
              v-model="updateForm.validState"
              placeholder="请输入状态 "
            />
          </el-form-item>
          <el-form-item
            v-if="false"
            label="操作人工号 :"
            prop="operatorId"
          >
            <el-switch
              v-model="updateForm.operatorId"
              :active-value="1"
              :inactive-value="0"
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
            label="最后一次更新时间 :"
            prop="updateTime"
          >
            <el-date-picker
              v-model="updateForm.updateTime"
              type="date"
              placeholder="请输入最后一次更新时间 "
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
  getFileTemplateListPage,
  saveFileTemplate,
  updateFileTemplate,
  deleteById,
  download
} from '@/api/system/fileTemplate'
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
        { key: 0, value: 'tempalteId', label: 'GUID主键 ', visible: true },
        { key: 1, value: 'processId', label: '流程编号 ', visible: true },
        { key: 2, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 3, value: 'fileName', label: '模板文件名称 ', visible: true },
        { key: 4, value: 'fileMd5Name', label: '模板文件名称 ', visible: true },
        { key: 5, value: 'fileExtend', label: '文件后缀 ', visible: true },
        { key: 6, value: 'filePath', label: '文件路径 ', visible: true },
        { key: 7, value: 'fileSize', label: '文件大小 ', visible: true },
        { key: 8, value: 'remarks', label: '备注 ', visible: true },
        { key: 9, value: 'sort', label: '排序值 ', visible: true },
        { key: 10, value: 'validState', label: '状态 ', visible: true },
        { key: 11, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 12, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 13, value: 'createTime', label: '创建时间 ', visible: true },
        {
          key: 14,
          value: 'updateTime',
          label: '最后一次更新时间 ',
          visible: true
        }
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
        tenantId: undefined,
        fileName: undefined
      },
      input: '',
      form: {
        tempalteId: undefined, // GUID主键
        processId: undefined, // 流程编号
        tenantId: undefined, // 租户编号
        fileName: undefined, // 模板文件名称
        fileMd5Name: undefined, // 模板文件名称
        fileExtend: undefined, // 文件后缀
        filePath: undefined, // 文件路径
        fileSize: undefined, // 文件大小
        remarks: undefined, // 备注
        sort: undefined, // 排序值
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 最后一次更新时间
      },
      updateForm: {
        tempalteId: undefined, // GUID主键
        processId: undefined, // 流程编号
        tenantId: undefined, // 租户编号
        fileName: undefined, // 模板文件名称
        fileMd5Name: undefined, // 模板文件名称
        fileExtend: undefined, // 文件后缀
        filePath: undefined, // 文件路径
        fileSize: undefined, // 文件大小
        remarks: undefined, // 备注
        sort: undefined, // 排序值
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 最后一次更新时间
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        tempalteId: [],
        processId: [],
        tenantId: [
          { required: true, message: '请输入租户编号', trigger: 'blur' }
        ],
        fileName: [],
        fileMd5Name: [],
        fileExtend: [],
        filePath: [],
        fileSize: [],
        remarks: [],
        sort: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        tempalteId: [],
        processId: [],
        tenantId: [
          { required: true, message: '请输入租户编号', trigger: 'blur' }
        ],
        fileName: [],
        fileMd5Name: [],
        fileExtend: [],
        filePath: [],
        fileSize: [],
        remarks: [],
        sort: [],
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
      getFileTemplateListPage(this.listQuery)
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
          const id = row.tempalteId
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
              saveFileTemplate(_this.form)
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
              updateFileTemplate(_this.updateForm)
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
        tempalteId: undefined, // GUID主键
        processId: undefined, // 流程编号
        tenantId: undefined, // 租户编号
        fileName: undefined, // 模板文件名称
        fileMd5Name: undefined, // 模板文件名称
        fileExtend: undefined, // 文件后缀
        filePath: undefined, // 文件路径
        fileSize: undefined, // 文件大小
        remarks: undefined, // 备注
        sort: undefined, // 排序值
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 最后一次更新时间
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
