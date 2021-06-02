// import '@babel/polyfill'

import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import i18n from './lang' // internationalization

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// import 'lib-flexible/flexible.js'

import '@/icons' // icon
import '@/permission' // permission control
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
/**
 * 注册表单设计器
 */
Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.debug = false

// 实现手写电子签名
import vueEsign from 'vue-esign'
Vue.use(vueEsign)

import FormDesign from './components/elementFormDesign'
import {
  setFormOptions
} from './components/elementFormDesign'
FormDesign.setDesignConfig({
  uploadImg: {
    // headers:""//给上传控件添加请求头信息
    // data:""//给上传文件添加一些携带参数
    // name:""//上传文件名
    // action:"www.baidu.com" // 默认的上传路径
  }
})
Vue.use(FormDesign)
Vue.prototype.setFormOptions = setFormOptions

// 自定义表格工具扩展
import RightToolbar from '@/components/RightToolbar'
Vue.component('RightToolbar', RightToolbar)

// 富文本
import QuillEditor from '@/components/QuillEditor'
Vue.component('QuillEditor', QuillEditor)

// 自定义全局校验方法
import {
  validateEmail,
  validatePhone,
  validateUrl,
  validateIp,
  validateTel,
  validateIdCard
} from '@/utils/formvalidate.js'
// 全局方法挂载
Vue.prototype.validateEmail = validateEmail
Vue.prototype.validatePhone = validatePhone
Vue.prototype.validateUrl = validateUrl
Vue.prototype.validateIp = validateIp
Vue.prototype.validateTel = validateTel
Vue.prototype.validateIdCard = validateIdCard

// 前端处理树逻辑
import { handleTree } from '@/utils/easybpm.js'
Vue.prototype.handleTree = handleTree

// treeSelect
import Treeselect from '@riophae/vue-treeselect'
Vue.component('treeselect', Treeselect)
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
