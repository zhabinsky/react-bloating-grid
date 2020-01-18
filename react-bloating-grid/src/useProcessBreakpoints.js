import {useEffect, useState} from 'react';

function useWindowWidth () {
  const [width, setWidth] = useState (getWidth ());
  useEffect (() => {
    const onResize = () => setWidth (getWidth ());
    window.addEventListener ('resize', onResize);
    return () => window.removeEventListener ('resize', onResize);
  }, []);
  return width;
}

export default useWindowWidth;

const getWidth = () => window.innerWidth;
