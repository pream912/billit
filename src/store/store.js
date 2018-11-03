import Vue from 'vue'
import Vuex from 'vuex'
// import * as firebase from 'firebase'
import customers from './modules/customers'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },


  mutations: {

    setLoading (state, payload) {
      state.loading = payload
    },
  
  },


  actions: {

  },
  getters: {
    loading (state) {
      return state.loading
    }
  },

  modules: {
    customers,
    products
  }
})
