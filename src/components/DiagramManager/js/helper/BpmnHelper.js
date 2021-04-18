/**
 *bpmnjs的工具类
 */

import ElementCompantMap from '../const/ElementCompantMap'
// import BpmnModdle from '../../../bpmn-moddle/lib/bpmn-moddle'
const getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject
export default {
  getBpmnTempate() {
    return '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://activiti.org/bpmn">' +
        '<bpmn2:process id="Process_1" isExecutable="true">' +
        '</bpmn2:process>' +
        '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
        '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '</bpmndi:BPMNPlane>' +
        '</bpmndi:BPMNDiagram>' +
        '</bpmn2:definitions>'
  },
  // 设置元素
  setElement(element, vm) {
    if (element === undefined || !(element instanceof vm.bpmnModeler.get('canvas').getRootElement()

    )) {
      element = vm.bpmnModeler.get('canvas').getRootElement()
    }
    vm.propsComponent = this.getComponentByEleType(element.type)
    vm.element = element
  },

  isImplicitRoot(element) {
    return element.id === '__implicitroot'
  },
  // 更新模型属性
  updateProperties(element, properties) {
    const bo = getBusinessObject(element)
    Object.keys(properties).forEach(key => {
      bo.set(key, properties[key])
    })
  },
  // 通过命令更新属性
  updatePropertiesByCmd(element, commandStack, properties) {
    commandStack.execute('element.updateProperties', { element: element, properties: properties })
  },
  // 获取元素的属性
  getProperties(element, propNames) {
    const bo = this.getBo(element)
    const properties = {}
    for (const propName of propNames) {
      properties[propName] = bo.get(propName)
    }
    return properties
  },
  // 获取单个元素属性
  getPropertie(element, propName) {
    if (!element) return
    const bo = this.getBo(element)
    try {
      return bo.get(propName)
    } catch (e) {
      return null
    }
  },

  // 获取元素的模型对象
  getBo(element) {
    if (!element) return
    return getBusinessObject(element)
  },
  // 通过元素类型获取相应的组件
  getComponentByEleType(type) {
    return ElementCompantMap[type]
  },
  // 创建一个元素
  createElement(vm, elementName, properties) {
    const bpmnFactory = vm.bpmn.bpmnFactory
    return bpmnFactory.create(elementName, properties)
  },

  updateDocumentation(bpmnModeler, element, text) {
    if (element === undefined) {
      element = bpmnModeler.get('canvas').getRootElement()
    }

    var comments = bpmnModeler._definitions.$model.create('bpmn:Documentation', {
      text: text
    })
    const data = {}
    data['documentation'] = [comments]
    bpmnModeler.get('modeling').updateProperties(element, data)
  }

}

