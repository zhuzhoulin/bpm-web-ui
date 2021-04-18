<template>
  <div class="app-container">
    <div class="container-info">
      <div class="filter-container">
        <el-form :inline="true" :model="searchObject">
          <el-form-item :label="$t('formList.formName')">
            <el-input v-model="searchObject.formName" :placeholder="$t('formList.formName')" clearable />
          </el-form-item>
          <el-form-item :label="$t('formList.formKey')">
            <el-input v-model="searchObject.formKey" :placeholder="$t('formList.formKey')" clearable />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="queryList">{{ $t('formList.query') }}</el-button>

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
          <el-table-column align="center" :label="$t('formList.id')" width="95">
            <template slot-scope="scope">
              {{ (searchObject.pageIndex - 1 ) * searchObject.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.formName')">
            <template slot-scope="scope">
              {{ scope.row.formName }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.formKey')">
            <template slot-scope="scope">
              {{ scope.row.formKey }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.formType')" width="110" align="center">
            <template slot-scope="scope">
              {{ formTypeMap[scope.row.formType] }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.tenantId')" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.tenantId }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.validState')" width="110" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                {{ statusMap[scope.row.validState] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('formList.remarks')"
            align="center"
            width="200"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ scope.row.remarks }}
            </template>
          </el-table-column>

          <el-table-column fixed="right" align="center" :label="$t('formList.action')" width="150" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="12">
                  <el-button type="info" size="mini" plain @click="handlePreview(scope.row)">{{ $t('formList.preview') }}</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="success" size="mini" plain @click="handleSelectForm(scope.row)">{{ $t('formList.select') }}</el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="page-footer">
        <pagination v-show="total>0" :total="total" :page.sync="searchObject.pageIndex" :limit.sync="searchObject.pageSize" style="float:right;" layout="total, sizes, prev, next, jumper" @pagination="queryList" />
      </div>

      <div>
        <!-- 预览 -->

        <el-dialog
          :title="formPreViewDialog.title"
          :visible.sync="formPreViewDialog.visible"
          :width="formPreViewDialog.width"
          :fullscreen="formPreViewDialog.fullscreen"
          :close-on-press-escape="formPreViewDialog.closeOnPressEscape"
          append-to-body
          center
        >
          <PreFormView ref="preFormView" :form-info.sync="formPreViewDialog.data" :width="formPreViewDialog.width" @closePreViewDialog="closePreViewDialog" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { generateTitle } from '@/utils/i18n'
import Pagination from '@/components/Pagination'
import { getFormListPage } from '@/api/system/form'
import PreFormView from '@/components/PreFormView'

export default {
  name: 'SelectForm',
  components: { Pagination, PreFormView },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchObject: {
        formKey: '',
        formName: '',
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
          label: '有效',
          value: 1
        },
        {
          label: '失效',
          value: 0
        }
      ],
      statusMap: { 1: '有效', 0: '失效' },
      formTypeMap: { 1: 'PC', 2: 'mobile' },

      list: [],
      listLoading: true,
      total: 0,
      previewOptions: {
        width: 850
      },
      formPreViewDialog: {
        title: '预览',
        visible: false,
        width: '',
        name: '预览', // 组件名,
        loading: false,
        fullscreen: false,
        closeOnPressEscape: false
      }
    }
  },
  created() {
    this.searchObject = {
      formKey: '',
      formName: '',
      status: null,
      tenantId: store.getters.tenantId,
      pageIndex: 1,
      pageSize: 10
    }
    this.queryList()
  },
  mounted() {
  },
  methods: {
    handleSelectForm(row) {
      this.$emit('setForm', row.formKey, row.formName)
    },
    closePreViewDialog() {
      this.$nextTick(() => {
        this.formPreViewDialog.visible = false
      })
    },
    handlePreview(row) {
      // 打开预览模态框
      this.formPreViewDialog.data = row
      this.$nextTick(() => {
        this.formPreViewDialog.visible = true
      })
    },
    generateTitle,
    queryList() {
      this.listLoading = true
      var param = this.searchObject
      getFormListPage(param).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.$nextTick(() => {
          this.listLoading = false
        })
      })
    }

  }
}
</script>

<style scoped>
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
.el-drawer__header {
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
}

.page-footer{
  width: 100%;
    height: 50px;
}
</style>

