# React Bloating Grid

## ⚠️ ATTENTION PLEASE ⚠️

It's okay to use this, but I don't recommend looking into this library since there is better ways to do it nowadays
For example you could use `react-spring` to achieve a better result, there is a good example [here](https://codesandbox.io/s/6zchkl) 

Good luck!

## [Documentation and Examples](https://zhabinsky.github.io/react-bloating-grid/)

[npmjs](https://www.npmjs.com/package/react-bloating-grid)
[github](https://github.com/zhabinsky/react-bloating-grid)

![Example](https://raw.githubusercontent.com/zhabinsky/react-bloating-grid/master/example_a.gif)

[How to contribute?](https://raw.githubusercontent.com/zhabinsky/react-bloating-grid/master/HOW_TO_CONTRIBUTE.md)

## Install

```
npm i --save react-bloating-grid
```

## Basic example
```
import React from "react";
import ReactDOM from "react-dom";
import BloatingGrid from "react-bloating-grid";

const children = n => {
  return new Array(n).fill().map((_, i) => <div key={i} className="element" />);
};

function App() {
  return <BloatingGrid gridColumns={6}>{children(6)}</BloatingGrid>;
}

ReactDOM.render(<App />, document.querySelector("#root"));
```
```
.element {
	transition: all 0.4s ease-out;
	background: rgb(255, 238, 252);
	background-size: cover;
	border-radius: 4px;
	transform: scale(1);
	width: 100%;
	padding-top: 100%;
}

.element:hover::after {
	opacity: 1;
}

.element::after {
	transition: all 0.2s ease-out;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	border-radius: 2px;
	font-family: Arial, Helvetica, sans-serif;
	content: "Hello 🐒";
	color: rgb(205, 42, 172);
	opacity: 0;
	font-weight: 900;
	cursor: pointer;
	font-size: 10px;
}
```

## Other Examples


![Example](https://raw.githubusercontent.com/zhabinsky/react-bloating-grid/master/example_b.gif)

# [Documentation and examples](https://zhabinsky.github.io/react-bloating-grid/)
