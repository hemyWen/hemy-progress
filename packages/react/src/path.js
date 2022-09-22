import Base from './Base';
class Path extends Base {
  constructor(props) {
    super(props);
    this.state = {
      type: 'path',
      maskID: 'progress_path_mask',
      width: 0,
      height: 0,
    };
    this.progressPath = React.createRef();
    this.svg = React.createRef();
  }
  get perimeter() {
    return this.props.pathLength;
  }
  get centerPoint() {
    const x = this.props.width / 2;
    const y = this.props.height / 2;
    return { x, y };
  }
  componentDidMount() {
    const pathElement = this.progressPath.current.getBoundingClientRect();
    const svgElement = this.svg.current.getBoundingClientRect();
    const { width, height } = pathElement;
    const svgLeft = svgElement.left;
    const svgTop = svgElement.top;
    const pathLeft = pathElement.left;
    const pathTop = pathElement.top;
    const leftDiff = Math.ceil(pathLeft - svgLeft);
    const topDiff = Math.ceil(pathTop - svgTop);
    const svgWidth = Math.floor(leftDiff * 2 + width);
    const svgHeight = Math.floor(topDiff * 2 + height);
    this.setState({ width: svgWidth, height: svgHeight });
  }
  render() {
    const { isDashed, pathLength, d, showText, slot } = this.props;
    const isShowText = showText && !slot;
    const { maskID, width, height } = this.state;
    return (
      <div className="svg-container" style={{ width: width + 'px', height: height + 'px' }}>
        <svg ref={this.svg} width={width} height={height}>
          {isDashed && (
            <mask id={maskID}>
              <path className="progress-all__mask" pathLength={pathLength} d={d} style={this.maskStyle} />
            </mask>
          )}
          <g>
            <path className="progress-path__back" pathLength={pathLength} d={d} style={this.backgroundStyle} />
            <path
              ref={this.progressPath}
              className="progress-path__item"
              pathLength={pathLength}
              d={d}
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

export default Path;
