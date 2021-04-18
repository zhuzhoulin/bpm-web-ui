const {
  is,
  isAny
} = require('bpmnlint-utils')/** * A rule that checks for the presence of a start event per scope. */
const find = require('lodash/find')

module.exports = function() {
  function hasStartUserTask(node) {
    const flowElements = node.flowElements || []
    var hasStartUserTask = false
    flowElements.some(node => {
      if (is(node, 'bpmn:UserTask')) {
        var extensionElements = node.extensionElements
        if (extensionElements) {
          var properties = find(extensionElements.get('values'), function(e) {
            return is(e, 'flowable:CustomProperties')
          })

          if (findValue(properties, 'taskType') === 'start' &&
          findValue(properties, 'findUserType') === '5') {
            hasStartUserTask = true
            return hasStartUserTask
          }
        }
      }
    })

    return hasStartUserTask
  }

  function findValue(properties, name) {
    if (!properties) {
      return
    }
    return properties.$attrs[name] || properties.get(name)
  }

  // function findValue(properties, name) {
  //   if (!properties) {
  //     return
  //   }
  //   const values = !properties.values ? [] : properties.values
  //   for (var index in values) {
  //     if (name === values[index].name) {
  //       return values[index].value
  //     }
  //   }
  // }

  function check(node, reporter) {
    if (!isAny(node, [
      'bpmn:Process'
    ])) {
      return
    }

    if (!hasStartUserTask(node)) {
      const type = 'Process'
      reporter.report(node.id, type + ' 缺少节点属性-审批动作为发起,并且节点人员为申请人的节点')
    }
  }

  return { check }
}
