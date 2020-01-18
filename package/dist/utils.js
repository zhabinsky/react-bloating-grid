"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoordinates = getCoordinates;
exports.getVector = getVector;
exports.generateID = generateID;

function getCoordinates(boxIndex, gridWidth) {
  var x = boxIndex % gridWidth;
  var y = Math.floor(boxIndex / gridWidth);
  return [x, y];
}

function getVector(x1, y1, x2, y2) {
  var y = y1 - y2;
  var x = x1 - x2;
  return [x, y, Math.hypot(x, y) // length
  ];
}

function generateID() {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < 6; i++) {
    var index = Math.floor(Math.random() * characters.length);
    result += characters.charAt(index);
  }

  return 'bloating-' + result;
}
/**
 * Using arrays instead of objects
 * As a micro optimization
 * 
 * https://stackoverflow.com/questions/17295056/array-vs-object-efficiency-in-javascript
 * 
 */