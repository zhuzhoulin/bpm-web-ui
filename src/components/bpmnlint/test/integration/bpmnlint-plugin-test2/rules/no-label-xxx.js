/**
 * Rule that reports xxx labels.
 */
export default function() {

  function check(node, reporter) {
    if (/^xxx/.test(node.name || '')) {
      reporter.report(node.id, 'Element has non-sense label <' + node.name + '>');
    }
  }

  return {
    check: check
  };
}