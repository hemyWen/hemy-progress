import HemyProgress from './components/index.vue';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('HemyProgress', HemyProgress);
}
HemyProgress.install = function (Vue) {
  Vue.component(HemyProgress.name, HemyProgress);
};

export default HemyProgress;
