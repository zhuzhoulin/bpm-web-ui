<template>
  <div class="app-container">
    <el-tabs
      v-loading="listLoading"
      type="border-card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item,index) in list"
        :key="item.label"
        :label="item.label"
        :name="index + ''"
        stretch
      >
        <GeneratorCodemirror
          :id="'codemirror'+index"
          :ref="'codemirror'+index"
          :value.sync="item.value"
          :language.sync="language"
        />

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { initAndExecute } from '@/api/generator/codeTable'
import waves from '@/directive/waves'
import GeneratorCodemirror from '@/components/GeneratorCodemirror'

export default {
  name: 'PreView',
  directives: { waves },
  components: { GeneratorCodemirror },
  props: {
    selectDbId: {
      type: Number,
      default: null
    },
    selectTempleateId: {
      type: Number,
      default: null
    },
    selectIncludeTables: {
      type: String,
      default: null
    },
    selectTemplateList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      language: 'java',
      list: [],
      activeName: 1 + '',
      listLoading: true,
      total: 0,
      listQuery: {
        dbId: '',
        templeateId: '',
        includeTables: '',
        preView: true,
        selectTemplateList: [],
        pageIndex: 1,
        pageSize: 100000
      }
    }
  },
  created() {

  },
  mounted() {
    const _that = this
    _that.listQuery.dbId = _that.selectDbId
    _that.listQuery.templeateId = _that.selectTempleateId
    _that.listQuery.includeTables = _that.selectIncludeTables
    _that.listQuery.selectTemplateList = _that.selectTemplateList
    _that.getPreViewList()
  },
  methods: {
    getPreViewList() {
      initAndExecute(this.listQuery)
        .then((response) => {
          this.list = response.data
          this.listLoading = false
        })
        .catch((err) => {
          this.listLoading = false
          console.log(err)
        })
    },
    handleClick(tab, event) {
      this.$refs[`codemirror${tab.index}`][0].codemirrorChange()

      if (tab.label.endsWith('java')) {
        this.$refs[`codemirror${tab.index}`][0].changeMode('x-java')
      } else if (tab.label.endsWith('js')) {
        this.$refs[`codemirror${tab.index}`][0].changeMode('javascript')
      } else if (tab.label.endsWith('vue')) {
        this.$refs[`codemirror${tab.index}`][0].changeMode('x-vue')
      } else if (tab.label.endsWith('xml')) {
        this.$refs[`codemirror${tab.index}`][0].changeMode('xml')
      } else {
        this.$refs[`codemirror${tab.index}`][0].changeMode('x-sql')
      }
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">
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
