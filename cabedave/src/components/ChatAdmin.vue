<template>
  <div>
    <h2 class="text-center">Messagerie</h2>
    <main id="app" class="mt-lg-10">
      <section ref="chatArea" class="chat-area"  style="position: relative;" >
        <p v-for="(message,index) in data" class="message mt-2"
           :class="{ 'message-out': message.role === 'admin',
           'message-in': message.role === 'user' }"
           :key="index" style="font-size: 20px">
          {{ message.message }}
        </p>
        <v-form class=""
                v-on:submit.prevent style="position: absolute; bottom: 0; width: 100%;
                text-align: center">
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-text-field label="Entrer votre message" v-model="message"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="mt-4"
                  fab
                  small
                  dark
                  color="green" @click="send()"
                >
                  <v-icon dark>
                    mdi-send
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </section>
    </main>
  </div>
</template>

<script>

// eslint-disable-next-line no-underscore-dangle

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ChatAdmin',
  watch: {
    message(val) {
      this.message = val;
    },
  },
  methods: {
    send() {
      const data = {
        userName: 'AdminFlow',
        message: this.message,
        socketId: this.$socketChatAdmin.id,
        role: 'admin',
      };
      this.$socketChatAdmin.emit('message_send', data);
      this.data.push(data);
      this.message = '';
    },
  },
  mounted() {
    this.$socketChatAdmin.on('message_sended', (data) => {
      this.data.push(data);
    });
    this.$store.dispatch('settingAdmin', true);
  },
  data() {
    return {
      data: [],
      message: '',
      storage: this.$store,
    };
  },
};
</script>

<style scoped>

body, html {
  font-family: sans-serif;
  font-weight: 100;
  background: #7b4397;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #dc2430, #7b4397);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #dc2430, #7b4397);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
  /*   border: 1px solid #ccc; */
  background: white;
  height: 70vh;
  overflow: auto;
  margin: 0 auto 2em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3)
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: .5em;
  /*   margin-bottom: .5em; */
  font-size: .8em;
}
.message-out {
  background: #407FFF;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #F1F0F0;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
#person1-input {
  padding: .5em;
}
#person2-input {
  padding: .5em;
}

</style>
