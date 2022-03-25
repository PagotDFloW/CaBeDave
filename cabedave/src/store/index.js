import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAdmin: false,
    productsList: [],
    product: [],
    data: [
      { id: 1, title: 'title', price: 24 },
      { id: 2, title: 'title2', price: 25 },
      { id: 3, title: 'title3', price: 35 },
      { id: 4, title: 'title4', price: 45 },
      { id: 5, title: 'title5', price: 55 },
      { id: 6, title: 'title6', price: 65 },
    ],
    cartNbr: 0,
    cart: JSON.parse(localStorage.getItem('panier')),
  },
  mutations: {
    getProducts(state, data) {
      state.productsList = data;
    },
    getSingleProduct(state, data) {
      state.product = data;
    },
    incrementCartNbr(state) {
      state.cartNbr += 1;
      console.log(state.cartNbr);
    },
    settingAdmin(state, status) {
      // eslint-disable-next-line no-return-assign
      return state.isAdmin = status;
    },
    setCart(state, product) {
      console.log(state.cart);
      if (Array.isArray(state.cart)) {
        state.cart.push(product);
      } else {
        const arrayCart = [product];
        state.cart = arrayCart;
      }
    },
  },
  actions: {
    async getProducts(context) {
      const { data } = (await axios.get('http://localhost:3000/marketplace'));
      context.commit('getProducts', data);
    },
    async getSingleProduct(context, id) {
      const { data } = (await axios.get(`http://localhost:3000/products/${id}`));
      context.commit('getSingleProduct', data);
    },
    incrementCartNbr(context) {
      context.commit('incrementCartNbr', this.state.cartNbr);
      context.commit('setCart', this.state.product);
      localStorage.setItem('panier', JSON.stringify(this.state.cart));
    },
    settingAdmin(context) {
      const status = true;
      context.commit('settingAdmin', status);
    },
  },
  modules: {
  },
});
