const Base = require('./Base')
var Ellipse = function Ellipse (container, options) {
    this.state = {
        type: 'ellipse',
        maskID: 'progress_ellipse_mask'
    }
    Base.apply(this, arguments);

}
Ellipse.prototype = new Base()
Ellipse.prototype.constructor = Ellipse


//获取中心点
Ellipse.prototype._getCenterPoint = function (opts) {
    const { width, height } = opts
    const x = width / 2
    const y = height / 2
    return { x, y }
}

//获取周长
Ellipse.prototype._getPerimeter = function (opts) {
    const x = opts.rx
    const y = opts.ry
    const d = x >= y ? y : x
    const L = 2 * Math.PI * d + 4 * Math.abs(x - y)
    return L
}

//获取坐标点
Ellipse.prototype._getOrigin = function (opts) {
    return opts.strokeWidth / 2
}

Ellipse.prototype._getCurrentShapeElement = function (opts) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
    return element
}
Ellipse.prototype._setElementAttribute = function (element, opts) {
    const { rx, ry } = opts
    const { x, y } = this.centerPoint
    element.setAttribute('cx', x)
    element.setAttribute('cy', y)
    element.setAttribute('rx', rx)
    element.setAttribute('ry', ry)
    element.setAttribute('pathLength', this.perimeter)
}
module.exports = Ellipse;