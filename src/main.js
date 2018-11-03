import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import * as firebase from 'firebase'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  firebase,
  render: h => h(App),

  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBbwuVs1S7IfxeSX7UaEesLCSiu3lKSQWU',
      authDomain: 'vue-app-9787c.firebaseapp.com',
      databaseURL: 'https://vue-app-9787c.firebaseio.com',
      projectId: 'vue-app-9787c',
      storageBucket: 'vue-app-9787c.appspot.com',
    })
    this.$store.dispatch('loadCustomers')
    this.$store.dispatch('loadProducts')
  }

}).$mount('#app')
