import React from 'react';
import {render} from 'react-dom';
import BloatingGrid from 'react-bloating-grid';
import Title from './Title';
import Code from './Code';
import template from './template';

const Dummy = ({style}) => <div className="element" style={style} />;
const repeat = (n, style = {}) =>
  new Array (n)
    .fill ()
    .map ((a, i) => (
      <Dummy key={i} style={{...style, background: getRandomBg ()}} />
    ));
const stringifyProps = p =>
  Object.keys (p).map (k => `${k}={${JSON.stringify (p[k])}}`).join ('  ');

const GridWrapper = ({children}) => (
  <div style={{padding: '30px 50px'}}>
    {children}
  </div>
);

const CodeExample = example => {
  const {componentProps: props, title, n} = example;
  const code = template
    .replace ('{{PROPS}}', stringifyProps (props))
    .replace ('{{n}}', n);
  return (
    <Title title={`Example "${title}"`} hr={true}>
      <Title title="Demo">
        <GridWrapper>

          <BloatingGrid {...props}>
            {repeat (n)}
          </BloatingGrid>
        </GridWrapper>

      </Title>
      <Title title="Code">
        <Code code={code} />
      </Title>
    </Title>
  );
};

render (
  <React.Fragment>
    <h1
      style={{
        fontWeight: 900,
        fontSize: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      React Bloated Grid 🐒
      <a
        href="https://github.com/zhabinsky"
        style={{
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          fontSize: 30,
        }}
      >
        zhabinsky@github
      </a>
    </h1>

    <a
      href="https://github.com/zhabinsky/react-bloating-grid"
      style={{
        fontSize: 20,
        color: 'white',
        paddingTop: 40,
        marginBottom: 40,
      }}
    >
      Github repository
    </a>
    <br />
    <a
      href="https://github.com/zhabinsky/react-bloating-grid"
      style={{
        fontSize: 20,
        color: 'white',
        paddingTop: 40,
        marginBottom: 40,
      }}
    >
      nmpjs package
    </a>

    <p style={{margin: '50px 0', fontSize: 16}}>
      <h3>
        Easily create beautiful, responsive, performant content grids, that:
      </h3>
      <ul>
        <li>react to hover event by pushing the neighbouring elements aside</li>
        <li>allow you to tune its behaviour via a number of props</li>
        <li>support responsive props</li>
      </ul>
    </p>

    <GridWrapper>
      <BloatingGrid gridColumns={6}>
        {repeat (6)}
      </BloatingGrid>
    </GridWrapper>

    <div style={{marginBottom: 100}}>
      {[
        {
          title: 'Simple row',
          n: 6,
          componentProps: {
            gridColumns: 6,
          },
        },
        {
          title: 'Multi dimensional',
          n: 6 * 3,
          componentProps: {
            gridColumns: 6,
          },
        },
        {
          title: 'Responsive props',
          n: 10,
          componentProps: {
            trimLastRow: true,
            gridColumns: {
              '0': 3,
              '512': 4,
              '768': 5,
              '1024': 6,
              '1500': 7,
            },
          },
        },
      ].map (e => <CodeExample {...e} />)}
    </div>
  </React.Fragment>,
  document.getElementById ('app')
);

function random () {
  return 120 + Math.random () * 75;
}

function getRandomBg () {
  const r = random ();
  const g = random ();
  const b = random ();
  return `rgba(${r}, ${g}, ${b}, 1)`;
}
