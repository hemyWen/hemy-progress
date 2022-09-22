<!--
 * @Author: whm
 * @Date: 2022-08-08 09:00:08
 * @LastEditTime: 2022-09-16 15:03:36
 * @Description: 复杂图形
-->
<template>
  <div class="svg-container" :style="{ width: svgWidth + 'px', height: svgHeight + 'px' }">
    <svg ref="svg" :width="svgWidth" :height="svgHeight">
      <mask v-if="isDashed" :id="maskID">
        <path class="progress-all__mask" fill="none" :pathLength="pathLength" :d="d" :style="maskStyle" />
      </mask>
      <g>
        <path class="progress-path__back" :pathLength="pathLength" :d="d" :style="backgroundStyle" />
        <path
          ref="progressPath"
          class="progress-path__item"
          :pathLength="pathLength"
          :d="d"
          :style="style"
          fill="none"
        />
        <text
          class="progress-path__text"
          v-if="isShowText"
          :x="svgWidth / 2"
          :y="svgHeight / 2"
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
    perimeter() {
      return this.pathLength
    }
  },
  mounted() {
    const pathElement = this.$refs.progressPath.getBoundingClientRect()
    const svgElement = this.$refs.svg.getBoundingClientRect()
    const { width, height } = pathElement
    const svgLeft = svgElement.left
    const svgTop = svgElement.top
    const pathLeft = pathElement.left
    const pathTop = pathElement.top
    const leftDiff = Math.ceil(pathLeft - svgLeft)
    const topDiff = Math.ceil(pathTop - svgTop)

    this.svgWidth = leftDiff * 2 + width
    this.svgHeight = topDiff * 2 + height
  },
  data() {
    return {
      type: 'path',
      maskID: 'progress_path_mask',
      svgWidth: 0,
      svgHeight: 0
    }
  }
}
</script>
