"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var gatherExpectedBreakpoints = function gatherExpectedBreakpoints(props, checkFields) {
  var expectedBreakpoints = [];

  for (var i = 0; i < checkFields.length; i++) {
    var name = checkFields[i];
    var value = props[name];

    if (!value || _typeof(value) !== 'object') {
      // prop value is not an object, therefore
      // is kept as is -> primitive or null
      continue;
    } // TODO: elimintate reverse call as optimization


    var breakpoints = Object.keys(value);
    expectedBreakpoints.push.apply(expectedBreakpoints, _toConsumableArray(breakpoints));
  }

  return _toConsumableArray(new Set(expectedBreakpoints)).map(Number).sort(sortFunction);
};

var withResolvedBreakpoints = function withResolvedBreakpoints(Component, checkFields) {
  return function (props) {
    var expectedBreakpoints = gatherExpectedBreakpoints(props, checkFields);
    var width = useWidthWithBreakpoints(expectedBreakpoints); // const width = 100;

    var resolvedProps = {};

    for (var i = 0; i < checkFields.length; i++) {
      var name = checkFields[i];
      var value = props[name];

      if (!value || _typeof(value) !== 'object') {
        // prop value is not an object, therefore
        // is kept as is
        continue;
      } // TODO: elimintate reverse call as optimization


      var breakpoints = Object.keys(value).map(Number).sort(sortFunction);
      var currentBreakpoint = getAchievedBreakpoint(width, breakpoints);
      var selectedValue = value[currentBreakpoint];
      resolvedProps[name] = selectedValue;
    }

    return _react["default"].createElement(Component, _extends({}, props, resolvedProps));
  };
};

var _default = withResolvedBreakpoints;
exports["default"] = _default;

var getWidth = function getWidth() {
  return window.innerWidth;
};

var useWidthWithBreakpoints = function useWidthWithBreakpoints(bpoints) {
  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      breakpoint = _useState2[0],
      setBreakpoint = _useState2[1];

  var width = getWidth();
  (0, _react.useEffect)(function () {
    var handleResize = function handleResize() {
      var current = getAchievedBreakpoint(getWidth(), bpoints);
      if (breakpoint !== current) setBreakpoint(current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  });
  return width;
};

var getAchievedBreakpoint = function getAchievedBreakpoint(width, breakpoints) {
  var breakpoint;

  for (var j = 0; j < breakpoints.length; j++) {
    if (width >= breakpoints[j]) {
      breakpoint = breakpoints[j];
      break;
    }
  }

  if (typeof breakpoint === 'undefined') {
    // Using lowest possible breakpoint
    breakpoint = breakpoints[breakpoints.length - 1];
  }

  console.log('SELECTED BREAKPOINT', breakpoint, breakpoints, width);
  return breakpoint;
};

var sortFunction = function sortFunction(a, b) {
  return b - a;
};