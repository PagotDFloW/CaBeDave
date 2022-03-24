<template>
    <div>
        <v-container>
        <v-row>
            <v-col sm="6" lg="4">
            <v-text-field label="Find"
                          prepend-icon="mdi-magnify"
                          v-model="nameFilter">
            </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="(product, index) in data" :key="index" lg="4" sm="6">
            <product :product="product"/>
            </v-col>
        </v-row>
        </v-container>
    </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Product from '@/components/Products/Product.vue';

export default {
  name: 'ProductsList',
  components: { Product },
  watch: {
    nameFilter(val) {
      this.$socket.emit('filtername_change', val);
      this.$socket.on('filtered_name', (data) => {
        this.data = data;
      });
    },
  },
  // async mounted() {
  //   await this.$store.dispatch('getProducts');
  //   this.data = this.$store.state.productsList;
  // },
  data() {
    return {
      // data: [
      //   { id: 1, title: 'title', price: 24 },
      //   { id: 2, title: 'title2', price: 25 },
      // ],
      data: this.$store.state.data,
      nameFilter: '',
    };
  },
};
</script>
