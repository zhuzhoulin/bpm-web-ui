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
          <el-form-item label="内容编码 ">
            <el-input
              v-model="listQuery.contentCode"
              placeholder="请输入内容编码 "
            />
          </el-form-item>
          <el-form-item label="租户编号 ">
            <el-input
              v-model="listQuery.tenantId"
              placeholder="请输入租户编号 "
            />
          </el-form-item>
          <el-form-item label="通知标题 ">
            <el-input
              v-model="listQuery.messageTitle"
              placeholder="请输入通知标题 "
            />
          </el-form-item>
          <el-form-item label="通知类型 ">
            <el-input
              v-model="listQuery.messageTypeCode"
              placeholder="请输入通知类型 "
            />
          </el-form-item>
          <el-form-item label="触发事件编码 ">
            <el-input
              v-model="listQuery.eventCodes"
              placeholder="请输入触发事件编码 "
            />
          </el-form-item>
          <el-form-item label="触发事件名称 ">
            <el-input
              v-model="listQuery.eventNames"
              placeholder="请输入触发事件名称 "
            />
          </el-form-item>
          <el-form-item label="状态 ">
            <el-switch
              v-model="listQuery.validState"
              :active-value="1"
              :inactive-value="0"
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
            label="通知编号 "
            prop="contentId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="内容编码 "
            prop="contentCode"
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
            label="通知标题 "
            prop="messageTitle"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="通知内容 "
            prop="messageContent"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="通知类型 "
            prop="messageTypeCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="通知系统 "
            prop="messageSystemCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="通知平台  "
            prop="messagePlatform"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="流程编号 "
            prop="processId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="是否为默认版本 "
            prop="defaultFalg"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="触发事件编码 "
            prop="eventCodes"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
            label="触发事件名称 "
            prop="eventNames"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[12].visible"
            label="排序 "
            prop="order"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[13].visible"
            label="备注 "
            prop="remarks"
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
            label="操作人工姓名 "
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
            label="通知编号 :"
            prop="contentId"
          >
            <el-input
              v-model="form.contentId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="内容编码 :"
            prop="contentCode"
          >
            <el-input
              v-model="form.contentCode"
              placeholder="请输入内容编码 "
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
            label="通知标题 :"
            prop="messageTitle"
          >
            <el-input
              v-model="form.messageTitle"
              placeholder="请输入通知标题 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通知内容 :"
            prop="messageContent"
          >
            <el-input
              v-model="form.messageContent"
              type="textarea"
              autosize
              placeholder="请输入通知内容 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通知类型 :"
            prop="messageTypeCode"
          >
            <el-input
              v-model="form.messageTypeCode"
              placeholder="请输入通知类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通知系统 :"
            prop="messageSystemCode"
          >
            <el-input
              v-model="form.messageSystemCode"
              placeholder="请输入通知系统 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通知平台  :"
            prop="messagePlatform"
          >
            <el-input
              v-model="form.messagePlatform"
              placeholder="请输入通知平台  "
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
            label="是否为默认版本 :"
            prop="defaultFalg"
          >
            <el-input
              v-model="form.defaultFalg"
              placeholder="请输入是否为默认版本 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="触发事件编码 :"
            prop="eventCodes"
          >
            <el-input
              v-model="form.eventCodes"
              placeholder="请输入触发事件编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="触发事件名称 :"
            prop="eventNames"
          >
            <el-input
              v-model="form.eventNames"
              placeholder="请输入触发事件名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="排序 :"
            prop="order"
          >
            <el-input
              v-model="form.order"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <el-input
              v-model="form.remarks"
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
            label="操作人工姓名 :"
            prop="operatorName"
          >
            <el-input
              v-model="form.operatorName"
              placeholder="请输入操作人工姓名 "
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
            label="通知编号 :"
            prop="contentId"
          >
            <el-input
              v-model="updateForm.contentId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="内容编码 :"
            prop="contentCode"
          >
            <el-input
              v-model="updateForm.contentCode"
              placeholder="请输入内容编码 "
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
            label="通知标题 :"
            prop="messageTitle"
          >
            <el-input
              v-model="updateForm.messageTitle"
              placeholder="请输入通知标题 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通知内容 :"
            prop="messageContent"
          >
            <el-input
              v-model="updateForm.messageContent"
              type="textarea"
              autosize
              placeholder="请输入通知内容 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通知类型 :"
            prop="messageTypeCode"
          >
            <el-input
              v-model="updateForm.messageTypeCode"
              placeholder="请输入通知类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通知系统 :"
            prop="messageSystemCode"
          >
            <el-input
              v-model="updateForm.messageSystemCode"
              placeholder="请输入通知系统 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通知平台  :"
            prop="messagePlatform"
          >
            <el-input
              v-model="updateForm.messagePlatform"
              placeholder="请输入通知平台  "
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
            label="是否为默认版本 :"
            prop="defaultFalg"
          >
            <el-input
              v-model="updateForm.defaultFalg"
              placeholder="请输入是否为默认版本 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="触发事件编码 :"
            prop="eventCodes"
          >
            <el-input
              v-model="updateForm.eventCodes"
              placeholder="请输入触发事件编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="触发事件名称 :"
            prop="eventNames"
          >
            <el-input
              v-model="updateForm.eventNames"
              placeholder="请输入触发事件名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="排序 :"
            prop="order"
          >
            <el-input
              v-model="updateForm.order"
              placeholder="请输入排序 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="备注 :"
            prop="remarks"
          >
            <el-input
              v-model="updateForm.remarks"
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
            label="操作人工姓名 :"
            prop="operatorName"
          >
            <el-input
              v-model="updateForm.operatorName"
              placeholder="请输入操作人工姓名 "
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
  getMessageContentListPage,
  saveMessageContent,
  updateMessageContent,
  deleteById,
  download
} from '@/api/system/messageContent'
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
        { key: 0, value: 'contentId', label: '通知编号 ', visible: true },
        { key: 1, value: 'contentCode', label: '内容编码 ', visible: true },
        { key: 2, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 3, value: 'messageTitle', label: '通知标题 ', visible: true },
        { key: 4, value: 'messageContent', label: '通知内容 ', visible: true },
        { key: 5, value: 'messageTypeCode', label: '通知类型 ', visible: true },
        {
          key: 6,
          value: 'messageSystemCode',
          label: '通知系统 ',
          visible: true
        },
        {
          key: 7,
          value: 'messagePlatform',
          label: '通知平台  ',
          visible: true
        },
        { key: 8, value: 'processId', label: '流程编号 ', visible: true },
        {
          key: 9,
          value: 'defaultFalg',
          label: '是否为默认版本 ',
          visible: true
        },
        { key: 10, value: 'eventCodes', label: '触发事件编码 ', visible: true },
        { key: 11, value: 'eventNames', label: '触发事件名称 ', visible: true },
        { key: 12, value: 'order', label: '排序 ', visible: true },
        { key: 13, value: 'remarks', label: '备注 ', visible: true },
        { key: 14, value: 'validState', label: '状态 ', visible: true },
        { key: 15, value: 'operatorId', label: '操作人工号 ', visible: true },
        {
          key: 16,
          value: 'operatorName',
          label: '操作人工姓名 ',
          visible: true
        },
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
        contentCode: undefined,
        tenantId: undefined,
        messageTitle: undefined,
        messageTypeCode: undefined,
        eventCodes: undefined,
        eventNames: undefined,
        validState: undefined
      },
      input: '',
      form: {
        contentId: undefined, // 通知编号
        contentCode: undefined, // 内容编码
        tenantId: undefined, // 租户编号
        messageTitle: undefined, // 通知标题
        messageContent: undefined, // 通知内容
        messageTypeCode: undefined, // 通知类型
        messageSystemCode: undefined, // 通知系统
        messagePlatform: undefined, // 通知平台
        processId: undefined, // 流程编号
        defaultFalg: undefined, // 是否为默认版本
        eventCodes: undefined, // 触发事件编码
        eventNames: undefined, // 触发事件名称
        order: undefined, // 排序
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人工姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        contentId: undefined, // 通知编号
        contentCode: undefined, // 内容编码
        tenantId: undefined, // 租户编号
        messageTitle: undefined, // 通知标题
        messageContent: undefined, // 通知内容
        messageTypeCode: undefined, // 通知类型
        messageSystemCode: undefined, // 通知系统
        messagePlatform: undefined, // 通知平台
        processId: undefined, // 流程编号
        defaultFalg: undefined, // 是否为默认版本
        eventCodes: undefined, // 触发事件编码
        eventNames: undefined, // 触发事件名称
        order: undefined, // 排序
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人工姓名
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
        contentId: [],
        contentCode: [
          { required: true, message: '请输入内容编码', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '请输入租户编号', trigger: 'blur' }
        ],
        messageTitle: [
          { required: true, message: '请输入通知标题', trigger: 'blur' }
        ],
        messageContent: [
          { required: true, message: '请输入通知内容', trigger: 'blur' }
        ],
        messageTypeCode: [
          { required: true, message: '请输入通知类型', trigger: 'blur' }
        ],
        messageSystemCode: [],
        messagePlatform: [],
        processId: [],
        defaultFalg: [],
        eventCodes: [
          { required: true, message: '请输入触发事件编码', trigger: 'blur' }
        ],
        eventNames: [
          { required: true, message: '请输入触发事件名称', trigger: 'blur' }
        ],
        order: [],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        contentId: [],
        contentCode: [
          { required: true, message: '请输入内容编码', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '请输入租户编号', trigger: 'blur' }
        ],
        messageTitle: [
          { required: true, message: '请输入通知标题', trigger: 'blur' }
        ],
        messageContent: [
          { required: true, message: '请输入通知内容', trigger: 'blur' }
        ],
        messageTypeCode: [
          { required: true, message: '请输入通知类型', trigger: 'blur' }
        ],
        messageSystemCode: [],
        messagePlatform: [],
        processId: [],
        defaultFalg: [],
        eventCodes: [
          { required: true, message: '请输入触发事件编码', trigger: 'blur' }
        ],
        eventNames: [
          { required: true, message: '请输入触发事件名称', trigger: 'blur' }
        ],
        order: [],
        remarks: [],
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
      getMessageContentListPage(this.listQuery)
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
          const id = row.contentId
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
              saveMessageContent(_this.form)
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
              updateMessageContent(_this.updateForm)
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
        contentId: undefined, // 通知编号
        contentCode: undefined, // 内容编码
        tenantId: undefined, // 租户编号
        messageTitle: undefined, // 通知标题
        messageContent: undefined, // 通知内容
        messageTypeCode: undefined, // 通知类型
        messageSystemCode: undefined, // 通知系统
        messagePlatform: undefined, // 通知平台
        processId: undefined, // 流程编号
        defaultFalg: undefined, // 是否为默认版本
        eventCodes: undefined, // 触发事件编码
        eventNames: undefined, // 触发事件名称
        order: undefined, // 排序
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人工姓名
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
