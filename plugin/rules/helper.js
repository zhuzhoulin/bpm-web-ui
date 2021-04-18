import { is } from 'bpmnlint-utils'/** * Create a checker that disallows the given element type. * * @param {String} type * * @return {Function} ruleImpl */
function disallowNodeType(type) {
  return function() {
    function check(node, reporter) {
      if (is(node, type)) {
        reporter.report(node.id, 'Element has disallowed type <' + type + '>')
      }
    }
    return {
      check
    }
  }
}

const _disallowNodeType = disallowNodeType
export { _disallowNodeType as disallowNodeType }
