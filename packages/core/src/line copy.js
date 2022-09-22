const Base = require('./Base')
var Line = function Line (container, options) {

    Base.apply(this, arguments);
    this.dashItemStyle = this._getDashItemStyle(this._opts)
    this.dashOuterItemStyle = this._getDashOuterItemStyle(this._opts)
    this.dashInnerItemStyle = this._getDashInnerItemStyle(this._opts)
    this.dashInnerStyle = this._getDashInnerStyle(this._opts)
    this.barStyle = this._getBarStyle(this._opts)
    this.outBarStyle = this._getOutBarStyle(this._opts)

    const { isDashed, isBackDashed, showText, slot } = this._opts

    const outerDiv = this._createDiv('progress-bar-outer', this.outBarStyle)

    const innerDashedDiv = this._createDiv('progress-bar-inner-dashed')

    const backDashDiv = this._createDiv('back-dash')

    const innerDashDiv = this._createDiv('inner-dash', this.dashInnerStyle)

    const innerDiv = this._createDiv('progress-bar-inner', this.barStyle)

    const textDiv = this._createDiv('progress-bar-text', this._opts.textStyle)

    const isShowText = showText && !slot;
    textDiv.innerHTML = isShowText ? this.content : slot

    innerDiv.appendChild(textDiv)

    this._container.appendChild(this.svgContainer);

    this.svgContainer.appendChild(outerDiv)

    const count = this._getDashCount(this._opts, outerDiv.clientWidth)

    for (let i = 0; i < count; i++) {
        let backdashItem = this._createDiv('item', this.dashOuterItemStyle)
        let innerdashItem = this._createDiv('item', this.dashInnerItemStyle)
        innerDashDiv.appendChild(innerdashItem)
        backDashDiv.appendChild(backdashItem)
    }
    if (isDashed) {
        outerDiv.appendChild(innerDashedDiv)
        if (isBackDashed) {
            innerDashedDiv.appendChild(backDashDiv)
        }
    } else {
        outerDiv.appendChild(innerDiv)
    }
    innerDashedDiv.appendChild(innerDashDiv)
    this.svgContainer.appendChild(outerDiv)
}
Line.prototype = new Base()
Line.prototype.constructor = Line

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
    const { percentage, isTransition, borderRadius, lineHeight } = opts
    style.width = percentage + '%'
    style.background = this.currentStrokeColor
    style.transition = isTransition ? 'width 0.6s ease' : ''
    style.borderRadius = borderRadius + 'px';
    style.height = lineHeight + 'px';
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
Line.prototype._createDiv = function (className, style = {}) {
    const div = document.createElement('div')
    div.setAttribute('class', className)
    for (let key in style) {
        div.style[key] = style[key]
    }
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