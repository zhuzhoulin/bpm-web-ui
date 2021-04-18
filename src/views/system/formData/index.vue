<template>
    <div class="app-container">
        <div>
            <div class="filter-container" v-if="showSearch">
                <el-form :inline="true" :model="listQuery" label-width="auto">
				                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="success" @click="getList" icon="el-icon-search" v-waves>查询</el-button>
										<el-button @click="download" icon="el-icon-download" v-waves>导出</el-button>
                    <el-button type="primary" @click="handleCreate" icon="el-icon-plus" v-waves>添加</el-button>
                 </span>
            </div>
            <div class="table-container">
                <el-row :gutter="10" class="mb8">
                    <right-toolbar :showSearch.sync="showSearch" :columns="columns" @queryTable="getList" :defaultHideColumns.sync="defaultHideColumns"></right-toolbar>
                </el-row>
                <el-table v-loading="listLoading" :data="list" size="mini" element-loading-text="Loading" fit border highlight-current-row>
                    <el-table-column align="center" label="序号" width="95" sortable>
                        <template slot-scope="scope">
                            {{ (listQuery.pageIndex - 1 ) * listQuery.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column label="数据ID " prop="dataId" align="center" v-if="columns[0].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="数据KEY " prop="dataKey" align="center" v-if="columns[1].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="数据中文名称 " prop="dataName" align="center" v-if="columns[2].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="字符串数据值 " prop="stringValue" align="center" v-if="columns[3].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="boolean 值 " prop="booleanValue" align="center" v-if="columns[4].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="数值值 " prop="numberValue" align="center" v-if="columns[5].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="日期格式 " prop="numberFormat" align="center" v-if="columns[6].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="日期格式 " align="center" v-if="columns[7].visible" >
                        <template slot-scope="scope">
                            <span>{{scope.row.dateValue}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="日期格式 " prop="datePattern" align="center" v-if="columns[8].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="select 选中值 " prop="selectValue" align="center" v-if="columns[9].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="SELECT 下拉选项 " prop="selectItem" align="center" v-if="columns[10].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="大字段 " prop="textValue" align="center" v-if="columns[11].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="数据类型 " prop="dataType" align="center" v-if="columns[12].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="表单编号 " prop="formId" align="center" v-if="columns[13].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="表单KEY " prop="formKey" align="center" v-if="columns[14].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="租户 " prop="tenantId" align="center" v-if="columns[15].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="流程编号 " prop="processId" align="center" v-if="columns[16].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="申请编号 " prop="applyId" align="center" v-if="columns[17].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="流程实例编号 " prop="procInstId" align="center" v-if="columns[18].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="任务编号 " prop="taskId" align="center" v-if="columns[19].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                        <el-table-column label="状态" prop="validState" align="center" v-if="columns[20].visible">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.validState | statusFilter">
                                    <span>{{ statusMap[scope.row.validState]}}</span>
                                </el-tag>
                            </template>
                        </el-table-column>
                    <el-table-column label="create_time " align="center" v-if="columns[21].visible" >
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间 " align="center" v-if="columns[22].visible" >
                        <template slot-scope="scope">
                            <span>{{scope.row.updateTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人工号 " prop="operatorId" align="center" v-if="columns[23].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column label="operator_name " prop="operatorName" align="center" v-if="columns[24].visible" sortable :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column align="center" label="操作" fixed="right" min-width="200px">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="handleUpdate(scope.row)" icon="el-icon-edit" plain v-waves>编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete" plain v-waves>禁用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="page-footer">
                    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" style="float:right;" @pagination="getList" />
                </div>
            </div>

            <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" @close="handleDialogClose">
                <el-form ref="dataForm" :model="form" :rules="rules" label-width="auto" class="demo-ruleForm">
                        <el-form-item v-if="true" label="数据ID :" prop="dataId">
                            <el-input v-model="form.dataId" disabled></el-input>

                        </el-form-item>
                        <el-form-item v-if="true" label="数据KEY :" prop="dataKey">
                         <el-input v-model="form.dataKey"  placeholder="请输入数据KEY "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="数据中文名称 :" prop="dataName">
                         <el-input v-model="form.dataName"  placeholder="请输入数据中文名称 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="字符串数据值 :" prop="stringValue">
                         <el-input v-model="form.stringValue"  placeholder="请输入字符串数据值 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="boolean 值 :" prop="booleanValue">
                         <el-switch v-model="form.booleanValue"  :active-value="1" :inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item v-if="true" label="数值值 :" prop="numberValue">
                         <el-input v-model="form.numberValue"  placeholder="请输入数值值 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="日期格式 :" prop="numberFormat">
                         <el-input v-model="form.numberFormat"  placeholder="请输入日期格式 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="日期格式 :" prop="dateValue">
                         <el-date-picker v-model="form.dateValue"  type="date" placeholder="请输入日期格式 "></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="true" label="日期格式 :" prop="datePattern">
                         <el-input v-model="form.datePattern"  placeholder="请输入日期格式 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="select 选中值 :" prop="selectValue">
                         <el-input v-model="form.selectValue"  placeholder="请输入select 选中值 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="SELECT 下拉选项 :" prop="selectItem">
                         <el-input v-model="form.selectItem"  placeholder="请输入SELECT 下拉选项 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="大字段 :" prop="textValue">
                         <el-input type="textarea" v-model="form.textValue" autosize  placeholder="请输入大字段 "
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="数据类型 :" prop="dataType">
                         <el-input v-model="form.dataType"  placeholder="请输入数据类型 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="表单编号 :" prop="formId">
                         <el-input v-model="form.formId"  placeholder="请输入表单编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="表单KEY :" prop="formKey">
                         <el-input v-model="form.formKey"  placeholder="请输入表单KEY "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="租户 :" prop="tenantId">
                         <el-input v-model="form.tenantId"  placeholder="请输入租户 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="流程编号 :" prop="processId">
                         <el-input v-model="form.processId"  placeholder="请输入流程编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="申请编号 :" prop="applyId">
                         <el-input v-model="form.applyId"  placeholder="请输入申请编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="流程实例编号 :" prop="procInstId">
                         <el-input v-model="form.procInstId"  placeholder="请输入流程实例编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="任务编号 :" prop="taskId">
                         <el-input v-model="form.taskId"  placeholder="请输入任务编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="有效状态；0表示无效，1表示有效 :" prop="validState">
                         <el-switch v-model="form.validState"  :active-value="1" :inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item v-if="true" label="create_time :" prop="createTime">
                         <el-date-picker v-model="form.createTime"  type="date" placeholder="请输入create_time "></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="true" label="创建时间 :" prop="updateTime">
                         <el-date-picker v-model="form.updateTime"  type="date" placeholder="请输入创建时间 "></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="true" label="操作人工号 :" prop="operatorId">
                         <el-input v-model="form.operatorId"  placeholder="请输入操作人工号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="operator_name :" prop="operatorName">
                         <el-input v-model="form.operatorName"  placeholder="请输入operator_name "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false" v-waves>取 消</el-button>
                    <el-button type="primary" @click="submitForm" v-waves>确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog :title="titleMap[dialogStatus]" :visible.sync="updateDialogVisible" width="40%" :before-close="handleClose" @close="handleDialogClose">
                <el-form ref="updateDataForm" :model="updateForm" :rules="updateRules" label-width="auto" class="demo-ruleForm">
                        <el-form-item v-if="true" label="数据ID :" prop="dataId">
                            <el-input v-model="updateForm.dataId" disabled></el-input>

                        </el-form-item>
                        <el-form-item v-if="true" label="数据KEY :" prop="dataKey">
                         <el-input v-model="updateForm.dataKey"  placeholder="请输入数据KEY "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="数据中文名称 :" prop="dataName">
                         <el-input v-model="updateForm.dataName"  placeholder="请输入数据中文名称 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="字符串数据值 :" prop="stringValue">
                         <el-input v-model="updateForm.stringValue"  placeholder="请输入字符串数据值 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="boolean 值 :" prop="booleanValue">
                         <el-switch v-model="updateForm.booleanValue"  :active-value="1" :inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item v-if="true" label="数值值 :" prop="numberValue">
                         <el-input v-model="updateForm.numberValue"  placeholder="请输入数值值 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="日期格式 :" prop="numberFormat">
                         <el-input v-model="updateForm.numberFormat"  placeholder="请输入日期格式 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="日期格式 :" prop="dateValue">
                         <el-date-picker v-model="updateForm.dateValue"  type="date" placeholder="请输入日期格式 "></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="true" label="日期格式 :" prop="datePattern">
                         <el-input v-model="updateForm.datePattern"  placeholder="请输入日期格式 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="select 选中值 :" prop="selectValue">
                         <el-input v-model="updateForm.selectValue"  placeholder="请输入select 选中值 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="SELECT 下拉选项 :" prop="selectItem">
                         <el-input v-model="updateForm.selectItem"  placeholder="请输入SELECT 下拉选项 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="大字段 :" prop="textValue">
                         <el-input type="textarea" v-model="updateForm.textValue" autosize  placeholder="请输入大字段 "
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="数据类型 :" prop="dataType">
                         <el-input v-model="updateForm.dataType"  placeholder="请输入数据类型 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="表单编号 :" prop="formId">
                         <el-input v-model="updateForm.formId"  placeholder="请输入表单编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="表单KEY :" prop="formKey">
                         <el-input v-model="updateForm.formKey"  placeholder="请输入表单KEY "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="租户 :" prop="tenantId">
                         <el-input v-model="updateForm.tenantId"  placeholder="请输入租户 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="流程编号 :" prop="processId">
                         <el-input v-model="updateForm.processId"  placeholder="请输入流程编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="申请编号 :" prop="applyId">
                         <el-input v-model="updateForm.applyId"  placeholder="请输入申请编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="流程实例编号 :" prop="procInstId">
                         <el-input v-model="updateForm.procInstId"  placeholder="请输入流程实例编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="任务编号 :" prop="taskId">
                         <el-input v-model="updateForm.taskId"  placeholder="请输入任务编号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="有效状态；0表示无效，1表示有效 :" prop="validState">
                         <el-switch v-model="updateForm.validState"  :active-value="1" :inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item v-if="true" label="create_time :" prop="createTime">
                         <el-date-picker v-model="updateForm.createTime"  type="date" placeholder="请输入create_time "></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="true" label="创建时间 :" prop="updateTime">
                         <el-date-picker v-model="updateForm.updateTime"  type="date" placeholder="请输入创建时间 "></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="true" label="操作人工号 :" prop="operatorId">
                         <el-input v-model="updateForm.operatorId"  placeholder="请输入操作人工号 "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                        <el-form-item v-if="true" label="operator_name :" prop="operatorName">
                         <el-input v-model="updateForm.operatorName"  placeholder="请输入operator_name "
                             
                             
                             
                             
                         ></el-input>
                        </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="updateDialogVisible = false" v-waves>取 消</el-button>
                    <el-button type="primary" @click="submitForm" v-waves>确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getFormDataListPage, saveFormData,updateFormData, deleteById,download } from "@/api/system/formData";
    import waves from '@/directive/waves'
    import Pagination from '@/components/Pagination'


    export default {
        components: { Pagination},
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
            //默认查询隐藏列
            defaultHideColumns: [
            ],
            // 列信息
            columns: [
                    { key: 0,value: 'dataId', label: '数据ID ', visible: true },
                    { key: 1,value: 'dataKey', label: '数据KEY ', visible: true },
                    { key: 2,value: 'dataName', label: '数据中文名称 ', visible: true },
                    { key: 3,value: 'stringValue', label: '字符串数据值 ', visible: true },
                    { key: 4,value: 'booleanValue', label: 'boolean 值 ', visible: true },
                    { key: 5,value: 'numberValue', label: '数值值 ', visible: true },
                    { key: 6,value: 'numberFormat', label: '日期格式 ', visible: true },
                    { key: 7,value: 'dateValue', label: '日期格式 ', visible: true },
                    { key: 8,value: 'datePattern', label: '日期格式 ', visible: true },
                    { key: 9,value: 'selectValue', label: 'select 选中值 ', visible: true },
                    { key: 10,value: 'selectItem', label: 'SELECT 下拉选项 ', visible: true },
                    { key: 11,value: 'textValue', label: '大字段 ', visible: true },
                    { key: 12,value: 'dataType', label: '数据类型 ', visible: true },
                    { key: 13,value: 'formId', label: '表单编号 ', visible: true },
                    { key: 14,value: 'formKey', label: '表单KEY ', visible: true },
                    { key: 15,value: 'tenantId', label: '租户 ', visible: true },
                    { key: 16,value: 'processId', label: '流程编号 ', visible: true },
                    { key: 17,value: 'applyId', label: '申请编号 ', visible: true },
                    { key: 18,value: 'procInstId', label: '流程实例编号 ', visible: true },
                    { key: 19,value: 'taskId', label: '任务编号 ', visible: true },
                    { key: 20,value: 'validState', label: '有效状态；0表示无效，1表示有效 ', visible: true },
                    { key: 21,value: 'createTime', label: 'create_time ', visible: true },
                    { key: 22,value: 'updateTime', label: '创建时间 ', visible: true },
                    { key: 23,value: 'operatorId', label: '操作人工号 ', visible: true },
                    { key: 24,value: 'operatorName', label: 'operator_name ', visible: true }
            ],
            dialogVisible: false,
            updateDialogVisible: false,
            list: [],
            listLoading: true,
            total: 0,
        listQuery: {
            pageIndex: 1,
            pageSize: 10,
        },
            input: '',
                    form: {
                    dataId: undefined, //数据ID 
                    dataKey: undefined, //数据KEY 
                    dataName: undefined, //数据中文名称 
                    stringValue: undefined, //字符串数据值 
                    booleanValue: undefined, //boolean 值 
                    numberValue: undefined, //数值值 
                    numberFormat: undefined, //日期格式 
                    dateValue: undefined, //日期格式 
                    datePattern: undefined, //日期格式 
                    selectValue: undefined, //select 选中值 
                    selectItem: undefined, //SELECT 下拉选项 
                    textValue: undefined, //大字段 
                    dataType: undefined, //数据类型 
                    formId: undefined, //表单编号 
                    formKey: undefined, //表单KEY 
                    tenantId: undefined, //租户 
                    processId: undefined, //流程编号 
                    applyId: undefined, //申请编号 
                    procInstId: undefined, //流程实例编号 
                    taskId: undefined, //任务编号 
                    validState: 1, //有效状态；0表示无效，1表示有效 
                    createTime: undefined, //create_time 
                    updateTime: undefined, //创建时间 
                    operatorId: undefined, //操作人工号 
                    operatorName: undefined, //operator_name 
            },
            updateForm: {
                    dataId: undefined, //数据ID 
                    dataKey: undefined, //数据KEY 
                    dataName: undefined, //数据中文名称 
                    stringValue: undefined, //字符串数据值 
                    booleanValue: undefined, //boolean 值 
                    numberValue: undefined, //数值值 
                    numberFormat: undefined, //日期格式 
                    dateValue: undefined, //日期格式 
                    datePattern: undefined, //日期格式 
                    selectValue: undefined, //select 选中值 
                    selectItem: undefined, //SELECT 下拉选项 
                    textValue: undefined, //大字段 
                    dataType: undefined, //数据类型 
                    formId: undefined, //表单编号 
                    formKey: undefined, //表单KEY 
                    tenantId: undefined, //租户 
                    processId: undefined, //流程编号 
                    applyId: undefined, //申请编号 
                    procInstId: undefined, //流程实例编号 
                    taskId: undefined, //任务编号 
                    validState: 1, //有效状态；0表示无效，1表示有效 
                    createTime: undefined, //create_time 
                    updateTime: undefined, //创建时间 
                    operatorId: undefined, //操作人工号 
                    operatorName: undefined, //operator_name 
            },
            dialogStatus: "",
                    titleMap: {
                update: "编辑",
                        create: "创建"
            },
            statusMap: { 1: '正常', 0: '停用' },
            rules: {
                   dataId:[
               ],
                   dataKey:[
               ],
                   dataName:[
               ],
                   stringValue:[
               ],
                   booleanValue:[
               ],
                   numberValue:[
               ],
                   numberFormat:[
               ],
                   dateValue:[
               ],
                   datePattern:[
               ],
                   selectValue:[
               ],
                   selectItem:[
               ],
                   textValue:[
               ],
                   dataType:[
               ],
                   formId:[
               ],
                   formKey:[
               ],
                   tenantId:[
               ],
                   processId:[
               ],
                   applyId:[
               ],
                   procInstId:[
               ],
                   taskId:[
               ],
                   validState:[
               ],
                   createTime:[
               ],
                   updateTime:[
               ],
                   operatorId:[
               ],
                   operatorName:[
               ]
            },
            updateRules: {
                    dataId:[
                ],
                    dataKey:[
                ],
                    dataName:[
                ],
                    stringValue:[
                ],
                    booleanValue:[
                ],
                    numberValue:[
                ],
                    numberFormat:[
                ],
                    dateValue:[
                ],
                    datePattern:[
                ],
                    selectValue:[
                ],
                    selectItem:[
                ],
                    textValue:[
                ],
                    dataType:[
                ],
                    formId:[
                ],
                    formKey:[
                ],
                    tenantId:[
                ],
                    processId:[
                ],
                    applyId:[
                ],
                    procInstId:[
                ],
                    taskId:[
                ],
                    validState:[
                ],
                    createTime:[
                ],
                    updateTime:[
                ],
                    operatorId:[
                ],
                    operatorName:[
                ]
            }
        }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                getFormDataListPage(this.listQuery).then(response => {
                    this.list = response.data.list;
                this.total = response.data.total;
                this.listLoading = false;
            }).catch(err => {
                    this.listLoading = false;
                console.log(err);
            });
            },
            download() {
                download(this.listQuery).then(response => {

                }).catch(err => {

                    console.log(err);
            });
            },
            handleCreate() {
                this.resetForm();
                this.dialogStatus = "create";
                this.dialogVisible = true;
            },
            handleUpdate(row) {
                this.updateForm = Object.assign({}, row);
                this.dialogStatus = "update";
                this.updateDialogVisible = true;
            },
			handleClose(done) {
				this.$confirm('确定关闭吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(_ => {
				done()
			}).catch(_ => {})
			},
            handleDelete(row) {
                let _this = this;
                _this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    let id = row.dataId;
                    deleteById(id).then(response => {
                        if (response.code === 200) {
                        this.getList();
                        this.$message.success(response.message);
                    } else {
                        this.$message.error(response.message);
                    }
                });
                })
            },
            submitForm() {
                let _this = this;
                let refForm = _this.dialogStatus === "create" ? 'dataForm' : 'updateDataForm'
                _this.$refs[`${refForm}`].validate(valid => {
                    if (valid) {
                        this.$confirm('确定操作吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(function () {
                            if(_this.dialogStatus === "create"){
                                saveFormData(_this.form).then(response => {
                                    if (response.code === 200) {
                                    _this.getList();
                                    _this.$message.success(response.message);
                                    _this.dialogVisible = false;
                                } else {
                                    _this.$message.error(response.message);
                                }
                            }).catch(err => { console.log(err);  })

                            } else {
                                updateFormData(_this.updateForm).then(response => {
                                    if (response.code === 200) {
                                    _this.getList();
                                    _this.$message.success(response.message);
                                    _this.updateDialogVisible = false;
                                } else {
                                    _this.$message.error(response.message);
                                }
                            }).catch(err => { console.log(err);  })
                            }
                        })
                    }
                })
            },
            resetForm() {
                this.form = {
                    dataId: undefined, //数据ID 
                    dataKey: undefined, //数据KEY 
                    dataName: undefined, //数据中文名称 
                    stringValue: undefined, //字符串数据值 
                    booleanValue: undefined, //boolean 值 
                    numberValue: undefined, //数值值 
                    numberFormat: undefined, //日期格式 
                    dateValue: undefined, //日期格式 
                    datePattern: undefined, //日期格式 
                    selectValue: undefined, //select 选中值 
                    selectItem: undefined, //SELECT 下拉选项 
                    textValue: undefined, //大字段 
                    dataType: undefined, //数据类型 
                    formId: undefined, //表单编号 
                    formKey: undefined, //表单KEY 
                    tenantId: undefined, //租户 
                    processId: undefined, //流程编号 
                    applyId: undefined, //申请编号 
                    procInstId: undefined, //流程实例编号 
                    taskId: undefined, //任务编号 
                    validState: 1, //有效状态；0表示无效，1表示有效 
                    createTime: undefined, //create_time 
                    updateTime: undefined, //创建时间 
                    operatorId: undefined, //操作人工号 
                    operatorName: undefined, //operator_name 
            }
            },
            // 监听dialog关闭时的处理事件
            handleDialogClose(){
                let refForm = this.dialogStatus === "create" ? 'dataForm' : 'updateDataForm'
                if(this.$refs[[`${refForm}`]]){
                    this.$refs[[`${refForm}`]].clearValidate(); // 清除整个表单的校验
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