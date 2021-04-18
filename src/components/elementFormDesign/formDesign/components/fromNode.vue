<template>
  <div style="width: 100%">
    <!-- :label="item.options.hidden||item.type==='tMKeditor'||isLabel?'':item.label" -->
    <!-- :label-width="item.type==='tMKeditor'||isLabel?'0px':layout.labelWidth+'%'" -->

    <!-- beforeDestroy hook: "Error: [ElementForm]unpected width " -->
    <!-- :label-width="isLabel? '0px': (layout.autoLabelWidth ? 'auto' : layout.labelWidth+'%')" -->
    <el-form-item
      :label="item.options.hidden||isLabel?'':item.label"
      :required="item.rules?item.rules[0].required:false"
      :label-width="isLabel? '0px': layout.labelWidth+'%'"

      :style="item.type==='tMKeditor'?'overflow:hidden':''"
    >

      <!--  v-on="{eventName: dynamicFun(item)}""  可以参考这个-->
      <!-- @[eventName]="dynamicFun(item)" -->
      <el-input
        v-if="item.type === 'input'"
        v-model="item.options.defaultValue"
        :placeholder="item.options.placeholder"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        :type="item.options.hidden?'hidden':'input'"
        :disabled="item.options.disabled"
        v-bind="{
          clearable:item.options.clearable,
        }"
        @[eventName]="dynamicFun(item)"
      />
      <el-input
        v-if="item.type === 'text'"
        v-model="item.options.defaultValue"
        :placeholder="item.options.placeholder"
        :type="item.options.hidden?'hidden':'textarea'"
        :rows="item.options.height"
        :disabled="item.options.disabled"
        v-bind="{
          clearable:item.options.clearable,
        }"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <el-input-number
        v-if="item.type === 'number'"
        v-model="item.options.numberDefaultValue"
        :step="item.options.step"
        :min="item.options.min"
        :max="item.options.max"
        :precision="item.options.precision"
        :disabled="item.options.disabled"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <el-select
        v-if="item.type === 'select'"
        v-model="selectDefaultValue"
        :multiple="item.options.multiple"
        :placeholder="item.options.placeholder"
        :disabled="item.options.disabled"
        :clearable="item.options.clearable"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      >
        <el-option
          v-for="(items,index) in item.options.options"
          :key="index"
          :label="items.label"
          :value="items.value"
        />
      </el-select>
      <el-cascader
        v-if="item.type === 'cascader'"
        v-model="selectDefaultValue"
        :options="item.options.options"
        :props="{
          multiple:item.options.multiple
        }"
        :show-all-levels="item.options.showAllLeavels"
        :placeholder="item.options.placeholder"
        collapse-tags
        :disabled="item.options.disabled"
        :clearable="item.options.clearable"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <el-checkbox-group
        v-if="item.type === 'checkbox'"
        v-model="item.options.checkboxDefaultValue"
        :min="item.options.chooseMin"
        :max="item.options.chooseMax"
        :disabled="item.options.disabled"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      >
        <el-checkbox
          v-for="(items, i) in item.options.options"
          :key="i"
          :label="items.value"
        >{{ items.label }}</el-checkbox>
      </el-checkbox-group>
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="item.options.defaultValue"
        :disabled="item.options.disabled"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      >
        <el-radio
          v-for="(items, index) in item.options.options"
          :key="index"
          :label="items.value"
        >
          {{ items.label }}
        </el-radio>
      </el-radio-group>
      <el-date-picker
        v-if="item.type === 'date'&&item.options.isChooseTimes==='2'"
        v-model="item.options.rangeDefaultValue"
        :type="item.options.isChooseTimes?'daterange':'date'"
        :range-separator="item.options.rangeSeparator"
        :start-placeholder="item.options.startPlaceholder"
        :end-placeholder="item.options.endPlaceholder"
        :disabled="item.options.disabled"
        :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <el-date-picker
        v-if="item.type === 'date'&&item.options.isChooseTimes==='1'"
        v-model="item.options.defaultValue"

        type="date"
        :placeholder="item.options.placeholder"
        :format="item.options.format"
        :value-format="item.options.valueFormat"
        :disabled="item.options.disabled"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />

      <el-date-picker
        v-if="item.type === 'datetime'&&item.options.isChooseTimes==='2'"
        v-model="item.options.rangeDefaultValue"

        :type="item.options.isChooseTimes?'datetimerange':'datetime'"
        :range-separator="item.options.rangeSeparator"
        :start-placeholder="item.options.startPlaceholder"
        :end-placeholder="item.options.endPlaceholder"
        :disabled="item.options.disabled"
        :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <el-date-picker
        v-if="item.type === 'datetime'&&item.options.isChooseTimes==='1'"
        v-model="item.options.defaultValue"

        type="datetime"
        :placeholder="item.options.placeholder"
        :format="item.options.format"
        :value-format="item.options.valueFormat"
        :disabled="item.options.disabled"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <el-time-picker
        v-if="item.type === 'time'"
        v-model="item.options.defaultValue"
        :is-range="item.options.isChooseTimes==='2'"
        :range-separator="item.options.rangeSeparator"
        :start-placeholder="item.options.startPlaceholder"
        :end-placeholder="item.options.endPlaceholder"
        :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
        :disabled="item.options.disabled"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <el-upload
        v-if="item.type === 'uploadFile'"
        class="upload-demo"
        :action="item.options.action"
        :limit="item.options.limit"
        disabled
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      >
        <el-button size="small" type="primary">{{ item.options.buttonText }}</el-button>
        <div slot="tip" class="el-upload__tip">{{ item.options.warnText }}</div>
      </el-upload>
      <el-upload
        v-if="item.type === 'uploadImg'"
        :action="item.options.action"
        :limit="item.options.limit"
        :list-type="item.options.listType"
        disabled
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      >
        <i class="el-icon-plus" />
      </el-upload>
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
      >
        布局控件
      </el-divider>
      <!--    <TipsWindow-->
      <!--      v-if="item.type === 'tipsWindow'"-->
      <!--    />-->
      <el-dialog v-if="item.type === 'uploadImg'" :visible.sync="item.options.dialogVisible">
        <img width="100%" :src="item.options.dialogImageUrl" alt="">
      </el-dialog>
      <TMKeditor
        v-if="item.type==='tMKeditor'"
        ref="KEditor"
        :record="item"
        :disabled="true"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <el-switch
        v-if="item.type === 'switch'"
        v-model="item.options.switchValue"
        :active-text="item.options.activeText"
        :inactive-text="item.options.inactiveText"
        :disabled="item.options.disabled"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
      <div
        v-if="item.type === 'slider'"
        class="block"
      >
        <el-slider
          v-model="item.options.numberDefaultValue"
          :disabled="item.options.disabled"
          :show-input="item.options.showInput"
          :step="item.options.step"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        />
      </div>
      <div
        v-if="item.type==='p'"
        :style="'width:'+item.options.width+'%; margin: 0; padding: 0; line-height: 20px; ' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
        v-text="item.label"
      />
      <el-button
        v-if="item.type === 'button'"
        :type="item.options.buttonType"
        :disabled="item.options.disabled"
        :style="'margin-left:'+ item.options.width + '%' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      >{{ item.label }}</el-button>

      <el-rate
        v-if="item.type === 'rate'"
        v-model="item.options.defaultValue"
        :disabled="item.options.disabled"
        :placeholder="item.options.placeholder"
        :allow-half="item.options.allowHalf"
        :count="item.options.max"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />

      <el-progress
        v-if="item.type === 'progress'"
        :percentage="item.options.defaultPercentage"
        :disabled="item.options.disabled"
        :color="item.options.colors"
        :type="item.options.type"
        :stroke-width="item.options.strokeWidth"
        :text-inside="item.options.textInside"
        :width="item.options.circleWidth"
        :show-text="item.options.showText"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />

      <el-color-picker
        v-if="item.type === 'colorPicker'"
        v-model="item.options.defaultValue"
        :disabled="item.options.disabled"
        :size="item.options.size"
        :show-alpha="item.options.showAlpha"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />

      <el-alert
        v-if="item.type === 'customAlert'"
        v-model="item.options.defaultValue"
        :title="item.options.defaultValue"
        :type="item.options.type"
        :description="item.options.description"
        :show-icon="item.options.showIcon"
        :closable="item.options.closable"
        :center="item.options.center"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />

      <div
        v-if="item.type==='customHtml'"
        :disabled="item.options.disabled"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
        v-html="item.options.defaultValue"
      />

      <el-tree
        v-if="item.type === 'tree'"
        v-model="item.options.multipleDefaultValue"
        :default-checked-keys="item.options.multipleDefaultValue"
        :check-on-click-node="item.options.checkOnClickNode"
        :current-node-key="item.options.currentNodeKey"
        :show-checkbox="item.options.showCheckbox"
        :check-strictly="item.options.checkStrictly"
        :indent="item.options.indent"
        :icon-class="item.options.iconClass"
        :accordion="item.options.accordion"
        highlight-current
        :node-key="item.options.nodeKey"
        :default-expand-all="item.options.defaultExpandAll"
        :data="item.options.options"
        :props="item.options.defaultProps"
        :placeholder="item.options.placeholder"
        :disabled="item.options.disabled"
        :clearable="item.options.clearable"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />

      <div v-if="item.type === 'iconSelect'">
        <IconSelect
          v-model="item.options.defaultValue"
          :value="item.options.defaultValue"
          :item="item"
          :style="'width:'+item.options.width+'%;' + item.options.customStyle"
          @[eventName]="dynamicFun(item)"
        />
      </div>

      <treeselect
        v-if="item.type === 'treeSelect'"
        v-model="selectDefaultValue"
        :options="item.options.options"
        :placeholder="item.options.placeholder"
        :required="item.options.required"
        :multiple="item.options.multiple"
        :append-to-body="item.options.appendToBody"
        :delimiter="item.options.delimiter"
        :async="item.options.async"
        :searchable="item.options.searchable"
        :show-count="item.options.showCount"
        :disabled="item.options.disabled"
        :clearable="item.options.clearable"
        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />

      <treeselect
        v-if="item.type === 'organTreeSelect'"
        v-model="selectDefaultValue"
        :options.sync="tempItem.options.options"
        :placeholder="item.options.placeholder"
        :required="item.options.required"
        :multiple="item.options.multiple"
        :append-to-body="item.options.appendToBody"
        :delimiter="item.options.delimiter"
        :async="item.options.async"
        :searchable="item.options.searchable"
        :show-count="item.options.showCount"
        :disabled="item.options.disabled"
        :clearable="item.options.clearable"
        :normalizer="normalizer"
        :disable-branch-nodes="true"

        :style="'width:'+item.options.width+'%;' + item.options.customStyle"
        @[eventName]="dynamicFun(item)"
      />
    </el-form-item>
    <p id="control-key">{{ item.key }}</p>
  </div>
</template>

<script>
import TMKeditor from './tMkeditor'
import IconSelect from './iconSelect'
import { getCompanyTree } from '@/api/system/company'
import { getOrganDeptTree } from '@/api/system/dept'

import store from '@/store'
import deepClone from 'clone-deep'

export default {
  name: 'FormNode',
  components: { TMKeditor, IconSelect },
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
    layout: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      eventName: this.item.options.eventName || 'click',
      treeOptions: [],
      tempItem: []
    }
  },
  computed: {
    isLabel() {
      // 判断是否是需要label的Node
      return this.noShowLabelNodeTypeList.includes(this.item.type)
    },
    calcEventName(item) {
      return item.options.eventName || 'click'
    },
    selectDefaultValue: {
      get() {
        return this.item.options.multiple ? this.item.options.multipleDefaultValue : this.item.options.defaultValue
      },
      set(val) {
        this.item.options.multiple ? this.item.options.multipleDefaultValue = val : this.item.options.defaultValue = val
      }
    }
  },
  watch: {
    item: {
      handler(newValue, oldValue) {
        this.eventName = newValue.options.eventName || 'click'

        this.tempItem = deepClone(newValue)
        if (newValue.type === 'organTreeSelect') {
          this.getTree(newValue.options.organType)
        }
      },
      deep: true
    }
  },
  created() {
    this.tempItem = deepClone(this.item)
  },
  methods: {
    dynamicFun(item) {
      if (item.options.dynamicFun && item.options.eventName) {
        // var function_name=new function(arg1,arg2,...,argN,function_body)
        var val = new Function('item', item.options.dynamicFun)
        // 传参
        val(item)
      }
    },
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      console.log({
        id: node.id,
        label: node.treeName,
        children: node.children,
        isDisabled: node.disabled,
        isNew: node.newFlag,
        isDefaultExpanded: node.defaultExpanded
      })
      return {
        id: node.id,
        label: node.treeName,
        children: node.children,
        isDisabled: node.disabled,
        isNew: node.newFlag,
        isDefaultExpanded: node.defaultExpanded
      }
    },
    getTree(organType) {
      const that = this
      organType = organType || 'organ'
      let param = {}
      let options = []
      if (organType === 'organ') {
        param = {
          parentId: 0,
          tenantId: store.getters.tenantId // 租户编号
        }
        getCompanyTree(param).then(response => {
          that.$nextTick(() => {
            options = response.data
            that.tempItem.options.options = options
            that.treeOptions = options
          })
        }).catch(err => {
          console.log(err)
        })
      } else if (organType === 'organDept') {
        param = {
          companyId: 0,
          parentId: 0,
          tenantId: store.getters.tenantId // 租户编号
        }
        getOrganDeptTree(param).then(response => {
          that.$nextTick(() => {
            options = response.data
            that.tempItem.options.options = options
            that.treeOptions = options
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }

  }

}
</script>
