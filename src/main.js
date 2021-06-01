import Vue from 'vue'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'
import VueRouter from 'vue-router'
import router from './router'
import VueSkeletonLoader from 'skeleton-loader-vue';

Vue.component('vue-skeleton-loader', VueSkeletonLoader);
Vue.use(VueLazyLoad, {
  error: './assets/blank.png'
})
Vue.use(VueRouter)
Vue.config.ignoredElements = [/^ion-/]
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
