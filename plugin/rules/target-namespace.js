import { is } from 'bpmnlint-utils'/** * Rule that reports missing targetNamespace on bpmn:Definitions. */
export default function() {
  function check(node, reporter) {
    if (is(node, 'bpmn:Definitions') && !node.targetNamespace) {
      reporter.report(node.id, 'Element is missing targetNamespace')
    }
  }

  return {
    check: check
  }
}
