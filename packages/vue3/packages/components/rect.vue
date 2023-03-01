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
          :style="style(maskID)"
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
      maskID: 'progress_rect_mask',
    };
  },
  setup(props, context) {
    const centerPoint = computed(() => {
      const x = (props.strokeWidth + props.width) / 2;
      const y = (props.strokeWidth + props.height) / 2;
      return { x, y };
    });
    //矩形周长
    const perimeter = computed(() => {
      return (Number(props.width) + Number(props.height)) * 2;
    });
    const origin = computed(() => {
      return props.strokeWidth / 2;
    });
    const params = useParams(props, context, perimeter);
    return { ...params, centerPoint, perimeter, origin };
  },
};
</script>
