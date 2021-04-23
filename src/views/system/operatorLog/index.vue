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
          <el-form-item label="操作用户工号 ">
            <el-input
              v-model="listQuery.userId"
              placeholder="请输入操作用户工号 "
            />
          </el-form-item>
          <el-form-item label="操作用户 ">
            <el-input
              v-model="listQuery.nickname"
              placeholder="请输入操作用户 "
            />
          </el-form-item>
          <el-form-item label="追踪编号 ">
            <el-input
              v-model="listQuery.traceId"
              placeholder="请输入追踪编号 "
            />
          </el-form-item>
          <el-form-item label="业务类型 ">
            <el-input
              v-model="listQuery.businessType"
              placeholder="请输入业务类型 "
            />
          </el-form-item>
          <el-form-item label="模块名称 ">
            <el-input
              v-model="listQuery.moduleName"
              placeholder="请输入模块名称 "
            />
          </el-form-item>
          <el-form-item label="请求方法名称 ">
            <el-input
              v-model="listQuery.methodName"
              placeholder="请输入请求方法名称 "
            />
          </el-form-item>
          <el-form-item label="浏览器 ">
            <el-input
              v-model="listQuery.browser"
              placeholder="请输入浏览器 "
            />
          </el-form-item>
          <el-form-item label="操作系统 ">
            <el-input
              v-model="listQuery.os"
              placeholder="请输入操作系统 "
            />
          </el-form-item>
          <el-form-item label="操作类别 ">
            <el-input
              v-model="listQuery.operatorType"
              placeholder="请输入操作类别 "
            />
          </el-form-item>
          <el-form-item label="状态码 ">
            <el-input
              v-model="listQuery.code"
              placeholder="请输入状态码 "
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
            label="日志编号 "
            prop="logId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="操作用户工号 "
            prop="userId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="操作用户 "
            prop="nickname"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="追踪编号 "
            prop="traceId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="业务类型 "
            prop="businessType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="模块名称 "
            prop="moduleName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="请求类名称 "
            prop="className"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="请求方法名称 "
            prop="methodName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="请求方式 "
            prop="requestMethod"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="操作地址 "
            prop="ipAddress"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="详细地址 "
            prop="detailAddress"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
            label="浏览器 "
            prop="browser"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[12].visible"
            label="操作系统 "
            prop="os"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[13].visible"
            label="操作类别 "
            prop="operatorType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[14].visible"
            label="请求参数 "
            prop="param"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[15].visible"
            label="状态码 "
            prop="code"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[16].visible"
            label="返回描述 "
            prop="message"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[17].visible"
            label="返回值 "
            prop="data"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[18].visible"
            label="备注 "
            prop="remarks"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[19].visible"
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
            v-if="columns[20].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[21].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[22].visible"
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[23].visible"
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
            label="日志编号 :"
            prop="logId"
          >
            <el-input
              v-model="form.logId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作用户工号 :"
            prop="userId"
          >
            <el-input
              v-model="form.userId"
              placeholder="请输入操作用户工号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作用户 :"
            prop="nickname"
          >
            <el-input
              v-model="form.nickname"
              placeholder="请输入操作用户 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="追踪编号 :"
            prop="traceId"
          >
            <el-input
              v-model="form.traceId"
              placeholder="请输入追踪编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="业务类型 :"
            prop="businessType"
          >
            <el-input
              v-model="form.businessType"
              placeholder="请输入业务类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="模块名称 :"
            prop="moduleName"
          >
            <el-input
              v-model="form.moduleName"
              placeholder="请输入模块名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="请求类名称 :"
            prop="className"
          >
            <el-input
              v-model="form.className"
              placeholder="请输入请求类名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="请求方法名称 :"
            prop="methodName"
          >
            <el-input
              v-model="form.methodName"
              placeholder="请输入请求方法名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="请求方式 :"
            prop="requestMethod"
          >
            <el-input
              v-model="form.requestMethod"
              placeholder="请输入请求方式 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作地址 :"
            prop="ipAddress"
          >
            <el-input
              v-model="form.ipAddress"
              placeholder="请输入操作地址 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="详细地址 :"
            prop="detailAddress"
          >
            <el-input
              v-model="form.detailAddress"
              placeholder="请输入详细地址 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="浏览器 :"
            prop="browser"
          >
            <el-input
              v-model="form.browser"
              placeholder="请输入浏览器 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作系统 :"
            prop="os"
          >
            <el-input
              v-model="form.os"
              placeholder="请输入操作系统 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作类别 :"
            prop="operatorType"
          >
            <el-input
              v-model="form.operatorType"
              placeholder="请输入操作类别 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="请求参数 :"
            prop="param"
          >
            <el-input
              v-model="form.param"
              placeholder="请输入请求参数 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态码 :"
            prop="code"
          >
            <el-input
              v-model="form.code"
              placeholder="请输入状态码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="返回描述 :"
            prop="message"
          >
            <el-input
              v-model="form.message"
              placeholder="请输入返回描述 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="返回值 :"
            prop="data"
          >
            <el-input
              v-model="form.data"
              type="textarea"
              autosize
              placeholder="请输入返回值 "
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
            label="有效状态 :"
            prop="validState"
          >
            <el-input
              v-model="form.validState"
              placeholder="请输入有效状态 "
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
            label="日志编号 :"
            prop="logId"
          >
            <el-input
              v-model="updateForm.logId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作用户工号 :"
            prop="userId"
          >
            <el-input
              v-model="updateForm.userId"
              placeholder="请输入操作用户工号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作用户 :"
            prop="nickname"
          >
            <el-input
              v-model="updateForm.nickname"
              placeholder="请输入操作用户 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="追踪编号 :"
            prop="traceId"
          >
            <el-input
              v-model="updateForm.traceId"
              placeholder="请输入追踪编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="业务类型 :"
            prop="businessType"
          >
            <el-input
              v-model="updateForm.businessType"
              placeholder="请输入业务类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="模块名称 :"
            prop="moduleName"
          >
            <el-input
              v-model="updateForm.moduleName"
              placeholder="请输入模块名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="请求类名称 :"
            prop="className"
          >
            <el-input
              v-model="updateForm.className"
              placeholder="请输入请求类名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="请求方法名称 :"
            prop="methodName"
          >
            <el-input
              v-model="updateForm.methodName"
              placeholder="请输入请求方法名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="请求方式 :"
            prop="requestMethod"
          >
            <el-input
              v-model="updateForm.requestMethod"
              placeholder="请输入请求方式 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作地址 :"
            prop="ipAddress"
          >
            <el-input
              v-model="updateForm.ipAddress"
              placeholder="请输入操作地址 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="详细地址 :"
            prop="detailAddress"
          >
            <el-input
              v-model="updateForm.detailAddress"
              placeholder="请输入详细地址 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="浏览器 :"
            prop="browser"
          >
            <el-input
              v-model="updateForm.browser"
              placeholder="请输入浏览器 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作系统 :"
            prop="os"
          >
            <el-input
              v-model="updateForm.os"
              placeholder="请输入操作系统 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="操作类别 :"
            prop="operatorType"
          >
            <el-input
              v-model="updateForm.operatorType"
              placeholder="请输入操作类别 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="请求参数 :"
            prop="param"
          >
            <el-input
              v-model="updateForm.param"
              placeholder="请输入请求参数 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="状态码 :"
            prop="code"
          >
            <el-input
              v-model="updateForm.code"
              placeholder="请输入状态码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="返回描述 :"
            prop="message"
          >
            <el-input
              v-model="updateForm.message"
              placeholder="请输入返回描述 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="返回值 :"
            prop="data"
          >
            <el-input
              v-model="updateForm.data"
              type="textarea"
              autosize
              placeholder="请输入返回值 "
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
            label="有效状态 :"
            prop="validState"
          >
            <el-input
              v-model="updateForm.validState"
              placeholder="请输入有效状态 "
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
  getOperatorLogListPage,
  saveOperatorLog,
  updateOperatorLog,
  deleteById,
  download
} from '@/api/system/operatorLog'
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
        { key: 0, value: 'logId', label: '日志编号 ', visible: true },
        { key: 1, value: 'userId', label: '操作用户工号 ', visible: true },
        { key: 2, value: 'nickname', label: '操作用户 ', visible: true },
        { key: 3, value: 'traceId', label: '追踪编号 ', visible: true },
        { key: 4, value: 'businessType', label: '业务类型 ', visible: true },
        { key: 5, value: 'moduleName', label: '模块名称 ', visible: true },
        { key: 6, value: 'className', label: '请求类名称 ', visible: true },
        { key: 7, value: 'methodName', label: '请求方法名称 ', visible: true },
        { key: 8, value: 'requestMethod', label: '请求方式 ', visible: true },
        { key: 9, value: 'ipAddress', label: '操作地址 ', visible: true },
        { key: 10, value: 'detailAddress', label: '详细地址 ', visible: true },
        { key: 11, value: 'browser', label: '浏览器 ', visible: true },
        { key: 12, value: 'os', label: '操作系统 ', visible: true },
        { key: 13, value: 'operatorType', label: '操作类别 ', visible: true },
        { key: 14, value: 'param', label: '请求参数 ', visible: true },
        { key: 15, value: 'code', label: '状态码 ', visible: true },
        { key: 16, value: 'message', label: '返回描述 ', visible: true },
        { key: 17, value: 'data', label: '返回值 ', visible: true },
        { key: 18, value: 'remarks', label: '备注 ', visible: true },
        { key: 19, value: 'validState', label: '有效状态 ', visible: true },
        { key: 20, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 21, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 22, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 23, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userId: undefined,
        nickname: undefined,
        businessType: undefined,
        moduleName: undefined,
        methodName: undefined,
        browser: undefined,
        os: undefined,
        operatorType: undefined,
        code: undefined,
        traceId: undefined
      },
      input: '',
      form: {
        logId: undefined, // 日志编号
        userId: undefined, // 操作用户工号
        nickname: undefined, // 操作用户
        traceId: undefined, // 追踪编号
        businessType: undefined, // 业务类型
        moduleName: undefined, // 模块名称
        className: undefined, // 请求类名称
        methodName: undefined, // 请求方法名称
        requestMethod: undefined, // 请求方式
        ipAddress: undefined, // 操作地址
        detailAddress: undefined, // 详细地址
        browser: undefined, // 浏览器
        os: undefined, // 操作系统
        operatorType: undefined, // 操作类别
        param: undefined, // 请求参数
        code: undefined, // 状态码
        message: undefined, // 返回描述
        data: undefined, // 返回值
        remarks: undefined, // 备注
        validState: 1, // 有效状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        logId: undefined, // 日志编号
        userId: undefined, // 操作用户工号
        nickname: undefined, // 操作用户
        traceId: undefined, // 追踪编号
        businessType: undefined, // 业务类型
        moduleName: undefined, // 模块名称
        className: undefined, // 请求类名称
        methodName: undefined, // 请求方法名称
        requestMethod: undefined, // 请求方式
        ipAddress: undefined, // 操作地址
        detailAddress: undefined, // 详细地址
        browser: undefined, // 浏览器
        os: undefined, // 操作系统
        operatorType: undefined, // 操作类别
        param: undefined, // 请求参数
        code: undefined, // 状态码
        message: undefined, // 返回描述
        data: undefined, // 返回值
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
        logId: [],
        userId: [],
        nickname: [],
        traceId: [],
        businessType: [],
        moduleName: [],
        className: [],
        methodName: [],
        requestMethod: [],
        ipAddress: [],
        detailAddress: [],
        browser: [],
        os: [],
        operatorType: [],
        param: [],
        code: [],
        message: [],
        data: [],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        logId: [],
        userId: [],
        nickname: [],
        traceId: [],
        businessType: [],
        moduleName: [],
        className: [],
        methodName: [],
        requestMethod: [],
        ipAddress: [],
        detailAddress: [],
        browser: [],
        os: [],
        operatorType: [],
        param: [],
        code: [],
        message: [],
        data: [],
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
      getOperatorLogListPage(this.listQuery)
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
          const id = row.logId
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
              saveOperatorLog(_this.form)
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
              updateOperatorLog(_this.updateForm)
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
        logId: undefined, // 日志编号
        userId: undefined, // 操作用户工号
        nickname: undefined, // 操作用户
        traceId: undefined, // 追踪编号
        businessType: undefined, // 业务类型
        moduleName: undefined, // 模块名称
        className: undefined, // 请求类名称
        methodName: undefined, // 请求方法名称
        requestMethod: undefined, // 请求方式
        ipAddress: undefined, // 操作地址
        detailAddress: undefined, // 详细地址
        browser: undefined, // 浏览器
        os: undefined, // 操作系统
        operatorType: undefined, // 操作类别
        param: undefined, // 请求参数
        code: undefined, // 状态码
        message: undefined, // 返回描述
        data: undefined, // 返回值
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
