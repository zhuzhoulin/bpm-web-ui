<template>
  <div style="width: 100%; height: 100%">
    <div class="in-coder-panel">
      <el-form>
        <el-form-item label="语言模式">
          <el-select
            v-model="cmOptions.mode"
            class="code-mode-select"
            @change="changeMode"
          >
            <el-option
              v-for="mode in modes"
              :key="mode.value"
              :label="mode.label"
              :value="mode.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider />
      <codemirror
        id="codemirror"
        ref="codemirror"
        :value="codemirrorValue"
        :v-model="codemirrorValue"
        :options="cmOptions"
        class="code"
        @changes="codemirrorChange"
      />
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/idea.css' // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/r/r.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/vue/vue.js'

import 'codemirror/keymap/sublime' // sublime编辑器效果
// 下面这几个引入的主要是验证提示类的,配置里的lint需要设置true,gutters: ['CodeMirror-lint-markers']
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/display/autorefresh' // 及时自动更新，配置里面也需要设置autoRefresh为true
import 'codemirror/addon/scroll/annotatescrollbar.js'
// 代码补全提示
import 'codemirror/addon/hint/anyword-hint.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/addon/hint/xml-hint.js'
// 搜索
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'

export default {
  name: 'InCoder',
  components: { codemirror },
  props: {
    // 外部传入的内容，用于实现双向绑定
    value: String,
    // 外部传入的语法类型
    language: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      codemirrorValue: '',
      cmOptions: {
        value: '',
        mode: 'application/xml',
        readOnly: false,
        styleActiveLine: true, // 当前行背景高亮
        lineNumbers: true, // 显示行数
        line: true,
        tabSize: 4, // tab字符的宽度，默认为4,
        autoRefresh: true,
        // // 快捷键 可提供三种模式 sublime、emacs、vim
        keyMap: 'sublime',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'idea', // 主题
        extraKeys: { Ctrl: 'autocomplete' } // 可以用于为编辑器指定额外的键绑定，以及keyMap定义的键绑定
      },

      // 支持切换的语法高亮类型，对应 JS 已经提前引入
      // 使用的是 MIME-TYPE ，不过作为前缀的 text/ 在后面指定时写死了
      modes: [
        {
          value: 'css',
          label: 'CSS'
        },
        {
          value: 'javascript',
          label: 'Javascript'
        },
        {
          value: 'application/xml',
          label: 'xml'
        },
        {
          value: 'html',
          label: 'XML/HTML'
        },
        {
          value: 'x-java',
          label: 'Java'
        },
        {
          value: 'x-objectivec',
          label: 'Objective-C'
        },
        {
          value: 'x-python',
          label: 'Python'
        },
        {
          value: 'x-rsrc',
          label: 'R'
        },
        {
          value: 'x-sh',
          label: 'Shell'
        },
        {
          value: 'x-sql',
          label: 'SQL'
        },
        {
          value: 'x-swift',
          label: 'Swift'
        },
        {
          value: 'x-vue',
          label: 'Vue'
        },
        {
          value: 'markdown',
          label: 'Markdown'
        }
      ]
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.codemirrorValue = newValue
      },
      deep: true
    }
  },
  mounted() {
    this.codemirrorValue = this.value
  },
  created() {},
  methods: {
    back() {
      this.$router.go(-1)
    },
    codemirrorChange() {
      // 解决  codemirror点击一下才显示的BUG
      setTimeout(() => {
        this.$refs.codemirror.refresh()
      }, 10)
    },
    // 获取当前语法类型
    _getLanguage(language) {
      // 在支持的语法类型列表中寻找传入的语法类型
      return this.modes.find((mode) => {
        // 所有的值都忽略大小写，方便比较
        const currentLanguage = language.toLowerCase()
        const currentLabel = mode.label.toLowerCase()
        const currentValue = mode.value.toLowerCase()

        // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
        return (
          currentLabel === currentLanguage || currentValue === currentLanguage
        )
      })
    },
    // 更改模式
    changeMode(val) {
      // 修改编辑器的语法配置
      this.cmOptions.mode = `text/${val}`

      // 获取修改后的语法
      const label = this._getLanguage(val).label.toLowerCase()

      // 允许父容器通过以下函数监听当前的语法值
      this.$emit('language-change', label)
    }
  }
}
</script>

<style lang="scss">
.CodeMirror {
  font-size: 15px;
  line-height: 150%;
  min-height: 700px;
  font-family: monospace;
  text-align: left;
}

.CodeMirror-scroll {
  overflow: scroll !important;
  margin-bottom: 0;
  margin-right: 0;
  padding-bottom: 0;
  height: 100%;
  outline: none;
  position: relative;
  border: 1px solid #dddddd;
}
</style>
