import React from 'react';

export default ({title, children, hr = false}) => {
  return (
    <React.Fragment>
      <h4>{title}</h4>
      {hr && <hr />}
      {children}
    </React.Fragment>
  );
};
