<template>
  <div class="progress-container">
    <component :is="componentName" v-bind="$attrs" :type="type">
      <slot></slot>
    </component>
  </div>
</template>
<script>
import ProgressLine from './line.vue';
import ProgressCircle from './circle.vue';
import ProgressRect from './rect.vue';
import ProgressEllipse from './ellipse.vue';
import ProgressPath from './path.vue';
export default {
  name: 'HemyProgress',
  components: { ProgressLine, ProgressCircle, ProgressRect, ProgressEllipse, ProgressPath },
  props: {
    type: {
      type: String,
      default: 'line',
    },
  },
  computed: {
    componentName() {
      switch (this.type) {
        case 'line':
          return 'ProgressLine';
        case 'circle':
          return 'ProgressCircle';
        case 'rect':
          return 'ProgressRect';
        case 'ellipse':
          return 'ProgressEllipse';
        case 'path':
          return 'ProgressPath';
        default:
          return 'div';
      }
    },
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style>
@import './progress.css';
</style>
