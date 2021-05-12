<template>
  <div>
    <el-form
      label-width="80px"
      :model="config"
      class="control-config-form"
      label-position="top"
      size="mini"
    >
      <p style="text-align: center; margin: 6px 0; font-size: 12px">{{ config.key }}</p>
      <el-button
        type="primary"
        icon="el-icon-s-unfold"
        class="shrink-button"
        @click="handleShrink"
      />
      <el-form-item v-if="config.hasOwnProperty('label')" label="标签">
        <el-input v-model="config.label" clearable />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('buttonType')" />
      <el-form-item v-if="config.options.hasOwnProperty('buttonType')" label="按钮类型">
        <el-radio-group v-model="config.options.buttonType" size="mini">
          <el-radio-button label="primary" type="primary">primary</el-radio-button>
          <el-radio-button label="success" type="success">success</el-radio-button>
          <el-radio-button label="danger" type="danger">danger</el-radio-button>
          <el-radio-button label="info" type="info">info</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('handle')" />
      <el-form-item v-if="config.options.hasOwnProperty('handle')" label="按钮类型">
        <el-radio-group v-model="config.options.handle" size="mini">
          <el-radio-button label="submit">提交</el-radio-button>
          <el-radio-button label="clear">重置</el-radio-button>
          <el-radio-button label="doSomething">自定义</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('url')" />
      <el-form-item v-if="config.options.hasOwnProperty('url')" label="连接地址">
        <el-input
          v-model="config.options.url"
          clearable
        />
      </el-form-item>
      <el-form-item v-if="config.options.hasOwnProperty('handle')&&config.options.handle==='doSomething'" label="自定义事件">
        <el-input
          v-model="config.options.dynamicFun"
          type="textarea"
          :rows="6"
        />
      </el-form-item>
      <el-divider v-if="config.hasOwnProperty('model')" />
      <el-form-item v-if="config.hasOwnProperty('model')" label="数据字段">
        <el-input
          v-model="config.model"
          clearable
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('width')" />
      <el-form-item v-if="config.options.hasOwnProperty('width')" :label="config.type==='button'?'按钮位置':'宽度(子表中控件宽度不生效)'">
        <div class="block">
          <el-slider
            v-model="config.options.width"
            :min="config.options.minWidth"
            :max="config.options.maxWidth?config.options.maxWidth:100"
            show-input
          />
        </div>
      </el-form-item>
      <el-form-item v-if="config.options.hasOwnProperty('height')" label="高度">
        <div class="block">
          <el-slider
            v-model="config.options.height"
            :min="3"
            :max="7"
            show-input
          />
        </div>
      </el-form-item>
      <UploadFileOrImg
        v-if="config.type==='uploadFile'||config.type==='uploadImg'"
        :options="config.options"
      />
      <el-divider v-if="config.options.hasOwnProperty('gutter') && config.type === 'grid'" />
      <el-form-item v-if="config.options.hasOwnProperty('gutter') && config.type === 'grid'" label="格栅间距">
        <el-input-number
          v-model="config.options.gutter"
          :min="0"
          controls-position="right"
          size="mini"
        />
      </el-form-item>
      <div v-if="config.hasOwnProperty('columns') && config.type === 'grid'" style="margin-top: 8px">
        <div style="font-size: 14px">格栅配置</div>
        <el-row v-for="(item,index) in config.columns" :key="index" :gutter="5" style="margin-top: 6px">
          <el-col :span="12">
            <el-input-number
              v-model="item.span"
              :max="24"
              :min="0"
              controls-position="right"
              size="mini"
            />
          </el-col>
          <el-col :span="6">
            <el-button style="padding: 7px" type="danger" icon="el-icon-delete" circle @click="deleteItem(config.columns,index)" />
          </el-col>
        </el-row>
        <a href="#" style="text-decoration:none; font-size: 14px" @click="addItem(config.columns)">增加数据</a>
      </div>
      <el-divider v-if="config.options.hasOwnProperty('options')" />
      <el-form-item v-if="config.options.hasOwnProperty('options')" label="下拉框数据">
        <el-radio-group v-model="config.options.dynamic">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">动态数据</el-radio-button>
        </el-radio-group>
        <OptionAdd v-if="!config.options.dynamic" v-model="config.options.options" :type="config.type" />

        <div style="display:inline">
          <el-input v-if="config.options.dynamic" v-model="config.options.dynamicKey" style="margin-top: 10px;width:70%;" placeholder="请输入动态数据地址" />
          <el-button v-if="config.options.dynamic" type="danger" style="padding-left: 2.5px; padding-right: 2.5px;width:20%;" @click="showDict">选择</el-button>
        </div>
      </el-form-item>

      <el-divider v-if="config.options.hasOwnProperty('showAllLeavels') && config.type === 'cascader'" />
      <el-form-item v-if="config.options.hasOwnProperty('showAllLeavels') && config.type === 'cascader'" label="显示选中值的完整路径">
        <el-switch
          v-model="config.options.showAllLeavels"
        />
      </el-form-item>

      <el-divider v-if="config.type === 'tabs'" />

      <div v-if="config.type === 'tabs'">
        <el-form-item v-if="config.type === 'tabs'" label="页签配置">
          <el-row v-if="config.type === 'tabs'" :gutter="8">
            <div v-for="(val, index) in config.columns" :key="index" class="option-change-box">
              <el-col :span="9"><el-input
                v-model="val.label"
                placeholder="名称"
              /></el-col>
              <el-col :span="9"><el-input v-model="val.value" placeholder="值" /></el-col>
              <el-col :span="6">
                <el-button style="padding: 7px" type="danger" icon="el-icon-delete" circle @click="deleteTabsItem(config.columns,index)" />
              </el-col>
            </div>
            <el-col :span="24"><el-button icon="el-icon-plus" @click="addTabsItem(config.columns)">添加</el-button></el-col>
          </el-row>
        </el-form-item>
        <!-- 页签位置 start -->
        <el-form-item v-if="config.type === 'tabs'" label="页签位置">
          <el-radio-group v-model="config.options.tabPosition" size="mini">
            <el-radio label="top">top</el-radio>
            <el-radio label="right">right</el-radio>
            <el-radio label="bottom">bottom</el-radio>
            <el-radio label="left">left</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 页签位置 end -->
        <!-- 页签类型 start -->
        <el-form-item v-if="config.type === 'tabs'" label="页签类型">

          <el-radio-group v-model="config.options.type">
            <el-radio-button label="card">card</el-radio-button>
            <el-radio-button label="border-card">border-card</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- 页签类型 end -->
      </div>

      <el-divider v-if="config.type === 'progress'" />
      <div v-if="config.type === 'progress'">
        <el-form-item v-if="config.type === 'progress'" label="默认值">
          <el-input-number v-model="config.options.defaultPercentage" :min="0" :max="100" />
        </el-form-item>
        <el-form-item v-if="config.type === 'progress'" label="进度条背景色">
          <el-row v-if="config.type === 'progress'">
            <div v-for="(val, index) in config.options.colors" :key="index">
              <el-row>
                <el-col :span="6">
                  <el-color-picker
                    v-model="val.color"
                  />
                </el-col>
                <el-col :span="12"><el-input v-model="val.percentage" placeholder="值" /></el-col>
                <el-col :span="6">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteColorItem(config.options.colors,index)" />
                </el-col>
              </el-row>
            </div>
            <el-col :span="24"><el-button icon="el-icon-plus" @click="addColorItem(config.options.colors)">添加</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="config.type === 'progress'" label="进度条类型">
          <el-radio-group v-model="config.options.type" size="mini">
            <el-radio label="line">线形</el-radio>
            <el-radio label="circle">环形</el-radio>
            <el-radio label="dashboard">仪表盘</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="config.type === 'progress'" label="进度条宽度">
          <el-input-number v-model="config.options.strokeWidth" :min="0" :max="10000" />
        </el-form-item>
        <el-form-item v-if="config.type === 'progress'" label="环形进度条画布宽度">
          <el-input-number v-model="config.options.circleWidth" :min="0" :max="10000" />
        </el-form-item>
        <el-form-item v-if="config.type === 'progress'" label="进度条文字内容">
          <el-switch
            v-model="config.options.showText"
            active-text="显示"
            inactive-text="不显示"
          />
        </el-form-item>
        <el-form-item v-if="config.type === 'progress'" label="显示文字内置在进度条内">
          <el-switch
            v-model="config.options.textInside"
            active-text="是"
            inactive-text="否"
          />
        </el-form-item>
      </div>

      <el-divider v-if="config.type === 'colorPicker'" />
      <div v-if="config.type === 'colorPicker'">
        <el-form-item label="尺寸">
          <el-radio-group v-model="config.options.size" size="mini">
            <el-radio label="default">default</el-radio>
            <el-radio label="medium">medium</el-radio>
            <el-radio label="small">small</el-radio>
            <el-radio label="mini">mini</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支持透明度选择">
          <el-switch
            v-model="config.options.showAlpha"
            active-text="支持"
            inactive-text="不支持"
          />
        </el-form-item>
      </div>

      <div v-if="config.type === 'treeSelect'">
        <el-divider />
        <el-form-item label="多选">
          <el-switch
            v-model="config.options.multiple"
            active-text="多选"
            inactive-text="单选"
          />
        </el-form-item>
        <el-form-item label="搜索">
          <el-switch
            v-model="config.options.searchable"
            active-text="启用"
            inactive-text="不启用"
          />
        </el-form-item>
        <el-form-item label="显示统计值">
          <el-switch
            v-model="config.options.searchable"
            active-text="显示"
            inactive-text="隐藏"
          />
        </el-form-item>
        <el-form-item label="连接隐藏字段值的多个值定界符">
          <el-input v-model="config.options.delimiter" />
        </el-form-item>
      </div>

      <el-divider v-if="config.type === 'customAlert'" />
      <div v-if="config.type === 'customAlert'">
        <el-form-item label="主题">
          <el-input v-model="config.options.defaultValue" type="textarea" :rows="6" />
        </el-form-item>
        <el-form-item label="辅助描述">
          <el-input v-model="config.options.description" type="textarea" :rows="6" />
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="config.options.type" size="mini">
            <el-radio label="success">success</el-radio>
            <el-radio label="info">info</el-radio>
            <el-radio label="warning">warning</el-radio>
            <el-radio label="error">error</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示图标">
          <el-switch
            v-model="config.options.showIcon"
            active-text="显示"
            inactive-text="不示"
          />
          <el-form-item label="可关闭">
            <el-switch
              v-model="config.options.closable"
              active-text="是"
              inactive-text="否"
            />
          </el-form-item>
          <el-form-item label="可居中">
            <el-switch
              v-model="config.options.center"
              active-text="是"
              inactive-text="否"
            />
          </el-form-item>
        </el-form-item>
      </div>

      <el-divider v-if="config.type === 'tree'" />
      <div v-if="config.type === 'tree'">
        <el-form-item label="唯一标识的属性">
          <el-input v-model="config.options.nodeKey" />
        </el-form-item>
        <el-form-item label="配置选项">
          <el-input v-model="config.options.defaultProps" type="textarea" :rows="6" />
        </el-form-item>
        <el-form-item label="树节点的图标">
          <el-input v-model="config.options.iconClass" />
        </el-form-item>
        <el-form-item label="当前选中的节点">
          <el-input v-model="config.options.currentNodeKey" />
        </el-form-item>
        <el-form-item label="水平缩进(像素)">
          <el-input-number v-model="config.options.indent" />
        </el-form-item>
        <el-form-item label="只打开一个同级树节点展开">
          <el-switch
            v-model="config.options.accordion"
            active-text="是"
            inactive-text="否"
          />
          <el-form-item label="是否可被选择">
            <el-switch
              v-model="config.options.showCheckbox	"
              active-text="是"
              inactive-text="否"
            />
          </el-form-item>
          <el-form-item label="严格的遵循父子不互相关联">
            <el-switch
              v-model="config.options.checkStrictly	"
              active-text="是"
              inactive-text="否"
            />
          </el-form-item>
          <el-form-item label="点击时选中节点">
            <el-switch
              v-model="config.options.checkOnClickNode	"
              active-text="是"
              inactive-text="否"
            />
          </el-form-item>
        </el-form-item>
      </div>

      <!--  动态JS -->
      <div v-if="config.options.hasOwnProperty('customStyle')">
        <el-divider />
        <el-form-item label="CSS">
          <el-input
            v-model="config.options.customStyle"
            type="textarea"
            :rows="6"
          />

        </el-form-item>
      </div>

      <!--  动态JS -->
      <div v-if="config.options.hasOwnProperty('eventName') &&config.options.hasOwnProperty('eventNameOptions')">
        <el-divider />
        <el-form-item label="动态JS">
          <el-input
            v-model="config.options.dynamicFun"
            type="textarea"
            :rows="6"
          />

        </el-form-item>
        <el-form-item label="触发事件类型（必须源控件支持！）">

          <el-select
            v-model="config.options.eventName"
          >
            <el-option
              v-for="(items,index) in config.options.eventNameOptions"
              :key="index"
              :label="items.label"
              :value="items.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <el-divider v-if="config.options.hasOwnProperty('chooseMax')" />
      <el-form-item v-if="config.options.hasOwnProperty('chooseMax')" label="最多可选数">
        <el-input-number
          v-model="config.options.chooseMax"
          :min="0"
          :max="config.options.options.length"
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('chooseMin')" />
      <el-form-item v-if="config.options.hasOwnProperty('chooseMin')" label="最少可选数">
        <el-input-number
          v-model="config.options.chooseMin"
          :min="0"
          :max="config.options.options.length-1"
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('defaultValue')&&!config.options.hasOwnProperty('isChooseTimes')" />
      <el-form-item v-if="config.options.hasOwnProperty('defaultValue')&&!config.options.hasOwnProperty('isChooseTimes')" :label="config.type==='number'?'默认值(必须为数字)':'默认值'">
        <el-select
          v-if="config.type === 'select'"
          v-model="selectDefaultValue"
          :multiple="config.options.multiple"
        >
          <el-option
            v-for="(items,index) in config.options.options"
            :key="index"
            :label="items.label"
            :value="items.value"
          />
        </el-select>
        <el-cascader
          v-else-if="config.type === 'cascader'"
          v-model="selectDefaultValue"
          :options="config.options.options"
          :props="{
            multiple:config.options.multiple
          }"
          :show-all-levels="config.options.showAllLeavels"
          collapse-tags
          filterable
        />
        <el-input
          v-else
          v-model="config.options.defaultValue"
          clearable
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('showInput')" />
      <el-form-item v-if="config.options.hasOwnProperty('showInput')" label="是否显示计数器">
        <el-switch
          v-model="config.options.showInput"
          active-text="显示"
          inactive-text="不显示"
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('switchValue')" />
      <el-form-item v-if="config.options.hasOwnProperty('switchValue')" label="默认值">
        <el-switch
          v-model="config.options.switchValue"
          :active-text="config.options.activeText"
          :inactive-text="config.options.inactiveText"
          :disabled="config.options.disabled"
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('inactiveText')" />
      <el-form-item v-if="config.options.hasOwnProperty('inactiveText')" label="左侧提示文字">
        <el-input v-model="config.options.inactiveText" />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('activeText')" />
      <el-form-item v-if="config.options.hasOwnProperty('activeText')" label="右侧提示文字">
        <el-input v-model="config.options.activeText" />
      </el-form-item>
      <TimeOrDate v-if="config.options.hasOwnProperty('isChooseTimes')" v-model="config" />
      <el-divider v-if="config.options.hasOwnProperty('min')" />
      <el-form-item v-if="config.options.hasOwnProperty('min')" label="最小值">
        <el-input-number v-model="config.options.min" />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('max')" />
      <el-form-item v-if="config.options.hasOwnProperty('max')" label="最大值">
        <el-input-number v-model="config.options.max" />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('numberDefaultValue')" />
      <el-form-item v-if="config.options.hasOwnProperty('numberDefaultValue')" label="默认值">
        <el-input-number
          v-model="config.options.numberDefaultValue"
          :min="config.options.min"
          :max="config.options.max"
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('precision')" />
      <el-form-item v-if="config.options.hasOwnProperty('precision')" label="精度(小数位数)">
        <el-input-number v-model="config.options.precision" :min="0" />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('step')" />
      <el-form-item v-if="config.options.hasOwnProperty('step')" label="步数">
        <el-input-number v-model="config.options.step" />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('placeholder')&&!config.options.hasOwnProperty('isChooseTimes')" />
      <el-form-item v-if="config.options.hasOwnProperty('placeholder')&&!config.options.hasOwnProperty('isChooseTimes')" label="提示信息">
        <el-input v-model="config.options.placeholder" />
      </el-form-item>
      <el-divider v-if="showCheckbox" />
      <el-form-item v-if="showCheckbox" label="操作">
        <el-checkbox v-if="config.options.hasOwnProperty('disabled')" v-model="config.options.disabled">禁用</el-checkbox>
        <el-checkbox v-if="config.options.hasOwnProperty('hidden')" v-model="config.options.hidden">隐藏</el-checkbox>
        <el-checkbox v-if="config.options.hasOwnProperty('clearable')" v-model="config.options.clearable">可清除</el-checkbox>
        <el-checkbox v-if="config.options.hasOwnProperty('multiple')" v-model="config.options.multiple">可多选</el-checkbox>
      </el-form-item>
      <el-divider v-if="config.hasOwnProperty('rules')" />
      <el-form-item v-if="config.hasOwnProperty('rules')" label="校验规则(子表中校验规则不生效)">
        <div v-for="(item,index) in config.rules" :key="index" style="margin-top: 6px">
          <el-row v-if="index === 0">
            <el-col :span="24">
              <el-checkbox v-if="config.hasOwnProperty('rules')" v-model="config.rules[0].required">必填项</el-checkbox>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="18">
              <el-input
                v-model="item.pattern"
                placeholder="请输入正则"
              />
            </el-col>
            <el-col :span="18">
              <el-input
                v-model="item.message"
                placeholder="请输入提示内容"
              />
            </el-col>
            <el-col :span="6">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteRule(config.rules,index)" />
            </el-col>
          </el-row>
        </div>
        <div>
          <a href="#" @click="handleAddRules(config.rules)">增加验证规则</a>
        </div>
      </el-form-item>

    </el-form>
    <div>
      <el-dialog
        v-if="showDictDialog.visible"
        :width="showDictDialog.width"
        :title="showDictDialog.title"
        :visible.sync="showDictDialog.visible"
        append-to-body
        :before-close="handleClose"
        custom-class="drawer"
      >
        <div class="custom_drawer__content">
          <selectDict v-if="showDictDialog.visible" ref="dictItem" @save="saveDict" @close="closeDict" />
        </div>

      </el-dialog></div>
  </div>
</template>

<script>
import OptionAdd from '../components/optionAdd'
import TimeOrDate from '../components/timeOrDateConfig'
import UploadFileOrImg from '../components/uploadFileOrImg'
import selectDict from '@/components/common/selectDict.vue'
export default {
  name: 'FormControlConfig',
  components: { OptionAdd, TimeOrDate, UploadFileOrImg, selectDict },
  props: {
    config: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      radio: '1',
      showDictDialog: {
        title: '字典列表',
        visible: false,
        width: '60%',
        name: '字典列表', // 组件名,
        loading: false,
        data: ''
      }
    }
  },
  computed: {
    showCheckbox() {
      const options = this.config.options
      return options.hasOwnProperty('clearable') || options.hasOwnProperty('hidden') || options.hasOwnProperty('disabled')
    },
    selectDefaultValue: {
      get() {
        return this.config.options.multiple ? this.config.options.multipleDefaultValue : this.config.options.defaultValue
      },
      set(val) {
        this.config.options.multiple ? this.config.options.multipleDefaultValue = val : this.config.options.defaultValue = val
      }
    }
  },
  methods: {
    addItem(columns) {
      columns.push({
        span: 12,
        list: []
      })
    },
    addModel() {
      // this.$emit('addModel')
    },
    handleShrink() {
      this.$emit('shrink')
    },
    handleAddRules(array) {
      array.push({
        pattern: '',
        message: ''
      })
    },
    deleteRule(array, i) {
      array.splice(i, 1)
    },
    deleteItem(columns, i) {
      columns.splice(i, 1)
    },
    deleteTabsItem(columns, i) {
      columns.splice(i, 1)
    },
    addTabsItem(columns) {
      columns.push({
        value: `${columns.length + 1}`,
        label: '选项' + (columns.length + 1),
        list: []
      })
    },
    deleteColorItem(columns, i) {
      columns.splice(i, 1)
    },
    addColorItem(columns) {
      columns.push({
        percentage: `${columns.length + 1}`,
        color: '#e6a23c'
      })
    },
    saveDict(dictKey) {
      this.config.options.dynamicKey = dictKey
      this.$nextTick(() => {
        this.showDictDialog.visible = false
      })
    },
    closeDict() {
      this.$nextTick(() => {
        this.showDictDialog.visible = false
      })
    },
    showDict() {
      this.$nextTick(() => {
        this.showDictDialog.visible = true
      })
    },
    handleClose(done) {
      this.$confirm(this.$t('action.confirmClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
