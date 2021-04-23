<template>
  <div class="app-container">
    <div>
      <div v-if="showSearch" class="filter-container">
        <el-form :inline="true" :model="listQuery" label-width="auto">

          <el-form-item label="字段英文名称 ">
            <el-input v-model="listQuery.dataKey" placeholder="请输入字段英文名称 " />
          </el-form-item>
          <el-form-item label="字段中文名称 ">
            <el-input v-model="listQuery.dataName" placeholder="请输入字段中文名称 " />
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
          <el-table-column v-if="columns[0].visible" label="编号  " prop="variableId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[1].visible" label="流程编号 " prop="processId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[2].visible" label="租户编号 " prop="tenantId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[3].visible" label="字段英文名称 " prop="dataKey" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[4].visible" label="字段中文名称 " prop="dataName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[5].visible" label="数据类型 " prop="dataType" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[6].visible" label="校验规则 " prop="checkRule" align="center" sortable :show-overflow-tooltip="true" />
          <!-- <el-table-column v-if="columns[7].visible" label="特殊值1 " prop="specialValue" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[8].visible" label="特殊值2 " prop="specialValue2" align="center" sortable :show-overflow-tooltip="true" /> -->
          <el-table-column v-if="columns[9].visible" label="变量类型 " prop="processData" align="center" sortable :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{ dictMap1[scope.row.processData] }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[10].visible" label="排序值 " prop="sort" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[11].visible" label="编辑 " prop="allowEditUsertaskDesc" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[12].visible" label="隐藏 " prop="notAllowReadUsertaskDesc" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[13].visible" label="必传 " prop="requiredUsertaskDesc" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[14].visible" label="备注 " prop="remarks" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[15].visible" label="状态" prop="validState" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[16].visible" label="操作人工号 " prop="operatorId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[17].visible" label="操作人姓名 " prop="operatorName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[18].visible" label="创建时间 " align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[19].visible" label="更新时间 " align="center">
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

      <el-dialog :title="titleMap[dialogStatus]" append-to-body :visible.sync="dialogVisible" width="40%" :before-close="handleClose" @close="handleDialogClose">
        <el-form ref="dataForm" :model="form" :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="true" label="编号  :" prop="variableId">
            <el-input v-model="form.variableId" disabled />

          </el-form-item>
          <!-- <el-form-item v-if="true" label="流程编号 :" prop="processId">
            <el-input
              v-model="form.processId"
              placeholder="请输入流程编号 "
            />
          </el-form-item> -->
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="form.tenantId"
              disabled
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段英文名称 :" prop="dataKey">
            <el-input
              v-model="form.dataKey"
              placeholder="请输入字段英文名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段中文名称 :" prop="dataName">
            <el-input
              v-model="form.dataName"
              placeholder="请输入字段中文名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="数据类型 :" prop="dataType">

            <el-select v-model="form.dataType" placeholder="请选择">
              <el-option
                v-for="(item,index) in dataTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="true" label="校验规则 :" prop="checkRule">
            <el-input
              v-model="form.checkRule"
              placeholder="请输入校验规则 "
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="特殊值1 :" prop="specialValue">
            <el-input
              v-model="form.specialValue"
              placeholder="请输入特殊值1 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="特殊值2 :" prop="specialValue2">
            <el-input
              v-model="form.specialValue2"
              placeholder="请输入特殊值2 "
            />
          </el-form-item> -->
          <el-form-item v-if="true" label="变量类型 :" prop="processData">
            <el-switch v-model="updateForm.processData" active-text="流程变量" inactive-text="普通变量">

            <!-- <el-radio-group v-model.number="form.processData">
              <el-radio
                v-for="(item) in dictOption1"
                :key="item.value"
                :label="item.value"
              >{{ item.label }}</el-radio>
            </el-radio-group> -->
            </el-switch></el-form-item>
          <el-form-item v-if="true" label="排序值 :" prop="sort">
            <el-input-number
              v-model="form.sort"
              placeholder="请输入排序值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="允许编辑 :" prop="allowEditNodeId">
            <!-- <el-input
              v-model="form.allowEditNodeId"
              placeholder="请输入允许编辑 "
            /> -->
            <el-select v-model="form.allowEditNodeIdList" placeholder="允许编辑节点" clearable multiple>
              <el-option
                v-for="(item) in nodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select></el-form-item>
          <el-form-item v-if="true" label="隐藏 :" prop="hiddenNodeId">
            <!-- <el-input
              v-model="form.hiddenNodeId"
              placeholder="请输入隐藏 "
            /> -->
            <el-select v-model="form.hiddenNodeIdList" placeholder="隐藏节点" clearable multiple>
              <el-option
                v-for="(item) in nodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select></el-form-item>
          <el-form-item v-if="true" label="必传 :" prop="requiredNodeId">
            <!-- <el-input
              v-model="form.requiredNodeId"
              placeholder="请输入必传 "
            /> -->
            <el-select v-model="form.requiredNodeIdList" placeholder="必传节点" clearable multiple>
              <el-option
                v-for="(item) in nodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remarks">
            <el-input
              v-model="form.remarks"
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

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="updateDialogVisible" width="40%" :before-close="handleClose" append-to-body @close="handleDialogClose">
        <el-form ref="updateDataForm" :model="updateForm" :rules="updateRules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="true" label="编号  :" prop="variableId">
            <el-input v-model="updateForm.variableId" disabled />

          </el-form-item>
          <!-- <el-form-item v-if="true" label="流程编号 :" prop="processId">
            <el-input
              v-model="updateForm.processId"
              placeholder="请输入流程编号 "
            />
          </el-form-item> -->
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="updateForm.tenantId"
              disabled
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段英文名称 :" prop="dataKey">
            <el-input
              v-model="updateForm.dataKey"
              placeholder="请输入字段英文名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段中文名称 :" prop="dataName">
            <el-input
              v-model="updateForm.dataName"
              placeholder="请输入字段中文名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="数据类型 :" prop="dataType">
            <el-select v-model="updateForm.dataType" placeholder="请选择">
              <el-option
                v-for="(item,index) in dataTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="true" label="校验规则 :" prop="checkRule">
            <el-input
              v-model="updateForm.checkRule"
              placeholder="请输入校验规则 "
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="特殊值1 :" prop="specialValue">
            <el-input
              v-model="updateForm.specialValue"
              placeholder="请输入特殊值1 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="特殊值2 :" prop="specialValue2">
            <el-input
              v-model="updateForm.specialValue2"
              placeholder="请输入特殊值2 "
            />
          </el-form-item> -->
          <el-form-item v-if="true" label="变量类型 :" prop="processData">
            <el-switch v-model="updateForm.processData" active-text="流程变量" inactive-text="普通变量">
            <!-- <el-radio-group v-model="updateForm.processData">
              <el-radio
                v-for="(item) in dictOption1"
                :key="item.value"
                :label="item.value"
              >{{ item.label }}</el-radio>
            </el-radio-group> -->
            </el-switch></el-form-item>
          <el-form-item v-if="true" label="排序值 :" prop="sort">
            <el-input-number
              v-model="updateForm.sort"
              placeholder="请输入排序值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="允许编辑 :" prop="allowEditNodeId">
            <!-- <el-input
              v-model="updateForm.allowEditNodeId"
              placeholder="请输入允许编辑 "
            /> -->
            <el-select v-model="updateForm.allowEditNodeIdList" placeholder="允许编辑节点" clearable multiple>
              <el-option
                v-for="(item) in nodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="true" label="隐藏 :" prop="hiddenNodeId">
            <!-- <el-input
              v-model="updateForm.hiddenNodeId"
              placeholder="请输入隐藏 "
            /> -->
            <el-select v-model="updateForm.hiddenNodeIdList" placeholder="隐藏当前字段节点" clearable multiple>
              <el-option
                v-for="(item) in nodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="true" label="必传 :" prop="requiredNodeId">
            <!-- <el-input
              v-model="updateForm.requiredNodeId"
              placeholder="请输入必传 "
            /> -->
            <el-select v-model="updateForm.requiredNodeIdList" placeholder="必传节点" clearable multiple>
              <el-option
                v-for="(item) in nodeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="true" label="备注 :" prop="remarks">
            <el-input
              v-model="updateForm.remarks"
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
import { getVariableDictListPage, saveVariableDict, updateVariableDict, deleteById, download } from '@/api/system/variableDict'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { getDictListByDictCode } from '@/api/system/dict'
import store from '@/store'

export default {
  name: 'VarDict',
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
    bpmnModeler: {
      type: Object,
      required: true
    },
    processInfo: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      tempProcessKey: '',
      tempProcessId: undefined,
      variableData: [],
      dictOption1: [],
      dictMap1: {},
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: [
        'operatorId',
        'createTime',
        'processId'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'variableId', label: '编号  ', visible: true },
        { key: 1, value: 'processId', label: '流程编号 ', visible: true },
        { key: 2, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 3, value: 'dataKey', label: '字段英文名称 ', visible: true },
        { key: 4, value: 'dataName', label: '字段中文名称 ', visible: true },
        { key: 5, value: 'dataType', label: '数据类型 ', visible: true },
        { key: 6, value: 'checkRule', label: '校验规则 ', visible: true },
        { key: 7, value: 'specialValue', label: '特殊值1 ', visible: true },
        { key: 8, value: 'specialValue2', label: '特殊值2 ', visible: true },
        { key: 9, value: 'processData', label: '变量类型 ', visible: true },
        { key: 10, value: 'sort', label: '排序值 ', visible: true },
        { key: 11, value: 'allowEditNodeId', label: '允许编辑 ', visible: true },
        { key: 12, value: 'hiddenNodeId', label: '隐藏 ', visible: true },
        { key: 13, value: 'requiredNodeId', label: '必传 ', visible: true },
        { key: 14, value: 'remarks', label: '备注 ', visible: true },
        { key: 15, value: 'validState', label: '状态 ', visible: true },
        { key: 16, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 17, value: 'operatorName', label: '操作人姓名 ', visible: true },
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
        processId: undefined,
        dataKey: undefined,
        dataName: undefined,
        processData: undefined
      },
      input: '',
      form: {
        variableId: undefined, // 编号
        processId: undefined, // 流程编号
        tenantId: undefined, // 租户编号
        dataKey: undefined, // 字段英文名称
        dataName: undefined, // 字段中文名称
        dataType: undefined, // 数据类型
        checkRule: undefined, // 校验规则
        specialValue: undefined, // 特殊值1
        specialValue2: undefined, // 特殊值2
        processData: undefined, // 变量类型
        sort: undefined, // 排序值
        allowEditNodeId: undefined, // 允许编辑
        hiddenNodeId: undefined, // 隐藏
        requiredNodeId: undefined, // 必传
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined, // 更新时间,
        allowEditNodeIdList: [],
        hiddenNodeIdList: [],
        requiredNodeIdList: []
      },
      updateForm: {
        variableId: undefined, // 编号
        processId: undefined, // 流程编号
        tenantId: undefined, // 租户编号
        dataKey: undefined, // 字段英文名称
        dataName: undefined, // 字段中文名称
        dataType: undefined, // 数据类型
        checkRule: undefined, // 校验规则
        specialValue: undefined, // 特殊值1
        specialValue2: undefined, // 特殊值2
        processData: undefined, // 变量类型
        sort: undefined, // 排序值
        allowEditNodeId: undefined, // 允许编辑
        hiddenNodeId: undefined, // 隐藏
        requiredNodeId: undefined, // 必传
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined, // 更新时间
        allowEditNodeIdList: [],
        hiddenNodeIdList: [],
        requiredNodeIdList: []
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        variableId: [
        ],
        processId: [
        ],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        dataKey: [
          { required: true, messages: '请输入字段英文名称', trigger: 'blur' }
        ],
        dataName: [
          { required: true, messages: '请输入字段中文名称', trigger: 'blur' }
        ],
        dataType: [
          { required: true, messages: '请选择数据类型', trigger: 'change' }
        ],
        checkRule: [
        ],
        specialValue: [
        ],
        specialValue2: [
        ],
        processData: [
        ],
        sort: [
          { required: true, messages: '请输入排序值', trigger: 'blur', type: 'number' }
        ],
        allowEditNodeId: [
        ],
        hiddenNodeId: [
        ],
        requiredNodeId: [
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
        variableId: [
        ],
        processId: [
        ],
        tenantId: [
          { required: true, messages: '请输入租户编号', trigger: 'blur' }
        ],
        dataKey: [
          { required: true, messages: '请输入字段英文名称', trigger: 'blur' }
        ],
        dataName: [
          { required: true, messages: '请输入字段中文名称', trigger: 'blur' }
        ],
        dataType: [
          { required: true, messages: '请选择数据类型', trigger: 'change' }
        ],
        checkRule: [
        ],
        specialValue: [
        ],
        specialValue2: [
        ],
        processData: [
        ],
        sort: [
          { required: true, messages: '请输入排序值', trigger: 'blur', type: 'number' }
        ],
        allowEditNodeId: [
        ],
        hiddenNodeId: [
        ],
        requiredNodeId: [
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
      nodeList: [],
      nodeMap: {},
      dataTypeOptions: [],
      dataTypeMap: {}
    }
  },
  watch: {
    processInfo: {
      handler(newValue, oldValue) {
        this.tempProcessId = newValue.processId
      },
      deep: true
    }
  },
  created() {
    this.tempProcessId = this.processInfo.processId
    this.listQuery = {
      pageIndex: 1,
      pageSize: 10,
      processId: this.tempProcessId,
      dataKey: undefined,
      dataName: undefined,
      processData: undefined,
      tenantId: store.getters.tenantId
    }
    this.getList()
    this.getDict2()
    this.getNodeList()
  },
  methods: {
    getNodeList() {
      const that = this
      that.loading = true
      const nodeList = [{ 'value': 'all', 'label': '所有' }]
      const nodeMap = { 'all': '所有' }
      try {
        for (var index in that.bpmnModeler._definitions.$model.ids._seed.hats) {
          if (that.bpmnModeler._definitions.$model.ids._seed.hats[index].$type !== 'bpmn:UserTask') continue
          nodeList.push({
            'value': that.bpmnModeler._definitions.$model.ids._seed.hats[index].id,
            'label': that.bpmnModeler._definitions.$model.ids._seed.hats[index].name,
            'start': false })
          nodeMap[that.bpmnModeler._definitions.$model.ids._seed.hats[index].id] = that.bpmnModeler._definitions.$model.ids._seed.hats[index].name
        }
      } catch (e) {
        console.error(e)
      }
      that.nodeList = nodeList
      that.nodeMap = nodeMap
      that.$nextTick(() => {
        that.loading = false
      })
    },
    getDict2() {
      const dictCode = 'pig:dict:processDataType'
      getDictListByDictCode(dictCode).then(response => {
        this.$nextTick(() => {
          const option = []
          for (const key in response.data) {
            option.push({ label: response.data[key].label, value: response.data[key].value })
            this.dataTypeMap[response.data[key].value] = response.data[key].label
          }
          this.dataTypeOptions = option
        })
      })
    },

    getList() {
      this.listLoading = true
      getVariableDictListPage(this.listQuery).then(response => {
        const list = []
        for (var i in response.data.list) {
          var dict = response.data.list[i]
          var allowEditUsertaskList = this.splitNode(dict.allowEditNodeId)
          var notAllowReadUsertaskList = this.splitNode(dict.hiddenNodeId)
          var requiredUsertaskList = this.splitNode(dict.requiredNodeId)
          dict.allowEditUsertaskDesc = this.joinNodeDesc(allowEditUsertaskList)
          dict.notAllowReadUsertaskDesc = this.joinNodeDesc(notAllowReadUsertaskList)
          dict.requiredUsertaskDesc = this.joinNodeDesc(requiredUsertaskList)
          list.push(dict)
        }
        this.list = list
        this.total = response.data.total
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.log(err)
      })
    },
    splitNode(str) {
      if (str === undefined || str === null || str === '') {
        return []
      }
      const array = []
      str.split(',').forEach(element => {
        if (element === undefined || element === null || element === '') return
        if (element === 'start') {
          // start 为特殊节点
          this.nodeList.forEach(item => {
            if (item.start) {
              element = item.value
              return
            }
          })
        }
        array.push(element)
      })
      return array
    },
    joinNodeDesc(list) {
      if (list === undefined || list === null) {
        return ''
      }
      const descList = []
      list.forEach(element => {
        if (element === undefined || element === null || element === '') return
        descList.push(this.nodeMap[element])
      })
      return descList.join(',')
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

      this.updateForm.requiredNodeIdList = this.updateForm.requiredNodeId === '' ? [] : this.updateForm.requiredNodeId.split(',') || []
      this.updateForm.allowEditNodeIdList = this.updateForm.allowEditNodeId === '' ? [] : this.updateForm.allowEditNodeId.split(',') || []
      this.updateForm.hiddenNodeIdList = this.updateForm.hiddenNodeId === '' ? [] : this.updateForm.hiddenNodeId.split(',') || []
      this.dialogStatus = 'update'
      this.updateDialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确定关闭吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        done()
      }).catch(_ => {})
    },
    handleDelete(row) {
      const _this = this
      _this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        const id = row.variableId
        deleteById(id).then(response => {
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
      const refForm = _this.dialogStatus === 'create' ? 'dataForm' : 'updateDataForm'
      _this.$refs[`${refForm}`].validate(valid => {
        if (valid) {
          this.$confirm('确定操作吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function() {
            const postData = _this.dialogStatus === 'create' ? _this.form : _this.updateForm
            postData.requiredNodeId = postData.requiredNodeIdList.join(',') || ''
            postData.allowEditNodeId = postData.allowEditNodeIdList.join(',') || ''
            postData.hiddenNodeId = postData.hiddenNodeIdList.join(',') || ''

            if (_this.dialogStatus === 'create') {
              saveVariableDict(postData).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.dialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            } else {
              updateVariableDict(postData).then(response => {
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
        variableId: undefined, // 编号
        processId: this.tempProcessId, // 流程编号
        tenantId: store.getters.tenantId, // 租户编号
        dataKey: undefined, // 字段英文名称
        dataName: undefined, // 字段中文名称
        dataType: undefined, // 数据类型
        checkRule: undefined, // 校验规则
        specialValue: undefined, // 特殊值1
        specialValue2: undefined, // 特殊值2
        processData: 0, // 变量类型
        sort: 1, // 排序值
        allowEditNodeId: undefined, // 允许编辑
        hiddenNodeId: undefined, // 隐藏
        requiredNodeId: undefined, // 必传
        remarks: undefined, // 备注
        validState: 1, // 状态
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
