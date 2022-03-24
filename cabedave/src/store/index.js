import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  mutations: {
    getProducts(state, data) {
      state.productsList = data;
    },
    getSingleProduct(state, data) {
      state.product = data;
    },
  },
  actions: {
    async getProducts(context) {
      const { data } = (await axios.get('http://localhost:3000/marketplace'));
      context.commit('getProducts', data);
      console.log(data);
    },
    async getSingleProduct(context) {
      const { data } = (await axios.get('loaclhost:3000/product/:id'));
      context.commit('getSingleProduct', data);
    },
  },
  modules: {
  },
});
