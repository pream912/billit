import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Invoice from './components/Invoices/Invoice.vue'
import AddCustomers from './components/Customers/AddCustomers.vue'
import Customers from './components/Customers/Customers.vue'

import AddProducts from './components/Products/AddProducts.vue'
import Products from './components/Products/Products.vue'

import Signup from './components/Auth/Signup.vue'
import Login from './components/Auth/Login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: Invoice
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/customers/create',
      name: 'create-customers',
      component: AddCustomers
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/products/create',
      name: 'create-products',
      component: AddProducts
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
