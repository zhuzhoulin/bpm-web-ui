import bpmnHelper from './BpmnHelper'
import elementHelper from './ElementHelper'

export default {

  createOrUpdateCustomProperties(element, bpmnModeler, property, value) {
    if (!element || !bpmnModeler) return

    const bpmnFactory = bpmnModeler.get('bpmnFactory')
    let extensionElements = bpmnHelper.getPropertie(element, 'extensionElements')
    if (!extensionElements) {
      extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, element, bpmnFactory)
    }
    const length = extensionElements.get('values').length
    let customProperties
    let customPropertiesIndex = -1
    for (let i = 0; i < length; i++) {
      if (extensionElements.get('values')[i] && extensionElements.get('values')[i].$type === 'flowable:CustomProperties') {
        customProperties = extensionElements.get('values')[i]
        customPropertiesIndex = i
      }
    }
    if (!customProperties) {
      customProperties = elementHelper.createElement('flowable:CustomProperties', null, element, bpmnFactory)
    }

    const data = {}
    data[property] = value
    customProperties[property] = value
    if (customPropertiesIndex > -1) {
      extensionElements.get('values')[customPropertiesIndex] = customProperties
    } else {
      extensionElements.get('values').push(customProperties)
    }
    const modeling = bpmnModeler.get('modeling')
    modeling.updateProperties(element, {
      extensionElements: extensionElements
    })
  },
  getPropertieByName(customProperties, name) {
    return customProperties.get(name) || customProperties.$attrs[name]
  }
}
