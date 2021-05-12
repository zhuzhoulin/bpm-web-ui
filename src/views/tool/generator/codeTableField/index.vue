<template>
  <div class="app-container">

    <el-steps
      :active="activeStep"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="基本信息配置" />
      <el-step title="页面信息配置" />
      <el-step title="策略信息配置" />

      <el-step title="模板选择" />

      <el-step title="预览/保存" />
    </el-steps>
    <el-divider />
    <el-row>
      <span>
        <el-button
          v-waves
          icon="el-icon-arrow-left"
          @click="befor"
        >上一步</el-button>
        <el-button
          v-waves
          icon="el-icon-arrow-right"
          @click="next"
        >下一步</el-button>
        <!-- <el-button v-if="activeStep == 4" v-waves icon="el-icon-view">预 览</el-button> -->
        <el-button
          v-if="activeStep == 4"
          v-waves
          icon="el-icon-check"
          @click="save"
        >保 存</el-button>
        <el-button
          v-if="activeStep == 4"
          v-waves
          icon="el-icon-download"
          @click="downloadZip"
        >下 载</el-button>
        <el-button
          v-if="activeStep == 0 || activeStep == 1"
          v-waves
          icon="el-icon-check"
          @click="saveOrColumnList"
        >保 存</el-button>
      </span>
    </el-row>

    <el-divider />

    <div>

      <div v-if="activeStep == 0">
        <div class="table-container">
          <el-table
            :key="0"
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
              label="表名"
              prop="tableName"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="字段名"
              prop="columnName"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="额外参数"
              prop="extra"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="主键"
              prop="keyFlag"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.keyFlag"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否"
                  disabled
                />
              </template>
            </el-table-column>
            <el-table-column
              label="自增列"
              prop="keyIdentityFlag"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.keyIdentityFlag"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否"
                  disabled
                />
              </template>
            </el-table-column>
            <el-table-column
              label="字段类型"
              prop="columnType"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="Java字段类型"
              prop="propertyType"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.propertyType"
                  placeholder="请选择"
                  clearable
                >

                  <el-option
                    label="String"
                    value="String"
                  />
                  <el-option
                    label="Long"
                    value="Long"
                  />
                  <el-option
                    label="Integer"
                    value="Integer"
                  />
                  <el-option
                    label="Boolean"
                    value="Boolean"
                  />
                  <el-option
                    label="BigInteger"
                    value="BigInteger"
                  />
                  <el-option
                    label="BigDecimal"
                    value="BigDecimal"
                  />
                  <el-option
                    label="LocalDate"
                    value="LocalDate"
                  />
                  <el-option
                    label="LocalTime"
                    value="LocalTime"
                  />
                  <el-option
                    label="LocalDateTime"
                    value="LocalDateTime"
                  />
                  <el-option
                    label="Date"
                    value="Date"
                  />
                  <el-option
                    label="Clob"
                    value="Clob"
                  />
                  <el-option
                    label="Blob"
                    value="Blob"
                  />
                  <el-option
                    label="Float"
                    value="Float"
                  />
                  <el-option
                    label="Double"
                    value="Double"
                  />
                  <el-option
                    label="Date"
                    value="Date"
                  />
                  <el-option
                    label="Time"
                    value="Time"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="字段属性名"
              prop="propertyName"
              align="center"
            />
            <el-table-column
              label="字段描述"
              prop="columnComment"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="标签名称"
              prop="formLabel"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.formLabel" />
              </template>
            </el-table-column>
            <el-table-column
              label="默认值"
              prop="defaultValue"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.defaultValue" />
              </template>
            </el-table-column>

          </el-table>
        </div>
      </div>

      <div v-if="activeStep == 1">
        <div class="table-container">
          <el-table
            :key="1"
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
              label="属性名称"
              prop="propertyName"
              align="center"
              sortable
            />
            <el-table-column
              label="标签名称"
              prop="formLabel"
              align="center"
              fixed
              sortable
            />

            <el-table-column
              label="查询条件"
              prop="queryFlag"
              align="center"
              sortable
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.queryFlag"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="查询方式"
              prop="queryMethod"
              align="center"
              min-width="150px"
              sortable
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.queryMethod"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    label="="
                    value="EQ"
                  />
                  <el-option
                    label="!="
                    value="NE"
                  />
                  <el-option
                    label=">"
                    value="GT"
                  />
                  <el-option
                    label=">="
                    value="GTE"
                  />
                  <el-option
                    label="<"
                    value="LT"
                  />
                  <el-option
                    label="<="
                    value="LTE"
                  />
                  <el-option
                    label="LIKE"
                    value="LIKE"
                  />
                  <el-option
                    label="BETWEEN"
                    value="BETWEEN"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="列表是否显示"
              prop="listFlag"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.listFlag"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="插入是否显示"
              prop="insertFlag"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.insertFlag"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="更新是否显示"
              prop="updateFlag"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.updateFlag"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-table-column>

            <el-table-column
              label="下载是否显示"
              prop="downloadFlag"
              align="center"
              sortable
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.downloadFlag"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="必填"
              prop="notNull"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.notNull"
                  :active-value="1"
                  :inactive-value="0"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="校验类型"
              prop="validateType"
              align="center"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.validateType"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    label="邮箱"
                    value="validateEmail"
                  />
                  <el-option
                    label="移动电话"
                    value="validatePhone"
                  />
                  <el-option
                    label="固定电话"
                    value="validateTel"
                  />
                  <el-option
                    label="URL"
                    value="validateUrl"
                  />
                  <el-option
                    label="IP"
                    value="validateIp"
                  />
                  <el-option
                    label="身份证"
                    value="validateIdCard"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="校验 最大长度"
              prop="validateMaxLength"
              align="center"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.validateMaxLength" />
              </template>
            </el-table-column>
            <el-table-column
              label="校验 最小长度"
              prop="validateMinLength"
              align="center"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.validateMinLength" />
              </template>
            </el-table-column>
            <el-table-column
              label="校验 最大值"
              prop="validateMaxValue"
              align="center"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.validateMaxValue" />
              </template>
            </el-table-column>
            <el-table-column
              label="校验 最小值"
              prop="validateMinValue"
              align="center"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.validateMinValue" />
              </template>
            </el-table-column>
            <el-table-column
              label="表单类型"
              prop="formType"
              align="center"
              min-width="150px"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.formType"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    label="文本框"
                    value="input"
                  />
                  <el-option
                    label="文本框(数值)"
                    value="number"
                  />
                  <el-option
                    label="文本域"
                    value="textarea"
                  />
                  <el-option
                    label="下拉框"
                    value="select"
                  />
                  <el-option
                    label="单选框"
                    value="radio"
                  />
                  <el-option
                    label="switch开关"
                    value="switch"
                  />
                  <el-option
                    label="switch开关(0,1)"
                    value="switch(0,1)"
                  />
                  <el-option
                    label="复选框"
                    value="checkbox"
                  />
                  <el-option
                    label="日期控件"
                    value="date"
                  />
                  <el-option
                    label="时间控件"
                    value="time"
                  />
                  <el-option
                    label="日期时间控件"
                    value="datetime"
                  />
                  <!-- <el-option
                    label="图片上传"
                    value="imageUpload"
                  />
                  <el-option
                    label="文件上传"
                    value="fileUpload"
                  /> -->
                  <el-option
                    label="富文本控件"
                    value="editor"
                  />
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
              label="字典"
              prop="dictCode"
              align="center"
              min-width="150px"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.dictCode"
                  placeholder="请选择"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="(item) in dictOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template></el-table-column></el-table>
        </div>
      </div>
      <div v-if="activeStep == 2">
        <div class="app-container">
          <div style="width:800px;margin: 0 auto;">
            <el-form
              ref="tableStrategyConfigForm"
              :inline="true"
              :model="tableStrategyConfig"
              :rules="tableStrategyConfigRules"
              label-position="right"
              label-width="150px"
              class="demo-ruleForm"
            >

              <el-divider content-position="left">基本信息</el-divider>

              <!-- <el-row> -->

              <el-form-item
                label="作者:"
                prop="author"
              >
                <el-input
                  v-model="tableStrategyConfig.author"
                  placeholder="请输入作者"
                />
              </el-form-item>
              <!-- </el-row> -->
              <el-divider content-position="left">策略信息</el-divider>

              <el-form-item
                label="模块名称:"
                prop="moduleName"
              >

                <el-input
                  v-model="tableStrategyConfig.moduleName"
                  placeholder="请输入模块名称"
                />
              </el-form-item>
              <el-form-item
                label="项目路径:"
                prop="contextPath"
              >
                <el-input
                  v-model="tableStrategyConfig.contextPath"
                  placeholder="请输入项目路径"
                />
              </el-form-item>
              <el-form-item
                label="后端路径:"
                prop="projectPath"
              >
                <el-input
                  v-model="tableStrategyConfig.projectPath"
                  type="textarea"
                  :autosize="{minRows: 2, maxRows:6}"
                  placeholder="请输入后端路径"
                />
              </el-form-item>
              <el-form-item
                label="前端路径:"
                prop="vuePath"
              >
                <el-input
                  v-model="tableStrategyConfig.vuePath"
                  type="textarea"
                  :autosize="{minRows: 2, maxRows:6}"
                  placeholder="请输入前端路径"
                />
              </el-form-item>
              <el-form-item
                label="去除表名前缀:"
                prop="tablePrefix"
              >
                <el-input
                  v-model="tableStrategyConfig.tablePrefix"
                  placeholder="请输入表名前缀"
                />
              </el-form-item>
              <el-form-item
                label="去除字段前缀:"
                prop="fieldPrefix"
              >
                <el-input
                  v-model="tableStrategyConfig.fieldPrefix"
                  placeholder="请输入字段前缀"
                />
              </el-form-item>

              <el-form-item
                label="是否覆盖:"
                prop="override"
              >
                <el-switch
                  v-model="tableStrategyConfig.override"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="覆  盖"
                  inactive-text="不覆盖"
                />

              </el-form-item>
              <el-form-item>
                <span style="color:red;"> 覆盖仅适合本地环境！（覆盖请慎重）</span>
              </el-form-item>

              <el-divider content-position="left">父类信息</el-divider>

              <!-- <el-form-item label="controller 命名规则:" prop="controllerName">
                         <el-input v-model="tableStrategyConfig.controllerName" placeholder="请输入controller 命名规则"></el-input>
                        </el-form-item>
                         <el-form-item label="impl命名规则:" prop="serviceImplName">
                         <el-input v-model="tableStrategyConfig.serviceImplName" placeholder="请输入impl命名规则"></el-input>
                        </el-form-item>
                         <el-form-item label="service 命名规则:" prop="serviceName">
                         <el-input v-model="tableStrategyConfig.serviceName" placeholder="请输入service 命名规则"></el-input>
                        </el-form-item>
                         <el-form-item label="xml 命名规则:" prop="xmlName">
                         <el-input v-model="tableStrategyConfig.xmlName" placeholder="请输入xml 命名规则"></el-input>
                        </el-form-item>
                         <el-form-item label="mapper 命名规则:" prop="mapperName">
                         <el-input v-model="tableStrategyConfig.mapperName" placeholder="请输入mapper 命名规则"></el-input>
                        </el-form-item>
                         <el-form-item label="实体类 命名规则:" prop="entityName">
                         <el-input v-model="tableStrategyConfig.entityName" placeholder="请输入实体类 命名规则"></el-input>
                        </el-form-item> -->
              <el-form-item
                label="公共父级包名:"
                prop="parentPackage"
              >

                <el-input
                  v-model="tableStrategyConfig.parentPackage"
                  type="textarea"
                  :autosize="{minRows: 2, maxRows:4}"
                  placeholder="请输入公共父级包名"
                />
              </el-form-item>
              <el-form-item
                label="自定义实体父类:"
                prop="superEntityClass"
              >
                <el-input
                  v-model="tableStrategyConfig.superEntityClass"
                  type="textarea"
                  :autosize="{minRows: 2, maxRows:4}"
                  placeholder="请输入自定义实体父类"
                />
              </el-form-item>
              <el-form-item
                type="textarea"
                :autosize="{minRows: 2, maxRows:4}"
                label="自定义 mapper 父类:"
                prop="superMapperClass"
              >
                <el-input
                  v-model="tableStrategyConfig.superMapperClass"
                  type="textarea"
                  :autosize="{minRows: 2, maxRows:4}"
                  placeholder="请输入自定义 mapper 父类"
                />
              </el-form-item>
              <el-form-item
                label="service 父类:"
                prop="superServiceClass"
              >
                <el-input
                  v-model="tableStrategyConfig.superServiceClass"
                  type="textarea"
                  :autosize="{minRows: 2, maxRows:4}"
                  placeholder="请输入service 父类"
                />
              </el-form-item>
              <el-form-item
                label="service 实现类父类:"
                prop="superServiceImplClass"
              >
                <el-input
                  v-model="tableStrategyConfig.superServiceImplClass"
                  type="textarea"
                  :autosize="{minRows: 2, maxRows:4}"
                  placeholder="请输入service 实现类父类"
                />
              </el-form-item>
              <el-form-item
                label="controller 父类:"
                prop="superControllerClass"
              >
                <el-input
                  v-model="tableStrategyConfig.superControllerClass"
                  type="textarea"
                  :autosize="{minRows: 2, maxRows:4}"
                  placeholder="请输入controller 父类"
                />
              </el-form-item>
              <el-divider />
              <el-form-item>
                <span>
                  <el-button
                    type="success"
                    @click="saveOrUpdateStrategy"
                  >保存策略</el-button>
                </span>
              </el-form-item>

            </el-form>

          </div>
        </div>

      </div>

      <div v-if="activeStep == 3">
        <div class="app-container">

          <el-row
            :gutter="20"
            class="el-row"
            type="flex"
          >
            <el-col
              v-for="(item,index) in templateGroupList"
              :key="item.id"
              :span="8"
              class="el-col"
            >
              <el-card
                :key="index"
                class="el-card"
                @click.native="selectTemplateGroup(item)"
              >
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span>{{ item.templateGroupName }}</span>
                </div>
                <div>
                  <div class="text item">
                    <div class="item_tag">
                      <span>模板组编码：</span>
                    </div>
                    <div class="item_desr">
                      <span> {{ item.templateGroupCode }}</span>
                    </div>
                  </div>
                  <div class="text item">
                    <div class="item_tag">
                      <span>模板组名称：</span>
                    </div>
                    <div class="item_desr">
                      {{ item.templateGroupName }}
                    </div>
                  </div>
                  <div class="text item">
                    <div class="item_tag">
                      <span>租户编号：</span>
                    </div>
                    <div class="item_desr">
                      <span>
                        {{ item.tenantId }}
                      </span>
                    </div>
                  </div>
                  <div class="text item">
                    <div class="item_tag">
                      <span>备注：</span>
                    </div>
                    <div class="item_desr">
                      {{ item.remarks }}
                    </div>
                  </div>
                  <div class="text item">
                    <!-- <el-button type="text" class="button">查看</el-button> -->
                    <el-button
                      type="text"
                      class="button"
                    >选择</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>

          </el-row>

        </div>
      </div>
      <div v-if="activeStep == 4">
        <div class="app-container">
          <preView

            :select-db-id.sync="dbId"
            :select-include-tables.sync="includeTables"
            :select-template-list.sync="selectedTemplateValue"
            :select-templeate-id.sync="templateGroupId"
          />
        </div>
      </div>

      <div>

        <el-dialog
          v-if="templateDialog.visible"
          :title="templateDialog.title"
          :visible.sync="templateDialog.visible"
          :width="templateDialog.width"
          append-to-body
          :before-close="handleTemplateDialogClose"
        >

          <el-transfer
            v-model="selectedTemplateValue"
            style="text-align: left; display: inline-block"
            filterable
            :right-default-checked="[]"
            :render-content="renderFunc"
            :titles="['未选择', '已选择']"
            :button-texts="['到左边', '到右边']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'}"
            :data="templateData"
            @change="handleTranferChange"
          />

          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              v-waves
              @click="handleTemplateDialogClose"
            >关 闭</el-button>
            <el-button
              v-waves
              type="primary"
              @click="submitTemplate"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteById } from '@/api/generator/column'
import {
  getTableColumnList,
  saveOrUpdateListAndGetList,
  getStrategyConfigByDbId,
  download,
  gengratorCode
} from '@/api/generator/codeTable'
import {
  saveTableStrategyConfig,
  updateTableStrategyConfig
} from '@/api/generator/tableStrategyConfig'
import { getTemplateGroupList } from '@/api/generator/templateGroup'
import { getTemplateList } from '@/api/generator/template'

import preView from '../codeTable/preView'
import waves from '@/directive/waves'

/* 获取字典 这里需要与自己的字典表关联 */
import { getDictList } from '@/api/system/dict'
import store from '@/store'

export default {
  name: 'TableField',
  components: { preView },
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
  props: {
    selectDbId: {
      type: Number,
      default: null,
      required: true
    },
    selectIncludeTables: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {
      // 获取下拉选项
      dictOptions: [],
      dictMap: {},
      dbId: this.selectDbId,
      includeTables: this.selectIncludeTables,

      templateGroupList: [],
      templateGroupId: null,
      showSearch: true,
      // 默认查询隐藏列
      defaultHideColumns: [],
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
        {
          key: 10,
          value: 'propertyType',
          label: 'Java字段类型',
          visible: true
        },
        { key: 11, value: 'columnType', label: '字段类型', visible: true },
        { key: 12, value: 'keyFlag', label: '主键 1 是 0 否', visible: true },
        {
          key: 13,
          value: 'keyIdentityFlag',
          label: '自增列 1 是 0 否',
          visible: true
        },
        { key: 14, value: 'notNull', label: '必填 1 是 0 否', visible: true },
        {
          key: 15,
          value: 'queryFlag',
          label: '查询条件 1 是 0 否',
          visible: true
        },
        { key: 16, value: 'queryMethod', label: '查询方式', visible: true },
        {
          key: 17,
          value: 'insertFlag',
          label: '插入是否显示 1 是 0 否',
          visible: true
        },
        {
          key: 18,
          value: 'updateFlag',
          label: '更新是否显示 1 是 0 否',
          visible: true
        },
        {
          key: 19,
          value: 'listFlag',
          label: '查询是否显示 1 是 0 否',
          visible: true
        },
        {
          key: 20,
          value: 'downloadFlag',
          label: '下载是否显示 1 是 0 否',
          visible: true
        },
        { key: 21, value: 'validateType', label: '校验类型', visible: true },
        {
          key: 22,
          value: 'validateMaxLength',
          label: '校验 最大长度',
          visible: true
        },
        {
          key: 23,
          value: 'validateMinLength',
          label: '校验 最小长度',
          visible: true
        },
        {
          key: 24,
          value: 'validateMaxValue',
          label: '校验 最大值',
          visible: true
        },
        {
          key: 25,
          value: 'validateMinValue',
          label: '校验 最小值',
          visible: true
        },
        { key: 26, value: 'formType', label: '表单类型', visible: true },
        { key: 27, value: 'dictCode', label: '关联字典编码', visible: true },
        { key: 28, value: 'dictName', label: '关联字典名称', visible: true },
        { key: 29, value: 'tenantId', label: '租户编号', visible: true },
        { key: 30, value: 'remarks', label: '备注', visible: true },
        {
          key: 31,
          value: 'validState',
          label: '状态 1 有效 0 失效',
          visible: true
        },
        { key: 32, value: 'operatorId', label: '操作人工号', visible: true },
        { key: 33, value: 'operatorName', label: '操作人姓名', visible: true },
        { key: 34, value: 'createTime', label: '创建时间', visible: true },
        { key: 35, value: 'updateTime', label: '更新时间', visible: true }
      ],
      dialogVisible: false,
      tableStrategyConfigRules: {
        author: [{ required: true, message: '请填写作者', trigger: 'blur' }]
      },
      activeStep: 0,
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        dbId: this.dbId,
        includeTables: this.includeTables,
        pageIndex: 1,
        pageSize: 10
      },
      input: '',
      form: {
        columnId: undefined, // 列序号
        dbId: undefined, // 数据源ID
        tableName: undefined, // 表名
        columnName: undefined, // 字段名
        collation: undefined, // 编码
        extra: undefined, // 额外参数
        defaultValue: undefined, // 默认值
        privileges: undefined, // 权限
        columnComment: undefined, // 字段描述
        formLabel: undefined, // 标签名称
        propertyType: undefined, // Java字段类型
        propertyName: undefined,
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
      tableStrategyConfig: {
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
        override: undefined, // 是否覆盖 1 是 0 否
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
        validState: 1, // 状态 1 有效 0 失效
        operatorId: undefined, // 操作人工号
        operatorName: undefined, // 操作人姓名
        createTime: undefined, // 创建时间
        updateTime: undefined // 更新时间
      },
      templateData: [],
      templateList: [],
      templateDialog: {
        width: '60%',
        title: '选择要生成的模板',
        visible: false,
        data: null
      },
      renderFunc(h, option) {
        return <span> {option.label}</span>
        // return <span>{ option.key } - { option.label }</span>;
      },
      selectedTemplateValue: [],
      defaultTemplateChecked: [],
      dialogStatus: '',
      titleMap: {
        update: '编辑',
        create: '创建'
      },
      statusMap: { 1: '正常', 0: '停用' },
      rules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
      }
    }
  },
  watch: {
    activeStep: {
      handler(newValue, oldValue) {
        if (newValue === 3) {
          this.getTemplateGroupList()
        }
      },
      deep: true
    },
    selectDbId: {
      handler(newValue, oldValue) {
        this.dbId = newValue
      },
      deep: true
    },
    selectIncludeTables: {
      handler(newValue, oldValue) {
        this.includeTables = newValue
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    const _that = this
    _that.dbId = _that.selectDbId
    _that.includeTables = _that.selectIncludeTables
    _that.listQuery.dbId = _that.selectDbId
    _that.listQuery.templeateId = _that.selectTempleateId
    _that.listQuery.includeTables = _that.selectIncludeTables
    _that.getList()
    _that.getStrategyConfigByDbId()
    _that.getDictList()
  },
  methods: {
    getDictList() {
      const that = this
      const param = {
        tenantId: store.getters.tenantId
      }
      getDictList(param).then((response) => {
        const tempOptions = []

        for (const key in response.data) {
          tempOptions.push({ label: response.data[key].dictName, value: response.data[key].dictCode })
          that.dictMap[response.data[key].dictCode] = response.data[key].dictName
        }
        that.$nextTick(function() {
          that.dictOptions = tempOptions
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleTranferChange(value, direction, movedKeys) {
      // console.log(movedKeys)

      // console.log(value, direction, movedKeys)
    },
    handleTemplateDialogClose() {
      this.$nextTick(function() {
        this.templateDialog.visible = false
      })
    },
    submitTemplate() {
      if (
        !this.selectedTemplateValue ||
        this.selectedTemplateValue.length < 1
      ) {
        this.$message({
          message: '请至少选择一个模板！',
          type: 'warning'
        })
        return
      }
      this.$nextTick(function() {
        this.templateDialog.visible = false
        this.next()
      })
    },
    showTemplateDialog() {
      this.getTemplateList()
      // 默认 全选
      this.$nextTick(function() {
        this.templateDialog.visible = true
      })
    },
    getTemplateList() {
      const param = {
        templateGroupId: this.templateGroupId
      }
      getTemplateList(param)
        .then((response) => {
          if (response.code === 200) {
            this.templateList = response.data || []

            const list = []
            this.templateData = []
            this.templateList.forEach((template, index) => {
              this.templateData.push({
                // 因为含特殊字符 /，提交给后台时 可能需要处理一下
                key: "'" + template.templatePath + "'",
                label: template.templateName,
                disabled: false
              })
              list.push("'" + template.templatePath + "'")
            })

            this.defaultTemplateChecked = list

            this.selectedTemplateValue = list
            console.log(this.defaultTemplateChecked)
          } else {
            this.$message.error(response.message)
          }
        })
        .catch((err) => {
          this.listLoading = false
          console.log(err)
        })
    },
    save() {
      const that = this
      that
        .$confirm(
          '确定保存吗?这可能会导致代码覆盖，建议只开发环境使用!',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
        .then(function() {
          const param = {
            dbId: that.dbId,
            templeateId: that.templateGroupId,
            includeTables: that.includeTables,
            tableStrategyConfig: that.tableStrategyConfig,
            selectTemplateList: that.selectedTemplateValue
          }
          gengratorCode(param)
            .then((response) => {
              that.listLoading = false
              if (response.code === 200) {
                that.$message.success(response.message)
              } else {
                that.$message.error(response.message)
              }
            })
            .catch((err) => {
              that.listLoading = false
              console.log(err)
            })
        })
    },
    getTemplateGroupList() {
      const that = this
      that.listLoading = true
      const param = {}
      getTemplateGroupList(param)
        .then((res) => {
          that.templateGroupList = res.data
          that.listLoading = false
          that.templateGroupId = null
        })
        .catch((err) => {
          that.listLoading = false
          console.log(err)
        })
    },
    downloadZip() {
      const _that = this
      const param = {
        dbId: _that.dbId,
        templeateId: _that.templateGroupId,
        includeTables: _that.includeTables,
        preView: true,
        selectTemplateList: _that.selectedTemplateValue
      }
      download(param)
        .then((response) => {})
        .catch((err) => {
          console.log(err)
        })
    },
    selectTemplateGroup(item) {
      this.templateGroupId = item.templateGroupId
      this.$message({
        message: '已选择 ' + item.templateGroupName + ' ！',
        type: 'success'
      })
      this.showTemplateDialog()
    },
    saveOrUpdateStrategy() {
      const _that = this

      if (!_that.tableStrategyConfig.configId) {
        saveTableStrategyConfig(_that.tableStrategyConfig)
          .then((response) => {
            _that.listLoading = false
          })
          .catch((err) => {
            _that.listLoading = false
            console.log(err)
          })
      } else {
        updateTableStrategyConfig(_that.tableStrategyConfig)
          .then((response) => {
            _that.$message.success('操作成功！')

            _that.listLoading = false
          })
          .catch((err) => {
            _that.listLoading = false
            console.log(err)
          })
      }
    },

    getStrategyConfigByDbId() {
      const _that = this
      const param = {
        dbId: _that.dbId
      }
      getStrategyConfigByDbId(param)
        .then((response) => {
          const strategyConfigList = response.data || []
          if (strategyConfigList.length > 0) {
            _that.tableStrategyConfig = strategyConfigList[0]
          }
          _that.listLoading = false
        })
        .catch((err) => {
          _that.listLoading = false
          console.log(err)
        })
    },
    befor() {
      --this.activeStep
      if (this.activeStep < 0) this.activeStep = 0
    },
    next() {
      if (this.activeStep === 3 && !this.templateGroupId) {
        this.$message({
          message: '请先选择模板，再点击下一步！',
          type: 'warning'
        })
        return
      }

      if (this.activeStep++ > 4) this.activeStep = 4
    },
    saveOrColumnList() {
      const that = this
      const param = {
        columnList: that.list
      }
      this.$confirm('确定操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        saveOrUpdateListAndGetList(param)
          .then((response) => {
            that.list = response.data
            that.listLoading = false
            that.$message.success('操作成功！')
          })
          .catch((err) => {
            that.listLoading = false
            console.log(err)
          })
      })
    },
    getList() {
      this.listLoading = true
      getTableColumnList(this.listQuery)
        .then((response) => {
          this.list = response.data
          // this.total = response.data.total;
          this.listLoading = false
        })
        .catch((err) => {
          this.listLoading = false
          console.log(err)
        })
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogVisible = true
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
          const id = row.columnId
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
        propertyName: undefined,
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
      if (this.$refs['dataForm']) {
        this.$refs['dataForm'].clearValidate() // 清除整个表单的校验
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
.col-setting-popover {
  min-width: 100px;
  padding: 9px 16px;
  margin-bottom: 10px;
  .col-setting-title {
    color: #7f8b93;
    font-size: 12px;
  }
  .col-setting-group {
    .el-checkbox {
      display: block;
      margin-top: 5px;
    }
  }
}

.all {
  margin-top: -30px;
  word-break: break-all;
  height: 100%;
}
.mid {
  margin-top: 25%;
  height: 50%;
}
.mid_item {
  justify-content: center;
  align-items: center;
}
.item {
  margin-bottom: 10px;
}
.item_tag {
  float: left;
  text-align: left;
}
.item_desr {
  margin-left: 40%;
  min-height: 30px;
  text-align: left;
}
.text {
  width: 100%;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  color: #909399;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-card {
  min-width: 100%;
  height: 100%;
  margin-right: 20px;
  /*transition: all .5s;*/
}
.el-card:hover {
  margin-top: -5px;
}
.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}
.el-col {
  border-radius: 4px;
  align-items: stretch;
  margin-bottom: 40px;
}
</style>
