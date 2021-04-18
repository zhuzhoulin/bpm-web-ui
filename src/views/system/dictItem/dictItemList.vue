<template>
  <div class="app-container">
    <div>
      <div v-if="showSearch" class="filter-container">
        <el-form :inline="true" :model="listQuery" label-width="auto">

          <el-form-item label="字典项值 ">
            <el-input v-model="listQuery.itemValue" placeholder="请输入字典项值 " clearable />
          </el-form-item>
          <el-form-item label="字典项文本 ">
            <el-input v-model="listQuery.itemText" placeholder="请输入字典项文本 " clearable />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves type="success" icon="el-icon-search" @click="getList">查询</el-button>
          <!-- <el-button v-waves icon="el-icon-download" @click="download">导出</el-button> -->
          <el-button v-waves type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
        </span>
      </div>
      <div class="table-container">
        <!-- <el-row :gutter="10" class="mb8">
          <right-toolbar :show-search.sync="showSearch" :columns="columns" :default-hide-columns.sync="defaultHideColumns" @queryTable="getList" />
        </el-row> -->

        <el-table v-loading="listLoading" :data="list" size="mini" element-loading-text="Loading" fit border highlight-current-row>
          <el-table-column align="center" label="序号" width="95" sortable>
            <template slot-scope="scope">
              {{ (listQuery.pageIndex - 1 ) * listQuery.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <!-- <el-table-column v-if="columns[0].visible" label="主键ID " prop="itemId" align="center" sortable :show-overflow-tooltip="true" /> -->
          <!-- <el-table-column v-if="columns[1].visible" label="字典编号 " prop="dictId" align="center" sortable :show-overflow-tooltip="true" /> -->
          <el-table-column v-if="columns[2].visible" label="字典项值 " prop="itemValue" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[3].visible" label="字典项文本 " prop="itemText" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[4].visible" label="父级编号 " prop="parentId" align="center" sortable>
            <template slot-scope="scope">

              <span>{{ dictMap[scope.row.parentId] }}</span>

            </template>
          </el-table-column>
          <el-table-column v-if="columns[5].visible" label="租户编号 " prop="tenantId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[6].visible" label="排序 " prop="sort" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[7].visible" label="备注 " prop="remark" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[8].visible" label="状态" prop="validState" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[9].visible" label="操作人工号 " prop="operatorId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[10].visible" label="操作人姓名 " prop="operatorName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[11].visible" label="更新时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column v-if="columns[12].visible" label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column> -->
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

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogVisible" width="40%" append-to-body @close="handleDialogClose">
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="true" label="主键ID :" prop="itemId">
            <el-input v-model="form.itemId" disabled />

          </el-form-item>
          <!-- <el-form-item v-if="true" label="字典编号 :" prop="dictId">
            <el-input
              v-model="form.dictId"
              placeholder="请输入字典编号 "
              disabled
            />
          </el-form-item> -->
          <el-form-item v-if="true" label="字典项值 :" prop="itemValue">
            <el-input
              v-model="form.itemValue"
              placeholder="请输入字典项值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字典项文本 :" prop="itemText">
            <el-input
              v-model="form.itemText"
              placeholder="请输入字典项文本 "
            />
          </el-form-item>
          <el-form-item v-if="dictTree" label="父级编号 :" prop="parentId">

            <treeselect v-model="form.parentId" :options="dictOptions" :normalizer="normalizer" placeholder="请选择父级编号" />

          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="form.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="排序 :" prop="sort">
            <el-input
              v-model="form.sort"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remark">
            <el-input
              v-model="form.remark"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="状态 :" prop="validState">
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
          <el-form-item v-if="false" label="更新时间 :" prop="updateTime">
            <el-date-picker v-model="form.updateTime" type="date" placeholder="请输入更新时间 " />
          </el-form-item>
          <el-form-item v-if="false" label="创建时间 :" prop="createTime">
            <el-date-picker v-model="form.createTime" type="date" placeholder="请输入创建时间 " />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves @click="dialogVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="updateDialogVisible" width="40%" append-to-body @close="handleDialogClose">
        <el-form ref="updateDataForm" :model="updateForm" :rules="updateRules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="true" label="主键ID :" prop="itemId">
            <el-input v-model="updateForm.itemId" disabled />

          </el-form-item>
          <!-- <el-form-item v-if="true" label="字典编号 :" prop="dictId">
            <el-input
              v-model="updateForm.dictId"
              placeholder="请输入字典编号 "
              disabled
            />
          </el-form-item> -->
          <el-form-item v-if="true" label="字典项值 :" prop="itemValue">
            <el-input
              v-model="updateForm.itemValue"
              placeholder="请输入字典项值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字典项文本 :" prop="itemText">
            <el-input
              v-model="updateForm.itemText"
              placeholder="请输入字典项文本 "
            />
          </el-form-item>
          <el-form-item v-if="dictTree" label="父级编号 :" prop="parentId">

            <treeselect v-model="updateForm.parentId" :options="dictOptions" :normalizer="normalizer" placeholder="请选择父级编号" />

          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="updateForm.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="排序 :" prop="sort">
            <el-input
              v-model="updateForm.sort"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remark">
            <el-input
              v-model="updateForm.remark"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="状态 :" prop="validState">
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
          <el-form-item v-if="false" label="更新时间 :" prop="updateTime">
            <el-date-picker v-model="updateForm.updateTime" type="date" placeholder="请输入更新时间 " />
          </el-form-item>
          <el-form-item v-if="false" label="创建时间 :" prop="createTime">
            <el-date-picker v-model="updateForm.createTime" type="date" placeholder="请输入创建时间 " />
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
import { getDictItemListPage, saveDictItem, updateDictItem, deleteById, download, getDictItemList } from '@/api/system/dictItem'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import deepClone from 'clone-deep'
import store from '@/store'

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
  props: {
    dictInfo: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      dictTree: false,
      dictOptions: [],
      dictMap: {},
      dict: {},
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: [
        'itemId'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'itemId', label: '主键ID ', visible: true },
        { key: 1, value: 'dictId', label: '字典编号 ', visible: true },
        { key: 2, value: 'itemValue', label: '字典项值 ', visible: true },
        { key: 3, value: 'itemText', label: '字典项文本 ', visible: true },
        { key: 4, value: 'parentId', label: '父级编号 ', visible: true },
        { key: 5, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 6, value: 'sort', label: '排序 ', visible: true },
        { key: 7, value: 'remark', label: '备注 ', visible: true },
        { key: 8, value: 'validState', label: '状态 ', visible: true },
        { key: 9, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 10, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 11, value: 'updateTime', label: '更新时间 ', visible: true },
        { key: 12, value: 'createTime', label: '创建时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        dictId: undefined,
        itemValue: undefined,
        itemText: undefined
      },
      input: '',
      form: {
        itemId: undefined, // 主键ID
        dictId: this.dictInfo.dictId, // 字典编号
        itemValue: undefined, // 字典项值
        itemText: undefined, // 字典项文本
        parentId: 0, // 父级编号
        tenantId: store.getters.tenantId, // 租户编号
        sort: 1, // 排序
        remark: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        updateTime: undefined, // 更新时间
        createTime: undefined // 创建时间
      },
      updateForm: {
        itemId: undefined, // 主键ID
        dictId: this.dictInfo.dictId, // 字典编号
        itemValue: undefined, // 字典项值
        itemText: undefined, // 字典项文本
        parentId: undefined, // 父级编号
        tenantId: undefined, // 租户编号
        sort: undefined, // 排序
        remark: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        updateTime: undefined, // 更新时间
        createTime: undefined // 创建时间
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        itemId: [
        ],
        dictId: [
          { required: true, messages: '请输入字典编号', trigger: 'blur' }
        ],
        itemValue: [
          { required: true, messages: '请输入字典项值', trigger: 'blur' }
        ],
        itemText: [
          { required: true, messages: '请输入字典项文本', trigger: 'blur' }

        ],
        parentId: [
        ],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }

        ],
        sort: [
        ],
        remark: [
        ],
        validState: [
        ],
        operatorId: [
        ],
        operatorName: [
        ],
        updateTime: [
        ],
        createTime: [
        ]
      },
      updateRules: {
        itemId: [
        ],
        dictId: [
          { required: true, messages: '请输入字典编号', trigger: 'blur' }
        ],
        itemValue: [
          { required: true, messages: '请输入字典项值', trigger: 'blur' }
        ],
        itemText: [
          { required: true, messages: '请输入字典项文本', trigger: 'blur' }
        ],
        parentId: [
        ],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        sort: [
        ],
        remark: [
        ],
        validState: [
        ],
        operatorId: [
        ],
        operatorName: [
        ],
        updateTime: [
        ],
        createTime: [
        ]
      }
    }
  },
  watch: {
    dictInfo: {
      handler(newValue, oldValue) {
        this.dict = deepClone(newValue)
      },
      deep: true
    }
  },
  created() {
    this.dict = deepClone(this.dictInfo)
    this.listQuery = {
      dictId: this.dict.dictId,
      itemText: '',
      itemValue: '',
      validState: null,
      tenantId: store.getters.tenantId,
      pageIndex: 1,
      pageSize: 10
    }
    this.dictTree = this.dict.dictTree === 1 || false
    this.getList()
    if (this.dictTree) {
      this.getDictItemTree()
    }
  },
  methods: {
    getDictItemTree() {
      const that = this
      const param = {
        dictId: this.dict.dictId,
        tenantId: store.getters.tenantId,
        pageIndex: 1,
        pageSize: 1000
      }
      const tempOptions = [{
        itemId: 0, // 主键ID
        dictId: that.dictInfo.dictId, // 字典编号
        itemValue: 0, // 字典项值
        itemText: '/', // 字典项文本
        parentId: 0,
        children: []
      }
      ]
      getDictItemList(param).then(response => {
        const options = that.handleTree(response.data, 'itemId', 'parentId')
        tempOptions[0].children = options
        that.$nextTick(() => {
          for (const key in response.data) {
            that.dictMap[response.data[key].itemValue] = response.data[key].itemText
          }
          that.dictOptions = tempOptions
        })
      })
    },
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.itemValue,
        label: node.itemText,
        children: node.children
      }
    },
    getList() {
      this.listLoading = true
      getDictItemListPage(this.listQuery).then(response => {
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
        const id = row.itemId
        deleteById(id).then(response => {
          if (response.code === 200) {
            _this.getList()
            if (_this.dictTree) {
              _this.getDictItemTree()
            }
            _this.$message.success(response.message)
          } else {
            _this.$message.error(response.message)
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
              saveDictItem(_this.form).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  console.log(_this.dictTree)
                  _this.$nextTick(() => {
                    if (_this.dictTree) {
                      _this.getDictItemTree()
                    }
                  })

                  _this.$message.success(response.message)
                  _this.dialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            } else {
              updateDictItem(_this.updateForm).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  if (_this.dictTree) {
                    _this.getDictItemTree()
                  }
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
        itemId: undefined, // 主键ID
        dictId: this.dictInfo.dictId, // 字典编号
        itemValue: undefined, // 字典项值
        itemText: undefined, // 字典项文本
        parentId: 0, // 父级编号
        tenantId: store.getters.tenantId, // 租户编号
        sort: 1, // 排序
        remark: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        updateTime: undefined, // 更新时间
        createTime: undefined // 创建时间
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
