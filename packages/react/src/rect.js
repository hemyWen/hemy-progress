import Base from './Base';
class Rect extends Base {
  constructor(props) {
    super(props);
    this.state = {
      type: 'rect',
      maskID: 'progress_rect_mask',
    };
  }
  get centerPoint() {
    const { strokeWidth, width, height } = this.props;
    const x = (strokeWidth + width) / 2;
    const y = (strokeWidth + height) / 2;
    return { x, y };
  }
  //矩形周长
  get perimeter() {
    const { width, height } = this.props;
    return (Number(width) + Number(height)) * 2;
  }
  get origin() {
    return this.props.strokeWidth / 2;
  }
  render() {
    const { strokeWidth, width, height, isDashed, showText, slot } = this.props;
    const isShowText = showText && !slot;
    const { maskID } = this.state;
    return (
      <div className="svg-container" style={{ width: strokeWidth + width + 'px', height: strokeWidth + height + 'px' }}>
        <svg width={strokeWidth + width} height={strokeWidth + height}>
          {isDashed && (
            <mask id={maskID}>
              <rect
                className="progress-all__mask"
                fill="none"
                x={this.origin}
                y={this.origin}
                width={width}
                height={height}
                style={this.maskStyle}
              />
            </mask>
          )}
          <g>
            <rect
              className="progress-rect__back"
              x={this.origin}
              y={this.origin}
              width={width}
              height={height}
              style={this.backgroundStyle}
            />
            <rect
              className="progress-rect__item"
              x={this.origin}
              y={this.origin}
              width={width}
              height={height}
              fill="none"
              style={this.style}
            />
            {isShowText && (
              <text
                x={this.centerPoint.x}
                y={this.centerPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                style={this.svgTextStyle}
              >
                {this.content}
              </text>
            )}
          </g>
        </svg>
        <div className="slot-container">{slot}</div>
      </div>
    );
  }
}
export default Rect;
