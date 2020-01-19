import React from 'react';
import {render} from 'react-dom';
import BloatingGrid from './package';
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

const App = () => {
  const propsString = `const CustomTypes = {
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

  disableMagnification: false,
  disableMovement: false,
};`;
  return (
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
        href="https://www.npmjs.com/package/react-bloating-grid"
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
          <li>
            react to hover event by pushing the neighbouring elements aside
          </li>
          <li>allow you to tune its behaviour via a number of props</li>
          <li>support responsive props</li>
        </ul>
      </p>

      <GridWrapper>
        <BloatingGrid gridColumns={6}>
          {repeat (6)}
        </BloatingGrid>
      </GridWrapper>

      <Title title={'PropTypes'}>
        <Code code={propsString}> </Code>
      </Title>

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
              disable: {
                '0': true,
                '1024': false,
              },
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
    </React.Fragment>
  );
};

render (<App />, document.getElementById ('app'));

function random () {
  return 120 + Math.random () * 75;
}

function getRandomBg () {
  const r = random ();
  const g = random ();
  const b = random ();
  return `rgba(${r}, ${g}, ${b}, 1)`;
}
