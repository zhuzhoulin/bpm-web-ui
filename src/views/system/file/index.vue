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
          <el-form-item label="编号 ">
            <el-input
              v-model="listQuery.fileId"
              placeholder="请输入编号 "
            />
          </el-form-item>
          <el-form-item label="文件实例编号 ">
            <el-input
              v-model="listQuery.fileInstanceCode"
              placeholder="请输入文件实例编号 "
            />
          </el-form-item>
          <el-form-item label="模板文件名称 ">
            <el-input
              v-model="listQuery.fileName"
              placeholder="请输入模板文件名称 "
            />
          </el-form-item>
          <el-form-item label="所属系统 ">
            <el-input
              v-model="listQuery.fileSystemCode"
              placeholder="请输入所属系统 "
            />
          </el-form-item>
          <el-form-item label="所属平台 ">
            <el-input
              v-model="listQuery.fileplatform"
              placeholder="请输入所属平台 "
            />
          </el-form-item>
          <el-form-item label="文件所属人员 ">
            <el-input
              v-model="listQuery.fileOwnerId"
              placeholder="请输入文件所属人员 "
            />
          </el-form-item>
          <el-form-item label="文件所属人姓名 ">
            <el-input
              v-model="listQuery.fileOwnerName"
              placeholder="请输入文件所属人姓名 "
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
            label="编号 "
            prop="fileId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="文件实例编号 "
            prop="fileInstanceCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="模板文件名称 "
            prop="fileName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="模板文件名称 "
            prop="fileMd5Name"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="文件路径 "
            prop="filePath"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="文件大小 "
            prop="fileSize"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="文件后缀 "
            prop="fileExtend"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="状态 "
            prop="fileStatus"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="所属系统 "
            prop="fileSystemCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="所属平台 "
            prop="fileplatform"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="所属服务名称 "
            prop="fileServiceName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
            label="所属于哪个方法 "
            prop="fileMethodName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[12].visible"
            label="文件所属人员 "
            prop="fileOwnerId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[13].visible"
            label="文件所属人姓名 "
            prop="fileOwnerName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[14].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[15].visible"
            label="错误日志 "
            prop="errorMessage"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[16].visible"
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
            v-if="columns[17].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[18].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[19].visible"
            label="创建时间"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[20].visible"
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
            label="编号 :"
            prop="fileId"
          >
            <el-input
              v-model="form.fileId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件实例编号 :"
            prop="fileInstanceCode"
          >
            <el-input
              v-model="form.fileInstanceCode"
              placeholder="请输入文件实例编号 "
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
            label="状态 :"
            prop="fileStatus"
          >
            <el-input
              v-model="form.fileStatus"
              placeholder="请输入状态 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属系统 :"
            prop="fileSystemCode"
          >
            <el-input
              v-model="form.fileSystemCode"
              placeholder="请输入所属系统 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属平台 :"
            prop="fileplatform"
          >
            <el-input
              v-model="form.fileplatform"
              placeholder="请输入所属平台 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属服务名称 :"
            prop="fileServiceName"
          >
            <el-input
              v-model="form.fileServiceName"
              placeholder="请输入所属服务名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属于哪个方法 :"
            prop="fileMethodName"
          >
            <el-input
              v-model="form.fileMethodName"
              placeholder="请输入所属于哪个方法 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件所属人员 :"
            prop="fileOwnerId"
          >
            <el-input
              v-model="form.fileOwnerId"
              placeholder="请输入文件所属人员 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件所属人姓名 :"
            prop="fileOwnerName"
          >
            <el-input
              v-model="form.fileOwnerName"
              placeholder="请输入文件所属人姓名 "
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
            label="错误日志 :"
            prop="errorMessage"
          >
            <el-input
              v-model="form.errorMessage"
              type="textarea"
              autosize
              placeholder="请输入错误日志 "
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
            label="编号 :"
            prop="fileId"
          >
            <el-input
              v-model="updateForm.fileId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件实例编号 :"
            prop="fileInstanceCode"
          >
            <el-input
              v-model="updateForm.fileInstanceCode"
              placeholder="请输入文件实例编号 "
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
            label="状态 :"
            prop="fileStatus"
          >
            <el-input
              v-model="updateForm.fileStatus"
              placeholder="请输入状态 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属系统 :"
            prop="fileSystemCode"
          >
            <el-input
              v-model="updateForm.fileSystemCode"
              placeholder="请输入所属系统 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属平台 :"
            prop="fileplatform"
          >
            <el-input
              v-model="updateForm.fileplatform"
              placeholder="请输入所属平台 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属服务名称 :"
            prop="fileServiceName"
          >
            <el-input
              v-model="updateForm.fileServiceName"
              placeholder="请输入所属服务名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="所属于哪个方法 :"
            prop="fileMethodName"
          >
            <el-input
              v-model="updateForm.fileMethodName"
              placeholder="请输入所属于哪个方法 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件所属人员 :"
            prop="fileOwnerId"
          >
            <el-input
              v-model="updateForm.fileOwnerId"
              placeholder="请输入文件所属人员 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="文件所属人姓名 :"
            prop="fileOwnerName"
          >
            <el-input
              v-model="updateForm.fileOwnerName"
              placeholder="请输入文件所属人姓名 "
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
            label="错误日志 :"
            prop="errorMessage"
          >
            <el-input
              v-model="updateForm.errorMessage"
              type="textarea"
              autosize
              placeholder="请输入错误日志 "
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
  getFileListPage,
  saveFile,
  updateFile,
  deleteById,
  download
} from '@/api/system/file'
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
        'operatorId',
        'createTime',
        'operatorId',
        'createTime'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'fileId', label: '编号 ', visible: true },
        {
          key: 1,
          value: 'fileInstanceCode',
          label: '文件实例编号 ',
          visible: true
        },
        { key: 2, value: 'fileName', label: '模板文件名称 ', visible: true },
        { key: 3, value: 'fileMd5Name', label: '模板文件名称 ', visible: true },
        { key: 4, value: 'filePath', label: '文件路径 ', visible: true },
        { key: 5, value: 'fileSize', label: '文件大小 ', visible: true },
        { key: 6, value: 'fileExtend', label: '文件后缀 ', visible: true },
        { key: 7, value: 'fileStatus', label: '状态 ', visible: true },
        { key: 8, value: 'fileSystemCode', label: '所属系统 ', visible: true },
        { key: 9, value: 'fileplatform', label: '所属平台 ', visible: true },
        {
          key: 10,
          value: 'fileServiceName',
          label: '所属服务名称 ',
          visible: true
        },
        {
          key: 11,
          value: 'fileMethodName',
          label: '所属于哪个方法 ',
          visible: true
        },
        {
          key: 12,
          value: 'fileOwnerId',
          label: '文件所属人员 ',
          visible: true
        },
        {
          key: 13,
          value: 'fileOwnerName',
          label: '文件所属人姓名 ',
          visible: true
        },
        { key: 14, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 15, value: 'errorMessage', label: '错误日志 ', visible: true },
        { key: 16, value: 'validState', label: '状态 ', visible: true },
        { key: 17, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 18, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 19, value: 'createTime', label: '创建时间 ', visible: true },
        {
          key: 20,
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
        fileId: undefined,
        fileInstanceCode: undefined,
        fileName: undefined,
        fileExtend: undefined,
        fileSystemCode: undefined,
        fileplatform: undefined,
        fileOwnerId: undefined,
        fileOwnerName: undefined,
        processId: undefined,
        fileName: undefined
      },
      input: '',
      form: {
        fileId: undefined, // 编号
        fileInstanceCode: undefined, // 文件实例编号
        fileName: undefined, // 模板文件名称
        fileMd5Name: undefined, // 模板文件名称
        filePath: undefined, // 文件路径
        fileSize: undefined, // 文件大小
        fileExtend: undefined, // 文件后缀
        fileStatus: undefined, // 状态
        fileSystemCode: undefined, // 所属系统
        fileplatform: undefined, // 所属平台
        fileServiceName: undefined, // 所属服务名称
        fileMethodName: undefined, // 所属于哪个方法
        fileOwnerId: undefined, // 文件所属人员
        fileOwnerName: undefined, // 文件所属人姓名
        tenantId: undefined, // 租户编号
        errorMessage: undefined, // 错误日志
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 最后一次更新时间
      },
      updateForm: {
        fileId: undefined, // 编号
        fileInstanceCode: undefined, // 文件实例编号
        fileName: undefined, // 模板文件名称
        fileMd5Name: undefined, // 模板文件名称
        filePath: undefined, // 文件路径
        fileSize: undefined, // 文件大小
        fileExtend: undefined, // 文件后缀
        fileStatus: undefined, // 状态
        fileSystemCode: undefined, // 所属系统
        fileplatform: undefined, // 所属平台
        fileServiceName: undefined, // 所属服务名称
        fileMethodName: undefined, // 所属于哪个方法
        fileOwnerId: undefined, // 文件所属人员
        fileOwnerName: undefined, // 文件所属人姓名
        tenantId: undefined, // 租户编号
        errorMessage: undefined, // 错误日志
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
        fileId: [],
        fileInstanceCode: [
          { required: true, message: '请输入文件实例编号', trigger: 'blur' }
        ],
        fileName: [],
        fileMd5Name: [],
        filePath: [],
        fileSize: [],
        fileExtend: [],
        fileStatus: [],
        fileSystemCode: [],
        fileplatform: [],
        fileServiceName: [],
        fileMethodName: [],
        fileOwnerId: [],
        fileOwnerName: [],
        tenantId: [],
        errorMessage: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        fileId: [],
        fileInstanceCode: [
          { required: true, message: '请输入文件实例编号', trigger: 'blur' }
        ],
        fileName: [],
        fileMd5Name: [],
        filePath: [],
        fileSize: [],
        fileExtend: [],
        fileStatus: [],
        fileSystemCode: [],
        fileplatform: [],
        fileServiceName: [],
        fileMethodName: [],
        fileOwnerId: [],
        fileOwnerName: [],
        tenantId: [],
        errorMessage: [],
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
      getFileListPage(this.listQuery)
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
          const id = row.fileId
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
              saveFile(_this.form)
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
              updateFile(_this.updateForm)
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
        fileId: undefined, // 编号
        fileInstanceCode: undefined, // 文件实例编号
        fileName: undefined, // 模板文件名称
        fileMd5Name: undefined, // 模板文件名称
        filePath: undefined, // 文件路径
        fileSize: undefined, // 文件大小
        fileExtend: undefined, // 文件后缀
        fileStatus: undefined, // 状态
        fileSystemCode: undefined, // 所属系统
        fileplatform: undefined, // 所属平台
        fileServiceName: undefined, // 所属服务名称
        fileMethodName: undefined, // 所属于哪个方法
        fileOwnerId: undefined, // 文件所属人员
        fileOwnerName: undefined, // 文件所属人姓名
        tenantId: undefined, // 租户编号
        errorMessage: undefined, // 错误日志
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
