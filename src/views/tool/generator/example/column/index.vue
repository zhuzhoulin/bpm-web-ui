<template>
  <div class="app-container">
    <div>
      <div v-if="showSearch" class="filter-container">
        <el-form :inline="true" :model="listQuery" label-width="auto">
          <el-form-item label="数据源ID">
            <el-input v-model="listQuery.dbId" placeholder="请输入数据源ID " />
          </el-form-item>
          <el-form-item label="表名">
            <el-input v-model="listQuery.tableName" placeholder="请输入表名 " />
          </el-form-item>
          <el-form-item label="字段名">
            <el-input v-model="listQuery.columnName" placeholder="请输入字段名 " />
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
          <el-table-column v-if="columns[0].visible" label="列序号 " prop="columnId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[1].visible" label="数据源ID " prop="dbId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[2].visible" label="表名 " prop="tableName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[3].visible" label="字段名 " prop="columnName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[4].visible" label="编码 " prop="collation" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[5].visible" label="额外参数 " prop="extra" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[6].visible" label="权限 " prop="privileges" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[7].visible" label="默认值 " prop="defaultValue" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[8].visible" label="字段描述 " prop="columnComment" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[9].visible" label="标签名称 " prop="formLabel" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[10].visible" label="Java字段类型 " prop="propertyType" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[11].visible" label="字段属性名 " prop="propertyName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[12].visible" label="字段类型 " prop="columnType" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[13].visible" label="主键 1 是 0 否 " prop="keyFlag" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[14].visible" label="自增列 1 是 0 否 " prop="keyIdentityFlag" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[15].visible" label="必填 1 是 0 否 " prop="notNull" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[16].visible" label="查询条件 1 是 0 否 " prop="queryFlag" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[17].visible" label="查询方式 " prop="queryMethod" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[18].visible" label="插入是否显示 1 是 0 否 " prop="insertFlag" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[19].visible" label="更新是否显示 1 是 0 否 " prop="updateFlag" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[20].visible" label="查询是否显示 1 是 0 否 " prop="listFlag" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[21].visible" label="下载是否显示 1 是 0 否 " prop="downloadFlag" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[22].visible" label="校验类型 " prop="validateType" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[23].visible" label="校验 最大长度 " prop="validateMaxLength" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[24].visible" label="校验 最小长度 " prop="validateMinLength" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[25].visible" label="校验 最大值 " prop="validateMaxValue" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[26].visible" label="校验 最小值 " prop="validateMinValue" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[27].visible" label="表单类型 " prop="formType" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[28].visible" label="关联字典编码 " prop="dictCode" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[29].visible" label="关联字典名称 " prop="dictName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[30].visible" label="租户编号 " prop="tenantId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[31].visible" label="备注 " prop="remarks" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[32].visible" label="状态" prop="validState" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                <span>{{ statusMap[scope.row.validState] }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[33].visible" label="操作人工号 " prop="operatorId" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[34].visible" label="操作人姓名 " prop="operatorName" align="center" sortable :show-overflow-tooltip="true" />
          <el-table-column v-if="columns[35].visible" label="创建时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="columns[36].visible" label="更新时间" align="center">
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
          <el-form-item v-if="true" label="列序号 :" prop="columnId">
            <el-input v-model="form.columnId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="数据源ID :" prop="dbId">
            <el-input
              v-model="form.dbId"
              placeholder="请输入数据源ID "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表名 :" prop="tableName">
            <el-input
              v-model="form.tableName"
              placeholder="请输入表名 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段名 :" prop="columnName">
            <el-input
              v-model="form.columnName"
              placeholder="请输入字段名 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="编码 :" prop="collation">
            <el-input
              v-model="form.collation"
              placeholder="请输入编码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="额外参数 :" prop="extra">
            <el-input
              v-model="form.extra"
              placeholder="请输入额外参数 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="权限 :" prop="privileges">
            <el-input
              v-model="form.privileges"
              placeholder="请输入权限 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="默认值 :" prop="defaultValue">
            <el-input
              v-model="form.defaultValue"
              placeholder="请输入默认值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段描述 :" prop="columnComment">
            <el-input
              v-model="form.columnComment"
              placeholder="请输入字段描述 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="标签名称 :" prop="formLabel">
            <el-input
              v-model="form.formLabel"
              placeholder="请输入标签名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="Java字段类型 :" prop="propertyType">
            <el-input
              v-model="form.propertyType"
              placeholder="请输入Java字段类型 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段属性名 :" prop="propertyName">
            <el-input
              v-model="form.propertyName"
              placeholder="请输入字段属性名 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段类型 :" prop="columnType">
            <el-input
              v-model="form.columnType"
              placeholder="请输入字段类型 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="主键 1 是 0 否 :" prop="keyFlag">
            <el-input
              v-model="form.keyFlag"
              placeholder="请输入主键 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="自增列 1 是 0 否 :" prop="keyIdentityFlag">
            <el-input
              v-model="form.keyIdentityFlag"
              placeholder="请输入自增列 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="必填 1 是 0 否 :" prop="notNull">
            <el-input
              v-model="form.notNull"
              placeholder="请输入必填 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="查询条件 1 是 0 否 :" prop="queryFlag">
            <el-input
              v-model="form.queryFlag"
              placeholder="请输入查询条件 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="查询方式 :" prop="queryMethod">
            <el-input
              v-model="form.queryMethod"
              placeholder="请输入查询方式 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="插入是否显示 1 是 0 否 :" prop="insertFlag">
            <el-input
              v-model="form.insertFlag"
              placeholder="请输入插入是否显示 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="更新是否显示 1 是 0 否 :" prop="updateFlag">
            <el-input
              v-model="form.updateFlag"
              placeholder="请输入更新是否显示 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="查询是否显示 1 是 0 否 :" prop="listFlag">
            <el-input
              v-model="form.listFlag"
              placeholder="请输入查询是否显示 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="下载是否显示 1 是 0 否 :" prop="downloadFlag">
            <el-input
              v-model="form.downloadFlag"
              placeholder="请输入下载是否显示 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验类型 :" prop="validateType">
            <el-input
              v-model="form.validateType"
              placeholder="请输入校验类型 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验 最大长度 :" prop="validateMaxLength">
            <el-input
              v-model="form.validateMaxLength"
              placeholder="请输入校验 最大长度 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验 最小长度 :" prop="validateMinLength">
            <el-input
              v-model="form.validateMinLength"
              placeholder="请输入校验 最小长度 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验 最大值 :" prop="validateMaxValue">
            <el-input
              v-model="form.validateMaxValue"
              placeholder="请输入校验 最大值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验 最小值 :" prop="validateMinValue">
            <el-input
              v-model="form.validateMinValue"
              placeholder="请输入校验 最小值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表单类型 :" prop="formType">
            <el-input
              v-model="form.formType"
              placeholder="请输入表单类型 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="关联字典编码 :" prop="dictCode">
            <el-input
              v-model="form.dictCode"
              placeholder="请输入关联字典编码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="关联字典名称 :" prop="dictName">
            <el-input
              v-model="form.dictName"
              placeholder="请输入关联字典名称 "
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
          <el-form-item v-if="true" label="状态 1 有效 0 失效 :" prop="validState">
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
          <el-form-item v-if="true" label="列序号 :" prop="columnId">
            <el-input v-model="updateForm.columnId" disabled />

          </el-form-item>
          <el-form-item v-if="true" label="数据源ID :" prop="dbId">
            <el-input
              v-model="updateForm.dbId"
              placeholder="请输入数据源ID "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表名 :" prop="tableName">
            <el-input
              v-model="updateForm.tableName"
              placeholder="请输入表名 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段名 :" prop="columnName">
            <el-input
              v-model="updateForm.columnName"
              placeholder="请输入字段名 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="编码 :" prop="collation">
            <el-input
              v-model="updateForm.collation"
              placeholder="请输入编码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="额外参数 :" prop="extra">
            <el-input
              v-model="updateForm.extra"
              placeholder="请输入额外参数 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="权限 :" prop="privileges">
            <el-input
              v-model="updateForm.privileges"
              placeholder="请输入权限 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="默认值 :" prop="defaultValue">
            <el-input
              v-model="updateForm.defaultValue"
              placeholder="请输入默认值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段描述 :" prop="columnComment">
            <el-input
              v-model="updateForm.columnComment"
              placeholder="请输入字段描述 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="标签名称 :" prop="formLabel">
            <el-input
              v-model="updateForm.formLabel"
              placeholder="请输入标签名称 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="Java字段类型 :" prop="propertyType">
            <el-input
              v-model="updateForm.propertyType"
              placeholder="请输入Java字段类型 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段属性名 :" prop="propertyName">
            <el-input
              v-model="updateForm.propertyName"
              placeholder="请输入字段属性名 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="字段类型 :" prop="columnType">
            <el-input
              v-model="updateForm.columnType"
              placeholder="请输入字段类型 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="主键 1 是 0 否 :" prop="keyFlag">
            <el-input
              v-model="updateForm.keyFlag"
              placeholder="请输入主键 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="自增列 1 是 0 否 :" prop="keyIdentityFlag">
            <el-input
              v-model="updateForm.keyIdentityFlag"
              placeholder="请输入自增列 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="必填 1 是 0 否 :" prop="notNull">
            <el-input
              v-model="updateForm.notNull"
              placeholder="请输入必填 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="查询条件 1 是 0 否 :" prop="queryFlag">
            <el-input
              v-model="updateForm.queryFlag"
              placeholder="请输入查询条件 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="查询方式 :" prop="queryMethod">
            <el-input
              v-model="updateForm.queryMethod"
              placeholder="请输入查询方式 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="插入是否显示 1 是 0 否 :" prop="insertFlag">
            <el-input
              v-model="updateForm.insertFlag"
              placeholder="请输入插入是否显示 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="更新是否显示 1 是 0 否 :" prop="updateFlag">
            <el-input
              v-model="updateForm.updateFlag"
              placeholder="请输入更新是否显示 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="查询是否显示 1 是 0 否 :" prop="listFlag">
            <el-input
              v-model="updateForm.listFlag"
              placeholder="请输入查询是否显示 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="下载是否显示 1 是 0 否 :" prop="downloadFlag">
            <el-input
              v-model="updateForm.downloadFlag"
              placeholder="请输入下载是否显示 1 是 0 否 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验类型 :" prop="validateType">
            <el-input
              v-model="updateForm.validateType"
              placeholder="请输入校验类型 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验 最大长度 :" prop="validateMaxLength">
            <el-input
              v-model="updateForm.validateMaxLength"
              placeholder="请输入校验 最大长度 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验 最小长度 :" prop="validateMinLength">
            <el-input
              v-model="updateForm.validateMinLength"
              placeholder="请输入校验 最小长度 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验 最大值 :" prop="validateMaxValue">
            <el-input
              v-model="updateForm.validateMaxValue"
              placeholder="请输入校验 最大值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="校验 最小值 :" prop="validateMinValue">
            <el-input
              v-model="updateForm.validateMinValue"
              placeholder="请输入校验 最小值 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="表单类型 :" prop="formType">
            <el-input
              v-model="updateForm.formType"
              placeholder="请输入表单类型 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="关联字典编码 :" prop="dictCode">
            <el-input
              v-model="updateForm.dictCode"
              placeholder="请输入关联字典编码 "
            />
          </el-form-item>
          <el-form-item v-if="true" label="关联字典名称 :" prop="dictName">
            <el-input
              v-model="updateForm.dictName"
              placeholder="请输入关联字典名称 "
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
          <el-form-item v-if="true" label="状态 1 有效 0 失效 :" prop="validState">
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
import { getColumnListPage, saveColumn, updateColumn, deleteById, download } from '@/api/generator/column'
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
        { key: 0, value: 'columnId', label: '列序号', visible: true },
        { key: 1, value: 'dbId', label: '数据源ID', visible: true },
        { key: 2, value: 'tableName', label: '表名', visible: true },
        { key: 3, value: 'columnName', label: '字段名', visible: true },
        { key: 4, value: 'collation', label: '编码', visible: true },
        { key: 5, value: 'extra', label: '额外参数', visible: true },
        { key: 6, value: 'privileges', label: '权限', visible: true },
        { key: 7, value: 'defaultValue', label: '默认值', visible: true },
        { key: 8, value: 'columnComment', label: '字段描述', visible: true },
        { key: 9, value: 'formLabel', label: '标签名称', visible: true },
        { key: 10, value: 'propertyType', label: 'Java字段类型', visible: true },
        { key: 11, value: 'propertyName', label: '字段属性名', visible: true },
        { key: 12, value: 'columnType', label: '字段类型', visible: true },
        { key: 13, value: 'keyFlag', label: '主键 1 是 0 否', visible: true },
        { key: 14, value: 'keyIdentityFlag', label: '自增列 1 是 0 否', visible: true },
        { key: 15, value: 'notNull', label: '必填 1 是 0 否', visible: true },
        { key: 16, value: 'queryFlag', label: '查询条件 1 是 0 否', visible: true },
        { key: 17, value: 'queryMethod', label: '查询方式', visible: true },
        { key: 18, value: 'insertFlag', label: '插入是否显示 1 是 0 否', visible: true },
        { key: 19, value: 'updateFlag', label: '更新是否显示 1 是 0 否', visible: true },
        { key: 20, value: 'listFlag', label: '查询是否显示 1 是 0 否', visible: true },
        { key: 21, value: 'downloadFlag', label: '下载是否显示 1 是 0 否', visible: true },
        { key: 22, value: 'validateType', label: '校验类型', visible: true },
        { key: 23, value: 'validateMaxLength', label: '校验 最大长度', visible: true },
        { key: 24, value: 'validateMinLength', label: '校验 最小长度', visible: true },
        { key: 25, value: 'validateMaxValue', label: '校验 最大值', visible: true },
        { key: 26, value: 'validateMinValue', label: '校验 最小值', visible: true },
        { key: 27, value: 'formType', label: '表单类型', visible: true },
        { key: 28, value: 'dictCode', label: '关联字典编码', visible: true },
        { key: 29, value: 'dictName', label: '关联字典名称', visible: true },
        { key: 30, value: 'tenantId', label: '租户编号', visible: true },
        { key: 31, value: 'remarks', label: '备注', visible: true },
        { key: 32, value: 'validState', label: '状态 1 有效 0 失效', visible: true },
        { key: 33, value: 'operatorId', label: '操作人工号', visible: true },
        { key: 34, value: 'operatorName', label: '操作人姓名', visible: true },
        { key: 35, value: 'createTime', label: '创建时间', visible: true },
        { key: 36, value: 'updateTime', label: '更新时间', visible: true }
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
        columnName: undefined
      },
      input: '',
      form: {
        columnId: undefined, // 列序号
        dbId: undefined, // 数据源ID
        tableName: undefined, // 表名
        columnName: undefined, // 字段名
        collation: undefined, // 编码
        extra: undefined, // 额外参数
        privileges: undefined, // 权限
        defaultValue: undefined, // 默认值
        columnComment: undefined, // 字段描述
        formLabel: undefined, // 标签名称
        propertyType: undefined, // Java字段类型
        propertyName: undefined, // 字段属性名
        columnType: undefined, // 字段类型
        keyFlag: undefined, // 主键 1 是 0 否
        keyIdentityFlag: undefined, // 自增列 1 是 0 否
        notNull: undefined, // 必填 1 是 0 否
        queryFlag: undefined, // 查询条件 1 是 0 否
        queryMethod: undefined, // 查询方式
        insertFlag: undefined, // 插入是否显示 1 是 0 否
        updateFlag: undefined, // 更新是否显示 1 是 0 否
        listFlag: undefined, // 查询是否显示 1 是 0 否
        downloadFlag: undefined, // 下载是否显示 1 是 0 否
        validateType: undefined, // 校验类型
        validateMaxLength: undefined, // 校验 最大长度
        validateMinLength: undefined, // 校验 最小长度
        validateMaxValue: undefined, // 校验 最大值
        validateMinValue: undefined, // 校验 最小值
        formType: undefined, // 表单类型
        dictCode: undefined, // 关联字典编码
        dictName: undefined, // 关联字典名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态 1 有效 0 失效
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      updateForm: {
        columnId: undefined, // 列序号
        dbId: undefined, // 数据源ID
        tableName: undefined, // 表名
        columnName: undefined, // 字段名
        collation: undefined, // 编码
        extra: undefined, // 额外参数
        privileges: undefined, // 权限
        defaultValue: undefined, // 默认值
        columnComment: undefined, // 字段描述
        formLabel: undefined, // 标签名称
        propertyType: undefined, // Java字段类型
        propertyName: undefined, // 字段属性名
        columnType: undefined, // 字段类型
        keyFlag: undefined, // 主键 1 是 0 否
        keyIdentityFlag: undefined, // 自增列 1 是 0 否
        notNull: undefined, // 必填 1 是 0 否
        queryFlag: undefined, // 查询条件 1 是 0 否
        queryMethod: undefined, // 查询方式
        insertFlag: undefined, // 插入是否显示 1 是 0 否
        updateFlag: undefined, // 更新是否显示 1 是 0 否
        listFlag: undefined, // 查询是否显示 1 是 0 否
        downloadFlag: undefined, // 下载是否显示 1 是 0 否
        validateType: undefined, // 校验类型
        validateMaxLength: undefined, // 校验 最大长度
        validateMinLength: undefined, // 校验 最小长度
        validateMaxValue: undefined, // 校验 最大值
        validateMinValue: undefined, // 校验 最小值
        formType: undefined, // 表单类型
        dictCode: undefined, // 关联字典编码
        dictName: undefined, // 关联字典名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态 1 有效 0 失效
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
        columnId: [
        ],
        dbId: [
        ],
        tableName: [
        ],
        columnName: [
        ],
        collation: [
        ],
        extra: [
        ],
        privileges: [
        ],
        defaultValue: [
        ],
        columnComment: [
        ],
        formLabel: [
        ],
        propertyType: [
        ],
        propertyName: [
        ],
        columnType: [
        ],
        keyFlag: [
        ],
        keyIdentityFlag: [
        ],
        notNull: [
        ],
        queryFlag: [
        ],
        queryMethod: [
        ],
        insertFlag: [
        ],
        updateFlag: [
        ],
        listFlag: [
        ],
        downloadFlag: [
        ],
        validateType: [
        ],
        validateMaxLength: [
        ],
        validateMinLength: [
        ],
        validateMaxValue: [
        ],
        validateMinValue: [
        ],
        formType: [
        ],
        dictCode: [
        ],
        dictName: [
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
        columnId: [
        ],
        dbId: [
        ],
        tableName: [
        ],
        columnName: [
        ],
        collation: [
        ],
        extra: [
        ],
        privileges: [
        ],
        defaultValue: [
        ],
        columnComment: [
        ],
        formLabel: [
        ],
        propertyType: [
        ],
        propertyName: [
        ],
        columnType: [
        ],
        keyFlag: [
        ],
        keyIdentityFlag: [
        ],
        notNull: [
        ],
        queryFlag: [
        ],
        queryMethod: [
        ],
        insertFlag: [
        ],
        updateFlag: [
        ],
        listFlag: [
        ],
        downloadFlag: [
        ],
        validateType: [
        ],
        validateMaxLength: [
        ],
        validateMinLength: [
        ],
        validateMaxValue: [
        ],
        validateMinValue: [
        ],
        formType: [
        ],
        dictCode: [
        ],
        dictName: [
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
      getColumnListPage(this.listQuery).then(response => {
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
        const id = row.columnId
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
              saveColumn(_this.form).then(response => {
                if (response.code === 200) {
                  _this.getList()
                  _this.$message.success(response.message)
                  _this.dialogVisible = false
                } else {
                  _this.$message.error(response.message)
                }
              }).catch(err => { console.log(err) })
            } else {
              updateColumn(_this.updateForm).then(response => {
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
        columnId: undefined, // 列序号
        dbId: undefined, // 数据源ID
        tableName: undefined, // 表名
        columnName: undefined, // 字段名
        collation: undefined, // 编码
        extra: undefined, // 额外参数
        privileges: undefined, // 权限
        defaultValue: undefined, // 默认值
        columnComment: undefined, // 字段描述
        formLabel: undefined, // 标签名称
        propertyType: undefined, // Java字段类型
        propertyName: undefined, // 字段属性名
        columnType: undefined, // 字段类型
        keyFlag: undefined, // 主键 1 是 0 否
        keyIdentityFlag: undefined, // 自增列 1 是 0 否
        notNull: undefined, // 必填 1 是 0 否
        queryFlag: undefined, // 查询条件 1 是 0 否
        queryMethod: undefined, // 查询方式
        insertFlag: undefined, // 插入是否显示 1 是 0 否
        updateFlag: undefined, // 更新是否显示 1 是 0 否
        listFlag: undefined, // 查询是否显示 1 是 0 否
        downloadFlag: undefined, // 下载是否显示 1 是 0 否
        validateType: undefined, // 校验类型
        validateMaxLength: undefined, // 校验 最大长度
        validateMinLength: undefined, // 校验 最小长度
        validateMaxValue: undefined, // 校验 最大值
        validateMinValue: undefined, // 校验 最小值
        formType: undefined, // 表单类型
        dictCode: undefined, // 关联字典编码
        dictName: undefined, // 关联字典名称
        tenantId: undefined, // 租户编号
        remarks: undefined, // 备注
        validState: 1, // 状态 1 有效 0 失效
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
