import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Circle from './circle';
import Line from './line';
import Rect from './rect';
import Ellipse from './ellipse';
import Path from './path';
import './progress.css';
class HemyProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render () {
    const { type } = this.props;
    let components = <div></div>;
    switch (type) {
      case 'line':
        components = <Line {...this.props} />;
        break;
      case 'circle':
        components = <Circle {...this.props} />;
        break;
      case 'rect':
        components = <Rect {...this.props} />;
        break;
      case 'ellipse':
        components = <Ellipse {...this.props} />;
        break;
      case 'path':
        components = <Path {...this.props} />;
        break;
      default:
        components = <div></div>;
    }
    return components;
  }
}
HemyProgress.propTypes = {
  type: PropTypes.string,
  percentage: function (props, propName, componentName) {
    if (!(props[propName] >= 0 && props[propName] <= 100)) {
      return new Error(propName + ' must be 0-100' + componentName + '. Validation failed.');
    }
  },
  fillColor: PropTypes.string,
  strokeColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.func
  ]),
  backStrokeColor: PropTypes.string,
  backStrokeWidth: PropTypes.number,
  textStyle: PropTypes.object,
  showText: PropTypes.bool,
  format: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeLinecap: PropTypes.oneOf(['butt', 'round', 'square']),
  strokeLinejoin: PropTypes.oneOf(['miter', 'round', 'bevel']),
  strokeMiterlimit: PropTypes.number,
  radius: PropTypes.number,
  isFan: PropTypes.bool,
  borderRadius: PropTypes.number,
  rx: PropTypes.number,
  ry: PropTypes.number,
  pathLength: PropTypes.number,
  d: PropTypes.string,
  isDashed: PropTypes.bool,
  isBackDashed: PropTypes.bool,
  dashedLength: PropTypes.number,
  dashedDistance: PropTypes.number,
  isTransition: PropTypes.bool,
  slot: PropTypes.node,
  lineHeight: PropTypes.number,
};
HemyProgress.defaultProps = {
  type: 'line',
  percentage: 0,
  fillColor: 'none',
  strokeColor: '#409eff',
  backStrokeColor: '#eee',
  backStrokeWidth: 5,
  textStyle: {},
  showText: true,
  format: function () { },
  width: 200,
  height: 200,
  strokeWidth: 5,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  strokeMiterlimit: 0,
  radius: 50,
  isFan: false,
  borderRadius: 0,
  rx: 90,
  ry: 40,
  pathLength: 1000,
  d: '',
  isDashed: false,
  isBackDashed: true,
  dashedLength: 5,
  dashedDistance: 5,
  isTransition: true,
  slot: '',
  lineHeight: 30,
};
export default HemyProgress;
