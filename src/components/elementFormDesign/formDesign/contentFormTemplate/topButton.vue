<template>
  <div class="content-top-button">
    <el-tooltip class="item" effect="dark" content="保存" placement="top-start">
      <el-button type="text" icon="el-icon-document-checked" size="mini" @click="save">保存</el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="预览" placement="top-start">
      <el-button type="text" icon="el-icon-view" size="mini" @click="viewFrom">预览</el-button>
    </el-tooltip>
    <el-dialog v-if="formViewVisible" title="预览" :visible.sync="formViewVisible" :top="'10vh'" append-to-body>
      <TFormBuild
        :options="data"
        :dynamic-data="dynamicData"
      />
    </el-dialog>
    <!--    导入Json-->
    <el-tooltip class="item" effect="dark" content="导入" placement="top-start">
      <el-button type="text" icon="el-icon-upload2" size="mini" @click="handleImportJson">导入</el-button>
    </el-tooltip>
    <el-dialog v-if="importJsonView" title="导入Json(请注意数据格式)" :visible.sync="importJsonView" :top="'10vh'" append-to-body>
      <ImportJson
        :import-json="importJson"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="importJsonView = false">取 消</el-button>
        <el-button type="primary" @click="handleEmitImportJson">确 定</el-button>
      </span>
    </el-dialog>
    <!--    导入Json结束-->
    <el-tooltip class="item" effect="dark" content="生成Json" placement="top-start">
      <el-button type="text" icon="el-icon-tickets" size="mini" @click="jsonView">生成Json</el-button>
    </el-tooltip>
    <el-dialog v-if="jsonViewVisible" title="Json数据如下所示" :visible.sync="jsonViewVisible" :top="'10vh'" append-to-body>
      <CodemirrorVue
        :json="JSON.stringify(data, null, '\t')"
      />
    </el-dialog>
    <el-tooltip class="item" effect="dark" content="清空" placement="top-start">
      <el-button type="text" icon="el-icon-delete" size="mini" @click="deleteAll">清空</el-button>
    </el-tooltip>
  </div>
</template>

<script>
import ImportJson from './importJson'
import CodemirrorVue from '../components/codemirrorVue'
import TFormBuild from '../components/tFormBuild'
export default {
  name: 'TopButton',
  components: { CodemirrorVue, TFormBuild, ImportJson },
  props: {
    data: {
      type: Object,
      required: true
    },
    dynamicData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      jsonViewVisible: false,
      formViewVisible: false,
      importJsonView: false,
      importJson: {
        // 用对象实现一个父子组件的通信策略
        json: `{
                      "config": {
                      "labelPosition": "left",
                      "labelWidth": 15,
                       "autoLabelWidth": false,
                      "customWidth": ""
                      },
                      "list": []
                      }`
      }
    }
  },
  methods: {
    save() {
      this.$emit('save')
    },
    deleteAll() {
      this.data.list = []
    },
    viewFrom() {
      this.formViewVisible = true
    },
    jsonView() {
      this.jsonViewVisible = true
    },
    handleImportJson() {
      this.importJsonView = true
    },
    handleEmitImportJson() {
      this.$emit('importJson', this.importJson.json)
      this.importJsonView = false
    }
  }
}
</script>

<style scoped>

</style>
