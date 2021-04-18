import CustomContextPad from './CustomContextPad'
import CustomPalette from './CustomPalette'

export default {
  __init__: ['contextPadProvider', 'customPalette'],
  contextPadProvider: ['type', CustomContextPad],
  customPalette: ['type', CustomPalette]
}
