import {useState} from 'react';

/**
 * Is used to discover which grid element is hovered over
 * 
 * @param {String} elementId 
 * @param {Object} sizes
 */

const useSelectedBox = (
  elementId,
  gridColumns,
  gridColumnGap,
  gridRowGap,
  childrenLength
) => {
  const [selected, setSelected] = useState (-1);
  const [offsetX, offsetY] = getOffset (elementId);

  const reset = () => setSelected (-1);

  const onMouseMove = e => {
    e.persist ();
    const {clientX, clientY} = e;
    const x = clientX - offsetX;
    const y = clientY - offsetY;
    const selectedNext = getSelectedElement (
      x,
      y,
      elementId,
      gridColumns,
      gridColumnGap,
      gridRowGap
    );
    if (selectedNext === selected) {
      /**
       * No need to update
       */
      return;
    }
    if (childrenLength <= selectedNext) return reset ();
    setSelected (selectedNext); // update
  };

  return [selected, onMouseMove, reset];
};

const getSelectedElement = (
  x,
  y,
  elementId,
  gridColumns,
  gridColumnGap,
  gridRowGap
) => {
  // Figuring out width and height of a grid element
  // By taking the first child from this #elementId
  let height;
  let width;
  const element = document.querySelector (`#${elementId} > div`);
  if (element) {
    const positionInfo = element.getBoundingClientRect ();

    height = positionInfo.height;
    width = positionInfo.width;
  } else {
    height = 1;
    width = 1;
  }

  const c = x / (width + gridColumnGap);
  const r = y / (height + gridRowGap);
  return Math.max (Math.floor (r) * gridColumns + Math.floor (c), -1);
};

export default useSelectedBox;

const getOffset = elementId => {
  const el = document.querySelector (`#${elementId}`);
  if (!el) return [0, 0];
  const rect = el.getBoundingClientRect ();
  return [rect.left, rect.top];
};

// Functionality that allows to exclude the gap between elements
// TODO: decide if you want to keep it
// if (config.excludeGap) {
//   /** Selected box index is -1 when pointing to a gap */
//   if (1 - (c - Math.floor (c)) < gridColumnGap / cellW) selectedBox = -1;
//   else if (1 - (r - Math.floor (r)) < gridRowGap / cellH) selectedBox = -1;
// }
