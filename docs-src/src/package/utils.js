function getCoordinates (boxIndex, gridWidth) {
  const x = boxIndex % gridWidth;
  const y = Math.floor (boxIndex / gridWidth);
  return [x, y];
}

function getVector (x1, y1, x2, y2) {
  const y = y1 - y2;
  const x = x1 - x2;
  return [
    x,
    y,
    Math.hypot (x, y), // length
  ];
}

function generateID () {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 6; i++) {
    const index = Math.floor (Math.random () * characters.length);
    result += characters.charAt (index);
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

export {getCoordinates, getVector, generateID};
