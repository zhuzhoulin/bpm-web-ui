<template>
  <div>
    <div class="app-container">
      <div class="container-info">
        <div class="filter-container">
          <!-- <el-form :inline="true" :model="searchObject">
            <el-form-item>
              <el-button type="primary" @click="queryList">{{ $t('processList.query') }}</el-button>
              <el-button type="primary" @click="addProcess">{{ $t('processList.addProcess') }}</el-button>
            </el-form-item>
          </el-form> -->
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
            <el-table-column align="center" :label="$t('processList.id')" width="95">
              <template slot-scope="scope">
                {{ (searchObject.pageIndex - 1 ) * searchObject.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('processList.processDetailId')" align="center">
              <template slot-scope="scope">
                {{ scope.row.processDetailId }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('processList.definitionId')" width="180" align="center">
              <template slot-scope="scope">
                {{ scope.row.definitionId }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('processList.mainVersion')" align="center">
              <template slot-scope="scope">
                {{ mainVersionMap[scope.row.mainVersion] }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('processList.publishStatus')" align="center">
              <template slot-scope="scope">
                {{ publishStatusMap[scope.row.publishStatus] }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('processList.operatorName')" align="center">
              <template slot-scope="scope">
                {{ scope.row.operatorName + '-' + scope.row.operatorId }}
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('processList.updateTime')" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.updateTime || scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('processList.action')" width="150" class-name="small-padding fixed-width" fixed="right">
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="24">
                    <el-button v-if="scope.row.mainVersion == 2" type="success" size="mini" plain @click="updateDefaultVersion(scope.row)">{{ $t('processList.setDefault') }}</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-footer">
          <pagination v-show="total>0" :total="total" :page.sync="searchObject.pageIndex" :limit.sync="searchObject.pageSize" style="float:right;" @pagination="queryList" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProcessDetailListPage, updateDefaultVersion } from '@/api/process/processDetail'
import deepClone from 'clone-deep'
import { generateTitle } from '@/utils/i18n'
import store from '@/store'
import Pagination from '@/components/Pagination'

export default {

  name: 'ProcessVersion',
  components: { Pagination },

  props: {
    processInfo: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      listLoading: false,
      tenantId: store.getters.tenantId,
      list: [],
      process: {},
      total: 0,
      searchObject: {
        tenantId: store.getters.tenantId,
        processId: this.processInfo.processId,
        pageIndex: 1,
        pageSize: 10
      },
      mainVersionMap: {
        1: '主版本', 2: '非主版本'
      },
      publishStatusMap: {
        1: '未发布', 2: '已发布'
      }
    }
  },
  computed: {

  },
  watch: {
    processInfo: {
      handler(newValue, oldValue) {
        this.process = deepClone(newValue)
      },
      deep: true
    }
  },
  mounted() {

  },
  created() {
    this.process = deepClone(this.processInfo)

    this.queryList()
  },
  methods: {
    queryList() {
      this.listLoading = true
      const postData = this.searchObject

      getProcessDetailListPage(postData).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
      this.$nextTick(() => {
        this.listLoading = false
      })
    },

    generateTitle,

    updateDefaultVersion(row) {
      const _this = this
      _this.loading = true

      updateDefaultVersion(row.processId, row.processDetailId).then(response => {
        _this.$message.success('设置成功!')
        _this.$nextTick(() => {
          _this.loading = false
        })
        _this.$emit('close')
        _this.$emit('queryList')
      })
    }

  }
}
</script>

<style scoped>
.page-footer{
  width: 100%;
    height: 50px;
}
</style>
