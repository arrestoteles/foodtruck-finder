import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Foodtrucks from './views/Foodtrucks.vue'
import Admin from './views/Admin.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Customer from './views/Customer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/foodtrucks',
      name: 'foodtrucks',
      component: Foodtrucks
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    }

  ]
})
