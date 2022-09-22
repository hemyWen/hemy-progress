/*
 * @Author: whm
 * @Date: 2022-08-02 15:04:28
 * @LastEditTime: 2022-09-15 10:51:46
 * @Description:混入
 */
export default {
  props: {
    //进度条百分比
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: (val) => val >= 0 && val <= 100
    },
    //闭合图形颜色,type!==line生效
    fillColor: {
      type: String,
      default: 'none'
    },
    // 进度条背景色
    strokeColor: {
      type: [String, Array, Function],
      default: '#409eff'
    },
    // 	进度环背景的颜色
    backStrokeColor: {
      type: String,
      default: '#eee'
    },
    //背景边框的宽度
    backStrokeWidth: {
      type: Number,
      default: 5
    },
    //文字样式
    textStyle: {
      type: Object,
      default: () => ({})
    },
    //是否显示文字
    showText: {
      type: Boolean,
      default: true
    },
    format: Function,
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    //进度条宽度
    strokeWidth: {
      type: Number,
      default: 5
    },
    //环形条线帽 butt:正常结尾,round:圆润,square:两端为方形
    strokeLinecap: {
      type: String,
      default: 'butt',
      validator: (value) => ['butt', 'round', 'square'].includes(value)
    },
    //线段连接处的样式 ,miter:正常连接,round:圆润,bevel:切除连接处的尖尖部分
    strokeLinejoin: {
      type: String,
      default: 'miter',
      validator: (value) => ['miter', 'round', 'bevel'].includes(value)
    },
    //连接处的宽度和线条宽度的比
    strokeMiterlimit: {
      type: Number,
      default: 0
    },
    //环形半径
    radius: {
      type: Number,
      default: 50
    },
    //是否为扇形
    isFan: {
      type: Boolean,
      default: false
    },
    //圆角半径,type=rect时生效
    borderRadius: {
      type: Number,
      default: 0
    },
    //type=ellispe椭圆时的长半轴
    rx: {
      type: Number,
      default: 90
    },
    //type=ellispe椭圆时的短半轴
    ry: {
      type: Number,
      default: 50
    },
    //当type=path时,自定义图形路径总长度
    pathLength: {
      type: Number,
      default: 1000
    },
    //当type=path时必填,图形的定义路径,必填
    d: {
      type: String
    },
    //是否为虚线
    isDashed: {
      type: Boolean,
      default: false
    },
    //背景是否为虚线
    isBackDashed: {
      type: Boolean,
      default: true
    },
    //虚线长度
    dashedLength: {
      type: Number,
      default: 5
    },
    //虚线间隔
    dashedDistance: {
      type: Number,
      default: 5
    },
    //是否使用过度动画
    isTransition: {
      type: Boolean,
      default: true
    },
    //type=line时的高度
    lineHeight: {
      type: Number,
      default: 30
    }
  },
  computed: {
    //文字内容
    content () {
      if (typeof this.format === 'function') {
        return this.format(this.percentage) || ''
      } else {
        return `${this.percentage}%`
      }
    },
    //文字样式
    svgTextStyle () {
      return { ...this.textStyle, fill: this.textStyle.color }
    },
    //当前进度条颜色
    currentStrokeColor () {
      if (typeof this.strokeColor === 'function') {
        return this.strokeColor(this.percentage)
      } else if (typeof this.strokeColor === 'string') {
        return this.strokeColor
      } else {
        return this.getCurrentColor(this.percentage)
      }
    },
    //虚线长度和间隙
    strokeDasharray () {
      if (this.isDashed) {
        return this.dashedLength + ' ' + this.dashedDistance
      }
      return this.perimeter
    },
    //当前进度(虚线偏移量)
    strokeDashoffset () {
      const dashoffset = '' + (this.perimeter * (100 - this.percentage)) / 100
      return dashoffset
    },
    //进度条样式
    style () {
      const {
        strokeWidth,
        strokeLinecap,
        strokeLinejoin,
        radius,
        isFan,
      } = this.$props
      const strokeDasharray = this.strokeDasharray
      const stroke = this.currentStrokeColor
      let style = {
        stroke,
        strokeWidth,
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin
      }
      if (this.isDashed) {
        style.mask = `url(#${this.maskID})`
      } else {
        style.strokeDashoffset = this.strokeDashoffset
      }
      //type=circle的扇形时
      if (this.type === 'circle' && isFan) {
        style.strokeWidth = radius * 2
        style.strokeLinecap = 'butt'
      }
      //当type=rect时
      if (this.type === 'rect') {
        style.rx = this.borderRadius
        style.ry = this.borderRadius
      }
      if (this.isTransition) {
        style.transition = 'stroke-dashoffset 0.6s ease'
      }
      return style
    },
    //背景样式
    backgroundStyle () {
      const { fillColor, backStrokeColor, backStrokeWidth, strokeLinejoin, radius, isFan } = this.$props
      let style = {
        fill: fillColor,
        strokeLinejoin,
        stroke: backStrokeColor,
        strokeWidth: backStrokeWidth
      }
      if (this.isDashed && this.isBackDashed) {
        style.strokeDasharray = this.strokeDasharray
      }
      if (this.type === 'circle' && isFan) {
        style.strokeWidth = radius * 2
      }
      //当type=rect时
      if (this.type === 'rect') {
        style.rx = this.borderRadius
        style.ry = this.borderRadius
      }
      return style
    },
    //蒙版样式
    maskStyle () {
      const stroke = 'white'
      const strokeWidth = this.strokeWidth
      const strokeDasharray = this.perimeter
      const strokeDashoffset = this.strokeDashoffset
      const style = { stroke, strokeDasharray, strokeDashoffset, strokeWidth }
      if (this.isTransition) {
        style.transition = 'stroke-dashoffset 0.6s ease'
      }
      return style
    },
    isShowText () {
      const slot = this.$slots
      return this.showText && !slot.default
    }
  },
  methods: {
    //获取当前颜色
    getCurrentColor (percentage) {
      const colorArray = this.getColorArray().sort((a, b) => a.percentage - b.percentage)
      for (let i = 0; i < colorArray.length; i++) {
        if (colorArray[i].percentage > percentage) {
          return colorArray[i].color
        }
      }
      return colorArray[colorArray.length - 1].color
    },
    //获取color数组
    getColorArray () {
      const color = this.strokeColor
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
  }
}
