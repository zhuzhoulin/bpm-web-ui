import { Linter } from '../../bpmnlint';

import {
  assign,
  groupBy,
  reduce
} from 'min-dash';

import {
  domify
} from 'min-dom';

import {
  escapeHTML
} from 'diagram-js/lib/util/EscapeUtil';

// 这里有问题
// import ErrorSvg from '../assets/svg/error.svg';
// import WarningSvg from '../assets/svg/warning.svg';
// import SuccessSvg from '../assets/svg/success.svg';

var ErrorSvg = "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 352 512\"><path fill=\"currentColor\" d=\"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z\"></path></svg>";

var WarningSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M288 328.83c-45.518 0-82.419 34.576-82.419 77.229 0 42.652 36.9 77.229 82.419 77.229 45.518 0 82.419-34.577 82.419-77.23 0-42.652-36.9-77.229-82.419-77.229zM207.439 57.034l11.61 204.348c.544 9.334 8.78 16.64 18.755 16.64h100.392c9.975 0 18.211-7.306 18.754-16.64l11.611-204.348c.587-10.082-7.98-18.56-18.754-18.56H226.192c-10.775 0-19.34 8.478-18.753 18.56z\"/></svg>";

var SuccessSvg = "<svg width=\"12\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" d=\"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z\"></path></svg>";


var OFFSET_TOP = -7,
    OFFSET_RIGHT = -7;

var LOW_PRIORITY = 500;

var emptyConfig = {
  resolver: {
    resolveRule: function() {
      return null;
    }
  },
  config: {}
};

var stateToIcon = {
  error: ErrorSvg,
  warning: WarningSvg,
  success: SuccessSvg,
  inactive: SuccessSvg
};

export default function Linting(
    bpmnjs,
    canvas,
    config,
    elementRegistry,
    eventBus,
    overlays
) {
  this._bpmnjs = bpmnjs;
  this._canvas = canvas;
  this._elementRegistry = elementRegistry;
  this._eventBus = eventBus;
  this._overlays = overlays;

  this._issues = {};

  this._active = config && config.active || false;
  this._linterConfig = emptyConfig;

  this._overlayIds = {};

  var self = this;

  eventBus.on([
    'import.done',
    'elements.changed',
    'linting.configChanged',
    'linting.toggle'
  ], LOW_PRIORITY, function(e) {
    if (self.isActive()) {
      self.update();
    }
  });

  eventBus.on('linting.toggle', function(event) {

    const active = event.active;

    if (!active) {
      self._clearIssues();
      self._updateButton();
    }
  });

  eventBus.on('diagram.clear', function() {
    self._clearIssues();
  });

  var linterConfig = config && config.bpmnlint;

  linterConfig && eventBus.once('diagram.init', function() {

    // bail out if config was already provided
    // during initialization of other modules
    if (self.getLinterConfig() !== emptyConfig) {
      return;
    }

    try {
      self.setLinterConfig(linterConfig);
    } catch (err) {
      console.error(
        '[bpmn-js-bpmnlint] Invalid lint rules configured. ' +
        'Please doublecheck your linting.bpmnlint configuration, ' +
        'cf. https://github.com/bpmn-io/bpmn-js-bpmnlint#configure-lint-rules'
      );
    }
  });

  this._init();
}

Linting.prototype.setLinterConfig = function(linterConfig) {

  if (!linterConfig.config || !linterConfig.resolver) {
    throw new Error('Expected linterConfig = { config, resolver }');
  }

  this._linterConfig = linterConfig;

  this._eventBus.fire('linting.configChanged');
};

Linting.prototype.getLinterConfig = function() {
  return this._linterConfig;
};

Linting.prototype._init = function() {
  this._createButton();

  this._updateButton();
};

Linting.prototype.isActive = function() {
  return this._active;
};

Linting.prototype._formatIssues = function(issues) {

  const reports = reduce(issues, function(reports, ruleReports, rule) {

    return reports.concat(ruleReports.map(function(report) {
      report.rule = rule;

      return report;
    }));

  }, []);

  return groupBy(reports, function(report) {
    return report.id;
  });
};

/**
 * Toggle linting on or off.
 *
 * @param {boolean} [newActive]
 *
 * @return {boolean} the new active state
 */
Linting.prototype.toggle = function(newActive) {

  newActive = typeof newActive === 'undefined' ? !this.isActive() : newActive;

  this._setActive(newActive);

  return newActive;
};

Linting.prototype._setActive = function(active) {

  if (this._active === active) {
    return;
  }

  this._active = active;

  this._eventBus.fire('linting.toggle', { active: active });
};

/**
 * Update overlays. Always lint and check wether overlays need update or not.
 */
Linting.prototype.update = function() {
  var self = this;

  var definitions = this._bpmnjs.getDefinitions();

  if (!definitions) {
    return;
  }

  var lintStart = this._lintStart = Math.random();

  this.lint().then(function(newIssues) {

    if (self._lintStart !== lintStart) {
      return;
    }

    newIssues = self._formatIssues(newIssues);

    var remove = {},
        update = {},
        add = {};

    for (var id1 in self._issues) {
      if (!newIssues[id1]) {
        remove[id1] = self._issues[id1];
      }
    }

    for (var id2 in newIssues) {
      if (!self._issues[id2]) {
        add[id2] = newIssues[id2];
      } else {
        if (newIssues[id2] !== self._issues[id2]) {
          update[id2] = newIssues[id2];
        }
      }
    }

    remove = assign(remove, update);
    add = assign(add, update);

    self._clearOverlays();
    self._createIssues(add);

    self._issues = newIssues;

    self._updateButton();

    self._fireComplete(newIssues);
  });
};

Linting.prototype._fireComplete = function(issues) {
  this._eventBus.fire('linting.completed', { issues: issues });
};

Linting.prototype._createIssues = function(issues) {
  for (var id in issues) {
    this._createElementIssues(id, issues[id]);
  }
};

/**
 * Create overlays for an elements issues.
 *
 * @param {string} elementId - Elements ID.
 * @param {Array} elementIssues - All element issues including warnings and errors.
 */
Linting.prototype._createElementIssues = function(elementId, elementIssues) {
  var element = this._elementRegistry.get(elementId);

  if (!element) {
    return;
  }

  var menuPosition;
  var position;

  if (element === this._canvas.getRootElement()) {
    menuPosition = 'bottom-right';

    position = {
      top: 20,
      left: 150
    };
  } else {
    menuPosition = 'top-right';

    position = {
      top: OFFSET_TOP,
      left: OFFSET_RIGHT
    };
  }

  var issuesByType = groupBy(elementIssues, function(elementIssue) {
    return elementIssue.category;
  });

  var errors = issuesByType.error,
      warnings = issuesByType.warn;

  if (!errors && !warnings) {
    return;
  }

  var $html = domify(
    '<div class="bjsl-overlay bjsl-issues-' + menuPosition + '"></div>'
  );

  var $icon = errors
    ? domify('<div class="bjsl-icon bjsl-icon-error">' + ErrorSvg + '</div>')
    : domify('<div class="bjsl-icon bjsl-icon-warning">' + WarningSvg + '</div>');

  var $dropdown = domify('<div class="bjsl-dropdown"></div>');
  var $dropdownContent = domify('<div class="bjsl-dropdown-content"></div>');
  var $issues = domify('<div class="bjsl-issues"></div>');
  var $issueList = domify('<ul></ul>');

  $html.appendChild($icon);
  $html.appendChild($dropdown);

  $dropdown.appendChild($dropdownContent);
  $dropdownContent.appendChild($issues);

  $issues.appendChild($issueList);

  if (errors) {
    this._addErrors($issueList, errors);
  }

  if (warnings) {
    this._addWarnings($issueList, warnings);
  }

  this._overlayIds[elementId] = this._overlays.add(element, 'linting', {
    position: position,
    html: $html,
    scale: {
      min: .9
    }
  });
};

Linting.prototype._addErrors = function($ul, errors) {

  var self = this;

  errors.forEach(function(error) {
    self._addEntry($ul, 'error', error);
  });
};

Linting.prototype._addWarnings = function($ul, warnings) {

  var self = this;

  warnings.forEach(function(error) {
    self._addEntry($ul, 'warning', error);
  });
};

Linting.prototype._addEntry = function($ul, state, entry) {

  var rule = entry.rule,
      message = entry.message;

  var icon = stateToIcon[state];

  var $entry = domify(
    '<li class="' + state + '">' +
      icon +
      '<a title="' + escapeHTML(rule) + ': ' + escapeHTML(message) + '" ' +
         'data-rule="' + escapeHTML(rule) + '" ' +
         'data-message="' + escapeHTML(message) + '"' +
      '>' +
        escapeHTML(message) +
      '</a>' +
    '</li>'
  );

  $ul.appendChild($entry);
};

Linting.prototype._clearOverlays = function() {
  this._overlays.remove({ type: 'linting' });

  this._overlayIds = {};
};

Linting.prototype._clearIssues = function() {
  this._issues = {};

  this._clearOverlays();
};

Linting.prototype._setButtonState = function(state, errors, warnings) {
  var button = this._button;

  var icon = stateToIcon[state];

  var html = icon + '<span>' + errors + ' Errors, ' + warnings + ' Warnings</span>';

  [
    'error',
    'inactive',
    'success',
    'warning'
  ].forEach(function(s) {
    if (state === s) {
      button.classList.add('bjsl-button-' + s);
    } else {
      button.classList.remove('bjsl-button-' + s);
    }
  });

  button.innerHTML = html;
};

Linting.prototype._updateButton = function() {

  if (!this.isActive()) {
    this._setButtonState('inactive', 0, 0);

    return;
  }

  var errors = 0,
      warnings = 0;

  for (var id in this._issues) {
    this._issues[id].forEach(function(issue) {
      if (issue.category === 'error') {
        errors++;
      } else if (issue.category === 'warn') {
        warnings++;
      }
    });
  }

  var state = (errors && 'error') || (warnings && 'warning') || 'success';

  this._setButtonState(state, errors, warnings);
};

Linting.prototype._createButton = function() {

  var self = this;

  this._button = domify(
    '<button class="bjsl-button bjsl-button-inactive" title="Toggle linting"></button>'
  );

  this._button.addEventListener('click', function() {
    self.toggle();
  });

  this._canvas.getContainer().appendChild(this._button);
};

Linting.prototype.lint = function() {
  var definitions = this._bpmnjs.getDefinitions();

  var linter = new Linter(this._linterConfig);

  return linter.lint(definitions);
};

Linting.$inject = [
  'bpmnjs',
  'canvas',
  'config.linting',
  'elementRegistry',
  'eventBus',
  'overlays'
];
