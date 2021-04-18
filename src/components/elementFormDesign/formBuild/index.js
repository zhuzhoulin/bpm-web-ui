import FormBuild from './build'
FormBuild.install = function(Vue) {
  // if (install.installed) return
  // install.installed = true
  Vue.component(FormBuild.name, FormBuild)
}
export default FormBuild
