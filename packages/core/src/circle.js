const Base = require('./Base')
var Circle = function Circle (container, options) {

    this.state = {
        type: 'circle',
        maskID: 'progress_circle_mask'
    }
    Base.apply(this, arguments);
}
Circle.prototype = new Base()
Circle.prototype.constructor = Circle

//获取中心点
Circle.prototype._getCenterPoint = function (opts) {
    const { width } = opts
    return { x: width / 2, y: width / 2 }
}

//获取周长
Circle.prototype._getPerimeter = function (opts) {
    return 2 * Math.PI * opts.radius
};

Circle.prototype._getCurrentShapeElement = function (opts) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    return element
};
Circle.prototype._setElementAttribute = function (element, opts) {
    const { radius } = opts
    const { x, y } = this.centerPoint
    element.setAttribute('cx', x)
    element.setAttribute('cy', y)
    element.setAttribute('r', radius)
};
module.exports = Circle;