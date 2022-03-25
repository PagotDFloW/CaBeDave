<template>
  <div>
    <v-btn
      class="mx-2 open-button"
      fab
      dark
      large
      color="cyan"
      @click="openForm()"
    >
      <v-icon dark>
        mdi-chat
      </v-icon>
    </v-btn>
    <main id="app popupMessage" class="chat-popup">
      <section ref="chatArea" class="chat-area"  style="position: relative; display: none" >
        <div class="text-sm-body-2 blue white--text" style="padding: 1em">
          <h2>Discussion avec le Service client</h2>
        </div>
      <p v-for="(message, index) in data" class="message mt-2"
         :class="{ 'message-out': message.role === 'user', 'message-in': message.role === 'admin' }"
         :key="index">
        {{ message.message }}
      </p>
        <v-form class="d-flex"  v-on:submit.prevent style="position: absolute; bottom: 0;">
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-text-field label="Entrer votre message" v-model="message"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="mt-4"
                  fab
                  x-small
                  dark
                  color="green" @click="send()"
                >
                  <v-icon dark>
                    mdi-send
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn
                  class="mt-4"
                  fab
                  x-small
                  dark
                  color="red" @click="closeForm()"
                >
                  <v-icon dark>
                    mdi-close
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Chat',
  watch: {
    message(val) {
      this.message = val;
    },
  },
  methods: {
    send() {
      const data = {
        userName: this.name,
        message: this.message,
        socketId: this.$socketChatUser.id,
        role: 'user',
      };
      this.$socketChatUser.emit('message_send', data);
      this.data.push(data);
      this.message = '';
    },
    openForm() {
      this.$refs.chatArea.style.display = 'block';
    },
    closeForm() {
      this.$refs.chatArea.style.display = 'none';
    },
  },
  mounted() {
    this.$socketChatUser.on('message_sended', (data) => {
      this.data.push(data);
    });
  },
  data() {
    return {
      data: [],
      message: '',
      name: 'Flow',
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
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
}

.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-popup{
  position: fixed;
  bottom: 30px;
  right: 30px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

.chat-area {
  /*   border: 1px solid #ccc; */
  background: white;
  height: 50vh;
  overflow: auto;
  width: 350px;
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
