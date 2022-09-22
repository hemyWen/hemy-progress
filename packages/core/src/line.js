const Base = require('./Base')
const utils = require('./utils')
var Line = function Line (container, opts) {
    this.outerDiv = this._createDiv('progress-bar-outer')
    this.barInnerDashedDiv = this._createDiv('progress-bar-inner-dashed')
    this.innerDiv = this._createDiv('progress-bar-inner')
    this.textDiv = this._createDiv('progress-bar-text')
    this.backDashDiv = this._createDiv('back-dash')
    this.innerDashDiv = this._createDiv('inner-dash')
    Base.apply(this, arguments);


}
Line.prototype = new Base()
Line.prototype.constructor = Line
//添加节点
Line.prototype.addElement = function (opts) {

    this.innerDiv.appendChild(this.textDiv)

    this.outerDiv.appendChild(this.barInnerDashedDiv)
    this.outerDiv.appendChild(this.innerDiv)

    this.barInnerDashedDiv.appendChild(this.backDashDiv)
    this.barInnerDashedDiv.appendChild(this.innerDashDiv)

    this._container.appendChild(this.outerDiv)

    this.outerDiv.appendChild(this.addStyle())
}
//设置虚线
Line.prototype._addDashed = function (opts) {
    const { isDashed, isBackDashed } = opts
    this.backDashDiv.innerHTML = ''
    this.innerDashDiv.innerHTML = ''

    const count = this._getDashCount(opts, this.outerDiv.clientWidth)

    for (let i = 0; i < count; i++) {
        if (isBackDashed) {
            let backdashItem = this._createDiv('dash-item')
            this._setElementStyle(backdashItem, this.dashOuterItemStyle)
            this.backDashDiv.appendChild(backdashItem)
        }
        let innerdashItem = this._createDiv('dash-item')
        this._setElementStyle(innerdashItem, this.dashInnerItemStyle)
        this.innerDashDiv.appendChild(innerdashItem)
    }

}
Line.prototype.setProgress = function (opts) {


    if (!utils.isObject(opts)) {
        throw new Error('opts must be a object');
    }
    this._opts = utils.extend(this._opts, opts, true)
    this.content = this._getContent(this._opts)
    this.currentStrokeColor = this._getCurrentStrokeColor(this._opts)

    this.barInnerDashedStyle = this._getBarInnerDashedStyle(this._opts)
    this.dashItemStyle = this._getDashItemStyle(this._opts)
    this.dashOuterItemStyle = this._getDashOuterItemStyle(this._opts)
    this.dashInnerItemStyle = this._getDashInnerItemStyle(this._opts)
    this.dashInnerStyle = this._getDashInnerStyle(this._opts)
    this.barStyle = this._getBarStyle(this._opts)
    this.outBarStyle = this._getOutBarStyle(this._opts)

    const { isDashed, isBackDashed, showText, slot } = this._opts
    const isShowText = showText && !slot

    this._setElementStyle(this.outerDiv, this.outBarStyle)
    this._setElementStyle(this.innerDashDiv, this.dashInnerStyle)
    this._setElementStyle(this.innerDiv, this.barStyle)
    this._setElementStyle(this.textDiv, this._opts.textStyle)
    this._setElementStyle(this.barInnerDashedDiv, this.barInnerDashedStyle)

    isDashed && this._addDashed(this._opts)
    this.textDiv.innerHTML = isShowText ? this.content : slot
}
Line.prototype._setElementStyle = function (element, style = {}) {
    element.style = {}
    for (let key in style) {
        element.style[key] = style[key]
    }
}
Line.prototype._getBarInnerDashedStyle = function (opts) {
    const style = {}
    const { isDashed } = opts
    style.display = isDashed ? '' : 'none'

    return style
}
Line.prototype._getDashItemStyle = function (opts) {
    const style = {}
    const { dashedLength, dashedDistance } = opts
    style.width = dashedLength + 'px'
    style.marginRight = dashedDistance + 'px'
    return style
}
Line.prototype._getDashOuterItemStyle = function (opts) {
    const style = {}
    const { backStrokeColor } = opts
    style.background = backStrokeColor
    style.zIndex = 10

    return { ...this.dashItemStyle, ...style }
}
Line.prototype._getDashInnerItemStyle = function (opts) {
    const style = {}
    style.background = this.currentStrokeColor

    style.zIndex = 99
    return { ...this.dashItemStyle, ...style }
}
Line.prototype._getDashInnerStyle = function (opts) {
    const style = {}
    const { percentage } = opts
    style.width = percentage + '%'
    return style
}
Line.prototype._getBarStyle = function (opts) {
    const style = {}
    const { percentage, isTransition, borderRadius, lineHeight, isDashed } = opts
    style.width = percentage + '%'
    style.background = this.currentStrokeColor
    style.transition = isTransition ? 'width 0.6s ease' : ''
    style.borderRadius = borderRadius + 'px';
    style.height = lineHeight + 'px';
    style.display = isDashed ? 'none' : ''
    return style
}
Line.prototype._getOutBarStyle = function (opts) {
    const style = {}
    const { isDashed, isBackDashed, backStrokeColor, borderRadius, lineHeight } = opts
    if (!isDashed) {
        style.background = backStrokeColor

    }
    style.borderRadius = borderRadius + 'px';
    style.height = lineHeight + 'px';
    return style
}

// 创建div
Line.prototype._createDiv = function (className) {
    const div = document.createElement('div')
    div.setAttribute('class', className)
    return div
}
//获取虚线数
Line.prototype._getDashCount = function (opts, width) {
    const { dashedLength, dashedDistance } = opts
    const length = Number(dashedLength) + Number(dashedDistance)
    const count = Math.ceil(width / length) + 1
    return count
}


module.exports = Line;