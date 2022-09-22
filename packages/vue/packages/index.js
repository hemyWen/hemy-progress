/*
 * @Author: whm
 * @Date: 2022-08-11 09:37:53
 * @LastEditTime: 2022-08-11 14:54:28
 * @Description: 
 */

import HemyProgress from './components/index.vue'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('HemyProgress', HemyProgress)
}
HemyProgress.install = function (Vue) {
  Vue.component(HemyProgress.name, HemyProgress)
}

export default HemyProgress