import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//$bus本身是不存在的，Vue实例是可以作为事件总线的，所以要new一个Vue实例给$bus赋值过去
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
