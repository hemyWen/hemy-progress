<template>
  <div class="svg-container" :style="{ width: width + 'px', height: height + 'px' }">
    <svg :width="width" :height="height">
      <mask v-if="isDashed" :id="maskID">
        <ellipse
          class="progress-all__mask"
          fill="none"
          :pathLength="perimeter"
          :cx="centerPoint.x"
          :cy="centerPoint.y"
          :rx="rx"
          :ry="ry"
          :style="maskStyle"
        />
      </mask>
      <g>
        <ellipse
          class="progress-ellipse__back"
          :pathLength="perimeter"
          :cx="centerPoint.x"
          :cy="centerPoint.y"
          :rx="rx"
          :ry="ry"
          :style="backgroundStyle"
        />
        <ellipse
          class="progress-ellipse__item"
          :pathLength="perimeter"
          :cx="centerPoint.x"
          :cy="centerPoint.y"
          :rx="rx"
          :ry="ry"
          :style="style(maskID)"
          fill="none"
        />
        <text
          class="progress-ellipse__text"
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
      maskID: 'progress_ellipse_mask',
    };
  },
  setup(props, context) {
    const centerPoint = computed(() => {
      const x = props.width / 2;
      const y = props.height / 2;
      return { x, y };
    });
    //椭圆周长 L=2πb+4(a-b)decrease
    const perimeter = computed(() => {
      const x = props.rx;
      const y = props.ry;
      const d = x >= y ? y : x;
      const L = 2 * Math.PI * d + 4 * Math.abs(x - y);
      return L;
    });
    const params = useParams(props, context, perimeter);
    return { ...params, centerPoint, perimeter };
  },
};
</script>
