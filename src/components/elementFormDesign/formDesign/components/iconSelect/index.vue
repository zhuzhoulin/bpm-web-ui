<template>
  <div class="icon-body">
    <el-popover
      placement="bottom-start"
      :width="item.options.popoverWidth"
      popper-class="popoverClass"
      trigger="click"
    >
      <el-input v-model="name" style="position: relative;" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
        <i slot="suffix" class="el-icon-search el-input__icon" />
      </el-input>
      <div class="icon-list">
        <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
          <svg-icon :icon-class="item" style="height: 30px;width: 16px;" />
          <span>{{ item }}</span>
        </div>
      </div>
      <el-input
        slot="reference"
        v-model="item.options.defaultValue"
        :style="'width:'+item.options.width+'%'"
        :value="item.options.defaultValue"
        :placeholder="item.options.placeholder"
        readonly
      >
        <svg-icon
          v-if="item.options.defaultValue"
          slot="prefix"
          :icon-class="item.options.defaultValue"
          class="el-input__icon"
          style="height: 32px;width: 16px;"
        />
        <i v-else slot="prefix" class="el-icon-search el-input__icon" />
      </el-input>
    </el-popover>
  </div>
</template>

<script>

import icons from './requireIcons'
export default {
  name: 'IconSelect',
  props: {
    value: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      name: '',
      iconList: icons
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.name = newValue
      },
      deep: true
    },
    item: {
      handler(newValue, oldValue) {
      },
      deep: true
    }

  },
  methods: {
    filterIcons() {
      this.iconList = icons
      if (this.name) {
        this.iconList = this.iconList.filter(item => item.includes(this.name))
      }
    },
    selectedIcon(name) {
      this.$emit('input', name)
      document.body.click()
    },
    reset() {
      this.name = ''
      this.iconList = icons
    }
  }
}
</script>

<style lang="scss" >
   .popoverClass {
     .icon-list {
      height: 200px;
      overflow-y: scroll;
      div {
        height: 30px;
        line-height: 30px;
        margin-bottom: -5px;
        cursor: pointer;
        width: 33%;
        float: left;
      }
      span {
        display: inline-block;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
    }
</style>
<style lang="scss" scoped>
  .icon-body {
    width: 100%;
    padding: 10px;
  }
</style>
