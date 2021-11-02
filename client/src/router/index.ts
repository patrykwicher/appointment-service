import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import createStore from '../store/index';
import Home from '../views/Home.vue'
import Registration from '../views/Registration.vue';
import ChosenServices from '../views/ChosenServices.vue';
import UserVisits from '../views/UserVisits.vue';
import NotFound from '../views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/chosen-services',
    name: 'Employee',
    component: ChosenServices,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-visits/:id',
    name: 'UserVisits',
    component: UserVisits,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '',
  //   redirect: '/not-found'
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !createStore.state.currentUser.fullName) {
    next('/');
  }
  else {
    next();
  }
})

export default router
