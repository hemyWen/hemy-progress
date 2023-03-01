<!--
 * @Author: whm
 * @Date: 2022-08-10 09:15:49
 * @LastEditTime: 2023-03-01 11:16:58
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
          :style="style(maskID)"
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
<script lang="ts">
import { computed } from 'vue';
import { useParams } from './useParams';
import Props from './props';
export default {
  props: {
    ...Props,
  },
  data() {
    return {
      maskID: 'progress_circle_mask',
    };
  },
  setup(props, context) {
    const centerPoint = computed(() => {
      const x = props.width / 2;
      const y = x;
      return { x, y };
    });
    //环形周长
    const perimeter = computed(() => {
      return 2 * Math.PI * props.radius;
    });
    const params = useParams(props, context, perimeter);
    return { ...params, centerPoint, perimeter };
  },
};
</script>
