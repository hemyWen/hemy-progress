import Base from './Base';
class Ellipse extends Base {
  constructor(props) {
    super(props);
    this.state = {
      type: 'ellipse',
      maskID: 'progress_ellipse_mask',
    };
  }
  get centerPoint() {
    const x = this.props.width / 2;
    const y = this.props.height / 2;
    return { x, y };
  }
  //椭圆周长 L=2πb+4(a-b)
  get perimeter() {
    const x = this.props.rx;
    const y = this.props.ry;
    const d = x >= y ? y : x;
    const L = 2 * Math.PI * d + 4 * Math.abs(x - y);
    return L;
  }
  render() {
    const { width, height, isDashed, rx, ry, showText, slot } = this.props;
    const isShowText = showText && !slot;
    return (
      <div className="svg-container" style={{ width: width + 'px', height: height + 'px' }}>
        <svg width={width} height={height}>
          {isDashed && (
            <mask id={this.state.maskID}>
              <ellipse
                className="progress-all__mask"
                pathLength={this.perimeter}
                cx={this.centerPoint.x}
                cy={this.centerPoint.y}
                rx={rx}
                ry={ry}
                style={this.maskStyle}
              />
            </mask>
          )}

          <g>
            <ellipse
              className="progress-ellipse__back"
              pathLength={this.perimeter}
              cx={this.centerPoint.x}
              cy={this.centerPoint.y}
              rx={rx}
              ry={ry}
              style={this.backgroundStyle}
            />
            <ellipse
              className="progress-ellipse__item"
              pathLength={this.perimeter}
              cx={this.centerPoint.x}
              cy={this.centerPoint.y}
              rx={rx}
              ry={ry}
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

export default Ellipse;
