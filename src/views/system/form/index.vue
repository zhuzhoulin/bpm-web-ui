<template>
  <div class="app-container">
    <div>
      <div v-if="showSearch" class="filter-container">
        <el-form :inline="true" :model="listQuery" label-width="auto">
          <el-form-item label="表单KEY ">
            <el-input v-model="listQuery.formKey" placeholder="请输入表单KEY " />
          </el-form-item>
          <el-form-item label="表单名称 ">
            <el-input v-model="listQuery.formName" placeholder="请输入表单名称 " />
          </el-form-item>
          <el-form-item label="表单类型 ">
            <el-select v-model="listQuery.formType" clearable filterable placeholder="请选择">
              <el-option
                v-for="(item,index) in dictOption1"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态 ">
            <el-select v-model="listQuery.validState" clearable filterable placeholder="请选择">
              <el-option
                v-for="(item,index) in dictOption2"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
          <el-table-column v-if="columns[0].visible" label="表单编号 " prop="formId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[1].visible" label="表单KEY " prop="formKey" align="center" sortable />
          <el-table-column v-if="columns[2].visible" label="表单名称 " prop="formName" align="center" sortable />
          <el-table-column v-if="columns[3].visible" label="租户编号 " prop="tenantId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[4].visible" label="表单类型 " prop="formType" align="center" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ dictMap1[scope.row.formType] }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[5].visible" label="排序 " prop="sort" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[6].visible" label="表单数据 " prop="formData" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[7].visible" label="备注 " prop="remarks" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[8].visible" label="状态" prop="validState" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[9].visible" label="创建时间 " align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[10].visible" label="更新时间 " align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[11].visible" label="操作人工号 " prop="operatorId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[12].visible" label="操作人姓名 " prop="operatorName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column align="center" label="操作" fixed="right" min-width="450px">
            <template slot-scope="scope">
              <el-button v-waves size="mini" type="primary" icon="el-icon-edit" plain @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button v-waves type="success" size="mini" plain icon="el-icon-view" @click="handlePreview(scope.row)">预览</el-button>
              <el-button v-waves type="info" size="mini" plain icon="el-icon-setting" @click="showFormDesign(scope.row)">设计</el-button>
              <el-button type="warning" size="mini" plain icon="el-icon-plus" @click="copyForm(scope.row)">复制</el-button>
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
          <el-form-item v-if="true" label="表单编号 :" prop="formId">
            <el-input v-model="form.formId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="表单KEY :" prop="formKey">
            <el-input
              v-model="form.formKey"
              placeholder="请输入表单KEY "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表单名称 :" prop="formName">
            <el-input
              v-model="form.formName"
              placeholder="请输入表单名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="form.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表单类型 :" prop="formType">

            <el-select v-model="form.formType" placeholder="请选择">
              <el-option
                v-for="(item,index) in dictOption1"
                :key="index"
                :label="item.label"
                :value="item.value"
              />

            </el-select>
          </el-form-item>
          <el-form-item v-if="true" label="排序 :" prop="sort">
            <el-input-number
              v-model="form.sort"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表单数据 :" prop="formData">
            <el-input
              v-model="form.formData"
              type="textarea"
              autosize
              placeholder="请输入表单数据 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remarks">
            <el-input
              v-model="form.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="状态 :" prop="validState">
            <el-select v-model="form.validState" placeholder="请选择">
              <el-option
                v-for="(item,index) in dictOption2"
                :key="index"
                :label="item.label"
                :value="item.value"
              />

            </el-select>
          </el-form-item>
          <el-form-item v-if="false" label="创建时间 :" prop="createTime">
            <el-date-picker v-model="form.createTime" type="date" placeholder="请输入创建时间 " />
          </el-form-item>
          <el-form-item v-if="false" label="更新时间 :" prop="updateTime">
            <el-date-picker v-model="form.updateTime" type="date" placeholder="请输入更新时间 " />
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves @click="dialogVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="updateDialogVisible" width="40%" @close="handleDialogClose">
        <el-form ref="updateDataForm" :model="updateForm" :rules="updateRules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="true" label="表单编号 :" prop="formId">
            <el-input v-model="updateForm.formId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="表单KEY :" prop="formKey">
            <el-input
              v-model="updateForm.formKey"
              placeholder="请输入表单KEY "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表单名称 :" prop="formName">
            <el-input
              v-model="updateForm.formName"
              placeholder="请输入表单名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="updateForm.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表单类型 :" prop="formType">
            <el-select v-model.number="updateForm.formType" placeholder="请选择">
              <el-option
                v-for="(item,index) in dictOption1"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="true" label="排序 :" prop="sort">
            <el-input
              v-model="updateForm.sort"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表单数据 :" prop="formData">
            <el-input
              v-model="updateForm.formData"
              type="textarea"
              autosize
              placeholder="请输入表单数据 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remarks">
            <el-input
              v-model="updateForm.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="状态 :" prop="validState">
            <el-select v-model="updateForm.validState" placeholder="请选择">
              <el-option
                v-for="(item,index) in dictOption2"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="false" label="创建时间 :" prop="createTime">
            <el-date-picker v-model="updateForm.createTime" type="date" placeholder="请输入创建时间 " />
          </el-form-item>
          <el-form-item v-if="false" label="更新时间 :" prop="updateTime">
            <el-date-picker v-model="updateForm.updateTime" type="date" placeholder="请输入更新时间 " />
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button v-waves @click="updateDialogVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="submitForm">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        v-if="formPreViewDialog.visible"
        :title="formPreViewDialog.title"
        :visible.sync="formPreViewDialog.visible"
        :width="formPreViewDialog.width"
        :fullscreen="formPreViewDialog.fullscreen"
        :close-on-press-escape="formPreViewDialog.closeOnPressEscape"
        :modal-append-to-body="false"
        center
      >
        <PreFormView ref="preFormView" :form-info.sync="formPreViewDialog.data" :width="formPreViewDialog.width" @closePreViewDialog="closePreViewDialog" />
      </el-dialog>

      <el-dialog
        v-if="formDesignDialog.visible"

        :title.sync="formDesignDialog.title"
        :visible.sync="formDesignDialog.visible"
        :width="formDesignDialog.width"
        :fullscreen="formDesignDialog.fullscreen"
        :close-on-press-escape="formDesignDialog.closeOnPressEscape"
        :modal-append-to-body="false"
        center
        :before-close="handleClose"
        @close="closeFormDesignDialog"
      >
        <BpmFormDesign v-if="formDesignDialog.visible" ref="bpmFormDesign" :form-info.sync="formDesignDialog.data" @queryList="getList" @closeFormDesignDialog="closeFormDesignDialog" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getFormListPage, saveForm, updateForm, deleteById, download } from '@/api/system/form'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import BpmFormDesign from '@/components/BpmFormDesign'
import PreFormView from '@/components/PreFormView'
import { getDictListByDictCode } from '@/api/system/dict'
import deepClone from 'clone-deep'
import store from '@/store'

export default {
  components: { Pagination, BpmFormDesign, PreFormView },
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
      dictOption1: [],
      dictMap1: {},
      dictOption2: [],
      dictMap2: {},
      formDesignDialog: {
        title: '表单设计器',
        visible: false,
        width: '',
        name: '表单设计器', // 组件名,
        loading: false,
        fullscreen: true,
        closeOnPressEscape: false
      },
      formPreViewDialog: {
        title: '预览',
        visible: false,
        width: '850',
        name: '预览', // 组件名,
        loading: false,
        fullscreen: false,
        closeOnPressEscape: false
      },
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: [
        'formData',
        'createTime',
        'operatorId'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'formId', label: '表单编号 ', visible: true },
        { key: 1, value: 'formKey', label: '表单KEY ', visible: true },
        { key: 2, value: 'formName', label: '表单名称 ', visible: true },
        { key: 3, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 4, value: 'formType', label: '表单类型 ', visible: true },
        { key: 5, value: 'sort', label: '排序 ', visible: true },
        { key: 6, value: 'formData', label: '表单数据 ', visible: true },
        { key: 7, value: 'remarks', label: '备注 ', visible: true },
        { key: 8, value: 'validState', label: '状态 ', visible: true },
        { key: 9, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 10, value: 'updateTime', label: '更新时间 ', visible: true },
        { key: 11, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 12, value: 'operatorName', label: '操作人姓名 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        formKey: undefined,
        formName: undefined,
        formType: undefined,
        validState: undefined
      },
      input: '',
      form: {
        formId: undefined, // 表单编号
        formKey: undefined, // 表单KEY
        formName: undefined, // 表单名称
        tenantId: undefined, // 租户编号
        formType: undefined, // 表单类型
        sort: undefined, // 排序
        formData: undefined, // 表单数据
        remarks: undefined, // 备注
        validState: 1, // 状态
        createTime: undefined, // 创建时间
        updateTime: undefined, // 更新时间
        operatorId: undefined, // 操作人工号
        operatorName: undefined // 操作人姓名
      },
      updateForm: {
        formId: undefined, // 表单编号
        formKey: undefined, // 表单KEY
        formName: undefined, // 表单名称
        tenantId: undefined, // 租户编号
        formType: undefined, // 表单类型
        sort: undefined, // 排序
        formData: undefined, // 表单数据
        remarks: undefined, // 备注
        validState: 1, // 状态
        createTime: undefined, // 创建时间
        updateTime: undefined, // 更新时间
        operatorId: undefined, // 操作人工号
        operatorName: undefined // 操作人姓名
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        formId: [
        ],
        formKey: [
          { required: true, messages: '请输入表单KEY', trigger: 'blur' }
        ],
        formName: [
          { required: true, messages: '请输入表单名称', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        formType: [
          { required: true, messages: '请输入表单类型', trigger: 'change', type: 'number' }
        ],
        sort: [
        ],
        formData: [
        ],
        remarks: [
        ],
        validState: [
        ],
        createTime: [
        ],
        updateTime: [
        ],
        operatorId: [
        ],
        operatorName: [
        ]
      },
      updateRules: {
        formId: [
        ],
        formKey: [
          { required: true, messages: '请输入表单KEY', trigger: 'blur' }
        ],
        formName: [
          { required: true, messages: '请输入表单名称', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        formType: [
          { required: true, messages: '请输入表单类型', trigger: 'change', type: 'number' }
        ],
        sort: [
        ],
        formData: [
        ],
        remarks: [
        ],
        validState: [
        ],
        createTime: [
        ],
        updateTime: [
        ],
        operatorId: [
        ],
        operatorName: [
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDict1()
    this.getDict2()
  },
  methods: {
    handleClose(done) {
      this.$confirm(this.$t('action.confirmClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    copyForm(form) {
      this.form = deepClone(form)
      this.form.formId = undefined
      this.form.formKey = undefined
      this.dialogStatus = 'create'
      this.dialogVisible = true
    },
    showFormDesign(data) {
      this.formDesignDialog.data = data
      this.formDesignDialog.visible = true
    },
    closeFormDesignDialog() {
      this.$nextTick(() => {
        this.formDesignDialog.visible = false
      })
    },
    closePreViewDialog() {
      this.formPreViewDialog.visible = false
    },
    handlePreview(row) {
      // 打开预览模态框
      this.formPreViewDialog.data = row
      this.formPreViewDialog.visible = true
    },
    getDict1() {
      const dictCode = 'pig:dict:formType'
      getDictListByDictCode(dictCode).then(response => {
        this.$nextTick(() => {
          const option = []
          for (const key in response.data) {
            option.push({ label: response.data[key].label, value: response.data[key].value })
            this.dictMap1[response.data[key].value] = response.data[key].label
          }
          this.dictOption1 = option
        })
      })
    },
    getDict2() {
      const dictCode = 'pig:dict:validState'
      getDictListByDictCode(dictCode).then(response => {
        this.$nextTick(() => {
          const option = []
          for (const key in response.data) {
            option.push({ label: response.data[key].label, value: response.data[key].value })
            this.dictMap2[response.data[key].value] = response.data[key].label
          }
          this.dictOption2 = option
        })
      })
    },
    getList() {
      this.listLoading = true
      getFormListPage(this.listQuery).then(response => {
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
        const id = row.formId
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
              saveForm(_this.form).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.dialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            } else {
              updateForm(_this.updateForm).then(response => {
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
        formId: undefined, // 表单编号
        formKey: undefined, // 表单KEY
        formName: undefined, // 表单名称
        tenantId: store.getters.tenantId, // 租户编号
        formType: 1, // 表单类型
        sort: 1, // 排序
        formData: undefined, // 表单数据
        remarks: undefined, // 备注
        validState: 1, // 状态
        createTime: undefined, // 创建时间
        updateTime: undefined, // 更新时间
        operatorId: undefined, // 操作人工号
        operatorName: undefined // 操作人姓名
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
