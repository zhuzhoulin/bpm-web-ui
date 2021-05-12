<template>
  <div class="app-container">
    <div class="container-info">
      <div class="filter-container">
        <el-form :inline="true" :model="searchObject">
          <el-form-item :label="$t('dictList.dictName')">
            <el-input v-model="searchObject.dictName" :placeholder="$t('dictList.dictName')" clearable />
          </el-form-item>
          <el-form-item :label="$t('dictList.dictCode')">
            <el-input v-model="searchObject.dictCode" :placeholder="$t('dictList.dictCode')" clearable />
          </el-form-item>
          <el-form-item :label="$t('dictList.status')">
            <el-select v-model="searchObject.validState" :placeholder="$t('dictList.status')" clearable>
              <el-option value="-1">{{ $t('dictList.placeSelect') }}</el-option>
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="$t('dictList.status'+item.value)"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryList">{{ $t('dictList.query') }}</el-button>
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
          <el-table-column align="center" :label="$t('dictList.id')" width="95">
            <template slot-scope="scope">
              {{ (searchObject.pageIndex - 1 ) * searchObject.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"

            :label="$t('dictList.dictCode')"
          >
            <template slot-scope="scope">
              {{ scope.row.dictCode }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('dictList.dictName')"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ scope.row.dictName }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('dictList.tenantId')" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.tenantId }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('dictList.validState')" width="70" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                {{ statusMap[scope.row.validState] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('dictList.remarks')"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ scope.row.remark }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('dictList.operatorName')" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.operatorName + '-' + scope.row.operatorId }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('dictList.operatorDate')" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime || scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width" fixed="right">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24">
                  <el-button type="primary" size="mini" plain @click="selectDict(scope.row)">{{ $t('dictList.select') }}</el-button>
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
            <dictItemList ref="dictItem" :dict-info.sync="showDictItemDialog.data" @getList="queryList" @close="closeUpdate" />
          </div>
        </el-drawer>

      </div>

    </div>
  </div>
</template>

<script>
import store from '@/store'
import { generateTitle } from '@/utils/i18n'
import Pagination from '@/components/Pagination'
import { getDictListPage } from '@/api/system/dict'
import dictItemList from '../../../src/views/system/dictItem/dictItemList.vue'

export default {
  name: 'SelectDict',
  components: { Pagination, dictItemList },
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
      searchObject: {
        dictCode: '',
        dictName: '',
        status: null,
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
          label: '正常',
          value: 1
        },
        {
          label: '停用',
          value: 0
        }
      ],
      companyList: [],
      companyMap: {},
      statusMap: { 1: '正常', 0: '停用' },
      list: [],
      listLoading: true,
      total: 0,
      previewOptions: {
        width: 850
      },
      deptOptions: [],
      showUpdateDialog: {
        // 弹窗组件传递数据
        title: '修改',
        visible: false,
        width: '',
        name: '修改', // 组件名,
        loading: false,
        data: '',
        fullscreen: false,
        closeOnPressEscape: false,
        direction: 'rtl'
      },
      showInsertDialog: {
        title: '新增',
        visible: false,
        width: '',
        name: '', // 组件名,
        loading: false
      },
      showDictItemDialog: {
        title: '字典值列表',
        visible: false,
        width: '83%',
        name: '字典值列表', // 组件名,
        loading: false,
        data: '',
        fullscreen: false,
        closeOnPressEscape: false,
        direction: 'rtl'
      }
    }
  },
  created() {
    this.searchObject = {
      processKey: '',
      formName: '',
      validState: null,
      tenantId: store.getters.tenantId,
      pageIndex: 1,
      pageSize: 10
    }
    this.queryList()
  },
  mounted() {
  },
  methods: {
    selectDict(row) {
      this.$emit('save', row.dictCode)
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
    insert() {
      this.$nextTick(() => {
        this.showInsertDialog.visible = true
      })
    },
    closeInsert() {
      this.$nextTick(() => {
        this.showInsertDialog.visible = false
      })
    },
    update(row) {
      this.showUpdateDialog.data = row
      this.$nextTick(() => {
        this.showUpdateDialog.visible = true
      })
    },
    closeUpdate() {
      this.$nextTick(() => {
        this.showUpdateDialog.visible = false
      })
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
      getDictListPage(param).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.$nextTick(() => {
          this.listLoading = false
        })
      })
    },
    handleDeptChange(value) {
      console.log(value)
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

