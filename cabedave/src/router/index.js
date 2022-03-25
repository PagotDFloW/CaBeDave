import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions
import ChatView from '@/views/ChatView';
import ChatAdminView from '@/views/ChatAdminView.vue';
// eslint-disable-next-line import/extensions
import CartVue from '@/components/CartVue';
import HomeView from '../views/HomeView.vue';
import Products from '../views/Products/ProductsView.vue';
import SingleProduct from '../views/Products/SingleProductView.vue';
// eslint-disable-next-line import/extensions
import Inscription from '../views/ConnexionInscription/Inscription.vue';
import Connexion from '../views/ConnexionInscription/Connexion.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
  },
  {
    path: '/products',
    name: 'products',
    component: Products,
  },
  {
    path: '/products/:id',
    name: 'products_id',
    component: SingleProduct,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartVue,
  },
  {
    path: '/adminChat',
    name: 'ChatAdmin',
    component: ChatAdminView,
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription,
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: Connexion,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
