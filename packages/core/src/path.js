const Base = require('./Base')
var Path = function Path (container, options) {
    this.state = {
        type: 'path',
        maskID: 'progress_path_mask'
    }
    Base.apply(this, arguments);

}
Path.prototype = new Base()
Path.prototype.constructor = Path

//获取周长
Path.prototype._getPerimeter = function (opts) {
    return opts.pathLength;
};
//获取中心点
Path.prototype._getCenterPoint = function (opts) {
    const { width, height } = opts
    const x = width / 2
    const y = height / 2
    return { x, y }
}
Path.prototype._getCurrentShapeElement = function (opts) {
    const { pathLength, d } = opts
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    element.setAttribute('pathLength', pathLength)
    element.setAttribute('d', d)
    return element
};
Path.prototype._getSvgSize = function (opts) {
    const pathSize = this.progressElement.getBoundingClientRect();
    const svgSize = this.svgView.getBoundingClientRect();
    const { width, height } = pathSize;
    const svgLeft = svgSize.left;
    const svgTop = svgSize.top;
    const pathLeft = pathSize.left;
    const pathTop = pathSize.top;
    const leftDiff = Math.ceil(pathLeft - svgLeft);
    const topDiff = Math.ceil(pathTop - svgTop);
    const svgWidth = Math.floor(leftDiff * 2 + width);
    const svgHeight = Math.floor(topDiff * 2 + height);
    return { width: svgWidth, height: svgHeight }
}
Path.prototype._setElementAttribute = function (element, opts) {
    const { pathLength, d } = opts
    element.setAttribute('pathLength', pathLength)
    element.setAttribute('d', d)
};
module.exports = Path;