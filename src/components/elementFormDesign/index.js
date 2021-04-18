
// 处理兼容
import '@babel/polyfill'
// 导入element
import './components/index.js'
// 导入FormDesign样式
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/vue/vue'
import './styles/form-design.less'
import './styles/form-build.less'
import FormDesign from './formDesign'
import FormBuild from './formBuild'

import {
  baseList
  // ,layoutList
} from './formDesign/baseConfig'

const components = [FormDesign, FormBuild]

const install = function(Vue) {
  // 检查是否已经注册过FormDesign
  if (install.installed) return
  install.installed = true

  components.map(component => {
    Vue.component(component.name, component)
  })
}
// 当插件引入时,会自动注册组件,避免一些用户疏忽导致组件未注册
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

function setDesignConfig(config) {
  // 全局前置函数配置formDesign设计器
  if (Object.prototype.toString.call(config) !== '[object Object]') {
    // eslint-disable-next-line no-throw-literal
    throw '[formDesign warn] Function setDesignConfig argument is not object'
  }
  baseList.forEach((item) => {
    if (config[item.type]) {
      item.options = {
        ...item.options,
        ...config[item.type]
      }
    }
  })
}

function serBuildConfig(buildArray, config, model = undefined) {
  // 配置formBuild解析器,配置不同表单
  if (Object.prototype.toString.call(config) !== '[object Object]' && Object.prototype.toString.call(buildArray) !== '[object Array]') {
    const newLocal = '[formDesign warn] Function setBuildConfig arguments type error'
    throw newLocal
  }
  if (model) {
    // 如果传入model则只修改对应model字段的控件,否则所有类型的控件都会被修改
    buildArray.forEach((item) => {
      if (item.type === 'card') {
        serBuildConfig(item.list, config, model)
      } else if (item.type === 'grid' || item.type === 'tabs') {
        item.columns.forEach((column) => {
          serBuildConfig(column.list, config, model)
        })
      } else if (item.type === 'table') {
        item.trs.forEach((tr) => {
          tr.tds.forEach((td) => {
            serBuildConfig(td.list, config, model)
          })
        })
      } else if (item.type === 'childTable' || item.type === 'childTablePage') {
        serBuildConfig(item.list, config, model)
      } else {
        if (config[item.type] && item.model === model) {
          item.options = {
            ...item.options,
            ...config[item.type]
          }
        }
      }
    })
  } else {
    buildArray.forEach((item) => {
      if (item.type === 'card') {
        serBuildConfig(item.list, config, model)
      } else if (item.type === 'grid' || item.type === 'tabs') {
        item.columns.forEach((column) => {
          serBuildConfig(column.list, config, model)
        })
      } else if (item.type === 'tabs') {
        item.columns.forEach((column) => {
          serBuildConfig(column.list, config, model)
        })
      } else if (item.type === 'table') {
        item.trs.forEach((tr) => {
          tr.tds.forEach((td) => {
            serBuildConfig(td.list, config, model)
          })
        })
      } else if (item.type === 'childTable' || item.type === 'childTablePage') {
        serBuildConfig(item.list, config, model)
      } else {
        if (config[item.type]) {
          item.options = {
            ...item.options,
            ...config[item.type]
          }
        }
      }
    })
  }
}

// 批量设置某个option的值
function setFormOptions(options, fields, optionName, value) {
  fields = new Set(fields)

  // 递归遍历控件树
  const traverse = array => {
    array.forEach(element => {
      if (fields.has(element.model)) {
        element.options[optionName] = value
      }
      if (element.type === 'grid') {
        // 栅格布局
        element.columns.forEach(item => {
          traverse(item.list)
        })
      } else if (element.type === 'tabs') {
        // 栅格布局
        element.columns.forEach(item => {
          traverse(item.list)
        })
      } else if (element.type === 'card') {
        // 卡片布局
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
  traverse(options)
}

// 可以导入FormDesign提供的单个组件,如果在项目中只需要使用FormDesign的单个组件
export {
  FormDesign,
  FormBuild,
  setDesignConfig,
  serBuildConfig,
  setFormOptions
}

export default {
  install,
  setDesignConfig,
  serBuildConfig,
  setFormOptions
}

