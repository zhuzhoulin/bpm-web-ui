<template>
  <div>
    <el-divider />
    <el-form-item label="时间模式">
      <el-radio-group v-model="value.options.isChooseTimes">
        <el-radio-button label="1">时间点选择</el-radio-button>
        <el-radio-button label="2">区间段选择</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="value.options.isChooseTimes==='2'" label="默认值">
      <el-date-picker
        v-if="value.type === 'date'"
        v-model="value.options.rangeDefaultValue"
        style="width: 280px"
        :type="'daterange'"
        :range-separator="value.options.rangeSeparator"
        :start-placeholder="value.options.startPlaceholder"
        :end-placeholder="value.options.endPlaceholder"
      />
      <el-date-picker
        v-if="value.type === 'datetime'"
        v-model="value.options.rangeDefaultValue"
        style="width: 280px"
        :type="'datetimerange'"
        :range-separator="value.options.rangeSeparator"
        :start-placeholder="value.options.startPlaceholder"
        :end-placeholder="value.options.endPlaceholder"
      />
      <el-time-picker
        v-if="value.type === 'time'"
        v-model="value.options.defaultValue"
        style="width: 280px"
        :is-range="value.options.isChooseTimes==='2'"
        :range-separator="value.options.rangeSeparator"
        :start-placeholder="value.options.startPlaceholder"
        :end-placeholder="value.options.endPlaceholder"
        :placeholder="value.options.isChooseTimes==='2'?'':value.options.placeholder"
        :disabled="value.options.disabled"
      />
      <el-form-item label="选择器中间文字">
        <el-input
          v-model="value.options.rangeSeparator"
          placeholder="选择器中间文字"
          maxlength="1"
        />
      </el-form-item>
      <el-form-item label="选择器结尾文字">
        <el-input
          v-model="value.options.endPlaceholder"
          placeholder="选择器结尾文字"
          maxlength="4"
        />
      </el-form-item>
      <el-form-item label="选择器开始文字">
        <el-input
          v-model="value.options.startPlaceholder"
          placeholder="选择器开始文字"
          maxlength="4"
        />
      </el-form-item>
    </el-form-item>
    <el-form-item v-if="value.options.isChooseTimes==='1'" label="默认值">
      <el-date-picker
        v-if="value.type === 'date'"
        v-model="value.options.defaultValue"
        type="date"
        :placeholder="value.options.placeholder"
        :format="value.options.format"
        :value-format="value.options.valueFormat"
      />
      <el-date-picker
        v-if="value.type === 'datetime'"
        v-model="value.options.defaultValue"
        type="datetime"
        :placeholder="value.options.placeholder"
        :format="value.options.format"
        :value-format="value.options.valueFormat"
      />
      <el-time-picker
        v-if="value.type === 'time'"
        v-model="value.options.defaultValue"
        :is-range="value.options.isChooseTimes==='2'"
        :range-separator="value.options.rangeSeparator"
        :start-placeholder="value.options.startPlaceholder"
        :end-placeholder="value.options.endPlaceholder"
        :placeholder="value.options.isChooseTimes==='2'?'':value.options.placeholder"
        :disabled="value.options.disabled"
      />
      <el-form-item label="提示文字">
        <el-input
          v-model="value.options.placeholder"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="展示格式">
        <el-input
          v-model="value.options.format"
          placeholder="请输入"
        />
      </el-form-item>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'TimeOrDateConfig',
  props: {
    value: {
      type: Object,
      required: true
    }
  }

}
</script>
