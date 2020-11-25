import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI);
import { router } from './router';

new Vue({
  el: '#app',
  router, 
  render: h => h(App)
})
