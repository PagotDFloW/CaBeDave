<template>
    <div
      class="col-5"
      style="margin:0 auto;"
    >
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>

            <v-text-field
            v-model="password"
            name="input-10-1"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            required
          ></v-text-field>

            <v-btn
            color="success"
            class="mr-4"
            @click="validate"
            >
            Validate
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConnexionView',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitForm() {
      axios.post('/connexion', this.form);
    },
  },
};
</script>
