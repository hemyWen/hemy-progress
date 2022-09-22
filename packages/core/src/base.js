const utils = require('./utils')
const defaultOpts = {
  type: 'line',
  percentage: 0,
  fillColor: 'none',
  strokeColor: '#409eff',
  backStrokeColor: '#eee',
  backStrokeWidth: 5,
  textStyle: {},
  showText: true,
  format: null,
  width: 200,
  height: 200,
  strokeWidth: 5,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  strokeMiterlimit: 0,
  radius: 50,
  isFan: false,
  borderRadius: 0,
  rx: 90,
  ry: 40,
  pathLength: 1000,
  d: '',
  isDashed: false,
  isBackDashed: true,
  dashedLength: 5,
  dashedDistance: 3,
  isTransition: true,
  slot: '',
  lineHeight: 30,
}
var Base = function Base (container, opts) {
  if (arguments.length === 0) {
    return
  }
  if (!(this instanceof Base)) {
    throw new Error('Constructor was called without new keyword');
  }
  const cloneObj = utils.deepClone(defaultOpts)
  //目标dom
  let element;
  if (utils.isString(container)) {
    element = document.querySelector(container);
  } else {
    element = container;
  }
  if (!element) {
    throw new Error('Container does not exist: ' + container);
  }
  this._container = element;
  this._opts = utils.extend(cloneObj, opts, true)

  if (this._opts.type !== 'line') {
    this.svgContainer = this._getSvgContainer(this._opts)
    this.svgView = this._getSvgView(this._opts)
    this.mask = this._getMaskElement(this._opts)
    this.backProgressElement = this._getBackProgressElement(this._opts)
    this.progressElement = this._getProgressElement(this._opts)
    this.textElement = this._getTextElement(this._opts)
    this.slotElement = this._getSlotElement(this._opts)
  }
  this.addElement(this._opts)
  this.setProgress(this._opts)
}
//添加节点
Base.prototype.addElement = function (opts) {
  const { isDashed, showText, slot } = opts
  this.svgView.appendChild(this.mask)
  this.svgView.appendChild(this.backProgressElement)
  this.svgView.appendChild(this.progressElement)
  this.svgView.appendChild(this.textElement)
  this.svgContainer.appendChild(this.svgView)
  this.svgContainer.appendChild(this.slotElement)
  this._container.appendChild(this.svgContainer)
  this.svgContainer.appendChild(this.addStyle())
}
//设置进度条
Base.prototype.setProgress = function (opts) {

  if (!utils.isObject(opts)) {
    throw new Error('opts must be a object');
  }
  this._opts = utils.extend(this._opts, opts, true)


  this.content = this._getContent(this._opts)

  this.perimeter = this._getPerimeter(this._opts)
  this.centerPoint = this._getCenterPoint(this._opts)
  this.strokeDasharray = this._getStrokeDasharray(this._opts)
  this.strokeDashoffset = this._getStrokeDashoffset(this._opts)
  this.currentStrokeColor = this._getCurrentStrokeColor(this._opts)

  this.setSvgContainer(this._opts)
  this._setSvgView(this._opts)
  this._setMaskElementStyle(this._opts)
  this._setBackProgressElementStyle(this._opts)
  this._setProgressElementStyle(this._opts)
  this._setTextStyle(this._opts)
  this._setSlotContent(this._opts)

  //如果是自定义图形,要重新设置svg宽高
  if (this._opts.type === 'path') {
    const { width, height } = this._getSvgSize()
    this.svgContainer.style.width = width + 'px'
    this.svgContainer.style.height = height + 'px'
    this.svgView.setAttribute('width', width);
    this.svgView.setAttribute('height', height);
    this.textElement.setAttribute('x', width / 2)
    this.textElement.setAttribute('y', height / 2)
  }
}
//设置svg容器
Base.prototype.setSvgContainer = function (opts) {
  let { width, height, type, strokeWidth, lineHeight } = opts
  let widthStr = width + 'px'
  let heightStr = height + 'px'
  if (type === 'rect') {
    widthStr = width + strokeWidth + 'px'
    heightStr = height + strokeWidth + 'px'
  } else if (type === 'line') {
    widthStr = '100%'
    heightStr = lineHeight + 'px'
  }
  this.svgContainer.style.width = widthStr
  this.svgContainer.style.height = heightStr
}
//设置svg样式
Base.prototype._setSvgView = function (opts) {
  let { width, height, type, strokeWidth } = opts
  if (type === 'rect') {
    width = width + strokeWidth
    height = height + strokeWidth
  }
  this.svgView.setAttribute('width', width);
  this.svgView.setAttribute('height', height);
}
//设置蒙版进度条样式
Base.prototype._setMaskElementStyle = function (opts) {
  if (opts.isDashed) {
    this.mask.style.display = 'block'

    const style = this._getMaskStyle(opts)
    const maskProgressElement = this.mask.firstChild
    maskProgressElement.style = {}
    for (let key in style) {
      maskProgressElement.style[key] = style[key]
    }
    this._setElementAttribute(maskProgressElement, opts)
  } else {
    this.mask.style.display = 'none'
  }
}
//设置背景进度条样式
Base.prototype._setBackProgressElementStyle = function (opts) {
  const style = this._getBackgroundStyle(opts)
  this.backProgressElement.style = {}
  for (let key in style) {
    this.backProgressElement.style[key] = style[key]
  }
  this._setElementAttribute(this.backProgressElement, opts)
}
//设置进度条样式
Base.prototype._setProgressElementStyle = function (opts) {
  const style = this._getStyle(opts)
  this.progressElement.style = {}
  for (let key in style) {
    this.progressElement.style[key] = style[key]
  }
  this._setElementAttribute(this.progressElement, opts)
}
//设置文字区域样式
Base.prototype._setTextStyle = function (opts) {
  const { type, showText, slot } = opts
  const isShowText = showText && !slot
  if (isShowText) {
    const { x, y } = this.centerPoint
    const style = this._getTextStyle(opts)
    this.textElement.setAttribute('x', x)
    this.textElement.setAttribute('y', y)
    this.textElement.style = {}
    for (let key in style) {
      this.textElement.style[key] = style[key]
    }
    this.textElement.innerHTML = this.content
  } else {
    this.textElement.style.display = 'none'
  }

}
//设置自定义内容
Base.prototype._setSlotContent = function (opts) {
  this.slotElement.innerHTML = opts.slot
}


//获取svg容器
Base.prototype._getSvgContainer = function () {
  const svgContainer = document.createElement('div')
  svgContainer.setAttribute('class', 'svg-container')
  return svgContainer
}
//获取svg标签
Base.prototype._getSvgView = function (opts) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  return svg
}
//获取蒙版
Base.prototype._getMaskElement = function (opts) {
  const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
  mask.setAttribute('id', this.state.maskID)
  const element = this._getCurrentShapeElement(opts)
  element.setAttribute('class', 'progress-all__mask')
  element.setAttribute('fill', 'none')
  mask.appendChild(element)
  return mask
}
//获取背景进度条
Base.prototype._getBackProgressElement = function (opts) {
  const element = this._getCurrentShapeElement(opts)
  const className = `progress-${opts.type}__back`
  element.setAttribute('class', className)
  return element
}
//获取进度条
Base.prototype._getProgressElement = function (opts) {
  const element = this._getCurrentShapeElement(opts)
  const className = `progress-${opts.type}__item`
  element.setAttribute('class', className)
  element.setAttribute('fill', 'none')
  return element
}
//获取文字节点
Base.prototype._getTextElement = function (opts) {
  let element = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  const className = `progress-${opts.type}-text`
  element.setAttribute('class', className)
  element.setAttribute('text-anchor', 'middle')
  element.setAttribute('dominant-baseline', 'middle')
  return element
}
//获取自定义区域
Base.prototype._getSlotElement = function () {
  const slot = document.createElement('div')
  slot.setAttribute('class', 'slot-container')
  return slot
}
//获取蒙版样式
Base.prototype._getMaskStyle = function (opts) {
  const { strokeWidth, isTransition } = opts
  const stroke = 'white'
  const strokeDasharray = this.perimeter
  const strokeDashoffset = this.strokeDashoffset
  const style = { stroke, strokeDasharray, strokeDashoffset, strokeWidth }
  if (isTransition) {
    style.transition = 'stroke-dashoffset 0.6s ease'
  }
  return style
}
//获取背景进度条样式
Base.prototype._getBackgroundStyle = function (opts) {
  const { fillColor, backStrokeColor, backStrokeWidth, strokeLinejoin, isDashed, isBackDashed, isFan, radius, borderRadius } = opts
  const { type } = this.state
  let style = {
    fill: fillColor,
    strokeLinejoin,
    stroke: backStrokeColor,
    strokeWidth: backStrokeWidth
  }
  if (isDashed && isBackDashed) {
    style.strokeDasharray = this.strokeDasharray
  }
  if (type === 'circle' && isFan) {
    style.strokeWidth = radius * 2
  }
  //当type=rect时
  if (type === 'rect') {
    style.rx = borderRadius
    style.ry = borderRadius
  }
  return style
}
//获取进度条样式
Base.prototype._getStyle = function (opts) {
  const {
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    radius,
    isFan,
    isDashed,
    borderRadius,
    isTransition
  } = opts
  const strokeDasharray = this.strokeDasharray
  const stroke = this.currentStrokeColor
  const { type, maskID } = this.state
  let style = {
    stroke,
    strokeWidth,
    strokeDasharray,
    strokeLinecap,
    strokeLinejoin
  }
  if (isDashed) {
    style.mask = `url(#${maskID})`
  } else {
    style.strokeDashoffset = this.strokeDashoffset
  }
  //type=circle的扇形时
  if (type === 'circle' && isFan) {
    style.strokeWidth = radius * 2
    style.strokeLinecap = 'butt'
  }
  //当type=rect时
  if (type === 'rect') {
    style.rx = borderRadius
    style.ry = borderRadius
  }
  if (isTransition) {
    style.transition = 'stroke-dashoffset 0.6s ease'
  }
  return style
}
//获取文字样式
Base.prototype._getTextStyle = function (opts) {
  const { textStyle } = opts
  return { ...textStyle, fill: textStyle.color, display: 'block' }
}
//获取当前进度条颜色
Base.prototype._getCurrentStrokeColor = function (opts) {
  const { strokeColor, percentage } = opts
  if (typeof strokeColor === 'function') {
    return strokeColor(percentage)
  } else if (typeof strokeColor === 'string') {
    return strokeColor
  } else {
    return getCurrentColor(strokeColor, percentage)
  }
}
//获取文字内容
Base.prototype._getContent = function (opts) {
  const { percentage, format } = opts
  if (typeof format === 'function') {
    return format(percentage) || ''
  } else {
    // return ''
    return `${percentage}%`
  }
}
//虚线长度和间隙
Base.prototype._getStrokeDasharray = function (opts) {
  const { isDashed, dashedLength, dashedDistance } = opts
  if (isDashed) {
    return dashedLength + ' ' + dashedDistance
  }
  return this.perimeter
}
//当前进度(虚线偏移量)
Base.prototype._getStrokeDashoffset = function (opts) {
  const { percentage } = opts
  const dashoffset = '' + (this.perimeter * (100 - percentage)) / 100
  return dashoffset
}
Base.prototype.addStyle = function () {
  const style = document.createElement('style')
  style.type = 'text/css';
  style.innerHTML = `
    .progress-container {
        width: 100%;
      }
      .progress-bar-outer {
        width: 100%;
        overflow: hidden;
        position: relative;
        vertical-align: middle;
      }
      .progress-bar-inner {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        text-align: right;
        line-height: 0;
        white-space: nowrap;
      }
      .progress-bar-inner::after {
        display: inline-block;
        content: '';
        height: 100%;
        vertical-align: middle;
      }
      .progress-bar-text {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        font-size: 12px;
        margin: 0 5px;
      }
      .progress-bar-inner-dashed {
        width: 100%;
        height: 100%;
        position: relative;
      }
      .progress-bar-inner-dashed .back-dash {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
      }
      .progress-bar-inner-dashed .back-dash,
      .progress-bar-inner-dashed .inner-dash {
        display: flex;
        height: 100%;
        overflow: hidden;
      }
      .progress-bar-inner-dashed  .dash-item {
        flex: 0 0 auto;
        height: 100%;
      }
      .progress-circle-text {
        color: #fff;
      }
      .progress-circle__back,
      .progress-circle__item {
        transform: rotate(-90deg);
        transform-origin: center;
        transform-box: fill-box;
      }
      .svg-container {
        position: relative;
      }
      .svg-container .slot-container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `
  return style
}
//周长
Base.prototype._getPerimeter = function (opts) { }

//中心点
Base.prototype._getCenterPoint = function (opts) { }

//坐标点
Base.prototype._getOrigin = function (opts) { }

//周长
Base.prototype._getPerimeter = function (opts) { }


function getColorArray (color) {
  const span = 100 / color.length
  return color.map((item, index) => {
    if (typeof item === 'string') {
      return {
        color: item,
        percentage: (index + 1) * span
      }
    }
    return item
  })
}
function getCurrentColor (color, percentage) {
  const colorArray = getColorArray(color).sort((a, b) => a.percentage - b.percentage)
  for (let i = 0; i < colorArray.length; i++) {
    if (colorArray[i].percentage > percentage) {
      return colorArray[i].color
    }
  }
  return colorArray[colorArray.length - 1].color
}

module.exports = Base;