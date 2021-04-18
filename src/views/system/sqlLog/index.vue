<template>
  <div class="app-container">
    <div>
      <div v-if="showSearch" class="filter-container">
        <el-form :inline="true" :model="listQuery" label-width="auto">
          <el-form-item label="序号 ">
            <el-input v-model="listQuery.logId" placeholder="请输入序号 " />
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="listQuery.logType" placeholder="请输入类型" />
          </el-form-item>
          <el-form-item label="操作人工号 ">
            <el-input v-model="listQuery.operatorId" placeholder="请输入操作人工号 " />
          </el-form-item>
          <el-form-item label="操作人姓名 ">
            <el-input v-model="listQuery.operatorName" placeholder="请输入操作人姓名 " />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves type="success" icon="el-icon-search" @click="getList">查询</el-button>
          <el-button v-waves icon="el-icon-download" @click="download">导出</el-button>
          <el-button v-waves type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
        </span>
      </div>
      <div class="table-container">
        <el-row :gutter="10" class="mb8">
          <right-toolbar :show-search.sync="showSearch" :columns="columns" :default-hide-columns.sync="defaultHideColumns" @queryTable="getList" />
        </el-row>
        <el-table v-loading="listLoading" :data="list" size="mini" element-loading-text="Loading" fit border highlight-current-row>
          <el-table-column align="center" label="序号" width="95" sortable>
            <template slot-scope="scope">
              {{ (listQuery.pageIndex - 1 ) * listQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column v-if="columns[0].visible" label=" " prop="logId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[1].visible" label="类型" prop="logType" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[2].visible" label="sql " prop="logSql" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[3].visible" label="花费时间（ms） " prop="spendTime" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[4].visible" label="备注 " prop="remarks" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[5].visible" label="状态" prop="validState" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[6].visible" label="操作人工号 " prop="operatorId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[7].visible" label="操作人姓名 " prop="operatorName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[8].visible" label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[9].visible" label="更新时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" min-width="200px">
            <template slot-scope="scope">
              <el-button v-waves size="mini" type="primary" icon="el-icon-edit" plain @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button v-waves size="mini" type="danger" icon="el-icon-delete" plain @click="handleDelete(scope.row)">禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page-footer">
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" style="float:right;" @pagination="getList" />
        </div>
      </div>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="true" label="序号 :" prop="logId">
            <el-input v-model="form.logId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="类型:" prop="logType">
            <el-input
              v-model="form.logType"
              placeholder="请输入类型"
            />
          </el-form-item>
          <el-form-item v-if="true" label="sql :" prop="logSql">
            <el-input
              v-model="form.logSql"
              type="textarea"
              autosize
              placeholder="请输入sql "
            />
          </el-form-item>
          <el-form-item v-if="true" label="花费时间（ms） :" prop="spendTime">
            <el-input
              v-model="form.spendTime"
              placeholder="请输入花费时间（ms） "
            />
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remarks">
            <el-input
              v-model="form.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="有效状态 :" prop="validState">
            <el-switch v-model="form.validState" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item v-if="false" label="操作人工号 :" prop="operatorId">
            <el-input
              v-model="form.operatorId"
              placeholder="请输入操作人工号 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="操作人姓名 :" prop="operatorName">
            <el-input
              v-model="form.operatorName"
              placeholder="请输入操作人姓名 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="创建时间 :" prop="createTime">
            <el-date-picker v-model="form.createTime" type="date" placeholder="请输入创建时间 " />
          </el-form-item>
          <el-form-item v-if="false" label="更新时间 :" prop="updateTime">
            <el-date-picker v-model="form.updateTime" type="date" placeholder="请输入更新时间 " />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves @click="dialogVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="updateDialogVisible" width="40%" @close="handleDialogClose">
        <el-form ref="updateDataForm" :model="updateForm" :rules="updateRules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="true" label="序号 :" prop="logId">
            <el-input v-model="updateForm.logId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="类型:" prop="logType">
            <el-input
              v-model="updateForm.logType"
              placeholder="请输入类型"
            />
          </el-form-item>
          <el-form-item v-if="true" label="sql :" prop="logSql">
            <el-input
              v-model="updateForm.logSql"
              type="textarea"
              autosize
              placeholder="请输入sql "
            />
          </el-form-item>
          <el-form-item v-if="true" label="花费时间（ms） :" prop="spendTime">
            <el-input
              v-model="updateForm.spendTime"
              placeholder="请输入花费时间（ms） "
            />
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remarks">
            <el-input
              v-model="updateForm.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="有效状态 :" prop="validState">
            <el-switch v-model="updateForm.validState" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item v-if="false" label="操作人工号 :" prop="operatorId">
            <el-input
              v-model="updateForm.operatorId"
              placeholder="请输入操作人工号 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="操作人姓名 :" prop="operatorName">
            <el-input
              v-model="updateForm.operatorName"
              placeholder="请输入操作人姓名 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="创建时间 :" prop="createTime">
            <el-date-picker v-model="updateForm.createTime" type="date" placeholder="请输入创建时间 " />
          </el-form-item>
          <el-form-item v-if="false" label="更新时间 :" prop="updateTime">
            <el-date-picker v-model="updateForm.updateTime" type="date" placeholder="请输入更新时间 " />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves @click="updateDialogVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSqlLogListPage, saveSqlLog, updateSqlLog, deleteById, download } from '@/api/system/sqlLog'
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
        'createTime'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'logId', label: '序号 ', visible: true },
        { key: 1, value: 'logType', label: '类型', visible: true },
        { key: 2, value: 'logSql', label: 'sql ', visible: true },
        { key: 3, value: 'spendTime', label: '花费时间（ms） ', visible: true },
        { key: 4, value: 'remarks', label: '备注 ', visible: true },
        { key: 5, value: 'validState', label: '有效状态 ', visible: true },
        { key: 6, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 7, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 8, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 9, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        logId: undefined,
        logType: undefined,
        operatorId: undefined,
        operatorName: undefined
      },
      input: '',
      form: {
        logId: undefined, //
        logType: undefined, // 64
        logSql: undefined, // sql
        spendTime: undefined, // 花费时间（ms）
        remarks: undefined, // 备注
        validState: 1, // 有效状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        logId: undefined, //
        logType: undefined, // 64
        logSql: undefined, // sql
        spendTime: undefined, // 花费时间（ms）
        remarks: undefined, // 备注
        validState: 1, // 有效状态
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
        logId: [
        ],
        logType: [
        ],
        logSql: [
        ],
        spendTime: [
        ],
        remarks: [
        ],
        validState: [
        ],
        operatorId: [
        ],
        operatorName: [
        ],
        createTime: [
        ],
        updateTime: [
        ]
      },
      updateRules: {
        logId: [
        ],
        logType: [
        ],
        logSql: [
        ],
        spendTime: [
        ],
        remarks: [
        ],
        validState: [
        ],
        operatorId: [
        ],
        operatorName: [
        ],
        createTime: [
        ],
        updateTime: [
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSqlLogListPage(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },
    download() {
      download(this.listQuery).then(response => {

      }).catch(err => {
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
      _this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        const id = row.logId
        deleteById(id).then(response => {
          if (response.code === 200) {
            this.getList()
            this.$message.success(response.message)
          } else {
            this.$message.error(response.message)
          }
        })
      })
    },
    submitForm() {
      const _this = this
      const refForm = _this.dialogStatus === 'create' ? 'dataForm' : 'updateDataForm'
      _this.$refs[`${refForm}`].validate(valid => {
        if (valid) {
          this.$confirm('确定操作吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function() {
            if (_this.dialogStatus === 'create') {
              saveSqlLog(_this.form).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.dialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            } else {
              updateSqlLog(_this.updateForm).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.updateDialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            }
          })
        }
      })
    },
    resetForm() {
      this.form = {
        logId: undefined, //
        logType: undefined, // 64
        logSql: undefined, // sql
        spendTime: undefined, // 花费时间（ms）
        remarks: undefined, // 备注
        validState: 1, // 有效状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      }
    },
    // 监听dialog关闭时的处理事件
    handleDialogClose() {
      const refForm = this.dialogStatus === 'create' ? 'dataForm' : 'updateDataForm'
      if (this.$refs[[`${refForm}`]]) {
        this.$refs[[`${refForm}`]].clearValidate() // 清除整个表单的校验
      }
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">

    .page-footer{
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
