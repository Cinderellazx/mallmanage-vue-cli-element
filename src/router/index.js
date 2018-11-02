import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import User from '@/components/user.vue'
import Role from '@/components/role.vue'
import Right from '@/components/right.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: User
    },
    {
      name: 'roles',
      path: '/roles',
      component: Role
    },{
      name: 'rights',
      path: 'rights',
      component: Right
    }]
  }]
})
