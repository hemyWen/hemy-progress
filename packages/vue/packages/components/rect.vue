<!--
 * @Author: whm
 * @Date: 2022-08-03 16:25:55
 * @LastEditTime: 2022-09-16 11:03:40
 * @Description: 矩形
-->
<template>
  <div class="svg-container" :style="{ width: strokeWidth + width + 'px', height: strokeWidth + height + 'px' }">
    <svg :width="strokeWidth + width" :height="strokeWidth + height">
      <mask v-if="isDashed" :id="maskID">
        <rect
          class="progress-all__mask"
          fill="none"
          :x="origin"
          :y="origin"
          :width="width"
          :height="height"
          :style="maskStyle"
        />
      </mask>
      <g>
        <rect
          class="progress-rect__back"
          :x="origin"
          :y="origin"
          :width="width"
          :height="height"
          :style="backgroundStyle"
        />
        <rect
          class="progress-rect__item"
          :x="origin"
          :y="origin"
          :width="width"
          :height="height"
          :style="style"
          fill="none"
        />
        <text
          class="progress-rect__text"
          v-if="isShowText"
          :x="centerPoint.x"
          :y="centerPoint.y"
          text-anchor="middle"
          dominant-baseline="middle"
          :style="svgTextStyle"
        >
          {{ content }}
        </text>
      </g>
    </svg>
    <div class="slot-container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import mixin from './mixin.js'
export default {
  mixins: [mixin],

  computed: {
    centerPoint() {
      const x = (this.strokeWidth + this.width) / 2
      const y = (this.strokeWidth + this.height) / 2
      return { x, y }
    },
    //矩形周长
    perimeter() {
      return (Number(this.width) + Number(this.height)) * 2
    },
    origin() {
      return this.strokeWidth / 2
    }
  },
  data() {
    return {
      type: 'rect',
      maskID: 'progress_rect_mask'
    }
  }
}
</script>
