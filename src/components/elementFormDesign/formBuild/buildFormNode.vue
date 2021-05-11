<template>
  <div>
    <!--    表格布局-->
    <template v-if="item.type === 'table'">
      <table border="1" style="border-collapse: collapse;" class="form-build-table">
        <tbody>
          <!-- 去掉了表格宽度 -->
          <!-- :width="100/(tr.tds.length)+'%'" -->

          <tr v-for="(tr,tri) in item.trs" :key="tri">
            <td
              v-for="(td,tdi) in tr.tds"
              :key="tdi"
              :colspan="td.colspan"
              :rowspan="td.rowspan"
            >
              <FinalForm
                v-for="(temp, i) in td.list"
                :key="i"
                :item="temp"
                :dynamic-data="dynamicData"
                :layout="layout"
                :form-data="formData"
                :child-table-columns="childTableColumns"
                @clickFormButton="handleFormButton"
                @onSuccess="(response, file, fileList)=>{const model= temp.model; $emit('onSuccess',response, file, fileList, model)}"
                @beforeUpload="(file)=>{const model= temp.model;$emit('beforeUpload', file, model)}"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <!--    表格布局结束-->
    <!--    格栅布局-->
    <template v-if="item.type ==='grid'">
      <div class="form-build-grid">

        <el-row
          :gutter="item.options.gutter"
        >
          <el-col
            v-for="(column, i) in item.columns"
            :key="i"
            :span="column.span"
          >

            <FinalForm
              v-for="(temp, j) in column.list"
              :key="j"
              :item="temp"
              :dynamic-data="dynamicData"
              :layout="layout"
              :disabled="disabled"
              :form-data="formData"
              :child-table-columns="childTableColumns"
              @clickFormButton="handleFormButton"
              @onSuccess="(response, file, fileList)=>{const model= temp.model; $emit('onSuccess',response, file, fileList, model)}"
              @beforeUpload="(file)=>{const model= temp.model;$emit('beforeUpload', file, model)}"
            />
          </el-col>
        </el-row>
      </div>
    </template>
    <!--    格栅布局结束-->
    <!-- 标签页布局 -->
    <template v-if="item.type === 'tabs'">
      <div class="form-build-grid">

        <el-tabs
          v-if="item.type === 'tabs'"
          v-model="item.options.activeName"
          :type="item.options.type"
          :tab-position="item.options.tabPosition"
        >
          <el-tab-pane
            v-for="(tabItem) in item.columns"
            :key="tabItem.value"
            :label="tabItem.label"
            :name="tabItem.value"
          >
            <el-row
              :gutter="item.options.gutter"
            >

              <FinalForm
                v-for="(temp, i) in tabItem.list"
                :key="i"
                :item="temp"
                :dynamic-data="dynamicData"
                :layout="layout"
                :disabled="disabled"
                :form-data="formData"
                :child-table-columns="childTableColumns"
                @clickFormButton="handleFormButton"
                @onSuccess="(response, file, fileList)=>{const model= temp.model; $emit('onSuccess',response, file, fileList, model)}"
                @beforeUpload="(file)=>{const model= temp.model;$emit('beforeUpload', file, model)}"
              />

            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>

    <!--    子表-->

    <template v-else-if="item.type === 'childTable' || item.type === 'childTablePage'">
      <!-- :label-width="isLabel? '0px': layout.labelWidth+'%'" -->

      <el-form-item
        :prop="item.model"
        :label="item.options.hidden||isLabel?'':item.label"
        :required="item.rules?item.rules[0].required:false"
        :label-width="isLabel? '0px': (layout.autoLabelWidth ? 'auto' : layout.labelWidth+'%')"
        :style="item.type==='tMKeditor'?'overflow:hidden':''"
      >

        <el-table
          :key="itemKey"
          class="form-build-childTable"
          :data="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)"
          border
          style="width: 100%"
        >

          <el-table-column
            v-for="(column,i) in item.list"
            :key="i"
            :label="column.label"
            min-width="170"
          >
            <template slot-scope="scope">
              <el-input
                v-if="column.type === 'input'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :placeholder="column.options.placeholder"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                :default-value="column.options.defaultValue"
                :type="column.options.hidden?'hidden':'input'"
                :disabled="disabled ? disabled : column.options.disabled"
                v-bind="{
                  clearable:column.options.clearable,
                }"
                @[eventName]="dynamicFun(column)"
              />
              <el-rate
                v-if="column.type === 'rate'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :placeholder="column.options.placeholder"
                :default-value="column.options.defaultValue"
                :disabled="disabled ? disabled : column.options.disabled"
                :allow-half="column.options.allowHalf"
                :count="column.options.max"
                v-bind="{
                  clearable:column.options.clearable,
                }"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <el-color-picker
                v-if="column.type === 'colorPicker'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :size="column.options.size"
                :show-alpha="column.options.showAlpha"
                :disabled="disabled ? disabled : column.options.disabled"
                v-bind="{
                  clearable:column.options.clearable,
                }"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />

              <div
                v-if="column.type==='customHtml'"
                :disabled="disabled ? disabled : column.options.disabled"
                v-bind="{
                  clearable:column.options.clearable,
                }"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
                v-html="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
              />

              <el-alert
                v-if="column.type === 'customAlert'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :title="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :type="column.options.type"
                :description="column.options.description"
                :show-icon="column.options.showIcon"
                :closable="column.options.closable"
                :center="column.options.center"
                v-bind="{
                  clearable:column.options.clearable,
                }"
                :disabled="disabled ? disabled : column.options.disabled"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />

              <!-- 还需要支持动态传参 -->
              <el-tree
                v-if="item.type === 'tree'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-checked-keys="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :show-checkbox="column.options.showCheckbox"
                :check-on-click-node="column.options.checkOnClickNode"
                :current-node-key="column.options.currentNodeKey"
                :indent="column.options.indent"
                :check-strictly="column.options.checkStrictly"
                :icon-class="column.options.iconClass"
                :accordion="column.options.accordion"
                highlight-current
                :node-key="column.options.nodeKey"
                :default-expand-all="column.options.defaultExpandAll"
                :data="column.options.options"
                :props="column.options.defaultProps"
                :placeholder="column.options.placeholder"
                :disabled="disabled ? disabled : column.options.disabled"
                v-bind="{
                  clearable:column.options.clearable,
                }"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />

              <div v-if="item.type === 'iconSelect'">
                <IconSelect
                  v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                  :value="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                  :item="column"
                  :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                  @[eventName]="dynamicFun(column)"
                />
              </div>

              <treeselect
                v-if="item.type === 'treeSelect'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :options="column.options.options"
                :placeholder="column.options.placeholder"
                :required="column.options.required"
                :multiple="column.options.multiple"
                :append-to-body="column.options.appendToBody"
                :delimiter="column.options.delimiter"
                :async="column.options.async"
                :searchable="column.options.searchable"
                :show-count="column.options.showCount"
                :default-value="column.options.multiple?column.options.multipleDefaultValue:column.options.defaultValue"
                :disabled="disabled ? disabled : column.options.disabled"
                :clearable="column.options.clearable"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />

              <el-input
                v-if="column.type === 'text'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :placeholder="column.options.placeholder"
                :default-value="column.options.defaultValue"
                :type="column.options.hidden?'hidden':'textarea'"
                :rows="column.options.height"
                :disabled="column.options.disabled"
                v-bind="{
                  clearable:column.options.clearable,
                }"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <el-input-number
                v-if="column.type === 'number'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="column.options.numberDefaultValue"
                :step="column.options.step"
                :min="column.options.min"
                :max="column.options.max"
                :precision="column.options.precision"
                :disabled="disabled ? disabled : column.options.disabled"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <el-cascader
                v-if="column.type === 'cascader'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :options="column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options"
                :props="{
                  multiple:column.options.multiple
                }"
                :show-all-levels="column.options.showAllLeavels"
                :placeholder="column.options.placeholder"
                collapse-tags
                :disabled="disabled ? disabled : column.options.disabled"
                :clearable="column.options.clearable"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <el-select
                v-if="column.type === 'select'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="column.options.defaultValue"
                :multiple="column.options.multiple"
                :placeholder="column.options.placeholder"
                :disabled="disabled ? disabled : column.options.disabled"
                :clearable="column.options.clearable"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              >
                <el-option
                  v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                  :key="index"
                  :label="items.label"
                  :value="items.value"
                />
              </el-select>
              <el-checkbox-group
                v-if="column.type === 'checkbox'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="column.options.checkboxDefaultValue"
                :min="column.options.chooseMin"
                :max="column.options.chooseMax"
                :disabled="disabled ? disabled : column.options.disabled"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              >
                <el-checkbox
                  v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                  :key="index"
                  :label="items.value"
                >
                  {{ items.label }}
                </el-checkbox>
              </el-checkbox-group>
              <el-radio-group
                v-if="column.type === 'radio'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="column.options.defaultValue"
                :disabled="disabled ? disabled : column.options.disabled"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              >
                <el-radio
                  v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                  :key="index"
                  :label="items.value"
                >
                  {{ items.label }}
                </el-radio>
              </el-radio-group>
              <el-date-picker
                v-if="column.type === 'date'&&column.options.isChooseTimes==='2'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="column.options.rangeDefaultValue"
                :type="column.options.isChooseTimes?'daterange':'date'"
                :range-separator="column.options.rangeSeparator"
                :start-placeholder="column.options.startPlaceholder"
                :end-placeholder="column.options.endPlaceholder"
                :disabled="disabled ? disabled : column.options.disabled"
                :placeholder="column.options.isChooseTimes==='2'?'':column.options.placeholder"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <el-date-picker
                v-if="column.type === 'date'&&column.options.isChooseTimes==='1'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="column.options.defaultValue"
                type="date"
                :placeholder="column.options.placeholder"
                :format="column.options.format"
                :value-format="column.options.valueFormat"
                :disabled="disabled ? disabled : column.options.disabled"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <el-date-picker
                v-if="item.type === 'datetime'&&item.options.isChooseTimes==='2'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="item.options.rangeDefaultValue"
                :type="item.options.isChooseTimes?'datetimerange':'datetime'"
                :range-separator="item.options.rangeSeparator"
                :start-placeholder="item.options.startPlaceholder"
                :end-placeholder="item.options.endPlaceholder"
                :disabled="disabled ? disabled : item.options.disabled"
                :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <el-date-picker
                v-if="item.type === 'datetime'&&item.options.isChooseTimes==='1'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="item.options.defaultValue"
                type="datetime"
                :placeholder="item.options.placeholder"
                :format="item.options.format"
                :value-format="item.options.valueFormat"
                :disabled="disabled ? disabled : item.options.disabled"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <el-time-picker
                v-if="column.type === 'time'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :is-range="column.options.isChooseTimes==='2'"
                :default-value="column.options.defaultValue"
                :range-separator="column.options.rangeSeparator"
                :start-placeholder="column.options.startPlaceholder"
                :end-placeholder="column.options.endPlaceholder"
                :placeholder="column.options.isChooseTimes==='2'?'':column.options.placeholder"
                :disabled="disabled ? disabled : column.options.disabled"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <UploadFile
                v-if="column.type === 'uploadFile'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :warn-text="column.options.warnText"
                :button-text="column.options.buttonText"
                :action="column.options.action"
                :multiple="column.options.multiple"
                :limit="column.options.limit"
                :disabled="disabled ? disabled : column.options.disabled"
                :list-type="column.options.listType"
                :headers="column.options.headers?column.options.headers:{}"
                :data="column.options.data?column.options.data:{}"
                :name="column.options.name?column.options.name:''"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @onSuccess="(response, file, fileList)=>{const model= column.model; $emit('onSuccess',response, file, fileList, model)}"
                @beforeUpload="(file)=>{const model= column.model;$emit('beforeUpload', file, model)}"
                @[eventName]="dynamicFun(column)"
              />
              <UploadImg
                v-if="column.type === 'uploadImg'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :action="column.options.action"
                :multiple="column.options.multiple"
                :limit="column.options.limit"
                :disabled="disabled ? disabled : column.options.disabled"
                :list-type="column.options.listType"
                :headers="column.options.headers?column.options.headers:{}"
                :data="column.options.data?column.options.data:{}"
                :name="column.options.name?column.options.name:''"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @onSuccess="(response, file, fileList)=>{const model= column.model; $emit('onSuccess',response, file, fileList, model)}"
                @beforeUpload="(file)=>{const model= column.model;$emit('beforeUpload', file, model)}"
                @[eventName]="dynamicFun(column)"
              />
              <el-switch
                v-if="column.type === 'switch'"
                v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                :default-value="column.options.switchValue"
                :active-text="column.options.activeText"
                :inactive-text="column.options.inactiveText"
                :disabled="column.options.disabled"
                :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
              />
              <div
                v-if="column.type === 'slider'"
                class="block"
              >
                <el-slider
                  v-model="formData[item.model].slice((item.options.pageIndex - 1) * item.options.pageSize, item.options.pageIndex * item.options.pageSize)[scope.$index][column.model]"
                  :default-value="column.options.numberDefaultValue"
                  :disabled="disabled ? disabled : column.options.disabled"
                  :show-input="column.options.showInput"
                  :step="column.options.step"
                  :style="'width:'+column.options.width+'%;' + column.options.customStyle"
                  @[eventName]="dynamicFun(column)"
                />
              </div>
              <div
                v-if="column.type==='p'"
                :style="'width:'+column.options.width+'%; margin: 0; padding: 0; line-height: 20px; ' + column.options.customStyle"
                @[eventName]="dynamicFun(column)"
                v-text="column.label"
              />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                icon="el-icon-minus"
                circle
                class="table-button"
                @click="handleDelete(scope.$index, formData[item.model], item.model,item)"
              />
              <el-button
                icon="el-icon-plus"
                circle
                class="table-button"
                @click="handleAdd(scope.$index,formData[item.model], item.model,item)"
              />
            </template>
          </el-table-column>

        </el-table>

        <div v-if="item.type === 'childTablePage'" class="page-footer">
          <pagination v-show="item.options.pageTotal>0" :total="item.options.pageTotal" :page-sizes.sync="item.options.pageSizes" :page.sync="item.options.pageIndex" :limit.sync="item.options.pageSize" style="float:right;" @pagination="queryList(item,formData)" />
        </div>
      </el-form-item>
    </template>
    <!--    子表结束-->
    <!--    卡片布局-->
    <template v-else-if="item.type === 'card'">
      <div>
        <el-card class="card-layout">
          <div slot="header">
            <span>{{ item.label }}</span>
          </div>
          <div>
            <FinalForm
              v-for="(items, i) in item.list"
              :key="i"
              :item="items"
              :dynamic-data="dynamicData"
              :layout="layout"
              :form-data="formData"

              :disabled="disabled"
              :child-table-columns="childTableColumns"
              @clickFormButton="handleFormButton"
              @onSuccess="(response, file, fileList)=>{const model= items.model; $emit('onSuccess',response, file, fileList, model)}"
              @beforeUpload="(file)=>{const model= items.model;$emit('beforeUpload', file, model)}"
            />
          </div>
        </el-card>
      </div>
    </template>
    <!--    卡片布局结束-->
    <template v-else>
      <!-- <el-form-item
        :prop="item.model"
        :label="item.options.hidden||item.type==='tMKeditor'||isLabel?'':item.label"
        :required="item.rules?item.rules[0].required:false"
        :label-width="item.type==='tMKeditor'||isLabel?'0px':layout.labelWidth+'%'"
        :style="item.type==='tMKeditor'?'overflow:hidden':''"
      > -->
      <!-- :label-width="isLabel? '0px': (layout.autoLabelWidth ? 'auto' : layout.labelWidth+'%')" -->
      <!-- :label-width="isLabel? '0px': layout.labelWidth+'%'" -->

      <el-form-item
        :prop="item.model"
        :label="item.options.hidden||isLabel?'':item.label"
        :required="item.rules?item.rules[0].required:false"
        :label-width="isLabel? '0px': (layout.autoLabelWidth ? 'auto' : layout.labelWidth+'%')"

        :style="item.type==='tMKeditor'?'overflow:hidden':''"
      >
        <el-rate
          v-if="item.type === 'rate'"
          v-model="formData[item.model]"
          :placeholder="item.options.placeholder"
          :default-value="item.options.defaultValue"
          :disabled="disabled ? disabled : item.options.disabled"
          :allow-half="item.options.allowHalf"
          :count="item.options.max"
          v-bind="{
            clearable:item.options.clearable,
          }"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        />
        <el-color-picker
          v-if="item.type === 'colorPicker'"
          v-model="formData[item.model]"
          :size="item.options.size"
          :show-alpha="item.options.showAlpha"
          :disabled="disabled ? disabled : item.options.disabled"
          v-bind="{
            clearable:item.options.clearable,
          }"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        />
        <div
          v-if="item.type === 'customHtml'"
          :disabled="disabled ? disabled : item.options.disabled"

          v-html="formData[item.model]"
        />
        <el-alert
          v-if="item.type === 'customAlert'"
          v-model="formData[item.model]"
          :title="formData[item.model]"
          :type="item.options.type"
          :description="item.options.description"
          :show-icon="item.options.showIcon"
          :closable="item.options.closable"
          :center="item.options.center"
          :disabled="disabled ? disabled : item.options.disabled"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        />

        <el-progress
          v-if="item.type === 'progress'"
          v-model="formData[item.model]"
          :percentage="formData[item.model]"
          :color="item.options.colors"
          :placeholder="item.options.placeholder"
          :disabled="disabled ? disabled : item.options.disabled"
          :type="item.options.type"
          :stroke-width="item.options.strokeWidth"
          :text-inside="item.options.textInside"
          :width="item.options.circleWidth"
          :show-text="item.options.showText"
          v-bind="{
            clearable:item.options.clearable,
          }"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        />

        <el-tree
          v-if="item.type === 'tree'"
          v-model="formData[item.model]"
          :default-checked-keys="formData[item.model]"
          :show-checkbox="item.options.showCheckbox"
          :check-strictly="item.options.checkStrictly"
          :check-on-click-node="item.options.checkOnClickNode"
          :current-node-key="item.options.currentNodeKey"
          :icon-class="item.options.iconClass"
          :accordion="item.options.accordion"
          :indent="item.options.accordion"
          highlight-current
          :node-key="item.options.nodeKey"
          :default-expand-all="item.options.defaultExpandAll"
          :data="item.options.options"
          :props="item.options.defaultProps"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :disabled="disabled ? disabled : item.options.disabled"
          v-bind="{
            clearable:item.options.clearable,
          }"
          @[eventName]="dynamicFun(item)"
        />

        <div v-if="item.type === 'iconSelect'">
          <IconSelect v-model="item.options.defaultValue" :value="item.options.defaultValue" :item="item" @[eventName]="dynamicFun(item)" />
        </div>

        <treeselect
          v-if="item.type === 'treeSelect'"
          v-model="formData[item.model]"
          :options="item.options.options"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :required="item.options.required"
          :multiple="item.options.multiple"
          :append-to-body="item.options.appendToBody"
          :delimiter="item.options.delimiter"
          :async="item.options.async"
          :searchable="item.options.searchable"
          :show-count="item.options.showCount"
          :default-value="item.options.multiple?item.options.multipleDefaultValue:item.options.defaultValue"
          :disabled="disabled ? disabled : item.options.disabled"
          :clearable="item.options.clearable"
          @[eventName]="dynamicFun(item)"
        />

        <el-input
          v-if="item.type === 'input'"
          v-model="formData[item.model]"
          :placeholder="item.options.placeholder"
          :default-value="item.options.defaultValue"
          :type="item.options.hidden?'hidden':'input'"
          :disabled="disabled ? disabled : item.options.disabled"
          v-bind="{
            clearable:item.options.clearable,
          }"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        />
        <el-input
          v-if="item.type === 'text'"
          v-model="formData[item.model]"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :default-value="item.options.defaultValue"
          :type="item.options.hidden?'hidden':'textarea'"
          :rows="item.options.height"
          :disabled="disabled ? disabled : item.options.disabled"
          v-bind="{
            clearable:item.options.clearable,
          }"
          @[eventName]="dynamicFun(item)"
        />
        <el-input-number
          v-if="item.type === 'number'"
          v-model="formData[item.model]"
          :default-value="item.options.numberDefaultValue"
          :step="item.options.step"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :min="item.options.min"
          :max="item.options.max"
          :precision="item.options.precision"
          :disabled="disabled ? disabled : item.options.disabled"
          @[eventName]="dynamicFun(item)"
        />
        <el-cascader
          v-if="item.type === 'cascader'"
          v-model="formData[item.model]"
          :options="item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options"
          :props="{
            multiple:item.options.multiple
          }"
          :show-all-levels="item.options.showAllLeavels"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          collapse-tags
          :disabled="disabled ? disabled : item.options.disabled"
          :clearable="item.options.clearable"
          @[eventName]="dynamicFun(item)"
        />
        <el-select
          v-if="item.type === 'select'"
          v-model="formData[item.model]"
          :multiple="item.options.multiple"
          :default-value="item.options.multiple?item.options.multipleDefaultValue:item.options.defaultValue"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :disabled="disabled ? disabled : item.options.disabled"
          :clearable="item.options.clearable"
        >
          <el-option
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :key="index"
            :label="items.label"
            :value="items.value"
          />
        </el-select>
        <el-checkbox-group
          v-if="item.type === 'checkbox'"
          v-model="formData[item.model]"
          :default-value="item.options.checkboxDefaultValue"
          :disabled="disabled ? disabled : item.options.disabled"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        >
          <el-checkbox
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :key="index"
            :label="items.value"
          >
            {{ items.label }}
          </el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="formData[item.model]"
          :default-value="item.options.defaultValue"
          :disabled="disabled ? disabled : item.options.disabled"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        >
          <el-radio
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :key="index"
            :label="items.value"
          >
            {{ items.label }}
          </el-radio>
        </el-radio-group>
        <el-date-picker
          v-if="item.type === 'date'&&item.options.isChooseTimes==='2'"
          v-model="formData[item.model]"
          :default-value="item.options.rangeDefaultValue"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :type="item.options.isChooseTimes?'daterange':'date'"
          :range-separator="item.options.rangeSeparator"
          :start-placeholder="item.options.startPlaceholder"
          :end-placeholder="item.options.endPlaceholder"
          :disabled="disabled ? disabled : item.options.disabled"
          :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
          @[eventName]="dynamicFun(item)"
        />
        <el-date-picker
          v-if="item.type === 'date'&&item.options.isChooseTimes==='1'"
          v-model="formData[item.model]"
          :default-value="item.options.defaultValue"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          type="date"
          :placeholder="item.options.placeholder"
          :format="item.options.format"
          :value-format="item.options.valueFormat"
          :disabled="disabled ? disabled : item.options.disabled"
          @[eventName]="dynamicFun(item)"
        />
        <el-date-picker
          v-if="item.type === 'datetime'&&item.options.isChooseTimes==='2'"
          v-model="formData[item.model]"
          :default-value="item.options.rangeDefaultValue"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :type="item.options.isChooseTimes?'datetimerange':'datetime'"
          :range-separator="item.options.rangeSeparator"
          :start-placeholder="item.options.startPlaceholder"
          :end-placeholder="item.options.endPlaceholder"
          :disabled="disabled ? disabled : item.options.disabled"
          :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
          @[eventName]="dynamicFun(item)"
        />
        <el-date-picker
          v-if="item.type === 'datetime'&&item.options.isChooseTimes==='1'"
          v-model="formData[item.model]"
          :default-value="item.options.defaultValue"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          type="datetime"
          :placeholder="item.options.placeholder"
          :format="item.options.format"
          :value-format="item.options.valueFormat"
          :disabled="disabled ? disabled : item.options.disabled"
          @[eventName]="dynamicFun(item)"
        />
        <el-time-picker
          v-if="item.type === 'time'"
          v-model="formData[item.model]"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :is-range="item.options.isChooseTimes==='2'"
          :default-value="item.options.defaultValue"
          :range-separator="item.options.rangeSeparator"
          :start-placeholder="item.options.startPlaceholder"
          :end-placeholder="item.options.endPlaceholder"
          :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
          :disabled="disabled ? disabled : item.options.disabled"
          @[eventName]="dynamicFun(item)"
        />
        <UploadFile
          v-if="item.type === 'uploadFile'"
          v-model="formData[item.model]"
          :warn-text="item.options.warnText"
          :button-text="item.options.buttonText"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :action="item.options.action"
          :multiple="item.options.multiple"
          :limit="item.options.limit"
          :disabled="disabled ? disabled : item.options.disabled"
          :list-type="item.options.listType"
          :headers="item.options.headers?item.options.headers:{}"
          :data="item.options.data?item.options.data:{}"
          :name="item.options.name?item.options.name:''"
          @onSuccess="(response, file, fileList)=>{const model= item.model; $emit('onSuccess',response, file, fileList, model)}"
          @beforeUpload="(file)=>{const model= item.model;$emit('beforeUpload', file, model)}"
          @[eventName]="dynamicFun(item)"
        />
        <UploadImg
          v-if="item.type === 'uploadImg'"
          ref="b"
          v-model="formData[item.model]"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :action="item.options.action"
          :multiple="item.options.multiple"
          :limit="item.options.limit"
          :disabled="disabled ? disabled : item.options.disabled"
          :list-type="item.options.listType"
          :headers="item.options.headers?item.options.headers:{}"
          :data="item.options.data?item.options.data:{}"
          :name="item.options.name?item.options.name:''"
          @onSuccess="(response, file, fileList)=>{const model= item.model; $emit('onSuccess',response, file, fileList, model)}"
          @beforeUpload="(file)=>{const model= item.model;$emit('beforeUpload', file, model)}"
          @[eventName]="dynamicFun(item)"
        />
        <div
          v-if="item.type === 'super'"
        >
          <a
            :href="'https://'+item.options.url"
            target="_blank"
            :style="'width:'+item.options.width+'%;' + item.options.customStyle"
            @[eventName]="dynamicFun(item)"
          >
            {{ item.options.defaultValue }}
          </a>
        </div>
        <el-divider
          v-if="item.type === 'divider'"
          content-position="left"
          @[eventName]="dynamicFun(item)"
        >
          {{ item.label }}
        </el-divider>
        <TMKeditor
          v-if="item.type==='tMKeditor'"
          ref="KEditor"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          :record="item"
          :disabled="true"
          @[eventName]="dynamicFun(item)"
        />
        <el-switch
          v-if="item.type === 'switch'"
          v-model="formData[item.model]"
          :default-value="item.options.switchValue"
          :active-text="item.options.activeText"
          :inactive-text="item.options.inactiveText"
          :disabled="disabled ? disabled : item.options.disabled"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        />
        <div
          v-if="item.type === 'slider'"
          class="block"
        >
          <el-slider
            v-model="formData[item.model]"
            :default-value="item.options.numberDefaultValue"
            :disabled="disabled ? disabled : item.options.disabled"
            :show-input="item.options.showInput"
            :step="item.options.step"
            :style="'width:'+item.options.width+'%;' + item.options.customStyle"
            @[eventName]="dynamicFun(item)"
          />
        </div>
        <div
          v-if="item.type==='p'"
          :style="'width:'+item.options.width+'%; margin: 0; padding: 0; line-height: 20px; '+ item.options.customStyle"

          @[eventName]="dynamicFun(item)"
          v-text="item.label"
        />
        <el-button
          v-if="item.type === 'button'"
          :type="item.options.buttonType"
          :disabled="disabled ? disabled : item.options.disabled"
          :style="'margin-left:'+ item.options.width + '%'+ item.options.customStyle"
          @click="handleFormButton(item.options.handle)"
          @[eventName]="dynamicFun(item)"
        >{{ item.label }}</el-button>
      </el-form-item>
    </template>
  </div>
</template>

<script>
import UploadImg from '../formDesign/components/uploadImg'
import UploadFile from '../formDesign/components/uploadFile'
import TMKeditor from '../formDesign/components/tMkeditor'
import IconSelect from '../formDesign/components/iconSelect'
import Pagination from '@/components/Pagination'
export default {
  name: 'FinalForm',
  components: { UploadImg, UploadFile, TMKeditor, IconSelect, Pagination },
  props: {
    // 判断是否是需要label的Node
    noShowLabelNodeTypeList: {
      type: Array,
      default: () => [
        'button',
        'divider',
        'card',
        'grid',
        'table',
        'customAlert',
        'customHtml',
        'p',
        'divider',
        'tabs'
      ]
    },
    dynamicData: {
      type: Object,
      default: () => {}
    },
    childTableColumns: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    },
    layout: {
      type: Object,
      required: true
    },
    dataList: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      itemKey: Math.random(),
      eventName: this.item.options.eventName || 'click',
      formOptionsList: this.dataList || []
    }
  },
  computed: {
    isLabel() {
      // 判断是否是需要label的Node
      return this.noShowLabelNodeTypeList.includes(this.item.type)
    }
  },
  watch: {
    item: {
      handler(newValue, oldValue) {
        this.eventName = newValue.options.eventName || 'click'
      },
      deep: true
    },
    dataList: {
      handler(newValue, oldValue) {
        this.formOptionsList = newValue
      },
      deep: true
    }
  },
  methods: {
    dynamicFun(item) {
      if (item.options.dynamicFun && item.options.eventName) {
        // var function_name=new function(arg1,arg2,...,argN,function_body)
        var val = new Function('item', 'dataList', 'that', item.options.dynamicFun)
        // 传参
        val(item, this.formOptionsList, this)
      }
    },
    // 批量设置某个option的值 that.setOptions(['input_1619670344566'],'defaultValue',777);
    setOptions(fields, optionName, value) {
      fields = new Set(fields)
      // 递归遍历控件树
      const traverse = array => {
        array.forEach(element => {
          if (fields.has(element.model)) {
            element.options[optionName] = value
            console.log(value)
          }
          if (element.type === 'grid' || element.type === 'tabs') {
            // 栅格布局
            element.columns.forEach(item => {
              traverse(item.list)
            })
          } else if (element.type === 'card') {
            // 卡片布局
            traverse(element.list)
          } else if (element.type === 'childTable' || element.type === 'childTablePage') {
            // 字表布局
            traverse(element.list)
          }
          if (element.type === 'table') {
            // 表格布局
            element.trs.forEach(item => {
              item.tds.forEach(val => {
                traverse(val.list)
              })
            })
          }
        })
      }
      traverse(this.formOptionsList)

      this.$emit('formDataMap')
    },
    handleFormButton(type) {
      this.$emit('clickFormButton', type)
    },
    handleAdd(index, array, model, item) {
      // 操作子表添加一行
      let temp = {}
      this.childTableColumns.forEach((child, i) => {
        if (model === child.model) {
          temp = JSON.parse(JSON.stringify(child))
        }
      })
      delete temp.model
      array.splice(index, 0, temp)
      if (item.type === 'childTablePage') {
        item.options.pageTotal = array.length
      }
    },
    handleDelete(index, array, item) {
      // 操作子表删除指定行
      if (array.length > 1) {
        array.splice(index, 1)
        if (item.type === 'childTablePage') {
          item.options.pageTotal = array.length
        }
      }
    },
    queryList(item, formData) {
      this.$nextTick(function() {
        this.itemKey = Math.random()
      })
    }
  }
}
</script>
