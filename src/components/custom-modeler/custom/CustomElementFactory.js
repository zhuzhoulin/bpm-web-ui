/* eslint-disable no-return-assign */
/* eslint-disable padded-blocks */
import {
  assign
} from 'min-dash'

import inherits from 'inherits'

import BpmnElementFactory from '../../bpmn-js/lib/features/modeling/ElementFactory'
import {
  DEFAULT_LABEL_SIZE
} from '../../bpmn-js/lib/util/LabelUtil'

var Ids = require('ids')['default']/** * A custom factory that knows how to create BPMN _and_ custom elements. */
export default function CustomElementFactory(bpmnFactory, moddle, translate) {
  BpmnElementFactory.call(this, bpmnFactory, moddle, translate)

  var self = this /**   * Create a diagram-js element with the given type (any of shape, connection, label).   *   * @param  {String} elementType   * @param  {Object} attrs   *   * @return {djs.model.Base}   */
  this.create = function(elementType, attrs) {
    // console.log('attrs：' + attrs)
    var type = attrs.type
    if (elementType === 'label') {
      return self.baseCreate(elementType, assign({ type: 'label' }, DEFAULT_LABEL_SIZE, attrs))
    }

    // add type to businessObject if custom
    if (/^custom:/.test(type)) {
      if (!attrs.businessObject) {
        attrs.businessObject = {
          type: type
        }

        if (attrs.id) {
          assign(attrs.businessObject, {
            id: attrs.id
          })
        } else {
          assign(attrs.businessObject, {
            id: nextId(attrs.type.replace('custom:', '') + '_')
          })
        }
      }

      // add width and height if shape
      if (!/:connection$/.test(type)) {
        assign(attrs, self._getCustomElementSize(type))
      }
    }

    if (elementType === 'shape') {
      if (!attrs.businessObject) {
        attrs.businessObject = this._bpmnFactory.create(attrs.type)

        if (attrs.id) {
          assign(attrs.businessObject, {
            id: attrs.id
          })
        } else {
          assign(attrs.businessObject, {
            name: translate(attrs.type.replace('bpmn:', '')) + '_' + countType(self._bpmnFactory._model.ids._seed.hats, attrs.type.replace('bpmn:', ''))
          // , id: camelCase(nextId(attrs.type.replace('bpmn:', '') + '_'))
          })
        }
      }

      if (!('$model' in attrs.businessObject)) {
        Object.defineProperty(attrs.businessObject, '$model', {
          value: moddle
        })
      }

      if (!('$instanceOf' in attrs.businessObject)) {

        // ensures we can use ModelUtil#is for type checks
        Object.defineProperty(attrs.businessObject, '$instanceOf', {
          value: function(type) {
            return this.type === type
          }
        })
      }

      if (!('get' in attrs.businessObject)) {
        Object.defineProperty(attrs.businessObject, 'get', {
          value: function(key) {
            return this[key]
          }
        })
      }

      if (!('set' in attrs.businessObject)) {
        Object.defineProperty(attrs.businessObject, 'set', {
          value: function(key, value) {
            return this[key] = value
          }
        })
      }
    }

    return self.createBpmnElement(elementType, attrs)
  }
}

/** 计算当前类型数量 */
function countType(obj, type) {
  var count = 0
  for (var p in obj) {
    // 方法
    if (typeof (obj[p]) === 'function') {
      obj[p]()
    } else {
      // p 为属性名称，obj[p]为对应属性的值
      if (p.startsWith(type)) {
        count += 1
      }
    }
  }
  return count
}

function nextId(prefix) {
  var ids = new Ids([32, 32, 1])
  return ids.nextPrefixed(prefix)
}

// function camelCase(str) {
//   console.log('befor:' + str)
//   var strArr = str.split('-')
//   for (var i = 1; i < strArr.length; i++) {
//     strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
//   }

//   var reg = /([A-Z])/g
//   var str1 = strArr.join('').replace(reg, function(a, b) {
//     return '_' + b.toLowerCase()
//   })
//   console.log('after:' + str1)
//   return strArr.join(str1)
// }

inherits(CustomElementFactory, BpmnElementFactory)

CustomElementFactory.$inject = [
  'bpmnFactory',
  'moddle',
  'translate'
]

/**
 * Returns the default size of custom shapes.
 *
 * The following example shows an interface on how
 * to setup the custom shapes's dimensions.
 *
 * @example
 *
 * var shapes = {
 *   triangle: { width: 40, height: 40 },
 *   rectangle: { width: 100, height: 20 }
 * };
 *
 * return shapes[type];
 *
 *
 * @param {String} type
 *
 * @return {Dimensions} a {width, height} object representing the size of the element
 */
CustomElementFactory.prototype._getCustomElementSize = function(type) {
  var shapes = {
    __default: { width: 100, height: 80 },
    'custom:triangle': { width: 40, height: 40 },
    'custom:circle': { width: 140, height: 140 }
  }
  return shapes[type] || shapes.__default
}
