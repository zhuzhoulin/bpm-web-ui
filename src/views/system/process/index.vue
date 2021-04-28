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
          <el-form-item label="流程key ">
            <el-input
              v-model="listQuery.processKey"
              placeholder="请输入流程key "
            />
          </el-form-item>
          <el-form-item label="流程名称 ">
            <el-input
              v-model="listQuery.processName"
              placeholder="请输入流程名称 "
            />
          </el-form-item>
          <el-form-item label="流程简称 ">
            <el-input
              v-model="listQuery.processAbbr"
              placeholder="请输入流程简称 "
            />
          </el-form-item>
          <el-form-item label="流程状态 ">
            <el-select
              v-model="listQuery.processStatus"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in dictOption2"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
            label="流程编码 "
            prop="processId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="流程key "
            prop="processKey"
            align="center"
            sortable
          />
          <el-table-column
            v-if="columns[2].visible"
            label="流程名称 "
            prop="processName"
            align="center"
            sortable
          />
          <el-table-column
            v-if="columns[3].visible"
            label="流程归属菜单 "
            prop="processMenuId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="流程简称 "
            prop="processAbbr"
            align="center"
            sortable
          />
          <el-table-column
            v-if="columns[5].visible"
            label="流程分类 "
            prop="processType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="所属公司 "
            prop="companyId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ companyMap[scope.row.companyId] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[7].visible"
            label="公司编码 "
            prop="companyCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="排序 "
            prop="sort"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="默认流程详细编号 "
            prop="processDetailId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
            label="流程状态 "
            prop="processStatus"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ dictMap2[scope.row.processStatus] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[12].visible"
            label="流程备注 "
            prop="remarks"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[13].visible"
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
            v-if="columns[14].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[15].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[16].visible"
            label="创建时间 "
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[17].visible"
            label="更新时间 "
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"

            min-width="550px"
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
                type="warning"
                size="mini"
                icon="el-icon-setting"
                plain
                @click="showEditDiagramDialog(scope.row)"
              >设计</el-button>
              <el-button
                v-waves
                type="success"
                size="mini"
                icon="el-icon-s-promotion"
                plain
                @click="publish(scope.row)"
              >发布</el-button>
              <el-button
                v-waves
                type="info"
                size="mini"
                plain
                icon="el-icon-camera"
                @click="showProcessVersionDialog(scope.row)"
              >版本</el-button>
              <el-button
                v-waves
                type="success"
                size="mini"
                icon="el-icon-view"
                plain
                @click="showDiagram(scope.row)"
              >查看</el-button>
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
        :before-close="handleClose"
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
            label="流程编码 :"
            prop="processId"
          >
            <el-input
              v-model="form.processId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="流程key :"
            prop="processKey"
          >
            <el-input
              v-model="form.processKey"
              placeholder="请输入流程key(不能包括 : , _ 等字符) "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="流程名称 :"
            prop="processName"
          >
            <el-input
              v-model="form.processName"
              placeholder="请输入流程名称"
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="流程归属菜单 :" prop="processMenuId">
            <el-input
              v-model="form.processMenuId"
              placeholder="请输入流程归属菜单 "
            />
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="流程简称 :"
            prop="processAbbr"
          >
            <el-input
              v-model="form.processAbbr"
              placeholder="请输入流程简称(只能输入大小写英文字母) "
              @keyup.native="form.processAbbr=form.processAbbr.replace(/[^a-zA-Z]/g,'')"
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="流程分类 :" prop="processType">
            <el-switch v-model="form.processType" :active-value="1" :inactive-value="0" />
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="所属公司 :"
            prop="companyId"
          >
            <el-select
              v-model="form.companyId"
              placeholder="请选择"
              @change="getCompanyById(form.companyId,'create')"
            >
              <el-option
                v-for="(item,index) in companyList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />

            </el-select>
          </el-form-item>
          <!-- <el-form-item v-if="true" label="公司编码 :" prop="companyCode">
            <el-input
              v-model="form.companyCode"
              placeholder="请输入公司编码 "
            />
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="排序 :"
            prop="sort"
          >
            <el-input-number
              v-model="form.sort"
              placeholder="请输入排序 "
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
              disabled
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="默认流程详细编号 :" prop="processDetailId">
            <el-input
              v-model="form.processDetailId"
              placeholder="请输入默认流程详细编号 "
            />
          </el-form-item> -->
          <!-- <el-form-item v-if="true" label="流程状态 :" prop="processStatus">
            <el-select v-model="form.processStatus" placeholder="请选择">
              <el-option
                v-for="(item,index) in dictOption2"
                :key="index"
                :label="item.label"
                :value="item.value"
              />

            </el-select>
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="流程备注 :"
            prop="remarks"
          >
            <el-input
              v-model="form.remarks"
              type="textarea"
              autosize
              placeholder="请输入流程备注 "
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
        :before-close="handleClose"
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
            label="流程编码 :"
            prop="processId"
          >
            <el-input
              v-model="updateForm.processId"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="流程key :"
            prop="processKey"
          >
            <el-input
              v-model="updateForm.processKey"
              placeholder="请输入流程key(不能包括 : , _ 等字符) "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="流程名称 :"
            prop="processName"
          >
            <el-input
              v-model="updateForm.processName"
              placeholder="请输入流程名称 "
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="流程归属菜单 :" prop="processMenuId">
            <el-input
              v-model="updateForm.processMenuId"
              placeholder="请输入流程归属菜单 "
            />
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="流程简称 :"
            prop="processAbbr"
          >
            <el-input
              v-model="updateForm.processAbbr"
              placeholder="请输入流程简称(只能输入大小写英文字母) "
              @keyup.native="updateForm.processAbbr=updateForm.processAbbr.replace(/[^a-zA-Z]/g,'')"
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="流程分类 :" prop="processType">
            <el-switch v-model="updateForm.processType" :active-value="1" :inactive-value="0" />
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="所属公司 :"
            prop="companyId"
          >
            <el-select
              v-model="updateForm.companyId"
              placeholder="请选择"
              @change="getCompanyById(updateForm.companyId,'update')"
            >
              <el-option
                v-for="(item,index) in companyList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item v-if="true" label="公司编码 :" prop="companyCode">
            <el-input
              v-model="updateForm.companyCode"
              placeholder="请输入公司编码 "
            />
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="排序 :"
            prop="sort"
          >
            <el-input-number
              v-model="updateForm.sort"
              placeholder="请输入排序 "
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
              disabled
            />
          </el-form-item>
          <!-- <el-form-item v-if="true" label="默认流程详细编号 :" prop="processDetailId">
            <el-input
              v-model="updateForm.processDetailId"
              placeholder="请输入默认流程详细编号 "
            />
          </el-form-item> -->
          <!-- <el-form-item v-if="true" label="流程状态 :" prop="processStatus">
            <el-select v-model="updateForm.processStatus" placeholder="请选择">
              <el-option
                v-for="(item,index) in dictOption2"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item
            v-if="true"
            label="流程备注 :"
            prop="remarks"
          >
            <el-input
              v-model="updateForm.remarks"
              type="textarea"
              autosize
              placeholder="请输入流程备注 "
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
              active-text="有效"
              inactive-text="无效"
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

      <!-- 预览 -->
      <el-dialog
        v-if="showDiagramDialog.visible"
        :title="showDiagramDialog.title"
        :visible.sync="showDiagramDialog.visible"
        :width="showDiagramDialog.width"
        center
        :before-close="handleClose"
      >
        <ShowDiagram
          :new-process-diagram-xml.sync="diagramXml"
          @close="closeShowDiagram"
        />
      </el-dialog>

      <!-- 设计 -->
      <el-dialog
        v-if="editDiagramDialog.visible"
        :title="editDiagramDialog.title"
        :visible.sync="editDiagramDialog.visible"
        :width="editDiagramDialog.width"
        :fullscreen="editDiagramDialog.fullscreen"
        :close-on-press-escape="editDiagramDialog.closeOnPressEscape"
        center
        :before-close="handleClose"
        @close="closeDiagramDialog"
      >
        <diagram-manager
          v-if="editDiagramDialog.visible"
          ref="diagramManager"
          :process-info.sync="processInfo"
          :new-process-diagram-xml.sync="diagramXml"
          :process-detail-id.sync="editDiagramDialog.data"
          @queryList="getList"
          @close="closeDiagramDialog"
        />

      </el-dialog>

      <!-- 版本 -->
      <el-dialog
        v-if="processVersionDialog.visible"
        :title="processVersionDialog.title"
        :visible.sync="processVersionDialog.visible"
        :width="processVersionDialog.width"
        center
        :before-close="handleClose"
      >
        <processVersion
          ref="processVersion"
          :process-info.sync="processVersionDialog.data"
          @queryList="getList"
          @close="closeProcessVersionDialog"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getProcessListPage,
  saveProcess,
  updateProcess,
  deleteById,
  download
} from '@/api/process/process'
import { getDictListByDictCode } from '@/api/system/dict'
import { getCompanyDict, getById } from '@/api/system/company'
import { publish, getProcessDetailById } from '@/api/process/processDetail'

import waves from '@/directive/waves'
import store from '@/store'
import Pagination from '@/components/Pagination'

import ShowDiagram from '@/components/ShowDiagram'
import diagramManager from '@/components/DiagramManager'
import processVersion from './processVersion.vue'

export default {
  components: { Pagination, ShowDiagram, diagramManager, processVersion },
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
      showUpdateDialog: {
        // 弹窗组件传递数据
        title: '编辑流程',
        visible: false,
        width: '',
        name: '编辑流程', // 组件名,
        loading: false,
        data: '',
        fullscreen: false,
        closeOnPressEscape: false,
        direction: 'rtl'
      },
      diagramXml: '',
      editDiagramDialog: {
        title: '流程设计器',
        visible: false,
        width: '',
        data: '',
        name: '流程设计器', // 组件名,
        loading: false,
        fullscreen: true,
        closeOnPressEscape: false
      },
      processVersionDialog: {
        title: '选择默认版本',
        visible: false,
        width: '70%',
        data: '',
        name: '选择默认版本', // 组件名,
        loading: false,
        fullscreen: true,
        closeOnPressEscape: false
      },
      showDiagramDialog: {
        title: '查看流程图',
        visible: false,
        width: '',
        data: '',
        name: '', // 组件名,
        loading: false
      },
      processInfo: {},
      companyList: [],
      companyMap: {},
      dictOption1: [],
      dictMap1: {},
      dictOption2: [],
      dictMap2: {},
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: [
        'operatorId',
        'createTime',
        'processId',
        'processMenuId',
        'processType',
        'companyCode',
        'processDetailId'
      ],
      // 列信息
      columns: [
        { key: 0, value: 'processId', label: '流程编码 ', visible: true },
        { key: 1, value: 'processKey', label: '流程key ', visible: true },
        { key: 2, value: 'processName', label: '流程名称 ', visible: true },
        {
          key: 3,
          value: 'processMenuId',
          label: '流程归属菜单 ',
          visible: true
        },
        { key: 4, value: 'processAbbr', label: '流程简称 ', visible: true },
        { key: 5, value: 'processType', label: '流程分类 ', visible: true },
        { key: 6, value: 'companyId', label: '所属公司 ', visible: true },
        { key: 7, value: 'companyCode', label: '公司编码 ', visible: true },
        { key: 8, value: 'sort', label: '排序 ', visible: true },
        { key: 9, value: 'tenantId', label: '租户编号 ', visible: true },
        {
          key: 10,
          value: 'processDetailId',
          label: '默认流程详细编号 ',
          visible: true
        },
        { key: 11, value: 'processStatus', label: '流程状态 ', visible: true },
        { key: 12, value: 'remarks', label: '流程备注 ', visible: true },
        { key: 13, value: 'validState', label: '状态 ', visible: true },
        { key: 14, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 15, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 16, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 17, value: 'updateTime', label: '更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        processKey: undefined,
        processName: undefined,
        processAbbr: undefined,
        processStatus: undefined
      },
      input: '',
      form: {
        processId: undefined, // 流程编码
        processKey: undefined, // 流程key
        processName: undefined, // 流程名称
        processMenuId: undefined, // 流程归属菜单
        processAbbr: undefined, // 流程简称
        processType: undefined, // 流程分类
        companyId: undefined, // 所属公司
        companyCode: undefined, // 公司编码
        sort: undefined, // 排序
        tenantId: undefined, // 租户编号
        processDetailId: undefined, // 默认流程详细编号
        processStatus: undefined, // 流程状态
        remarks: undefined, // 流程备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        processId: undefined, // 流程编码
        processKey: undefined, // 流程key
        processName: undefined, // 流程名称
        processMenuId: undefined, // 流程归属菜单
        processAbbr: undefined, // 流程简称
        processType: undefined, // 流程分类
        companyId: undefined, // 所属公司
        companyCode: undefined, // 公司编码
        sort: undefined, // 排序
        tenantId: undefined, // 租户编号
        processDetailId: undefined, // 默认流程详细编号
        processStatus: undefined, // 流程状态
        remarks: undefined, // 流程备注
        validState: 1, // 状态
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
        processId: [],
        processKey: [
          { required: true, messages: '请输入流程key', trigger: 'blur' }
        ],
        processName: [
          { required: true, messages: '请输入流程名称', trigger: 'blur' }
        ],
        processMenuId: [],
        processAbbr: [
          { required: true, messages: '请输入流程简称', trigger: 'blur' }
        ],
        processType: [],
        companyId: [],
        companyCode: [],
        sort: [],
        tenantId: [],
        processDetailId: [],
        processStatus: [
          //   { type: 'number', required: true, messages: '请选择流程状态', trigger: 'change' }
        ],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        processId: [],
        processKey: [
          { required: true, messages: '请输入流程key', trigger: 'blur' }
        ],
        processName: [
          { required: true, messages: '请输入流程名称', trigger: 'blur' }
        ],
        processMenuId: [],
        processAbbr: [
          { required: true, messages: '请输入流程简称', trigger: 'blur' }
        ],
        processType: [],
        companyId: [],
        companyCode: [],
        sort: [],
        tenantId: [],
        processDetailId: [],
        processStatus: [
          //   { type: 'number', required: true, messages: '请选择流程状态', trigger: 'change' }
        ],
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
    this.getDict1()
    this.getDict2()
    this.getCompanyDict()
  },
  methods: {
    closeProcessVersionDialog() {
      this.getList()
      this.processVersionDialog.visible = false
    },
    showProcessVersionDialog(row) {
      this.$nextTick(() => {
        this.processVersionDialog.data = row
        this.processVersionDialog.visible = true
      })
    },
    publish(row) {
      getProcessDetailById(row.processDetailId).then((response) => {
        this.$nextTick(() => {
          this.processXml = response.data.processXml || ''
          this.processInfo.processXml = this.processXml
          this.diagramXml = this.processXml
          const postData = {
            tenantId: store.getters.tenantId,
            processKey: row.processKey,
            processDetailId: row.processDetailId,
            processXml: this.processXml
          }
          publish(postData).then((response) => {
            this.$message.success('发布成功！')
            this.getList()
          })
        })
      })
    },
    closeDiagramDialog() {
      this.$nextTick(() => {
        this.getList()
        this.editDiagramDialog.visible = false
      })
    },
    showEditDiagramDialog(row) {
      getProcessDetailById(row.processDetailId).then((response) => {
        this.$nextTick(() => {
          this.processXml = response.data.processXml || ''
          this.processInfo.processXml = this.processXml
          this.processInfo = row
          this.processInfo.processXml = this.processXml
          this.diagramXml = this.processXml
          this.$nextTick(() => {
            this.editDiagramDialog.visible = true
            this.editDiagramDialog.data = row.processDetailId
          })
        })
      })
    },
    closeShowDiagram() {
      this.diagramXml = ''
      this.$nextTick(() => {
        this.showDiagramDialog.visible = false
      })
    },
    showDiagram(row) {
      getProcessDetailById(row.processDetailId).then((response) => {
        this.$nextTick(() => {
          this.processXml = response.data.processXml || ''
          this.processInfo.processXml = this.processXml
          this.diagramXml = this.processXml || ''
          this.showDiagramDialog.visible = true
        })
      })
    },
    getProcessDetailById(processDetailId) {
      this.processXml = ''
      getProcessDetailById(processDetailId).then((response) => {
        this.$nextTick(() => {
          this.processXml = response.data.processXml || ''
          this.processInfo.processXml = this.processXml
        })
      })
    },
    getCompanyById(companyId, method) {
      if (companyId > 0) {
        const postData = companyId
        getById(postData).then((response) => {
          if (method !== null && method === 'update') {
            this.updateForm.companyCode = response.data.companyCode
          } else {
            this.form.companyCode = response.data.companyCode
          }
        })
      }
    },
    getCompanyDict() {
      const postData = {
        tenantId: store.getters.tenantId
      }
      getCompanyDict(postData).then((response) => {
        this.companyList = response.data
        for (const key in response.data) {
          this.companyMap[response.data[key].value] = response.data[key].label
        }
      })
    },
    getDict1() {
      const dictCode = 'organTree'
      getDictListByDictCode(dictCode).then((response) => {
        this.$nextTick(() => {
          const option = []
          for (const key in response.data) {
            option.push({
              label: response.data[key].label,
              value: response.data[key].value
            })
            this.dictMap1[response.data[key].value] = response.data[key].label
          }
          this.dictOption1 = option
        })
      })
    },
    getDict2() {
      const dictCode = 'pig:dict:publishStatus'
      getDictListByDictCode(dictCode).then((response) => {
        this.$nextTick(() => {
          const option = []
          for (const key in response.data) {
            option.push({
              label: response.data[key].label,
              value: response.data[key].value
            })
            this.dictMap2[response.data[key].value] = response.data[key].label
          }
          this.dictOption2 = option
        })
      })
    },
    getList() {
      this.listLoading = true
      getProcessListPage(this.listQuery)
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
    handleClose(done) {
      this.$confirm('确定关闭吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((_) => {
          done()
        })
        .catch((_) => {})
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
          const id = row.processId
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
              saveProcess(_this.form)
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
              updateProcess(_this.updateForm)
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
        processId: undefined, // 流程编码
        processKey: undefined, // 流程key
        processName: undefined, // 流程名称
        processMenuId: undefined, // 流程归属菜单
        processAbbr: undefined, // 流程简称
        processType: undefined, // 流程分类
        companyId: undefined, // 所属公司
        companyCode: undefined, // 公司编码
        sort: 1, // 排序
        tenantId: store.getters.tenantId, // 租户编号
        processDetailId: undefined, // 默认流程详细编号
        processStatus: undefined, // 流程状态
        remarks: undefined, // 流程备注
        validState: 1, // 状态
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
