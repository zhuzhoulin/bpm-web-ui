import { isAny } from 'bpmnlint-utils'/** * A rule that verifies that there exists no disconnected * flow elements, i.e. elements without incoming * _or_ outgoing sequence flows */
export default function() {
  function check(node, reporter) {
    if (!isAny(node, [
      'bpmn:Task',
      'bpmn:Gateway',
      'bpmn:SubProcess',
      'bpmn:Event'
    ]) || node.triggeredByEvent) {
      return
    }

    // const incoming = node.incoming || []
    // const outgoing = node.outgoing || []
    // if (!incoming.length && !outgoing.length) {
    //   reporter.report(node.id, '元素没有连线或者出线！')
    // }
  }

  return {
    check
  }
}
