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
          <el-form-item label="节点编号 ">
            <el-input
              v-model="listQuery.nodeId"
              placeholder="请输入节点编号 "
            />
          </el-form-item>
          <el-form-item label="节点名称 ">
            <el-input
              v-model="listQuery.nodeName"
              placeholder="请输入节点名称 "
            />
          </el-form-item>
          <el-form-item label="流程编号 ">
            <el-input
              v-model="listQuery.processId"
              placeholder="请输入流程编号 "
            />
          </el-form-item>
          <el-form-item label="流程key ">
            <el-input
              v-model="listQuery.processKey"
              placeholder="请输入流程key "
            />
          </el-form-item>
          <el-form-item label="表单类型 ">
            <el-select
              v-model="listQuery.formType"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in dictOption1"
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
            label=" "
            prop="id"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[1].visible"
            label="节点编号 "
            prop="nodeId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[2].visible"
            label="节点名称 "
            prop="nodeName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[3].visible"
            label="版本号 "
            prop="definitionId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[4].visible"
            label="流程编号 "
            prop="processId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[5].visible"
            label="流程key "
            prop="processKey"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[6].visible"
            label="租户编号 "
            prop="tenantId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[7].visible"
            label="节点类型 "
            prop="nodeType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[8].visible"
            label="任务类型 "
            prop="taskType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[9].visible"
            label="优先级 "
            prop="priority"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[10].visible"
            label="关联表单KEY "
            prop="formKey"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[11].visible"
            label="表单名称 "
            prop="formName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[12].visible"
            label="表单类型 "
            prop="formType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ dictMap1[scope.row.formType] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[13].visible"
            label="节点人员工号 "
            prop="userIdList"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[14].visible"
            label="节点人员名称 "
            prop="userNameList"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[15].visible"
            label="节点角色组编号 "
            prop="roleGroupCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[16].visible"
            label="角色组名称 "
            prop="roleGroupName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[17].visible"
            label="角色编码 "
            prop="roleCode"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[18].visible"
            label="角色名称 "
            prop="roleName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[19].visible"
            label="节点人员方式 "
            prop="findUserType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[20].visible"
            label="组合方式 "
            prop="combineType"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[21].visible"
            label="用户节点人员分配字段名称 "
            prop="assigneeField"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[22].visible"
            label="选择路径 "
            prop="selectPath"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[23].visible"
            label="节点处理策略 "
            prop="handlerStrategy"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[24].visible"
            label="依赖节点 "
            prop="relationNodeId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[25].visible"
            label="动作集合 "
            prop="actionList"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[26].visible"
            label="用户任务条件跳过表达式 "
            prop="skipExpression"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[27].visible"
            label="连线表达式 "
            prop="expression"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[28].visible"
            label="连线来源节点NodeId "
            prop="sourceRef"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[29].visible"
            label="连线目标节点NodeId "
            prop="targetRef"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[30].visible"
            label="多实例属性 "
            prop="sequential"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[31].visible"
            label="通过比例 "
            prop="proportion"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[32].visible"
            label="自定义查找人SQL "
            prop="customSql"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[33].visible"
            label="自定义拓展数据集合JSON对象格式 "
            prop="customData"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[34].visible"
            label="备注 "
            prop="remarks"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[35].visible"
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
            v-if="columns[36].visible"
            label="操作人工号 "
            prop="operatorId"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[37].visible"
            label="操作人姓名 "
            prop="operatorName"
            align="center"
            sortable
            :show-overflow-tooltip="true"
          />
          <el-table-column
            v-if="columns[38].visible"
            label="创建时间 "
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[39].visible"
            label="最后更新时间 "
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
            label=" :"
            prop="id"
          >
            <el-input
              v-model="form.id"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点编号 :"
            prop="nodeId"
          >
            <el-input
              v-model="form.nodeId"
              placeholder="请输入节点编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点名称 :"
            prop="nodeName"
          >
            <el-input
              v-model="form.nodeName"
              placeholder="请输入节点名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="版本号 :"
            prop="definitionId"
          >
            <el-input
              v-model="form.definitionId"
              placeholder="请输入版本号 "
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
            label="流程key :"
            prop="processKey"
          >
            <el-input
              v-model="form.processKey"
              placeholder="请输入流程key "
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
            label="节点类型 :"
            prop="nodeType"
          >
            <el-input
              v-model="form.nodeType"
              placeholder="请输入节点类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="任务类型 :"
            prop="taskType"
          >
            <el-input
              v-model="form.taskType"
              placeholder="请输入任务类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="优先级 :"
            prop="priority"
          >
            <el-input-number
              v-model="form.priority"
              placeholder="请输入优先级 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="关联表单KEY :"
            prop="formKey"
          >
            <el-input
              v-model="form.formKey"
              placeholder="请输入关联表单KEY "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="表单名称 :"
            prop="formName"
          >
            <el-input
              v-model="form.formName"
              placeholder="请输入表单名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="表单类型 :"
            prop="formType"
          >
            <el-select
              v-model="form.formType"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in dictOption1"
                :key="index"
                :label="item.label"
                :value="item.value"
              />

            </el-select>
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点人员工号 :"
            prop="userIdList"
          >
            <el-input
              v-model="form.userIdList"
              placeholder="请输入节点人员工号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点人员名称 :"
            prop="userNameList"
          >
            <el-input
              v-model="form.userNameList"
              placeholder="请输入节点人员名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点角色组编号 :"
            prop="roleGroupCode"
          >
            <el-input
              v-model="form.roleGroupCode"
              placeholder="请输入节点角色组编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色组名称 :"
            prop="roleGroupName"
          >
            <el-input
              v-model="form.roleGroupName"
              placeholder="请输入角色组名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色编码 :"
            prop="roleCode"
          >
            <el-input
              v-model="form.roleCode"
              placeholder="请输入角色编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色名称 :"
            prop="roleName"
          >
            <el-input
              v-model="form.roleName"
              placeholder="请输入角色名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点人员方式 :"
            prop="findUserType"
          >
            <el-switch
              v-model="form.findUserType"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="组合方式 :"
            prop="combineType"
          >
            <el-switch
              v-model="form.combineType"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="用户节点人员分配字段名称 :"
            prop="assigneeField"
          >
            <el-input
              v-model="form.assigneeField"
              placeholder="请输入用户节点人员分配字段名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="选择路径 :"
            prop="selectPath"
          >
            <el-switch
              v-model="form.selectPath"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点处理策略 :"
            prop="handlerStrategy"
          >
            <el-input
              v-model="form.handlerStrategy"
              placeholder="请输入节点处理策略 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="依赖节点 :"
            prop="relationNodeId"
          >
            <el-input
              v-model="form.relationNodeId"
              placeholder="请输入依赖节点 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="动作集合 :"
            prop="actionList"
          >
            <el-input
              v-model="form.actionList"
              placeholder="请输入动作集合 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="用户任务条件跳过表达式 :"
            prop="skipExpression"
          >
            <el-input
              v-model="form.skipExpression"
              placeholder="请输入用户任务条件跳过表达式 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="连线表达式 :"
            prop="expression"
          >
            <el-input
              v-model="form.expression"
              placeholder="请输入连线表达式 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="连线来源节点NodeId :"
            prop="sourceRef"
          >
            <el-input
              v-model="form.sourceRef"
              placeholder="请输入连线来源节点NodeId "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="连线目标节点NodeId :"
            prop="targetRef"
          >
            <el-input
              v-model="form.targetRef"
              placeholder="请输入连线目标节点NodeId "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="多实例属性 :"
            prop="sequential"
          >
            <el-input
              v-model="form.sequential"
              placeholder="请输入多实例属性 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通过比例 :"
            prop="proportion"
          >
            <el-input
              v-model="form.proportion"
              placeholder="请输入通过比例 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="自定义查找人SQL :"
            prop="customSql"
          >
            <el-input
              v-model="form.customSql"
              type="textarea"
              autosize
              placeholder="请输入自定义查找人SQL "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="自定义拓展数据集合JSON对象格式 :"
            prop="customData"
          >
            <el-input
              v-model="form.customData"
              type="textarea"
              autosize
              placeholder="请输入自定义拓展数据集合JSON对象格式 "
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
            label="最后更新时间 :"
            prop="updateTime"
          >
            <el-date-picker
              v-model="form.updateTime"
              type="date"
              placeholder="请输入最后更新时间 "
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
            label=" :"
            prop="id"
          >
            <el-input
              v-model="updateForm.id"
              disabled
            />

          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点编号 :"
            prop="nodeId"
          >
            <el-input
              v-model="updateForm.nodeId"
              placeholder="请输入节点编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点名称 :"
            prop="nodeName"
          >
            <el-input
              v-model="updateForm.nodeName"
              placeholder="请输入节点名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="版本号 :"
            prop="definitionId"
          >
            <el-input
              v-model="updateForm.definitionId"
              placeholder="请输入版本号 "
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
            label="流程key :"
            prop="processKey"
          >
            <el-input
              v-model="updateForm.processKey"
              placeholder="请输入流程key "
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
            label="节点类型 :"
            prop="nodeType"
          >
            <el-input
              v-model="updateForm.nodeType"
              placeholder="请输入节点类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="任务类型 :"
            prop="taskType"
          >
            <el-input
              v-model="updateForm.taskType"
              placeholder="请输入任务类型 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="优先级 :"
            prop="priority"
          >
            <el-input
              v-model="updateForm.priority"
              placeholder="请输入优先级 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="关联表单KEY :"
            prop="formKey"
          >
            <el-input
              v-model="updateForm.formKey"
              placeholder="请输入关联表单KEY "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="表单名称 :"
            prop="formName"
          >
            <el-input
              v-model="updateForm.formName"
              placeholder="请输入表单名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="表单类型 :"
            prop="formType"
          >
            <el-select
              v-model="updateForm.formType"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in dictOption1"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点人员工号 :"
            prop="userIdList"
          >
            <el-input
              v-model="updateForm.userIdList"
              placeholder="请输入节点人员工号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点人员名称 :"
            prop="userNameList"
          >
            <el-input
              v-model="updateForm.userNameList"
              placeholder="请输入节点人员名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点角色组编号 :"
            prop="roleGroupCode"
          >
            <el-input
              v-model="updateForm.roleGroupCode"
              placeholder="请输入节点角色组编号 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色组名称 :"
            prop="roleGroupName"
          >
            <el-input
              v-model="updateForm.roleGroupName"
              placeholder="请输入角色组名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色编码 :"
            prop="roleCode"
          >
            <el-input
              v-model="updateForm.roleCode"
              placeholder="请输入角色编码 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="角色名称 :"
            prop="roleName"
          >
            <el-input
              v-model="updateForm.roleName"
              placeholder="请输入角色名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点人员方式 :"
            prop="findUserType"
          >
            <el-switch
              v-model="updateForm.findUserType"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="组合方式 :"
            prop="combineType"
          >
            <el-switch
              v-model="updateForm.combineType"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="用户节点人员分配字段名称 :"
            prop="assigneeField"
          >
            <el-input
              v-model="updateForm.assigneeField"
              placeholder="请输入用户节点人员分配字段名称 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="选择路径 :"
            prop="selectPath"
          >
            <el-switch
              v-model="updateForm.selectPath"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="节点处理策略 :"
            prop="handlerStrategy"
          >
            <el-input
              v-model="updateForm.handlerStrategy"
              placeholder="请输入节点处理策略 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="依赖节点 :"
            prop="relationNodeId"
          >
            <el-input
              v-model="updateForm.relationNodeId"
              placeholder="请输入依赖节点 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="动作集合 :"
            prop="actionList"
          >
            <el-input
              v-model="updateForm.actionList"
              placeholder="请输入动作集合 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="用户任务条件跳过表达式 :"
            prop="skipExpression"
          >
            <el-input
              v-model="updateForm.skipExpression"
              placeholder="请输入用户任务条件跳过表达式 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="连线表达式 :"
            prop="expression"
          >
            <el-input
              v-model="updateForm.expression"
              placeholder="请输入连线表达式 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="连线来源节点NodeId :"
            prop="sourceRef"
          >
            <el-input
              v-model="updateForm.sourceRef"
              placeholder="请输入连线来源节点NodeId "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="连线目标节点NodeId :"
            prop="targetRef"
          >
            <el-input
              v-model="updateForm.targetRef"
              placeholder="请输入连线目标节点NodeId "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="多实例属性 :"
            prop="sequential"
          >
            <el-input
              v-model="updateForm.sequential"
              placeholder="请输入多实例属性 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="通过比例 :"
            prop="proportion"
          >
            <el-input
              v-model="updateForm.proportion"
              placeholder="请输入通过比例 "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="自定义查找人SQL :"
            prop="customSql"
          >
            <el-input
              v-model="updateForm.customSql"
              type="textarea"
              autosize
              placeholder="请输入自定义查找人SQL "
            />
          </el-form-item>
          <el-form-item
            v-if="true"
            label="自定义拓展数据集合JSON对象格式 :"
            prop="customData"
          >
            <el-input
              v-model="updateForm.customData"
              type="textarea"
              autosize
              placeholder="请输入自定义拓展数据集合JSON对象格式 "
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
            label="最后更新时间 :"
            prop="updateTime"
          >
            <el-date-picker
              v-model="updateForm.updateTime"
              type="date"
              placeholder="请输入最后更新时间 "
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
  getNodeListPage,
  saveNode,
  updateNode,
  deleteById,
  download
} from '@/api/system/node'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { getDictListByDictCode } from '@/api/system/dict'

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
      dictOption1: [],
      dictMap1: {},
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: ['operatorId', 'createTime'],
      // 列信息
      columns: [
        { key: 0, value: 'id', label: ' ', visible: true },
        { key: 1, value: 'nodeId', label: '节点编号 ', visible: true },
        { key: 2, value: 'nodeName', label: '节点名称 ', visible: true },
        { key: 3, value: 'definitionId', label: '版本号 ', visible: true },
        { key: 4, value: 'processId', label: '流程编号 ', visible: true },
        { key: 5, value: 'processKey', label: '流程key ', visible: true },
        { key: 6, value: 'tenantId', label: '租户编号 ', visible: true },
        { key: 7, value: 'nodeType', label: '节点类型 ', visible: true },
        { key: 8, value: 'taskType', label: '任务类型 ', visible: true },
        { key: 9, value: 'priority', label: '优先级 ', visible: true },
        { key: 10, value: 'formKey', label: '关联表单KEY ', visible: true },
        { key: 11, value: 'formName', label: '表单名称 ', visible: true },
        { key: 12, value: 'formType', label: '表单类型 ', visible: true },
        { key: 13, value: 'userIdList', label: '节点人员工号 ', visible: true },
        {
          key: 14,
          value: 'userNameList',
          label: '节点人员名称 ',
          visible: true
        },
        {
          key: 15,
          value: 'roleGroupCode',
          label: '节点角色组编号 ',
          visible: true
        },
        {
          key: 16,
          value: 'roleGroupName',
          label: '角色组名称 ',
          visible: true
        },
        { key: 17, value: 'roleCode', label: '角色编码 ', visible: true },
        { key: 18, value: 'roleName', label: '角色名称 ', visible: true },
        {
          key: 19,
          value: 'findUserType',
          label: '节点人员方式 ',
          visible: true
        },
        { key: 20, value: 'combineType', label: '组合方式 ', visible: true },
        {
          key: 21,
          value: 'assigneeField',
          label: '用户节点人员分配字段名称 ',
          visible: true
        },
        { key: 22, value: 'selectPath', label: '选择路径 ', visible: true },
        {
          key: 23,
          value: 'handlerStrategy',
          label: '节点处理策略 ',
          visible: true
        },
        { key: 24, value: 'relationNodeId', label: '依赖节点 ', visible: true },
        { key: 25, value: 'actionList', label: '动作集合 ', visible: true },
        {
          key: 26,
          value: 'skipExpression',
          label: '用户任务条件跳过表达式 ',
          visible: true
        },
        { key: 27, value: 'expression', label: '连线表达式 ', visible: true },
        {
          key: 28,
          value: 'sourceRef',
          label: '连线来源节点NodeId ',
          visible: true
        },
        {
          key: 29,
          value: 'targetRef',
          label: '连线目标节点NodeId ',
          visible: true
        },
        { key: 30, value: 'sequential', label: '多实例属性 ', visible: true },
        { key: 31, value: 'proportion', label: '通过比例 ', visible: true },
        {
          key: 32,
          value: 'customSql',
          label: '自定义查找人SQL ',
          visible: true
        },
        {
          key: 33,
          value: 'customData',
          label: '自定义拓展数据集合JSON对象格式 ',
          visible: true
        },
        { key: 34, value: 'remarks', label: '备注 ', visible: true },
        { key: 35, value: 'validState', label: '状态 ', visible: true },
        { key: 36, value: 'operatorId', label: '操作人工号 ', visible: true },
        { key: 37, value: 'operatorName', label: '操作人姓名 ', visible: true },
        { key: 38, value: 'createTime', label: '创建时间 ', visible: true },
        { key: 39, value: 'updateTime', label: '最后更新时间 ', visible: true }
      ],
      dialogVisible: false,
      updateDialogVisible: false,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        nodeId: undefined,
        nodeName: undefined,
        processId: undefined,
        processKey: undefined,
        formType: undefined
      },
      input: '',
      form: {
        id: undefined, //
        nodeId: undefined, // 节点编号
        nodeName: undefined, // 节点名称
        definitionId: undefined, // 版本号
        processId: undefined, // 流程编号
        processKey: undefined, // 流程key
        tenantId: undefined, // 租户编号
        nodeType: undefined, // 节点类型
        taskType: undefined, // 任务类型
        priority: undefined, // 优先级
        formKey: undefined, // 关联表单KEY
        formName: undefined, // 表单名称
        formType: undefined, // 表单类型
        userIdList: undefined, // 节点人员工号
        userNameList: undefined, // 节点人员名称
        roleGroupCode: undefined, // 节点角色组编号
        roleGroupName: undefined, // 角色组名称
        roleCode: undefined, // 角色编码
        roleName: undefined, // 角色名称
        findUserType: undefined, // 节点人员方式
        combineType: undefined, // 组合方式
        assigneeField: undefined, // 用户节点人员分配字段名称
        selectPath: undefined, // 选择路径
        handlerStrategy: undefined, // 节点处理策略
        relationNodeId: undefined, // 依赖节点
        actionList: undefined, // 动作集合
        skipExpression: undefined, // 用户任务条件跳过表达式
        expression: undefined, // 连线表达式
        sourceRef: undefined, // 连线来源节点NodeId
        targetRef: undefined, // 连线目标节点NodeId
        sequential: undefined, // 多实例属性
        proportion: undefined, // 通过比例
        customSql: undefined, // 自定义查找人SQL
        customData: undefined, // 自定义拓展数据集合JSON对象格式
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 最后更新时间
      },
      updateForm: {
        id: undefined, //
        nodeId: undefined, // 节点编号
        nodeName: undefined, // 节点名称
        definitionId: undefined, // 版本号
        processId: undefined, // 流程编号
        processKey: undefined, // 流程key
        tenantId: undefined, // 租户编号
        nodeType: undefined, // 节点类型
        taskType: undefined, // 任务类型
        priority: undefined, // 优先级
        formKey: undefined, // 关联表单KEY
        formName: undefined, // 表单名称
        formType: undefined, // 表单类型
        userIdList: undefined, // 节点人员工号
        userNameList: undefined, // 节点人员名称
        roleGroupCode: undefined, // 节点角色组编号
        roleGroupName: undefined, // 角色组名称
        roleCode: undefined, // 角色编码
        roleName: undefined, // 角色名称
        findUserType: undefined, // 节点人员方式
        combineType: undefined, // 组合方式
        assigneeField: undefined, // 用户节点人员分配字段名称
        selectPath: undefined, // 选择路径
        handlerStrategy: undefined, // 节点处理策略
        relationNodeId: undefined, // 依赖节点
        actionList: undefined, // 动作集合
        skipExpression: undefined, // 用户任务条件跳过表达式
        expression: undefined, // 连线表达式
        sourceRef: undefined, // 连线来源节点NodeId
        targetRef: undefined, // 连线目标节点NodeId
        sequential: undefined, // 多实例属性
        proportion: undefined, // 通过比例
        customSql: undefined, // 自定义查找人SQL
        customData: undefined, // 自定义拓展数据集合JSON对象格式
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 最后更新时间
      },
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        id: [],
        nodeId: [],
        nodeName: [],
        definitionId: [],
        processId: [],
        processKey: [],
        tenantId: [],
        nodeType: [],
        taskType: [],
        priority: [],
        formKey: [],
        formName: [],
        formType: [],
        userIdList: [],
        userNameList: [],
        roleGroupCode: [],
        roleGroupName: [],
        roleCode: [],
        roleName: [],
        findUserType: [],
        combineType: [],
        assigneeField: [],
        selectPath: [],
        handlerStrategy: [],
        relationNodeId: [],
        actionList: [],
        skipExpression: [],
        expression: [],
        sourceRef: [],
        targetRef: [],
        sequential: [],
        proportion: [],
        customSql: [],
        customData: [],
        remarks: [],
        validState: [],
        operatorId: [],
        operatorName: [],
        createTime: [],
        updateTime: []
      },
      updateRules: {
        id: [],
        nodeId: [],
        nodeName: [],
        definitionId: [],
        processId: [],
        processKey: [],
        tenantId: [],
        nodeType: [],
        taskType: [],
        priority: [],
        formKey: [],
        formName: [],
        formType: [],
        userIdList: [],
        userNameList: [],
        roleGroupCode: [],
        roleGroupName: [],
        roleCode: [],
        roleName: [],
        findUserType: [],
        combineType: [],
        assigneeField: [],
        selectPath: [],
        handlerStrategy: [],
        relationNodeId: [],
        actionList: [],
        skipExpression: [],
        expression: [],
        sourceRef: [],
        targetRef: [],
        sequential: [],
        proportion: [],
        customSql: [],
        customData: [],
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
  },
  methods: {
    getDict1() {
      const dictCode = 'pig:dict:formType'
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
    getList() {
      this.listLoading = true
      getNodeListPage(this.listQuery)
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
          const id = row.id
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
              saveNode(_this.form)
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
              updateNode(_this.updateForm)
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
        id: undefined, //
        nodeId: undefined, // 节点编号
        nodeName: undefined, // 节点名称
        definitionId: undefined, // 版本号
        processId: undefined, // 流程编号
        processKey: undefined, // 流程key
        tenantId: undefined, // 租户编号
        nodeType: undefined, // 节点类型
        taskType: undefined, // 任务类型
        priority: undefined, // 优先级
        formKey: undefined, // 关联表单KEY
        formName: undefined, // 表单名称
        formType: undefined, // 表单类型
        userIdList: undefined, // 节点人员工号
        userNameList: undefined, // 节点人员名称
        roleGroupCode: undefined, // 节点角色组编号
        roleGroupName: undefined, // 角色组名称
        roleCode: undefined, // 角色编码
        roleName: undefined, // 角色名称
        findUserType: undefined, // 节点人员方式
        combineType: undefined, // 组合方式
        assigneeField: undefined, // 用户节点人员分配字段名称
        selectPath: undefined, // 选择路径
        handlerStrategy: undefined, // 节点处理策略
        relationNodeId: undefined, // 依赖节点
        actionList: undefined, // 动作集合
        skipExpression: undefined, // 用户任务条件跳过表达式
        expression: undefined, // 连线表达式
        sourceRef: undefined, // 连线来源节点NodeId
        targetRef: undefined, // 连线目标节点NodeId
        sequential: undefined, // 多实例属性
        proportion: undefined, // 通过比例
        customSql: undefined, // 自定义查找人SQL
        customData: undefined, // 自定义拓展数据集合JSON对象格式
        remarks: undefined, // 备注
        validState: 1, // 状态
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 最后更新时间
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
