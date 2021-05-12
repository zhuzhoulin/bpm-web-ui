<template>
  <div class="app-container">
    <div>
      <div class="filter-container">
        <el-form
          :inline="true"
          :model="listQuery"
        >
          <el-form-item label="数据源:">
            <el-select
              v-model="listQuery.dbId"
              clearable
              filterable
              placeholder="请选择数据源"
            >
              <el-option
                v-for="item in dbList"
                :key="item.dbId"
                :label="item.dbName"
                :value="item.dbId"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="表名:"
            prop="includeTables"
          >
            <el-input
              v-model="listQuery.includeTables"
              placeholder="请输入表名"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              v-waves
              type="primary"
              icon="el-icon-search"
              @click="getList"
            >查询</el-button>
            <!-- <el-button type="primary" @click="handleCreate" icon="el-icon-plus" v-waves>添加</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="table-container">
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
            label="表名"
            prop="name"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="备注"
            prop="comment"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="350px"
          >
            <template slot-scope="scope">
              <el-button
                v-waves
                size="mini"
                type="primary"
                icon="el-icon-edit"
                plain
                @click="handlePreviewDialogShow(scope.row)"
              >预 览</el-button>
              <el-button
                v-waves
                size="mini"
                type="warning"
                icon="el-icon-edit"
                plain
                @click="handleEditDialogShow(scope.row)"
              >配 置</el-button>
              <el-button
                v-waves
                size="mini"
                type="danger"
                icon="el-icon-download"
                plain
                @click="download(scope.row)"
              >下 载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <div class="page-footer">
                    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" style="float:right;" @pagination="getList" />
                </div> -->
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
            label="表名:"
            prop="name"
          >
            <el-input
              v-model="form.name"
              placeholder="请输入表名"
            />
          </el-form-item>
          <el-form-item
            label="备注:"
            prop="comment"
          >
            <el-input
              v-model="form.comment"
              placeholder="请输入备注"
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
        v-if="previewDialog.visible"
        :title="previewDialog.title"
        :visible.sync="previewDialog.visible"
        :width="previewDialog.width"
        append-to-body
        :before-close="handlePreviewDialogClose"
      >

        <preView
          :select-db-id.sync="previewDialog.dbId"
          :select-include-tables.sync="previewDialog.tableName"
        />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-waves
            @click="handlePreviewDialogClose"
          >关 闭</el-button>
        </span>
      </el-dialog>

      <el-dialog
        v-if="editDialog.visible"
        :title="editDialog.title"
        :visible.sync="editDialog.visible"
        :width="editDialog.width"
        append-to-body
        :before-close="handleEditDialogClose"
      >

        <tableField
          :select-db-id.sync="editDialog.dbId"
          :select-include-tables.sync="editDialog.tableName"
        />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-waves
            @click="handleEditDialogClose"
          >关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getDbConfigList } from '@/api/generator/dbConfig'

import { getCodeTableList, download } from '@/api/generator/codeTable'
import waves from '@/directive/waves'
import preView from './preView'
import tableField from '../codeTableField/index'

// import Pagination from '@/components/Pagination'

export default {
  components: { preView, tableField },
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
      previewDialog: {
        title: '预览',
        width: '90%',
        visible: false,
        dbId: '',
        tableName: ''
      },
      editDialog: {
        title: '编辑',
        width: '90%',
        visible: false,
        dbId: '',
        tableName: ''
      },
      dbList: [],
      dbMap: {},
      dialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        dbId: null,
        includeTables: null,
        queryTableFiled: false,
        pageIndex: 1,
        pageSize: 100000
      },
      input: '',
      form: {
        comment: undefined, // 模板组编号
        name: undefined // 模板组编码
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getDbList()
  },
  methods: {
    download(row) {
      const _that = this

      const param = {
        dbId: _that.listQuery.dbId,
        templeateId: 1,
        includeTables: row.name,
        preView: true
      }
      download(param)
        .then((response) => {})
        .catch((err) => {
          console.log(err)
        })
    },
    handleEditDialogClose() {
      const _that = this
      _that.$confirm('确定关闭吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((_) => {
        _that.$nextTick(() => {
          _that.editDialog.visible = false
          _that.getList()
        })
      })
        .catch((_) => {})
    },
    handleEditDialogShow(row) {
      const _that = this
      _that.$nextTick(() => {
        _that.editDialog.dbId = _that.listQuery.dbId
        _that.editDialog.tableName = row.name
        _that.editDialog.title = '编辑(' + row.comment + '-' + row.name + ')'
        _that.editDialog.visible = true
      })
    },
    handlePreviewDialogClose() {
      const _that = this

      _that.$nextTick(() => {
        _that.previewDialog.visible = false
        _that.getList()
      })
    },
    handlePreviewDialogShow(row) {
      const _that = this
      _that.$nextTick(() => {
        _that.previewDialog.dbId = _that.listQuery.dbId
        _that.previewDialog.tableName = row.name
        _that.previewDialog.title = '预览(' + row.comment + '-' + row.name + ')'

        _that.previewDialog.visible = true
      })
    },
    getDbList() {
      getDbConfigList(this.listQuery)
        .then((response) => {
          this.dbList = response.data
          for (const key in response.data) {
            this.dbMap[response.data[key].dbId] = response.data[key]
          }
          this.listLoading = false
        })
        .catch((err) => {
          this.listLoading = false
          console.log(err)
        })
    },
    getList() {
      this.listLoading = true
      getCodeTableList(this.listQuery)
        .then((response) => {
          this.list = response.data
          // this.total = response.data.total;
          this.listLoading = false
        })
        .catch((err) => {
          this.listLoading = false
          console.log(err)
        })
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    handleDelete(row) {
      const _this = this
      _this
        .$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(function() {})
    },
    submitForm() {
      const _this = this
      _this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$confirm('确定操作吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function() {})
        }
      })
    },
    resetForm() {
      this.form = {
        comment: undefined, // 模板组编号
        name: undefined // 模板组编码
      }
    },
    // 监听dialog关闭时的处理事件
    handleDialogClose() {
      if (this.$refs['dataForm']) {
        this.$refs['dataForm'].clearValidate() // 清除整个表单的校验
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
