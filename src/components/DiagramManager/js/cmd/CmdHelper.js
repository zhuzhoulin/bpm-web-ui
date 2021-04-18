export default {
  // 创建更新元素属性的命令
  createtUpdatePropertiesCmd(element, properties) {
    return {
      cmd: 'element.updateProperties',
      context: { element: element, properties: properties }
    }
  }
}
