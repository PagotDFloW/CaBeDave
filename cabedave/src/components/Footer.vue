<template>
    <v-bottom-navigation
    dark
    shift
  >
    <v-btn
      href="/"
    >
      <span>Home</span>

      <v-icon>mdi-home-variant</v-icon>
    </v-btn>

    <v-btn
      href="/products"
    >
      <span>Products</span>
      <v-icon>mdi-shopping</v-icon>
    </v-btn>

    <v-btn>
      <span>Book</span>

      <v-icon>mdi-book</v-icon>
    </v-btn>

    <v-btn
      href="/cart"
      class="d-flex"
    >
      <span>Cart</span>
      {{ cartNbr }}
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'FooterView',
  data() {
    return {
      cartNbr: this.$store.state.cartNbr,
    };
  },
};
</script>
