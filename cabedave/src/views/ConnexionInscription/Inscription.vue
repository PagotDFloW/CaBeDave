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
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
            ></v-text-field>

            <v-text-field
            v-model="lastname"
            :counter="10"
            :rules="nameRules"
            label="Last Name"
            required
            ></v-text-field>
            <v-text-field
            v-model="username"
            :counter="10"
            :rules="nameRules"
            label="Username"
            required
            ></v-text-field>

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

            <v-checkbox
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
            ></v-checkbox>

            <v-btn
            color="success"
            class="mr-4"
            @click="submitForm"
            >
            Validate
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InscriptionView',
  data() {
    return {
      form: {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitForm() {
      axios.post('/models/users/addusers', this.form);
    },
  },
};
</script>
