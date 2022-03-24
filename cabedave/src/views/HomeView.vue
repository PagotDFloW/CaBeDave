<template>
 <div>
  <hello-world />
  <v-container>
    <v-row>
      <v-col v-for="(product, index) in products.slice(0, 5)" :key="index" lg="4" sm="6">
        <product :product="product"/>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-data
    class="mx-auto"
    max-width="80%"
  >
    <v-system-bar
      color="indigo darken-2"
      dark
    >
      <v-spacer></v-spacer>

      <v-icon>mdi-window-minimize</v-icon>

      <v-icon>mdi-window-maximize</v-icon>

      <v-icon>mdi-close</v-icon>
    </v-system-bar>

    <v-toolbar
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Discover</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="data in data"
        >
          <v-data>
            <v-img
              :src="data.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-data-title v-text="data.title"></v-data-title>
            </v-img>

            <v-data-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-data-actions>
          </v-data>
        </v-col>
        <v-col v-for="(product, index) in products" :key="index" lg="4" sm="6">
            <products :product="product"/>
            </v-col>
      </v-row>
    </v-container>
  </v-data> -->
</div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
import Product from '../components/Products/Product.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Product,
  },
  data() {
    return {
      products: this.$store.state.data,
    };
  },
};
</script>
