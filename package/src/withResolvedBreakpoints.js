import React, {useEffect, useState} from 'react';
import isServer from './isServer';

const gatherExpectedBreakpoints = (props, checkFields) => {
  const expectedBreakpoints = [];

  for (let i = 0; i < checkFields.length; i++) {
    const name = checkFields[i];
    const value = props[name];

    if (!value || typeof value !== 'object') {
      // prop value is not an object, therefore
      // is kept as is -> primitive or null
      continue;
    }

    // TODO: elimintate reverse call as optimization
    const breakpoints = Object.keys (value);
    expectedBreakpoints.push (...breakpoints);
  }

  return [...new Set (expectedBreakpoints)].map (Number).sort (sortFunction);
};

const withResolvedBreakpoints = (Component, checkFields) => {
  return props => {
    const expectedBreakpoints = gatherExpectedBreakpoints (props, checkFields);
    const width = useWidthWithBreakpoints (expectedBreakpoints);
    // const width = 100;
    const resolvedProps = {};

    for (let i = 0; i < checkFields.length; i++) {
      const name = checkFields[i];
      const value = props[name];

      if (!value || typeof value !== 'object') {
        // prop value is not an object, therefore
        // is kept as is
        continue;
      }

      // TODO: elimintate reverse call as optimization
      const breakpoints = Object.keys (value).map (Number).sort (sortFunction);

      const currentBreakpoint = getAchievedBreakpoint (width, breakpoints);
      const selectedValue = value[currentBreakpoint];

      resolvedProps[name] = selectedValue;
    }
    console.log (resolvedProps, props);
    return <Component {...props} {...resolvedProps} />;
  };
};

export default withResolvedBreakpoints;

const getWidth = () => {
  return isServer ? 800 : window.innerWidth;
};

const useWidthWithBreakpoints = bpoints => {
  const [breakpoint, setBreakpoint] = useState (0);

  const width = getWidth ();
  useEffect (() => {
    const handleResize = () => {
      const current = getAchievedBreakpoint (getWidth (), bpoints);
      if (breakpoint !== current) setBreakpoint (current);
    };
    handleResize ();

    if (isServer) {
      return () => null;
    }

    window.addEventListener ('resize', handleResize);
    return () => window.removeEventListener ('resize', handleResize);
  });
  return width;
};

const getAchievedBreakpoint = (width, breakpoints) => {
  let breakpoint;
  for (let j = 0; j < breakpoints.length; j++) {
    if (width >= breakpoints[j]) {
      breakpoint = breakpoints[j];
      break;
    }
  }
  if (typeof breakpoint === 'undefined') {
    // Using lowest possible breakpoint
    breakpoint = breakpoints[breakpoints.length - 1];
  }
  return breakpoint;
};

const sortFunction = (a, b) => b - a;
