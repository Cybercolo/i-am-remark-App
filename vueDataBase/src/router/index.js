import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Formulario',
    name: 'Formulario',
    // route level code-splitting
    // this generates a separate chunk (formulario.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "formulario" */ '../views/Formulario.vue')
  },
  {
    path: '/Usuario',
    name: 'Usuario',
    // route level code-splitting
    // this generates a separate chunk (Usuario.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Usuario" */ '../views/Usuario.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
