import Vue from 'vue'
import App from './App.vue'
import './assets/style.css'
import dotenv from 'dotenv'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

dotenv.config()