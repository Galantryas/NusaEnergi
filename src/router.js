import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import Usage from './components/Usage.vue';
import Register from './components/Register.vue';
import Cost from './components/Cost.vue';
import Hardware from './components/Hardware.vue';
import store from './store.js'; 

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Usage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/usage',
        name: 'usage',
        component: Usage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/cost',
        name: 'cost',
        component: Cost,
        meta: {
            requiresAuth: true
        }
      },
      {
        path: '/hardware',
        name: 'hardware',
        component: Hardware,
        meta: {
            requiresAuth: true
          }
      },
    ]
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login')
    } else {
      next()
    }
  })

  export default router;