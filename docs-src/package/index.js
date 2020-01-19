import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useSelectedBox from './useSelectedBox';
import {getCoordinates, getVector, generateID} from './utils';
import withResolvedBreakpoints from './withResolvedBreakpoints';

const CustomTypes = {
  NumberOrBreakpointObject: PropTypes.oneOfType ([
    PropTypes.number,
    PropTypes.object,
  ]),
  BoolOrBreakpointObject: PropTypes.oneOfType ([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

const propTypes = {
  id: PropTypes.string, // auto-generated
  children: PropTypes.arrayOf (PropTypes.node),
  style: PropTypes.object,
  styleChild: PropTypes.object,

  gridColumns: CustomTypes.NumberOrBreakpointObject.isRequired,
  gridGap: CustomTypes.NumberOrBreakpointObject,
  gridRowGap: CustomTypes.NumberOrBreakpointObject,
  gridColumnGap: CustomTypes.NumberOrBreakpointObject,

  className: PropTypes.string,
  classNameChild: PropTypes.string,
  classNameChildSelected: PropTypes.string,

  trimLastRow: CustomTypes.BoolOrBreakpointObject, // makes there are no empty slots in rows

  effectScale: CustomTypes.NumberOrBreakpointObject,
  effectScaleMovement: CustomTypes.NumberOrBreakpointObject,
  effectScaleMagnification: CustomTypes.NumberOrBreakpointObject,

  disableMagnification: CustomTypes.BoolOrBreakpointObject,
  disableMovement: CustomTypes.BoolOrBreakpointObject,
};

const defaultProps = {
  id: undefined,
  children: [],
  style: {},
  styleChild: {
    transition: 'all 0.4s ease-out',
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

  disable: false,
  disableMagnification: false,
  disableMovement: false,
};

function BloatingBase (props) {
  const {
    id: containerId = generateID (),
    children,
    style,
    styleChild,
    gridColumns,
    gridGap,
    className,
    classNameChild,
    classNameChildSelected,
    gridRowGap: propRowGap,
    gridColumnGap: propColumnGap,
    trimLastRow,
    disable,
    disableMagnification: propDisableMagnification,
    disableMovement: propDisableMovement,
    ...rest
  } = props;
  const [id] = useState (containerId);

  const gridRowGap = propRowGap || gridGap;
  const gridColumnGap = propColumnGap || gridGap;

  const disableMagnification = disable === null
    ? propDisableMagnification
    : disable;
  const disableMovement = disable === null ? propDisableMovement : disable;

  const nChildren = children.length;

  const [selected, onMouseMove, reset] = useSelectedBox (
    id,
    gridColumns,
    gridRowGap,
    gridColumnGap,
    nChildren
  );

  /** We persist container id across updates */

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`.trim (),
    gridRowGap,
    gridColumnGap,
    ...style,
  };

  const coordinatesSelected = getCoordinates (selected, gridColumns);

  if (process.env.NODE_ENV !== 'production') {
    /** 
     * Throw an error in development 
     * if the children are not an array 
     * */
    if (!Array.isArray (children)) {
      throw Error ('Bloating.children must be an array');
    }
  }

  const wrapChild = (element, index) => {
    const coordinatesChild = getCoordinates (index, gridColumns);
    const [xDistance, yDistance, distance] = getVector (
      ...coordinatesSelected,
      ...coordinatesChild
    );

    const childProps = {
      key: index,
    };
    const style = {...styleChild};
    let className = classNameChild;
    const effectIntensity = 1 / (window.innerWidth / 800);
    if (selected >= 0) {
      const isSelected = index === selected;
      if (isSelected && !disableMagnification) {
        style.zIndex = 10;
        style.transform = `scale(${1 + 0.4 * effectIntensity})`;
        className += ' ' + classNameChildSelected;
      } else if (!disableMovement) {
        const coeficient = -5 * (5 / distance) * effectIntensity;
        const offsetX = xDistance * coeficient;
        const offsetY = yDistance * coeficient;
        style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    }
    className = className.trim ();
    if (className.length > 0) childProps.className = className;
    childProps.style = style;
    return <div {...childProps}>{element}</div>;
  };

  const trimFilter = createTrimFilter (gridColumns, trimLastRow, nChildren);

  return (
    <React.Fragment>

      <div>
        {JSON.stringify ({
          disable,
          disableMagnification,
          disableMovement,
          gridColumns,
        })}
      </div>
      <div
        id={id}
        style={containerStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        className={`bloting-grid ${className}`.trim ()}
        {...rest}
      >
        {children.filter (trimFilter).map (wrapChild)}
      </div>
    </React.Fragment>
  );
}

const Bloating = withResolvedBreakpoints (BloatingBase, [
  'gridColumns',
  'gridGap',
  'gridRowGap',
  'gridColumnGap',
  'trimLastRow',
  'effectScale',
  'effectScaleMovement',
  'effectScaleMagnification',
  'disableMagnification',
  'disableMovement',
]);

Bloating.propTypes = propTypes;
Bloating.defaultProps = defaultProps;

export default Bloating;

const createTrimFilter = (gridColumns, trimLastRow, nChildren) => {
  if (!trimLastRow) return () => true;
  const lastRowLeftovers = nChildren % gridColumns;
  const trimFromIndex = nChildren - lastRowLeftovers - 1;
  return (_, index) => index <= trimFromIndex;
};
