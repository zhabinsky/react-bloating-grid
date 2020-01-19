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

export default propsString;
