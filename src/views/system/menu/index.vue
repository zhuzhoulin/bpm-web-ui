<template>
  <div class="app-container">
    <div>
      <div v-if="showSearch" class="filter-container">
        <el-form :inline="true" :model="listQuery" label-width="auto">
          <el-form-item label="资源编码 ">
            <el-input v-model="listQuery.menuCode" placeholder="请输入资源编码 " clearable />
          </el-form-item>
          <el-form-item label="资源名称 ">
            <el-input v-model="listQuery.menuName" placeholder="请输入资源名称 " clearable />
          </el-form-item>
          <el-form-item label="资源类型 ">
            <el-input v-model="listQuery.menuType" placeholder="请输入资源类型 " clearable />
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
          <el-table-column v-if="columns[0].visible" label="编号 " prop="menuId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[1].visible" label="资源编码 " prop="menuCode" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[2].visible" label="资源名称 " prop="menuName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[3].visible" label="资源图标 " prop="menuIcon" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[4].visible" label="资源地址 " prop="menuUrl" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[5].visible" label="资源类型 " prop="menuType" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[6].visible" label="元数据 " prop="meta" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[7].visible" label="显示 " prop="alwaysShow" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[8].visible" label="父级编号 " prop="parentId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[9].visible" label="租户编号 " prop="tenantId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[10].visible" label="组件地址 " prop="component" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[11].visible" label="隐藏 " prop="hidden" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[12].visible" label="排序 " prop="sort" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[13].visible" label="重定向值 " prop="redirect" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[14].visible" label="备注 " prop="remarks" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[15].visible" label="状态" prop="validState" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[16].visible" label="操作者工号 " prop="operatorId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[17].visible" label="操作人名称 " prop="operatorName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[18].visible" label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[19].visible" label="更新时间" align="center">
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
          <el-form-item v-if="true" label="编号 :" prop="menuId">
            <el-input v-model="form.menuId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="资源编码 :" prop="menuCode">
            <el-input
              v-model="form.menuCode"
              placeholder="请输入资源编码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="资源名称 :" prop="menuName">
            <el-input
              v-model="form.menuName"
              placeholder="请输入资源名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="资源图标 :" prop="menuIcon">
            <IconSelect
              v-model="form.menuIcon"
              :value="form.menuIcon"
              placeholder="请选择资源图标"
            />
          </el-form-item>
          <el-form-item v-if="true" label="资源地址 :" prop="menuUrl">
            <el-input
              v-model="form.menuUrl"
              placeholder="请输入资源地址 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="资源类型 :" prop="menuType">

            <el-radio-group v-model="form.menuType">
              <el-radio
                v-for="(item) in menuTypeOption"
                :key="item.value"
                :label="item.value"
              >{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="true" label="元数据 :" prop="meta">
            <el-input
              v-model="form.meta"
              placeholder="请输入元数据 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="显示 :" prop="alwaysShow">

            <el-switch
              v-model="form.alwaysShow"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="不显示"
            />
          </el-form-item>
          <el-form-item v-if="true" label="父级编号 :" prop="parentId">
            <treeselect v-model="form.parentId" :options="menuOptions" :normalizer="menuNormalizer" placeholder="请选择父级编号" />
          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="form.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="组件地址 :" prop="component">
            <el-input
              v-model="form.component"
              placeholder="请输入组件地址 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="隐藏 :" prop="hidden">
            <el-switch
              v-model="form.hidden"
              :active-value="1"
              :inactive-value="0"
              active-text="隐藏"
              inactive-text="不隐藏"
            />
          </el-form-item>
          <el-form-item v-if="true" label="排序 :" prop="sort">
            <el-input-number
              v-model="form.sort"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="重定向值 :" prop="redirect">
            <el-input
              v-model="form.redirect"
              placeholder="请输入重定向值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remarks">
            <el-input
              v-model="form.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="状态 :" prop="validState">
            <el-switch
              v-model="form.validState"
              :active-value="1"
              :inactive-value="0"
              active-text="有效"
              inactive-text="失效"
            />
          </el-form-item>
          <el-form-item v-if="false" label="操作者工号 :" prop="operatorId">
            <el-input
              v-model="form.operatorId"
              placeholder="请输入操作者工号 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="操作人名称 :" prop="operatorName">
            <el-input
              v-model="form.operatorName"
              placeholder="请输入操作人名称 "
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
          <el-form-item v-if="true" label="编号 :" prop="menuId">
            <el-input v-model="updateForm.menuId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="资源编码 :" prop="menuCode">
            <el-input
              v-model="updateForm.menuCode"
              placeholder="请输入资源编码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="资源名称 :" prop="menuName">
            <el-input
              v-model="updateForm.menuName"
              placeholder="请输入资源名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="资源图标 :" prop="menuIcon">
            <IconSelect
              v-model="updateForm.menuIcon"
              :value="updateForm.menuIcon"
              placeholder="请选择资源图标"
            />
          </el-form-item>
          <el-form-item v-if="true" label="资源地址 :" prop="menuUrl">
            <el-input
              v-model="updateForm.menuUrl"
              placeholder="请输入资源地址 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="资源类型 :" prop="menuType">

            <el-radio-group v-model="updateForm.menuType">
              <el-radio
                v-for="(item) in menuTypeOption"
                :key="item.value"
                :label="item.value"
              >{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="true" label="元数据 :" prop="meta">
            <el-input
              v-model="updateForm.meta"
              placeholder="请输入元数据 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="显示 :" prop="alwaysShow">
            <el-switch
              v-model="updateForm.alwaysShow"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="不显示"
            />
          </el-form-item>
          <el-form-item v-if="true" label="父级编号 :" prop="parentId">
            <treeselect v-model="updateForm.parentId" :options="menuOptions" :normalizer="menuNormalizer" placeholder="请选择父级编号" />

          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="updateForm.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="组件地址 :" prop="component">
            <el-input
              v-model="updateForm.component"
              placeholder="请输入组件地址 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="隐藏 :" prop="hidden">
            <el-switch
              v-model="updateForm.hidden"
              :active-value="1"
              :inactive-value="0"
              active-text="隐藏"
              inactive-text="不隐藏"
            />
          </el-form-item>
          <el-form-item v-if="true" label="排序 :" prop="sort">
            <el-input-number
              v-model="updateForm.sort"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="重定向值 :" prop="redirect">
            <el-input
              v-model="updateForm.redirect"
              placeholder="请输入重定向值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remarks">
            <el-input
              v-model="updateForm.remarks"
              placeholder="请输入备注 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="状态 :" prop="validState">
            <el-switch
              v-model="form.validState"
              :active-value="1"
              :inactive-value="0"
              active-text="有效"
              inactive-text="失效"
            />
          </el-form-item>
          <el-form-item v-if="false" label="操作者工号 :" prop="operatorId">
            <el-input
              v-model="updateForm.operatorId"
              placeholder="请输入操作者工号 "
            />
          </el-form-item>
          <el-form-item v-if="false" label="操作人名称 :" prop="operatorName">
            <el-input
              v-model="updateForm.operatorName"
              placeholder="请输入操作人名称 "
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
import { getMenuListPage, getMenuList, saveMenu, updateMenu, deleteById, download } from '@/api/system/menu'
import { getListByDictCode } from '@/api/system/dictItem'

import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import IconSelect from '@/components/IconSelect'

export default {
  components: { Pagination, IconSelect },
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
      menuOptions: [],
      menuTypeOption: [],
      menuTypeMap: {},
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: [
        'operatorId',
        'createTime'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'menuId', label: '编号 ', visible: true },
        { key: 1, value: 'menuCode', label: '资源编码 ', visible: true },
        { key: 2, value: 'menuName', label: '资源名称 ', visible: true },
        { key: 3, value: 'menuIcon', label: '资源图标 ', visible: true },
        { key: 4, value: 'menuUrl', label: '资源地址 ', visible: true },
        { key: 5, value: 'menuType', label: '资源类型 ', visible: true },
        { key: 6, value: 'meta', label: '元数据 ', visible: true },
        { key: 7, value: 'alwaysShow', label: '显示 ', visible: true },
        { key: 8, value: 'parentId', label: '父级编号 ', visible: true },
        { key: 9, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 10, value: 'component', label: '组件地址 ', visible: true },
        { key: 11, value: 'hidden', label: '隐藏 ', visible: true },
        { key: 12, value: 'sort', label: '排序 ', visible: true },
        { key: 13, value: 'redirect', label: '重定向值 ', visible: true },
        { key: 14, value: 'remarks', label: '备注 ', visible: true },
        { key: 15, value: 'validState', label: '状态 ', visible: true },
        { key: 16, value: 'operatorId', label: '操作者工号 ', visible: true },
        { key: 17, value: 'operatorName', label: '操作人名称 ', visible: true },
        { key: 18, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 19, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        menuCode: undefined,
        menuName: undefined,
        menuType: undefined
      },
      input: '',
      form: {
        menuId: undefined, // 编号
        menuCode: undefined, // 资源编码
        menuName: undefined, // 资源名称
        menuIcon: undefined, // 资源图标
        menuUrl: undefined, // 资源地址
        menuType: 'menu', // 资源类型
        meta: undefined, // 元数据
        alwaysShow: undefined, // 显示
        parentId: undefined, // 父级编号
        tenantId: undefined, // 租户编号
        component: undefined, // 组件地址
        hidden: undefined, // 隐藏
        sort: 1, // 排序
        redirect: undefined, // 重定向值
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作者工号
        operatorName: undefined, // 操作人名称
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        menuId: undefined, // 编号
        menuCode: undefined, // 资源编码
        menuName: undefined, // 资源名称
        menuIcon: undefined, // 资源图标
        menuUrl: undefined, // 资源地址
        menuType: undefined, // 资源类型
        meta: undefined, // 元数据
        alwaysShow: undefined, // 显示
        parentId: undefined, // 父级编号
        tenantId: undefined, // 租户编号
        component: undefined, // 组件地址
        hidden: undefined, // 隐藏
        sort: undefined, // 排序
        redirect: undefined, // 重定向值
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作者工号
        operatorName: undefined, // 操作人名称
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
        menuId: [
        ],
        menuCode: [
          { required: true, messages: '请输入资源编码', trigger: 'blur' }
        ],
        menuName: [
          { required: true, messages: '请输入资源名称', trigger: 'blur' }
        ],
        menuIcon: [
        ],
        menuUrl: [
        ],
        menuType: [
        ],
        meta: [
        ],
        alwaysShow: [
        ],
        parentId: [
        ],
        tenantId: [
        ],
        component: [
        ],
        hidden: [
        ],
        sort: [
        ],
        redirect: [
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
        menuId: [
        ],
        menuCode: [
          { required: true, messages: '请输入资源编码', trigger: 'blur' }
        ],
        menuName: [
          { required: true, messages: '请输入资源名称', trigger: 'blur' }
        ],
        menuIcon: [
        ],
        menuUrl: [
        ],
        menuType: [
        ],
        meta: [
        ],
        alwaysShow: [
        ],
        parentId: [
        ],
        tenantId: [
        ],
        component: [
        ],
        hidden: [
        ],
        sort: [
        ],
        redirect: [
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
    this.getMenuTree()
    this.getMenuTypeDict()
  },
  methods: {
    getMenuTypeDict() {
      const menuTypeDictCode = 'pig:dict:menuType'
      getListByDictCode(menuTypeDictCode).then(response => {
        this.$nextTick(() => {
          const menuTypeOption = []
          for (const key in response.data) {
            menuTypeOption.push({ label: response.data[key].itemText, value: response.data[key].itemValue })
            this.menuTypeMap[response.data[key].itemValue] = response.data[key].itemText
          }
          this.menuTypeOption = menuTypeOption
        })
      })
    },
    getMenuTree() {
      const that = this
      getMenuList({}).then(response => {
        that.menuOptions = that.handleTree(response.data, 'menuId', 'parentId')
      })
    },
    menuNormalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children
      }
    },
    getList() {
      this.listLoading = true
      getMenuListPage(this.listQuery).then(response => {
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
        const id = row.menuId
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
              saveMenu(_this.form).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.dialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            } else {
              updateMenu(_this.updateForm).then(response => {
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
        menuId: undefined, // 编号
        menuCode: undefined, // 资源编码
        menuName: undefined, // 资源名称
        menuIcon: 'tree', // 资源图标
        menuUrl: undefined, // 资源地址
        menuType: 'menu', // 资源类型
        meta: undefined, // 元数据
        alwaysShow: undefined, // 显示
        parentId: undefined, // 父级编号
        tenantId: undefined, // 租户编号
        component: undefined, // 组件地址
        hidden: undefined, // 隐藏
        sort: 1, // 排序
        redirect: undefined, // 重定向值
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作者工号
        operatorName: undefined, // 操作人名称
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
