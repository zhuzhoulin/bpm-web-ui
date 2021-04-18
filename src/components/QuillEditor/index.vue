<template>
  <quillEditor
    ref="quillEditor"
    v-model="content"
    class="ql-toolbar"
    :class="{
      'hide-toolbar': readOnly,
    }"
    :options="editorOption"
    @blur="handleBlur"
  />
</template>
<script>
/* eslint-disable indent */
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const titleConfig = {
  'ql-bold': '加粗',
  'ql-color': '颜色',
  'ql-font': '字体',
  'ql-code': '插入代码',
  'ql-italic': '斜体',
  'ql-link': '添加链接',
  'ql-background': '背景颜色',
  'ql-size': '字体大小',
  'ql-strike': '删除线',
  'ql-script': '上标/下标',
  'ql-underline': '下划线',
  'ql-blockquote': '引用',
  'ql-header': '标题',
  'ql-indent': '缩进',
  'ql-list': '列表',
  'ql-align': '文本对齐',
  'ql-direction': '文本方向',
  'ql-code-block': '代码块',
  'ql-formula': '公式',
  'ql-image': '图片',
  'ql-clean': '清除字体样式'
}
function addQuillTitle() {
  const oToolBar = document.querySelector('.ql-toolbar')
  const aButton = oToolBar.querySelectorAll('button')
  const aSelect = oToolBar.querySelectorAll('select')
  aButton.forEach((item) => {
    if (item.className === 'ql-script') {
      item.value === 'sub' ? (item.title = '下标') : (item.title = '上标')
    } else if (item.className === 'ql-indent') {
      item.value === '+1' ? (item.title = '向右缩进') : (item.title = '向左缩进')
    } else {
      item.title = titleConfig[item.classList[0]]
    }
  })
  aSelect.forEach((item) => {
    item.parentNode.title = titleConfig[item.classList[0]]
  })
  // 关闭单词检测提示
  document.querySelector('.ql-editor').setAttribute('spellcheck', false)
  return oToolBar
}

export default {
  name: 'QuillEditor',
  components: {
    quillEditor
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      defualt: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    editorOption() {
      const editorOption = {
        placeholder: this.placeholder
      }
      editorOption.modules = !this.readOnly
        ? {
            toolbar: [
              'bold',
              'underline',
              'strike',
              'blockquote',
              'code-block',
              'italic',
              { color: [] },
              { background: [] },
              { list: 'ordered' },
              { list: 'bullet' },
              { script: 'sub' },
              { script: 'super' },
              { indent: '-1' },
              { indent: '+1' },
              'link',
              'image',
              'clean'
            ]
          }
        : {
            toolbar: []
          }
      return editorOption
    },
    quill() {
      return this.$refs.quillEditor.quill
    }
  },
  watch: {
    value(v) {
      this.content = v
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [v])
      }
    },
    readOnly(v) {
      this.quill.enable(!v)
    }
  },
  mounted() {
    addQuillTitle()
    this.initQuillEvent()
    this.content = this.value
  },
  methods: {
    handleBlur() {
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value])
      }
    },
    // 广播事件
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }
      console.log(parent)
      if (parent) {
        parent.$emit(...[eventName].concat(params))
      }
    },
    initQuillEvent() {
      this.quill.enable(!this.readOnly)
      this.quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'api') {
          // console.log('An API call triggered this change.', delta);
        } else if (source === 'user') {
          // console.log('A user action triggered this change.', delta);
        }
        this.$emit('input', this.content)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ql-container {
//   height: calc(~'100% - 40px');
  height: 100%;
}
.hide-toolbar {
  .ql-toolbar {
    height: 0;
    padding: 0 !important;
    border-top-color: transparent !important;
    border: none !important;
  }

  .ql-container.ql-snow {
    border: none;
  }
  .ql-editor {
    background-color: #ffffff;
  }
}
</style>

