<template>
  <div class="app-container">
    <div>
      <div v-if="showSearch" class="filter-container">
        <el-form :inline="true" :model="listQuery" label-width="auto">
          <el-form-item label="数据源ID ">
            <el-input v-model="listQuery.dbId" placeholder="请输入数据源ID " />
          </el-form-item>
          <el-form-item label="表名称 ">
            <el-input v-model="listQuery.tableName" placeholder="请输入表名称 " />
          </el-form-item>
          <el-form-item label="作者 ">
            <el-input v-model="listQuery.author" placeholder="请输入作者 " />
          </el-form-item>
          <el-form-item label="项目路径 ">
            <el-input v-model="listQuery.contextPath" placeholder="请输入项目路径 " />
          </el-form-item>
          <el-form-item label="模块名称 ">
            <el-input v-model="listQuery.moduleName" placeholder="请输入模块名称 " />
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
          <el-table-column v-if="columns[0].visible" label="配置编号 " prop="configId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[1].visible" label="数据源ID " prop="dbId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[2].visible" label="表名称 " prop="tableName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[3].visible" label="作者 " prop="author" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[4].visible" label="项目路径 " prop="contextPath" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[5].visible" label="模块名称 " prop="moduleName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[6].visible" label="公共父级包名 " prop="parentPackage" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[7].visible" label="表名前缀 " prop="tablePrefix" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[8].visible" label="字段前缀 " prop="fieldPrefix" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[9].visible" label="后端路径 " prop="projectPath" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[10].visible" label="前端路径 " prop="vuePath" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[11].visible" label="是否覆盖 " prop="override" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[12].visible" label="父级菜单编号 " prop="parentMenuId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[13].visible" label="controller 命名规则 " prop="controllerName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[14].visible" label="impl命名规则 " prop="serviceImplName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[15].visible" label="service 命名规则 " prop="serviceName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[16].visible" label="xml 命名规则 " prop="xmlName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[17].visible" label="mapper 命名规则 " prop="mapperName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[18].visible" label="实体类 命名规则 " prop="entityName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[19].visible" label="自定义实体父类 " prop="superEntityClass" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[20].visible" label="自定义 mapper 父类 " prop="superMapperClass" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[21].visible" label="service 父类 " prop="superServiceClass" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[22].visible" label="service 实现类父类 " prop="superServiceImplClass" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[23].visible" label="controller 父类 " prop="superControllerClass" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[24].visible" label="租户编号 " prop="tenantId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[25].visible" label="备注 " prop="remarks" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[26].visible" label="状态" prop="validState" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[27].visible" label="操作人工号 " prop="operatorId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[28].visible" label="操作人姓名 " prop="operatorName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[29].visible" label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[30].visible" label="更新时间" align="center">
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
          <el-form-item v-if="true" label="配置编号 :" prop="configId">
            <el-input v-model="form.configId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="数据源ID :" prop="dbId">
            <el-input
              v-model="form.dbId"
              placeholder="请输入数据源ID "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表名称 :" prop="tableName">
            <el-input
              v-model="form.tableName"
              placeholder="请输入表名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="作者 :" prop="author">
            <el-input
              v-model="form.author"
              placeholder="请输入作者 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="项目路径 :" prop="contextPath">
            <el-input
              v-model="form.contextPath"
              placeholder="请输入项目路径 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="模块名称 :" prop="moduleName">
            <el-input
              v-model="form.moduleName"
              placeholder="请输入模块名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="公共父级包名 :" prop="parentPackage">
            <el-input
              v-model="form.parentPackage"
              placeholder="请输入公共父级包名 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表名前缀 :" prop="tablePrefix">
            <el-input
              v-model="form.tablePrefix"
              placeholder="请输入表名前缀 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段前缀 :" prop="fieldPrefix">
            <el-input
              v-model="form.fieldPrefix"
              placeholder="请输入字段前缀 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="后端路径 :" prop="projectPath">
            <el-input
              v-model="form.projectPath"
              placeholder="请输入后端路径 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="前端路径 :" prop="vuePath">
            <el-input
              v-model="form.vuePath"
              placeholder="请输入前端路径 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="是否覆盖 :" prop="override">
            <el-input
              v-model="form.override"
              placeholder="请输入是否覆盖 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="父级菜单编号 :" prop="parentMenuId">
            <el-input
              v-model="form.parentMenuId"
              placeholder="请输入父级菜单编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="controller 命名规则 :" prop="controllerName">
            <el-input
              v-model="form.controllerName"
              placeholder="请输入controller 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="impl命名规则 :" prop="serviceImplName">
            <el-input
              v-model="form.serviceImplName"
              placeholder="请输入impl命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="service 命名规则 :" prop="serviceName">
            <el-input
              v-model="form.serviceName"
              placeholder="请输入service 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="xml 命名规则 :" prop="xmlName">
            <el-input
              v-model="form.xmlName"
              placeholder="请输入xml 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="mapper 命名规则 :" prop="mapperName">
            <el-input
              v-model="form.mapperName"
              placeholder="请输入mapper 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="实体类 命名规则 :" prop="entityName">
            <el-input
              v-model="form.entityName"
              placeholder="请输入实体类 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="自定义实体父类 :" prop="superEntityClass">
            <el-input
              v-model="form.superEntityClass"
              placeholder="请输入自定义实体父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="自定义 mapper 父类 :" prop="superMapperClass">
            <el-input
              v-model="form.superMapperClass"
              placeholder="请输入自定义 mapper 父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="service 父类 :" prop="superServiceClass">
            <el-input
              v-model="form.superServiceClass"
              placeholder="请输入service 父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="service 实现类父类 :" prop="superServiceImplClass">
            <el-input
              v-model="form.superServiceImplClass"
              placeholder="请输入service 实现类父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="controller 父类 :" prop="superControllerClass">
            <el-input
              v-model="form.superControllerClass"
              placeholder="请输入controller 父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="form.tenantId"
              placeholder="请输入租户编号 "
            />
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

      <el-dialog :title="titleMap[dialogStatus]" :visible.sync="updateDialogVisible" width="40%" @close="handleDialogClose">
        <el-form ref="updateDataForm" :model="updateForm" :rules="updateRules" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="true" label="配置编号 :" prop="configId">
            <el-input v-model="updateForm.configId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="数据源ID :" prop="dbId">
            <el-input
              v-model="updateForm.dbId"
              placeholder="请输入数据源ID "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表名称 :" prop="tableName">
            <el-input
              v-model="updateForm.tableName"
              placeholder="请输入表名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="作者 :" prop="author">
            <el-input
              v-model="updateForm.author"
              placeholder="请输入作者 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="项目路径 :" prop="contextPath">
            <el-input
              v-model="updateForm.contextPath"
              placeholder="请输入项目路径 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="模块名称 :" prop="moduleName">
            <el-input
              v-model="updateForm.moduleName"
              placeholder="请输入模块名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="公共父级包名 :" prop="parentPackage">
            <el-input
              v-model="updateForm.parentPackage"
              placeholder="请输入公共父级包名 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表名前缀 :" prop="tablePrefix">
            <el-input
              v-model="updateForm.tablePrefix"
              placeholder="请输入表名前缀 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段前缀 :" prop="fieldPrefix">
            <el-input
              v-model="updateForm.fieldPrefix"
              placeholder="请输入字段前缀 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="后端路径 :" prop="projectPath">
            <el-input
              v-model="updateForm.projectPath"
              placeholder="请输入后端路径 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="前端路径 :" prop="vuePath">
            <el-input
              v-model="updateForm.vuePath"
              placeholder="请输入前端路径 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="是否覆盖 :" prop="override">
            <el-input
              v-model="updateForm.override"
              placeholder="请输入是否覆盖 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="父级菜单编号 :" prop="parentMenuId">
            <el-input
              v-model="updateForm.parentMenuId"
              placeholder="请输入父级菜单编号 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="controller 命名规则 :" prop="controllerName">
            <el-input
              v-model="updateForm.controllerName"
              placeholder="请输入controller 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="impl命名规则 :" prop="serviceImplName">
            <el-input
              v-model="updateForm.serviceImplName"
              placeholder="请输入impl命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="service 命名规则 :" prop="serviceName">
            <el-input
              v-model="updateForm.serviceName"
              placeholder="请输入service 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="xml 命名规则 :" prop="xmlName">
            <el-input
              v-model="updateForm.xmlName"
              placeholder="请输入xml 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="mapper 命名规则 :" prop="mapperName">
            <el-input
              v-model="updateForm.mapperName"
              placeholder="请输入mapper 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="实体类 命名规则 :" prop="entityName">
            <el-input
              v-model="updateForm.entityName"
              placeholder="请输入实体类 命名规则 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="自定义实体父类 :" prop="superEntityClass">
            <el-input
              v-model="updateForm.superEntityClass"
              placeholder="请输入自定义实体父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="自定义 mapper 父类 :" prop="superMapperClass">
            <el-input
              v-model="updateForm.superMapperClass"
              placeholder="请输入自定义 mapper 父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="service 父类 :" prop="superServiceClass">
            <el-input
              v-model="updateForm.superServiceClass"
              placeholder="请输入service 父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="service 实现类父类 :" prop="superServiceImplClass">
            <el-input
              v-model="updateForm.superServiceImplClass"
              placeholder="请输入service 实现类父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="controller 父类 :" prop="superControllerClass">
            <el-input
              v-model="updateForm.superControllerClass"
              placeholder="请输入controller 父类 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="租户编号 :" prop="tenantId">
            <el-input
              v-model="updateForm.tenantId"
              placeholder="请输入租户编号 "
            />
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
import { getTableStrategyConfigListPage, saveTableStrategyConfig, updateTableStrategyConfig, deleteById, download } from '@/api/generator/tableStrategyConfig'
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
      ],
      // 列信息
      columns: [
        { key: 0, value: 'configId', label: '配置编号', visible: true },
        { key: 1, value: 'dbId', label: '数据源ID', visible: true },
        { key: 2, value: 'tableName', label: '表名称', visible: true },
        { key: 3, value: 'author', label: '作者', visible: true },
        { key: 4, value: 'contextPath', label: '项目路径', visible: true },
        { key: 5, value: 'moduleName', label: '模块名称', visible: true },
        { key: 6, value: 'parentPackage', label: '公共父级包名', visible: true },
        { key: 7, value: 'tablePrefix', label: '表名前缀', visible: true },
        { key: 8, value: 'fieldPrefix', label: '字段前缀', visible: true },
        { key: 9, value: 'projectPath', label: '后端路径', visible: true },
        { key: 10, value: 'vuePath', label: '前端路径', visible: true },
        { key: 11, value: 'override', label: '是否覆盖 1 是 0 否', visible: true },
        { key: 12, value: 'parentMenuId', label: '父级菜单编号', visible: true },
        { key: 13, value: 'controllerName', label: 'controller 命名规则', visible: true },
        { key: 14, value: 'serviceImplName', label: 'impl命名规则', visible: true },
        { key: 15, value: 'serviceName', label: 'service 命名规则', visible: true },
        { key: 16, value: 'xmlName', label: 'xml 命名规则', visible: true },
        { key: 17, value: 'mapperName', label: 'mapper 命名规则', visible: true },
        { key: 18, value: 'entityName', label: '实体类 命名规则', visible: true },
        { key: 19, value: 'superEntityClass', label: '自定义实体父类', visible: true },
        { key: 20, value: 'superMapperClass', label: '自定义 mapper 父类', visible: true },
        { key: 21, value: 'superServiceClass', label: 'service 父类', visible: true },
        { key: 22, value: 'superServiceImplClass', label: 'service 实现类父类', visible: true },
        { key: 23, value: 'superControllerClass', label: 'controller 父类', visible: true },
        { key: 24, value: 'tenantId', label: '租户编号', visible: true },
        { key: 25, value: 'remarks', label: '备注', visible: true },
        { key: 26, value: 'validState', label: '状态 1 有效 0 失效', visible: true },
        { key: 27, value: 'operatorId', label: '操作人工号', visible: true },
        { key: 28, value: 'operatorName', label: '操作人姓名', visible: true },
        { key: 29, value: 'createTime', label: '创建时间', visible: true },
        { key: 30, value: 'updateTime', label: '更新时间', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        dbId: undefined,
        tableName: undefined,
        author: undefined,
        contextPath: undefined,
        moduleName: undefined
      },
      input: '',
      form: {
        configId: undefined, // 配置编号
        dbId: undefined, // 数据源ID
        tableName: undefined, // 表名称
        author: undefined, // 作者
        contextPath: undefined, // 项目路径
        moduleName: undefined, // 模块名称
        parentPackage: undefined, // 公共父级包名
        tablePrefix: undefined, // 表名前缀
        fieldPrefix: undefined, // 字段前缀
        projectPath: undefined, // 后端路径
        vuePath: undefined, // 前端路径
        override: undefined, // 是否覆盖
        parentMenuId: undefined, // 父级菜单编号
        controllerName: undefined, // controller 命名规则
        serviceImplName: undefined, // impl命名规则
        serviceName: undefined, // service 命名规则
        xmlName: undefined, // xml 命名规则
        mapperName: undefined, // mapper 命名规则
        entityName: undefined, // 实体类 命名规则
        superEntityClass: undefined, // 自定义实体父类
        superMapperClass: undefined, // 自定义 mapper 父类
        superServiceClass: undefined, // service 父类
        superServiceImplClass: undefined, // service 实现类父类
        superControllerClass: undefined, // controller 父类
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        configId: undefined, // 配置编号
        dbId: undefined, // 数据源ID
        tableName: undefined, // 表名称
        author: undefined, // 作者
        contextPath: undefined, // 项目路径
        moduleName: undefined, // 模块名称
        parentPackage: undefined, // 公共父级包名
        tablePrefix: undefined, // 表名前缀
        fieldPrefix: undefined, // 字段前缀
        projectPath: undefined, // 后端路径
        vuePath: undefined, // 前端路径
        override: undefined, // 是否覆盖
        parentMenuId: undefined, // 父级菜单编号
        controllerName: undefined, // controller 命名规则
        serviceImplName: undefined, // impl命名规则
        serviceName: undefined, // service 命名规则
        xmlName: undefined, // xml 命名规则
        mapperName: undefined, // mapper 命名规则
        entityName: undefined, // 实体类 命名规则
        superEntityClass: undefined, // 自定义实体父类
        superMapperClass: undefined, // 自定义 mapper 父类
        superServiceClass: undefined, // service 父类
        superServiceImplClass: undefined, // service 实现类父类
        superControllerClass: undefined, // controller 父类
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
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
        configId: [
        ],
        dbId: [
        ],
        tableName: [
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        contextPath: [
        ],
        moduleName: [
        ],
        parentPackage: [
        ],
        tablePrefix: [
        ],
        fieldPrefix: [
        ],
        projectPath: [
        ],
        vuePath: [
        ],
        override: [
        ],
        parentMenuId: [
        ],
        controllerName: [
        ],
        serviceImplName: [
        ],
        serviceName: [
        ],
        xmlName: [
        ],
        mapperName: [
        ],
        entityName: [
        ],
        superEntityClass: [
        ],
        superMapperClass: [
        ],
        superServiceClass: [
        ],
        superServiceImplClass: [
        ],
        superControllerClass: [
        ],
        tenantId: [
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
        configId: [
        ],
        dbId: [
        ],
        tableName: [
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        contextPath: [
        ],
        moduleName: [
        ],
        parentPackage: [
        ],
        tablePrefix: [
        ],
        fieldPrefix: [
        ],
        projectPath: [
        ],
        vuePath: [
        ],
        override: [
        ],
        parentMenuId: [
        ],
        controllerName: [
        ],
        serviceImplName: [
        ],
        serviceName: [
        ],
        xmlName: [
        ],
        mapperName: [
        ],
        entityName: [
        ],
        superEntityClass: [
        ],
        superMapperClass: [
        ],
        superServiceClass: [
        ],
        superServiceImplClass: [
        ],
        superControllerClass: [
        ],
        tenantId: [
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
  },
  methods: {
    getList() {
      this.listLoading = true
      getTableStrategyConfigListPage(this.listQuery).then(response => {
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
        const id = row.configId
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
            if (_this.dialogStatus === 'create') {
              saveTableStrategyConfig(_this.form).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.dialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            } else {
              updateTableStrategyConfig(_this.updateForm).then(response => {
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
        configId: undefined, // 配置编号
        dbId: undefined, // 数据源ID
        tableName: undefined, // 表名称
        author: undefined, // 作者
        contextPath: undefined, // 项目路径
        moduleName: undefined, // 模块名称
        parentPackage: undefined, // 公共父级包名
        tablePrefix: undefined, // 表名前缀
        fieldPrefix: undefined, // 字段前缀
        projectPath: undefined, // 后端路径
        vuePath: undefined, // 前端路径
        override: undefined, // 是否覆盖
        parentMenuId: undefined, // 父级菜单编号
        controllerName: undefined, // controller 命名规则
        serviceImplName: undefined, // impl命名规则
        serviceName: undefined, // service 命名规则
        xmlName: undefined, // xml 命名规则
        mapperName: undefined, // mapper 命名规则
        entityName: undefined, // 实体类 命名规则
        superEntityClass: undefined, // 自定义实体父类
        superMapperClass: undefined, // 自定义 mapper 父类
        superServiceClass: undefined, // service 父类
        superServiceImplClass: undefined, // service 实现类父类
        superControllerClass: undefined, // controller 父类
        tenantId: undefined, // 租户编号
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

<style  rel="stylesheet/scss" lang="scss" scoped>

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
