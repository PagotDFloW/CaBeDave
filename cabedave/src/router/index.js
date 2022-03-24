import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions
import ChatView from '@/views/ChatView';
import HomeView from '../views/HomeView.vue';
import Products from '../views/Products/ProductsView.vue';
import SingleProduct from '../views/Products/SingleProductView.vue';
import Cart from '../views/Cart/CartView.vue';

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
    path: '/cart/user',
    name: 'user_cart',
    component: Cart,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
