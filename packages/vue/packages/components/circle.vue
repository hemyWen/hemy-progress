<!--
 * @Author: whm
 * @Date: 2022-08-10 09:15:49
 * @LastEditTime: 2022-09-16 11:04:35
 * @Description: 
-->
<template>
  <div class="svg-container" :style="{ width: width + 'px', height: width + 'px' }">
    <svg :width="width" :height="width">
      <mask v-if="isDashed" :id="maskID">
        <circle
          class="progress-all__mask"
          :cx="centerPoint.x"
          :cy="centerPoint.y"
          :r="radius"
          fill="none"
          :style="maskStyle"
        ></circle>
      </mask>
      <g>
        <!--  环形背景 -->
        <circle
          class="progress-circle__back"
          :cx="centerPoint.x"
          :cy="centerPoint.y"
          :r="radius"
          :style="backgroundStyle"
        ></circle>
        <!--  环形 -->
        <circle
          class="progress-circle__item"
          :cx="centerPoint.x"
          :cy="centerPoint.y"
          :r="radius"
          :style="style"
          fill="none"
        ></circle>
        <text
          class="progress-circle-text"
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
      const x = this.width / 2
      const y = x
      return { x, y }
    },
    //环形周长
    perimeter() {
      return 2 * Math.PI * this.radius
    }
  },
  data() {
    return {
      type: 'circle',
      maskID: 'progress_circle_mask'
    }
  }
}
</script>
