"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Is used to discover which grid element is hovered over
 * 
 * @param {String} elementId 
 * @param {Object} sizes
 */
var useSelectedBox = function useSelectedBox(elementId, gridColumns, gridColumnGap, gridRowGap, childrenLength) {
  var _useState = (0, _react.useState)(-1),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var reset = function reset() {
    return setSelected(-1);
  };

  var onMouseMove = function onMouseMove(e) {
    e.persist();

    var _getOffset = getOffset(elementId),
        _getOffset2 = _slicedToArray(_getOffset, 2),
        offsetX = _getOffset2[0],
        offsetY = _getOffset2[1];

    var clientX = e.clientX,
        clientY = e.clientY;
    var x = clientX - offsetX;
    var y = clientY - offsetY;
    var selectedNext = getSelectedElement(x, y, elementId, gridColumns, gridColumnGap, gridRowGap);

    if (selectedNext === selected) {
      /**
       * No need to update
       */
      return;
    }

    if (childrenLength <= selectedNext) return reset();
    setSelected(selectedNext); // update
  };

  return [selected, onMouseMove, reset];
};

var getSelectedElement = function getSelectedElement(x, y, elementId, gridColumns, gridColumnGap, gridRowGap) {
  // Figuring out width and height of a grid element
  // By taking the first child from this #elementId
  var height;
  var width;
  var element = document.querySelector("#".concat(elementId, " > div"));

  if (element) {
    var positionInfo = element.getBoundingClientRect();
    height = positionInfo.height;
    width = positionInfo.width;
  } else {
    height = 1;
    width = 1;
  }

  var c = x / (width + gridColumnGap);
  var r = y / (height + gridRowGap);
  return Math.max(Math.floor(r) * gridColumns + Math.floor(c), -1);
};

var _default = useSelectedBox;
exports["default"] = _default;

var getOffset = function getOffset(elementId) {
  var el = document.querySelector("#".concat(elementId));
  if (!el) return [0, 0];
  var rect = el.getBoundingClientRect();
  return [rect.left, rect.top];
}; // Functionality that allows to exclude the gap between elements
// TODO: decide if you want to keep it
// if (config.excludeGap) {
//   /** Selected box index is -1 when pointing to a gap */
//   if (1 - (c - Math.floor (c)) < gridColumnGap / cellW) selectedBox = -1;
//   else if (1 - (r - Math.floor (r)) < gridRowGap / cellH) selectedBox = -1;
// }