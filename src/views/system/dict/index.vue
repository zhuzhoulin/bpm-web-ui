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
          <el-form-item label="字典编码 ">
            <el-input
              v-model="listQuery.dictCode"
              placeholder="请输入字典编码 "
              clearable
            />
          </el-form-item>
          <el-form-item label="字典名称 ">
            <el-input
              v-model="listQuery.dictName"
              placeholder="请输入字典名称 "
              clearable
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
            label="主键 "
            prop="dictId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="字典编码 "
            prop="dictCode"
            align="center"
            sortable
          />
          <el-table-column
            v-if="columns[2].visible"
            label="字典名称 "
            prop="dictName"
            align="center"
            sortable
          />
          <el-table-column
            v-if="columns[3].visible"
            label="树化 "
            prop="dictTree"
            align="center"
            sortable
          >
            <template slot-scope="scope">
              {{ scope.row.dictTree === 1 ? "是":"否" }}
            </template>
          </el-table-column>

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
            label="备注 "
            prop="remark"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
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
            v-if="columns[7].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="操作时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[10].visible"
            label="更新时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            min-width="270px"
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
                type="success"
                size="mini"
                plain
                icon="el-icon-setting"
                @click="updateDictItem(scope.row)"
              >更新</el-button>
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
            label="主键 :"
            prop="dictId"
          >
            <el-input
              v-model="form.dictId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="字典编码 :"
            prop="dictCode"
          >
            <el-input
              v-model="form.dictCode"
              placeholder="请输入字典编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="字典名称 :"
            prop="dictName"
          >
            <el-input
              v-model="form.dictName"
              placeholder="请输入字典名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="树化 :"
            prop="dictTree"
          >
            <el-switch
              v-model="form.dictTree"
              inactive-value="0"
              active-value="1"
              inactive-text="否"
              active-text="是"
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
            prop="remark"
          >
            <el-input
              v-model="form.remark"
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
            label="更新时间 :"
            prop="updateTime"
          >
            <el-date-picker
              v-model="form.updateTime"
              type="date"
              placeholder="请输入 "
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
              placeholder="请输入 "
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
            label="主键 :"
            prop="dictId"
          >
            <el-input
              v-model="updateForm.dictId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="字典编码 :"
            prop="dictCode"
          >
            <el-input
              v-model="updateForm.dictCode"
              placeholder="请输入字典编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="字典名称 :"
            prop="dictName"
          >
            <el-input
              v-model="updateForm.dictName"
              placeholder="请输入字典名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="树化 :"
            prop="dictTree"
          >
            <el-switch
              v-model="updateForm.dictTree"
              inactive-value="0"
              active-value="1"
              inactive-text="否"
              active-text="是"
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
            prop="remark"
          >
            <el-input
              v-model="updateForm.remark"
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
            label="更新时间 :"
            prop="updateTime"
          >
            <el-date-picker
              v-model="updateForm.updateTime"
              type="date"
              placeholder="请输入 "
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
              placeholder="请输入 "
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

      <el-drawer
        v-if="showDictItemDialog.visible"
        :size="showDictItemDialog.width"
        :title="showDictItemDialog.title"
        :visible.sync="showDictItemDialog.visible"
        :direction="showDictItemDialog.direction"
        append-to-body
        :before-close="handleClose"
        custom-class="drawer"
      >
        <div class="custom_drawer__content">
          <dictItemList
            ref="dictItem"
            :dict-info.sync="showDictItemDialog.data"
            @queryList="getList"
            @close="closeUpdateDictItem"
          />
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  getDictListPage,
  saveDict,
  updateDict,
  deleteById,
  download
} from '@/api/system/dict'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import dictItemList from '../dictItem/dictItemList'
import store from '@/store'

export default {
  components: { Pagination, dictItemList },
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
      showDictItemDialog: {
        title: '字典值列表',
        visible: false,
        width: '60%',
        name: '字典值列表', // 组件名,
        loading: false,
        data: '',
        fullscreen: false,
        closeOnPressEscape: false,
        direction: 'rtl'
      },
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: ['createTime'],
      // 列信息
      columns: [
        { key: 0, value: 'dictId', label: '主键 ', visible: true },
        { key: 1, value: 'dictCode', label: '字典编码 ', visible: true },
        { key: 2, value: 'dictName', label: '字典名称 ', visible: true },
        { key: 3, value: 'dictTree', label: '树化 ', visible: true },
        { key: 4, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 5, value: 'remark', label: '备注 ', visible: true },
        { key: 6, value: 'validState', label: '状态 ', visible: true },
        { key: 7, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 8, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 9, value: 'updateTime', label: '更新时间 ', visible: true },
        { key: 10, value: 'createTime', label: '创建时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        dictCode: undefined,
        dictName: undefined,
        validState: undefined
      },
      input: '',
      form: {
        dictId: undefined, // 主键
        dictCode: undefined, // 字典编码
        dictName: undefined, // 字典名称
        dictTree: undefined,
        tenantId: undefined, // 租户编号
        remark: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        updateTime: undefined, //
        createTime: undefined //
      },
      updateForm: {
        dictId: undefined, // 主键
        dictCode: undefined, // 字典编码
        dictName: undefined, // 字典名称
        dictTree: undefined,
        tenantId: undefined, // 租户编号
        remark: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        updateTime: undefined, //
        createTime: undefined //
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        dictId: [],
        dictCode: [
          { required: true, messages: '请输入字典编码', trigger: 'blur' }
        ],
        dictName: [
          { required: true, messages: '请输入字典名称', trigger: 'blur' }
        ],
        dictTree: [],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        remark: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        updateTime: [],
        createTime: []
      },
      updateRules: {
        dictId: [],
        dictCode: [
          { required: true, messages: '请输入字典编码', trigger: 'blur' }
        ],
        dictTree: [],
        dictName: [
          { required: true, messages: '请输入字典名称', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        remark: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        updateTime: [],
        createTime: []
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClose(done) {
      const _this = this
      _this
        .$confirm('确定吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    updateDictItem(row) {
      this.showDictItemDialog.data = row
      this.$nextTick(() => {
        this.showDictItemDialog.visible = true
      })
    },
    closeUpdateDictItem() {
      this.$nextTick(() => {
        this.showDictItemDialog.visible = false
      })
    },
    getList() {
      this.listLoading = true
      getDictListPage(this.listQuery)
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
          const id = row.dictId
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
              saveDict(_this.form)
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
              updateDict(_this.updateForm)
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
        dictId: undefined, // 主键
        dictCode: undefined, // 字典编码
        dictName: undefined, // 字典名称
        tenantId: store.getters.tenantId, // 租户编号
        remark: undefined, // 备注
        dictTree: 0,
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        updateTime: undefined, //
        createTime: undefined //
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
