/**
 * A rule that checks that sequence flows outgoing from a
 * conditional forking gateway or activity are
 * either default flows _or_ have a condition attached
 */
export default function() {
  function check(node, reporter) {
    if (!isConditionalForking(node)) {
      return
    }

    const outgoing = node.outgoing || []
    outgoing.forEach((flow) => {
      const missingCondition = (
        !hasCondition(flow) &&
        !isDefaultFlow(node, flow)
      )
      if (missingCondition) {
        reporter.report(flow.id, '连线缺少条件！')
      }
    })
  }

  return {
    check
  }
}

// helpers /////////////////////////////

function isConditionalForking(node) {
  const defaultFlow = node['default']
  const outgoing = node.outgoing || []
  return defaultFlow || outgoing.find(hasCondition)
}

function hasCondition(flow) {
  return !!flow.conditionExpression
}

function isDefaultFlow(node, flow) {
  return node['default'] === flow
}
