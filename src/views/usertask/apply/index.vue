<template>
  <div class="app-container">
    <div class="container-info">
      <div class="filter-container">
        <el-form :inline="true" :model="searchObject">
          <el-form-item :label="$t('userTaskList.processId')">
            <el-select v-model="searchObject.processId" :placeholder="$t('userTaskList.processId')" clearable>
              <el-option value="-1">{{ $t('userTaskList.placeSelect') }}</el-option>
              <el-option
                v-for="(item, index) in processOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('userTaskList.seachName')">
            <el-input v-model="searchObject.seachName" :placeholder="$t('userTaskList.seachNamePlaceholder')" clearable />
          </el-form-item>
          <el-form-item :label="$t('userTaskList.applyStatus')">
            <el-select v-model="searchObject.applyStatus" :placeholder="$t('userTaskList.applyStatus')" filterable clearable>
              <el-option value="-1">{{ $t('userTaskList.placeSelect') }}</el-option>
              <el-option
                v-for="(item, index) in applyStatusOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('userTaskList.applyDept')">
            <el-select v-model="searchObject.deptCode" clearable filterable :placeholder="$t('userTaskList.placeSelect')">
              <el-option
                v-for="item in deptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('userTaskList.applyDate')">
            <el-date-picker
              v-model="searchObject.daterange"
              type="daterange"
              :range-separator="$t('userTaskList.rangeSeparator')"
              :start-placeholder="$t('userTaskList.applyStartDate')"
              :end-placeholder="$t('userTaskList.applyEndDate')"
              :default-time="['00:00:00', '23:59:59']"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="queryList">{{ $t('userTaskList.query') }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-loading="listLoading" class="content-container">
        <el-table
          v-loading="listLoading"
          :data="list"
          :element-loading-text="$t('loading.text')"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" :label="$t('userTaskList.id')" width="95">
            <template slot-scope="scope">
              {{ (searchObject.pageIndex - 1 ) * searchObject.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('userTaskList.applySn')">
            <template slot-scope="scope">

              <a style="color:#409EFF" @click="showDetail(scope.row)">
                {{ scope.row.applySn }}</a>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('userTaskList.applyTitle')"
            align="center"
            width="200"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ scope.row.applyTitle }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('userTaskList.processName')" align="center">
            <template slot-scope="scope">
              {{ scope.row.processName }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('userTaskList.tenantId')" width="60" align="center">
            <template slot-scope="scope">
              {{ scope.row.tenantId }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('userTaskList.applyDeptName')" align="center">
            <template slot-scope="scope">
              {{ scope.row.applyDeptName }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('userTaskList.applyRealName')" align="center">
            <template slot-scope="scope">
              {{ scope.row.applyRealName }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('userTaskList.applyDate')" align="center" width="160">
            <template slot-scope="scope">
              {{ scope.row.applyDate }}
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('userTaskList.applyStatus')"
            align="center"
            width="100"
          >
            <template slot-scope="scope">
              {{ applyStatusMap[scope.row.applyStatus] }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('userTaskList.remarks')"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ scope.row.remarks }}
            </template>
          </el-table-column>

          <el-table-column :label="$t('userTaskList.currentApproveName')" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.currentApproveName }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('userTaskList.action')" width="110" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-row>
                <el-col>
                  <el-button type="primary" size="mini" plain @click="showDetail(scope.row)">{{ $t('userTaskList.query') }}</el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="page-footer">
        <pagination v-show="total>0" :total="total" :page.sync="searchObject.pageIndex" :limit.sync="searchObject.pageSize" style="float:right;" @pagination="queryList" />
      </div>

      <div>
        <el-dialog
          v-if="applyDetailDialog.visible"
          :title.sync="applyDetailDialog.title"
          :visible.sync="applyDetailDialog.visible"
          :width="applyDetailDialog.width"
          :fullscreen="applyDetailDialog.fullscreen"
          :close-on-press-escape="applyDetailDialog.closeOnPressEscape"
          :modal-append-to-body="false"
          center
          :before-close="handleClose"
          @close="closeDetailDialog"
        >
          <Detail ref="detail" :data.sync="applyDetailDialog.data" @queryList="queryList" @close="closeDetailDialog" />

        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { generateTitle } from '@/utils/i18n'
import Pagination from '@/components/Pagination'
import Detail from '@/components/BpmFormBuild/detail'

import { getApplyList } from '@/api/process/userTask'
import { getDeptListByTenantId, getDictListByDictCode, getProcessDict } from '@/api/system/dict'

export default {
  name: 'ApplyList',
  components: { Pagination, Detail },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'info',
        2: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchObject: {
        deptCode: '',
        daterange: '',
        seachName: '',
        applyStatus: null,
        applyStartDate: '',
        applyEndDate: '',
        userTaskList: [],
        tenantId: store.getters.tenantId,
        pageIndex: 1,
        pageSize: 10
      },
      paginationObj: {
        pageSize: 1,
        rowCount: 10
      },
      statusList: [
        {
          label: '未发布',
          value: 1
        },
        {
          label: '已发布',
          value: 2
        }
      ],
      companyList: [],
      companyMap: {},
      statusMap: { 1: '未发布', 2: '已发布' },
      list: [],
      listLoading: true,
      total: 0,
      previewOptions: {
        width: 850
      },
      deptOptions: [],
      applyStatusOptions: [],
      applyStatusMap: {},
      processOptions: [],
      processMap: {},
      applyDetailDialog: {
        title: '',
        visible: false,
        width: '',
        name: '', // 组件名,
        loading: false,
        fullscreen: true,
        closeOnPressEscape: false
      }
    }
  },
  created() {
    const end = new Date()
    const start = new Date()
    start.setMonth(start.getMonth() - 6)

    this.searchObject = {
      deptCode: '',
      daterange: [start, end],
      seachName: '',
      applyStatus: null,
      applyStartDate: start,
      applyEndDate: end,
      userTaskList: [],
      tenantId: store.getters.tenantId,
      pageIndex: 1,
      pageSize: 10
    }
    this.getApplyStatusDict()
    this.getDeptList()
    this.getProcessDict()
    this.queryList()
  },
  mounted() {
  },
  methods: {

    getApplyStatusDict() {
      const param = 'pig:dict:processStatus'
      getDictListByDictCode(param).then(response => {
        this.applyStatusOptions = response.data
        for (const key in response.data) {
          this.applyStatusMap[response.data[key].value] = response.data[key].label
        }
      }).catch(_ => {})
    },
    showDetail(row) {
      this.applyDetailDialog.data = {
        applyId: row.applyId,
        disabled: true,
        taskType: 'apply',
        showAction: false
      }

      this.applyDetailDialog.visible = true
    },
    getProcessDict() {
      const param = store.getters.tenantId
      getProcessDict(param).then(response => {
        this.processOptions = response.data
        for (const key in response.data) {
          this.processMap[response.data[key].value] = response.data[key].label
        }
      }).catch(_ => {})
    },
    closeDetailDialog() {
      this.applyDetailDialog.visible = false
    },
    handleClose(done) {
      this.$confirm(this.$t('action.confirmClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    generateTitle,
    queryList() {
      this.listLoading = true
      var param = this.searchObject
      getApplyList(param).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.$nextTick(() => {
          this.listLoading = false
        })
      }).catch(_ => {
        this.$nextTick(() => {
          this.listLoading = false
        })
      })
    },
    handleDeptChange(value) {
      console.log(value)
    },
    getDeptList() {
      const param = store.getters.tenantId
      getDeptListByTenantId(param).then(response => {
        this.deptOptions = response.data
      }).catch(_ => {})
    }

  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>

.line{
  text-align: center;
}
.el-drawer:focus {
    outline: none;
}
.custom_drawer__content{
    margin: 5px 20px;
    align-content: center;
}
.el-drawer__header{
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #72767b;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 32px;
    padding: 20px 20px 0;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    font-weight: 600;
}
.drawer {
  overflow: scroll;
}
.page-footer{
  width: 100%;
    height: 50px;
}
</style>

