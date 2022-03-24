<template>
    <div>
      <v-card
      max-width="500"
      class="mx-auto mt-5"
      elevation="2"
      shaped
    >
      <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          cover
        ></v-img>

        <v-card-header>
          <v-card-header-text>
              <v-card-title class="black--text text-decoration-none">
                {{ product.title.toUpperCase() }}
              </v-card-title>

            <v-card-subtitle>
              <span class="mr-1">Local Favorite</span>

              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-header-text>
        </v-card-header>

        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
            <v-rating
              :model-value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1">
            $ • Italian, Cafe
          </div>
          <div>{{ product.price }}€</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-title>Tonight's availability</v-card-title>

        <div class="px-4">
          <!-- <v-chip-group v-model="selection">
            <v-chip v-for="(attribute, index) in item.attributes"
                    :key="index">{{ attribute }}</v-chip>
          </v-chip-group> -->
        </div>

        <v-card-actions class="justify-end">
          <v-btn
            color="deep-purple-lighten-2"
            text
            @click="reserve"
          >
            <v-icon large color="teal lighten-2" >mdi-cart</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>

    </div>
</template>

<script>
export default {
  name: 'SingleProductView',
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.products = this.$store.state.data;
  },
  computed: {
    product() {
      return this.products.find((el) => el.id === +this.$route.params.id) || {};
    },
  },
};
</script>
