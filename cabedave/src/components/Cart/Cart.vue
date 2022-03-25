<template>
  <div>
    <v-container class="mt-15">
      <v-row>
        <v-col cols="12">
          <v-row v-for="(product, index) in this.data" :key="index" justify="center">
            <v-col cols="2">
              <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" alt="" class="product-image">
            </v-col>
            <v-col cols="2">
              <span class="product-price">{{ product.nom }} </span>
            </v-col>
            <v-col cols="2">
              <span class="product-price">x1 </span>
            </v-col>
            <v-col cols="2">
              <span class="product-price">{{ product.prix }} € </span>
            </v-col>
            <v-col cols="2">
              <v-btn
                class="mt-n2"
                fab
                small
                dark
                color="red" @click="remove(product)"
              >
                <v-icon dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              Quantité totale : {{ totalQuantity }}
            </v-col>
            <v-col cols="2">
              Prix Total TTC : {{ totalPrice }} €
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

// eslint-disable-next-line import/extensions

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cart',
  mounted() {
    this.data = this.$store.state.cart;
  },
  data() {
    return {
      // data: [
      //   { id: 1, title: 'title', price: 24 },
      //   { id: 2, title: 'title2', price: 25 },
      // ],
      // data: this.$store.state.data,
      data: {},
    };
  },
  methods: {
    remove(product) {
      this.$store.dispatch('removeCart', product);
      this.data = this.$store.state.cart;
    },
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    totalQuantity() {
      return this.data.length;
    },
    totalPrice() {
      // eslint-disable-next-line no-unused-vars
      let total = 0;
      if (Array.isArray(this.data)) {
        this.data.forEach((product) => {
          total += product.prix;
        });
      }
      // eslint-disable-next-line no-unreachable
      return total;
    },
  },
};
</script>

<style scoped>
.checkout-box {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  box-sizing: border-box;
  padding: 1em;
}

.checkout-list {
  padding: 0;
}

.checkout-product {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr .5fr;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
  border-radius: 5px;
  list-style: none;
  box-sizing: border-box;
  padding: .8em;
  margin: 1em 0;
}

.checkout-product * {
  place-self: center;
}
.product-image {
  grid-column: 1/2;
  width: 50%;
}

.product-name {
  box-sizing: border-box;
}

.product-price {
  font-size: 1.2em;
  font-weight: bold;
}

.product-remove {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 0;
  background-color: #E0E0E0;
  color: #fff;
  cursor: pointer;
}

.total {
  font-size: 2em;
  font-weight: bold;
  align-self: flex-end;
}

.checkout-message {
  font-size: 1.5em;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}

.fade-enter, .fade-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
