import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/IniciarSesionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      props: { titulo: 'Iniciar Sesión' },
      component: Index,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      props: { titulo: 'Crear Cuenta' },
      component: () => import('../views/CrearUsuarioView.vue'),
    },
    {
      path: '/rotaract-home/:token?',
      name: 'home',
      props: { titulo: 'Rotaract Home' },
      component: () => import('../views/InicioView.vue'),
    },
    {
      path: '/listado-alianza',
      name: 'alianza',
      props: { titulo: 'Listado de Alianzas' },
      component: () => import('../views/list/AlianzasView.vue'),
    },
    {
      path: '/listado-socios',
      name: 'socios',
      props: { titulo: 'Listado de Socios' },
      component: () => import('../views/list/SociosView.vue'),
    },
    {
      path: '/listado-aspirantes',
      name: 'aspirantes',
      props: { titulo: 'Listado de Aspirantes' },
      component: () => import('../views/list/AspirantesView.vue'),
    },
    {
      path: '/agregar-alianza',
      name: 'agregar-alianza',
      component: () => import('../views/form/NuevaAlianzaView.vue'),
    },
    {
      path: '/agregar',
      name: 'agregar',
      props: { point: 'socio' },
      component: () => import('../views/form/NuevaUsuarioView.vue'),
    },
    {
      path: '/tesoreria',
      name: 'tesoreria',
      props: { titulo: 'Tesoreria' },
      component: () => import('../views/club/TesoreriaView.vue'),
    },
    {
      path: '/notas',
      name: 'notas',
      props: { titulo: 'Notas' },
      component: () => import('../views/club/notasView.vue'),
    },
    {
      path: '/junta',
      name: 'junta',
      props: { titulo: 'Junta' },
      component: () => import('../views/club/JuntaView.vue'),
    }
  ]
})

export default router
