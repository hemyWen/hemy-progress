<template>
  <div id="app">
    <div class="container">
      <div class="item" style="margin-left: 200px">
        <HemyProgress type="circle" strokeLinecap="round" :strokeWidth="20" :backStrokeWidth="20" :percentage="60" />
      </div>
    </div>
  </div>
</template>
<script>
import HemyProgress from '../packages/components/index.vue';
export default {
  name: 'App',
  components: {
    HemyProgress,
  },
  data() {
    return {
      percentage: 50,
    };
  },
  methods: {
    decrease() {
      this.percentage -= 10;
      if (this.percentage <= 0) {
        this.percentage = 0;
      }
    },
    increase() {
      this.percentage += 10;
      if (this.percentage >= 100) {
        this.percentage = 100;
      }
    },
  },
};
</script>
<style>
.normal,
.complex,
.slot {
  display: flex;
  overflow: auto;
}
.item {
  width: 300px;
  text-align: center;
}
.progress-animation .progress-path__item {
  animation: mypath 5s linear one;
}
@keyframes mypath {
  from {
    stroke-dashoffset: 1000;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
