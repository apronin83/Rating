// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import Navbar from './components/Navbar'
import VeCharts from 've-charts'
import 've-charts/lib/ve-charts.min.css'

Vue.use(VeCharts)
Vue.use(VueMaterial)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

Vue.component('navbar', Navbar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
