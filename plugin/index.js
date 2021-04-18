module.exports = {
  configs: {
    recommended: {
      rules: {
        'easy-bpm/target-namespace': 'error',
        'easy-bpm/no-manual-task': 'warn'
      }
    },
    all: {
      rules: {
        'easy-bpm/target-namespace': 'error',
        'easy-bpm/no-manual-task': 'warn',
        'easy-bpm/conditional-flows': 'error',
        'easy-bpm/end-event-required': 'error',
        'easy-bpm/event-sub-process-typed-start-event': 'error',
        'easy-bpm/fake-join': 'error',
        'easy-bpm/label-required': 'error',
        'easy-bpm/no-complex-gateway': 'error',
        'easy-bpm/no-disconnected': 'error',
        'easy-bpm/no-node-users': 'error',
        'easy-bpm/start-usertask-required': 'error',

        // "easy-bpm/easy-bpm/no-duplicate-sequence-flows": "error",
        'easy-bpm/no-gateway-join-fork': 'error',
        'easy-bpm/no-implicit-split': 'error',
        'easy-bpm/no-inclusive-gateway': 'error',
        'easy-bpm/single-blank-start-event': 'error',
        'easy-bpm/single-event-definition': 'error',
        'easy-bpm/start-event-required': 'error',
        'easy-bpm/sub-process-blank-start-event': 'error'

      }
    }
  }
}
