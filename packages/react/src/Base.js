import { Component } from 'react';
class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //文字内容
  get content() {
    const { percentage } = this.props;
    if (typeof this.format === 'function') {
      return this.format(percentage) || '';
    } else {
      return `${percentage}%`;
    }
  }
  //文字样式
  get svgTextStyle() {
    const { textStyle } = this.props;
    return { ...textStyle, fill: textStyle.color };
  }
  //当前进度条颜色
  get currentStrokeColor() {
    const { strokeColor, percentage } = this.props;
    if (typeof strokeColor === 'function') {
      return strokeColor(percentage);
    } else if (typeof strokeColor === 'string') {
      return strokeColor;
    } else {
      return this.getCurrentColor(percentage);
    }
  }
  //虚线长度和间隙
  get strokeDasharray() {
    const { isDashed, dashedLength, dashedDistance } = this.props;
    if (isDashed) {
      return dashedLength + ' ' + dashedDistance;
    }
    return this.perimeter;
  }
  //当前进度(虚线偏移量)
  get strokeDashoffset() {
    const { percentage } = this.props;
    const dashoffset = '' + (this.perimeter * (100 - percentage)) / 100;
    return dashoffset;
  }
  //进度条样式
  get style() {
    const { strokeWidth, strokeLinecap, strokeLinejoin, radius, isFan, isDashed, borderRadius, isTransition } =
      this.props;
    const strokeDasharray = this.strokeDasharray;
    const stroke = this.currentStrokeColor;
    const { type, maskID } = this.state;
    let style = {
      stroke,
      strokeWidth,
      strokeDasharray,
      strokeLinecap,
      strokeLinejoin,
    };
    if (isDashed) {
      style.mask = `url(#${maskID})`;
    } else {
      style.strokeDashoffset = this.strokeDashoffset;
    }
    //type=circle的扇形时
    if (type === 'circle' && isFan) {
      style.strokeWidth = radius * 2;
      style.strokeLinecap = 'butt';
    }
    //当type=rect时
    if (type === 'rect') {
      style.rx = borderRadius;
      style.ry = borderRadius;
    }
    if (isTransition) {
      style.transition = 'stroke-dashoffset 0.6s ease';
    }
    return style;
  }
  //背景样式
  get backgroundStyle() {
    const {
      fillColor,
      backStrokeColor,
      backStrokeWidth,
      strokeLinejoin,
      isDashed,
      isBackDashed,
      isFan,
      radius,
      borderRadius,
    } = this.props;
    const { type } = this.state;
    let style = {
      strokeLinejoin,
      stroke: backStrokeColor,
      strokeWidth: backStrokeWidth,
      fill: fillColor,
    };
    if (isDashed && isBackDashed) {
      style.strokeDasharray = this.strokeDasharray;
    }
    if (type === 'circle' && isFan) {
      style.strokeWidth = radius * 2;
    }
    //当type=rect时
    if (type === 'rect') {
      style.rx = borderRadius;
      style.ry = borderRadius;
    }
    return style;
  }
  //蒙版样式
  get maskStyle() {
    const { strokeWidth, isTransition } = this.props;
    const stroke = 'white';
    const strokeDasharray = this.perimeter;
    const strokeDashoffset = this.strokeDashoffset;
    const style = { stroke, strokeDasharray, strokeDashoffset, strokeWidth };
    if (isTransition) {
      style.transition = 'stroke-dashoffset 0.6s ease';
    }
    return style;
  }
  getCurrentColor(percentage) {
    const colorArray = this.getColorArray().sort((a, b) => a.percentage - b.percentage);
    for (let i = 0; i < colorArray.length; i++) {
      if (colorArray[i].percentage > percentage) {
        return colorArray[i].color;
      }
    }
    return colorArray[colorArray.length - 1].color;
  }
  //获取color数组
  getColorArray() {
    const { strokeColor } = this.props;
    const color = strokeColor;
    const span = 100 / color.length;
    return color.map((item, index) => {
      if (typeof item === 'string') {
        return {
          color: item,
          percentage: (index + 1) * span,
        };
      }
      return item;
    });
  }
}
export default Base;
