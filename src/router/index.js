import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Presidente from '../components/PresidenteInfo.vue'; // Importando o componente Presidente
import UserLogin from '@/components/UserLogin.vue';
import UserAPI from '@/components/UserAPI.vue';
import DashboardAPI from '@/components/DashboardAPI.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/presidente', // Rota para o componente Presidente
    name: 'presidente',
    component: Presidente,
  },
  {
    path: '/logina', // Rota para o componente UserLogin
    name: 'logina',
    component: UserLogin,
  },
  {
    path: '/login', // Rota para o componente de Login
    name: 'login',
    component: UserAPI,
  },
  {
    path: '/dashboard', // Rota protegida para o componente Dashboard
    name: 'dashboard',
    component: DashboardAPI,
    meta: { requiresAuth: true } // Indica que a rota requer autenticação
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Verificação de autenticação antes de acessar uma rota
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwtToken'); // Verifica se o token existe

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // Redireciona para o login se não estiver autenticado
  } else {
    next();
  }
});

export default router;
