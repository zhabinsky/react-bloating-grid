"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useSelectedBox3 = _interopRequireDefault(require("./useSelectedBox"));

var _utils = require("./utils");

var _withResolvedBreakpoints = _interopRequireDefault(require("./withResolvedBreakpoints"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CustomTypes = {
  NumberOrBreakpointObject: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].object]),
  BoolOrBreakpointObject: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object])
};
var propTypes = {
  id: _propTypes["default"].string,
  // auto-generated
  children: _propTypes["default"].arrayOf(_propTypes["default"].node),
  style: _propTypes["default"].object,
  styleChild: _propTypes["default"].object,
  gridColumns: CustomTypes.NumberOrBreakpointObject.isRequired,
  gridGap: CustomTypes.NumberOrBreakpointObject,
  gridRowGap: CustomTypes.NumberOrBreakpointObject,
  gridColumnGap: CustomTypes.NumberOrBreakpointObject,
  className: _propTypes["default"].string,
  classNameChild: _propTypes["default"].string,
  classNameChildSelected: _propTypes["default"].string,
  trimLastRow: CustomTypes.BoolOrBreakpointObject,
  // makes there are no empty slots in rows
  effectScale: CustomTypes.NumberOrBreakpointObject,
  effectScaleMovement: CustomTypes.NumberOrBreakpointObject,
  effectScaleMagnification: CustomTypes.NumberOrBreakpointObject,
  disableMagnification: CustomTypes.BoolOrBreakpointObject,
  disableMovement: CustomTypes.BoolOrBreakpointObject
};
var defaultProps = {
  id: undefined,
  children: [],
  style: {},
  styleChild: {
    transition: 'all 0.4s ease-out'
  },
  gridColumns: 5,
  gridGap: 20,
  gridRowGap: 20,
  gridColumnGap: 20,
  className: '',
  classNameChild: '',
  classNameChildSelected: '',
  trimLastRow: false,
  effectScale: 1,
  effectScaleMovement: 1,
  effectScaleMagnification: 1,
  disableMagnification: false,
  disableMovement: false
};

function BloatingBase(props) {
  var _props$id = props.id,
      containerId = _props$id === void 0 ? (0, _utils.generateID)() : _props$id,
      children = props.children,
      style = props.style,
      styleChild = props.styleChild,
      gridColumns = props.gridColumns,
      gridGap = props.gridGap,
      className = props.className,
      classNameChild = props.classNameChild,
      classNameChildSelected = props.classNameChildSelected,
      propRowGap = props.gridRowGap,
      propColumnGap = props.gridColumnGap,
      trimLastRow = props.trimLastRow,
      rest = _objectWithoutProperties(props, ["id", "children", "style", "styleChild", "gridColumns", "gridGap", "className", "classNameChild", "classNameChildSelected", "gridRowGap", "gridColumnGap", "trimLastRow"]);

  var _useState = (0, _react.useState)(containerId),
      _useState2 = _slicedToArray(_useState, 1),
      id = _useState2[0];

  var gridRowGap = gridGap || propRowGap;
  var gridColumnGap = gridGap || propColumnGap;
  var nChildren = children.length;

  var _useSelectedBox = (0, _useSelectedBox3["default"])(id, gridColumns, gridRowGap, gridColumnGap, nChildren),
      _useSelectedBox2 = _slicedToArray(_useSelectedBox, 3),
      selected = _useSelectedBox2[0],
      onMouseMove = _useSelectedBox2[1],
      reset = _useSelectedBox2[2];
  /** We persist container id across updates */


  var containerStyle = _objectSpread({
    display: 'grid',
    gridTemplateColumns: "repeat(".concat(gridColumns, ", 1fr)").trim(),
    gridRowGap: gridRowGap,
    gridColumnGap: gridColumnGap
  }, style);

  var coordinatesSelected = (0, _utils.getCoordinates)(selected, gridColumns);

  if (process.env.NODE_ENV !== 'production') {
    /** 
     * Throw an error in development 
     * if the children are not an array 
     * */
    if (!Array.isArray(children)) {
      throw Error('Bloating.children must be an array');
    }
  }

  var wrapChild = function wrapChild(element, index) {
    var coordinatesChild = (0, _utils.getCoordinates)(index, gridColumns);

    var _getVector = _utils.getVector.apply(void 0, _toConsumableArray(coordinatesSelected).concat(_toConsumableArray(coordinatesChild))),
        _getVector2 = _slicedToArray(_getVector, 3),
        xDistance = _getVector2[0],
        yDistance = _getVector2[1],
        distance = _getVector2[2];

    var childProps = {
      key: index
    };

    var style = _objectSpread({}, styleChild);

    var className = classNameChild;
    var effectIntensity = 1 / (window.innerWidth / 800);

    if (selected >= 0) {
      var isSelected = index === selected;

      if (isSelected) {
        style.zIndex = 10;
        if (!disableMagnification) style.transform = "scale(".concat(1 + 0.4 * effectIntensity, ")");
        className += ' ' + classNameChildSelected;
      } else {
        var coeficient = -5 * (5 / distance) * effectIntensity;
        var offsetX = xDistance * coeficient;
        var offsetY = yDistance * coeficient;
        style.transform = "translate(".concat(offsetX, "px, ").concat(offsetY, "px)");
      }
    }

    className = className.trim();
    if (className.length > 0) childProps.className = className;
    childProps.style = style;
    return _react["default"].createElement("div", childProps, element);
  };

  var trimFilter = createTrimFilter(gridColumns, trimLastRow, nChildren);
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", _extends({
    id: id,
    style: containerStyle,
    onMouseMove: onMouseMove,
    onMouseLeave: reset,
    className: "bloting-grid ".concat(className).trim()
  }, rest), children.filter(trimFilter).map(wrapChild)));
}

var Bloating = (0, _withResolvedBreakpoints["default"])(BloatingBase, ['gridColumns']);
Bloating.propTypes = propTypes;
Bloating.defaultProps = defaultProps;
var _default = Bloating;
exports["default"] = _default;

var createTrimFilter = function createTrimFilter(gridColumns, trimLastRow, nChildren) {
  if (!trimLastRow) return function () {
    return true;
  };
  var lastRowLeftovers = nChildren % gridColumns;
  var trimFromIndex = nChildren - lastRowLeftovers - 1;
  return function (_, index) {
    return index <= trimFromIndex;
  };
};