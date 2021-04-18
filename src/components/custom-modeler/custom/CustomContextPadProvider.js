import inherits from 'inherits'

import ContextPadProvider from '../../bpmn-js/lib/features/context-pad/ContextPadProvider'

import { is } from '../../bpmn-js/lib/util/ModelUtil'

import { assign } from 'min-dash'

inherits(CustomContextPadProvider, ContextPadProvider)

CustomContextPadProvider.$inject = [
  'injector',
  'connect',
  'translate',
  'elementFactory'
]

export default function CustomContextPadProvider(injector, connect, translate) {
  injector.invoke(ContextPadProvider, this)

  // var cached = bind(this.getContextPadEntries, this)
  // var rules = this._rules
  var elementFactory = this._elementFactory
  var create = this._create
  var autoPlace = this._autoPlace
  var modeling = this._modeling
  var contextPad = this._contextPad
  var popupMenu = this._popupMenu
  var canvas = this._canvas

  this.getContextPadEntries = function(element) {
    var actions = {}
    var businessObject = element.businessObject

    function startConnect(event, element, autoActivate) {
      connect.start(event, element, autoActivate)
    }

    function appendAction(type, className, title, options) {
      if (typeof title !== 'string') {
        options = title
        title = translate('Append {type}', { type: type.replace(/^bpmn:/, '') })
      }

      function appendStart(event, element) {
        var shape = elementFactory.createShape(assign({ type: type }, options))
        create.start(event, shape, {
          source: element
        })
      }

      var append = autoPlace
        ? function(event, element) {
          var shape = elementFactory.createShape(
            assign({ type: type }, options)
          )

          autoPlace.append(element, shape)
        }
        : appendStart

      const shortType = type.replace(/^bpmn:/, '')
      return {
        group: 'model',
        className: className,
        title: translate(title || 'Create {type}', { type: shortType } || 'Append {type}', { type: shortType }),
        action: {
          dragstart: appendStart,
          click: append
        }
      }
    }

    function removeElement() {
      modeling.removeElements([element])
    }

    function getReplaceMenuPosition(element) {
      var Y_OFFSET = 5

      var diagramContainer = canvas.getContainer()
      var pad = contextPad.getPad(element).html

      var diagramRect = diagramContainer.getBoundingClientRect()
      var padRect = pad.getBoundingClientRect()

      var top = padRect.top - diagramRect.top
      var left = padRect.left - diagramRect.left

      var pos = {
        x: left,
        y: top + padRect.height + Y_OFFSET
      }

      return pos
    }

    // 定义开始节点 扩展的操作
    if (is(businessObject, 'bpmn:StartEvent')) {
      assign(actions, {
        'append.gateway': appendAction(
          'bpmn:ExclusiveGateway',
          'bpmn-icon-gateway-xor',
          translate('Append ExclusiveGateway')
        ),
        'append.user-task': appendAction(
          'bpmn:UserTask',
          'bpmn-icon-user-task',
          translate('Append UserTask')
        )
      })
    } else {
      if (is(businessObject, 'bpmn:ExclusiveGateway')) {
        assign(actions, {
          'append.user-task': appendAction(
            'bpmn:UserTask',
            'bpmn-icon-user-task',
            translate('Append UserTask')
          )
        })
      } else if (!is(businessObject, 'bpmn:EndEvent')) {
        assign(actions, {
          'append.end-event': appendAction(
            'bpmn:EndEvent',
            'bpmn-icon-end-event-none',
            translate('Append EndEvent')
          ),
          'append.gateway': appendAction(
            'bpmn:ExclusiveGateway',
            'bpmn-icon-gateway-xor',
            translate('Append ExclusiveGateway')
          ),
          'append.user-task': appendAction(
            'bpmn:UserTask',
            'bpmn-icon-user-task',
            translate('Append UserTask')
          )
        })
      }
    }
    if (!is(businessObject, 'bpmn:EndEvent')) {
      assign(actions, {
        connect: {
          group: 'connect',
          className: 'bpmn-icon-connection-multi',
          title: translate('Append Sequence'),
          action: {
            click: startConnect,
            dragstart: startConnect
          }
        }
      })
    }

    if (!popupMenu.isEmpty(element, 'bpmn-replace')) {
      // Replace menu entry
      assign(actions, {
        'replace': {
          group: 'edit',
          className: 'bpmn-icon-screw-wrench',
          title: translate('Change type'),
          action: {
            click: function(event, element) {
              var position = assign(getReplaceMenuPosition(element), {
                cursor: { x: event.x, y: event.y }
              })

              popupMenu.open(element, 'bpmn-replace', position)
            }
          }
        }
      })
    }

    assign(actions, {
      delete: {
        group: 'edit',
        className: 'bpmn-icon-trash',
        title: translate('Remove'),
        action: {
          click: removeElement
        }
      }
    })
    return actions
  }
}
