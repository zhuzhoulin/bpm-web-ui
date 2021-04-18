const {
  is
} = require('bpmnlint-utils')/** * Rule that reports manual tasks being used. */

const find = require('lodash/find')

module.exports = function() {
  function check(node, reporter) {
    if (is(node, 'bpmn:UserTask')) {
      var extensionElements = node.extensionElements

      if (extensionElements) {
        var properties = find(extensionElements.get('values'), function(e) {
          return is(e, 'flowable:CustomProperties')
        })
        if (!findValue(properties, 'findUserType')) {
          reporter.report(node.id, '员工节点未设置节点人员!')
        }
      }
    }
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

  return {
    check
  }
}

