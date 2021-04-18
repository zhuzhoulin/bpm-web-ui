<template>
  <el-form
    label-width="auto"
    :model="layoutData"
    class="left-form"
    size="mini"
  >
    <el-form-item label="label位置">
      <el-radio-group v-model="layoutData.labelPosition" size="small">
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
        <el-radio-button label="top">top</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-divider />
    <el-form-item label="label自适应宽度">
      <el-switch v-model="layoutData.autoLabelWidth" active-text="是" inactive-text="否" />
    </el-form-item>

    <el-divider v-if="(layoutData.labelPosition==='right'|| layoutData.labelPosition==='left') && !layoutData.autoLabelWidth" />
    <el-form-item v-if="(layoutData.labelPosition==='right'|| layoutData.labelPosition==='left') && !layoutData.autoLabelWidth" label="label宽度(%)">
      <el-slider
        v-model="layoutData.labelWidth"
        :max="80"
        :min="0"
      />
    </el-form-item>

    <el-divider />
    <el-form-item label="label 最小宽度(px)">
      <el-input v-model="layoutData.minWidth" />
    </el-form-item>
    <el-divider />
    <el-form-item label="模态框宽度">
      <el-input v-model="layoutData.customWidth" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'LeftAside',
  props: {
    layoutData: {
      type: Object,
      required: true
    }
  }
}
</script>
