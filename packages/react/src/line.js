import Base from './Base';
import React from 'react';
class Line extends Base {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.progressBar = React.createRef();
  }
  componentDidMount() {
    if (this.props.isDashed) {
      const width = this.progressBar.current.clientWidth;
      const length = Number(this.props.dashedLength) + Number(this.props.dashedDistance);
      this.setState({ count: Math.ceil(width / length) + 1 });
    }
  }
  get dashItemStyle() {
    const style = {};
    const { dashedLength, dashedDistance } = this.props;
    style.width = dashedLength + 'px';
    style.marginRight = dashedDistance + 'px';
    return style;
  }
  get dashOuterItemStyle() {
    const style = {};
    const { backStrokeColor } = this.props;
    style.background = backStrokeColor;
    style.zIndex = 10;
    return { ...this.dashItemStyle, ...style };
  }
  get dashInnerItemStyle() {
    const style = {};
    style.background = this.currentStrokeColor;
    style.zIndex = 99;
    return { ...this.dashItemStyle, ...style };
  }
  get dashInnerStyle() {
    const style = {};
    const { percentage } = this.props;
    style.width = percentage + '%';
    return style;
  }
  get barStyle() {
    const style = {};
    const { percentage, isTransition, borderRadius, lineHeight } = this.props;
    style.width = percentage + '%';
    style.background = this.currentStrokeColor;
    style.transition = isTransition ? 'width 0.6s ease' : '';
    style.borderRadius = borderRadius + 'px';
    style.height = lineHeight + 'px';
    return style;
  }
  get outBarStyle() {
    const style = {};
    const { isDashed, isBackDashed, backStrokeColor, borderRadius, lineHeight } = this.props;
    if (!isDashed) {
      style.background = backStrokeColor;
    }
    style.borderRadius = borderRadius + 'px';
    style.height = lineHeight + 'px';
    return style;
  }
  render() {
    const { isDashed, isBackDashed, showText, slot } = this.props;
    const isShowText = showText && !slot;
    const count = this.state.count;

    const dashOuterItem = new Array(count)
      .fill('')
      .map((item, index) => <div className="dash-item" style={this.dashOuterItemStyle} key={index}></div>);
    const dashInnerItem = new Array(count)
      .fill('')
      .map((item, index) => <div className="dash-item" style={this.dashInnerItemStyle} key={index}></div>);

    return (
      <div ref={this.progressBar} className="progress-bar-outer" style={this.outBarStyle}>
        {isDashed ? (
          <div className="progress-bar-inner-dashed">
            {isBackDashed && <div className="back-dash">{dashOuterItem}</div>}

            <div className="inner-dash" style={this.dashInnerStyle}>
              {dashInnerItem}
            </div>
          </div>
        ) : (
          <div className="progress-bar-inner" style={this.barStyle}>
            <div className="progress-bar-text" style={this.textStyle}>
              {isShowText ? this.content : slot}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Line;
