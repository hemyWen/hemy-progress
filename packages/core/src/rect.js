const Base = require('./Base')
var Rect = function Rect (container, options) {
    this.state = {
        type: 'rect',
        maskID: 'progress_rect_mask'
    }
    Base.apply(this, arguments);

}
Rect.prototype = new Base()
Rect.prototype.constructor = Rect


//获取中心点
Rect.prototype._getCenterPoint = function (opts) {
    const { strokeWidth, width, height } = opts
    const x = (strokeWidth + width) / 2
    const y = (strokeWidth + height) / 2
    return { x, y }
}

//获取周长
Rect.prototype._getPerimeter = function (opts) {
    const { width, height } = opts
    return (Number(width) + Number(height)) * 2
}

//获取坐标点
Rect.prototype._getOrigin = function (opts) {
    return opts.strokeWidth / 2
}

Rect.prototype._getCurrentShapeElement = function (opts) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    return element
}
Rect.prototype._setElementAttribute = function (element, opts) {
    const { width, height, strokeWidth } = opts
    const origin = this._getOrigin(opts)
    element.setAttribute('x', origin)
    element.setAttribute('y', origin)
    element.setAttribute('width', width)
    element.setAttribute('height', height)
}

module.exports = Rect;