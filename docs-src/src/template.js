const template = `
import React from "react";
import ReactDOM from "react-dom";
import BloatingGrid from "react-bloating-grid";


const children = n => {
  return new Array(n).fill().map((_,i) => <div key={i} className="element" />);
}

function App () {
  return (
    <BloatingGrid {{PROPS}}>
    {children({{n}})}
    </BloatingGrid>
  )
}

ReactDOM.render(<App/>, document.querySelector("#root"))
`;

export default template;
