/* eslint-disable consistent-return */
/**
 * BPMN 2.0 specific key bindings.
 *
 * @param {Keyboard} keyboard
 * @param {EditorActions} editorActions
 */
export default function BpmnKeyBindings(keyboard, editorActions) {
  keyboard.addListener((key) => {
    // eslint-disable-next-line lines-around-comment
    // ctrl x
    console.log('BpmnKeyBindings [' + key + ']')
    if (key === 88) {
      editorActions.trigger('copy')
      editorActions.trigger('removeSelection')
      return true
    }
    return true
  })
}

BpmnKeyBindings.$inject = [
  'keyboard',
  'editorActions'
]
