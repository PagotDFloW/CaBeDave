<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
          min-width="40"
        />

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <a href="/" class="white--text text-decoration-none">CODEBO</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <a href="/products" class="white--text text-decoration-none">Produits</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <a href="/about" class="white--text text-decoration-none">A propos</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Three-line item</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <footer-view/>
    <div v-if="this.$store.state.isAdmin !== true">
      <Chat/>
    </div>
  </v-app>
</template>

<script>
// eslint-disable-next-line import/extensions
import Chat from '@/components/Chat';
import FooterView from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    FooterView, Chat,
  },
  data: () => ({
    //
  }),
};
</script>
