<template>
  <div>
    <button class="open-button" @click="openForm()">Chat</button>
    <main id="app popupMessage" class="chat-popup">
      <section ref="chatArea" class="chat-area"  style="position: relative; display: none" >
      <p v-for="message in data" class="message"
         :class="{ 'message-out': message.role === 'user', 'message-in': message.role === 'admin' }"
         v-bind:key="message">
        {{ message.message }}
      </p>
        <form  v-on:submit.prevent="onSubmit" style="position: absolute; bottom: 0" y>
          <label for="input">
            <input id="input" type="text" class="form-control" placeholder="Name" v-model="message">
          </label>
          <button class="btn btn-success btn-block" @click="send()">Envoyer</button>
          <button class="btn btn-success btn-block" @click="closeForm()">Fermer</button>
        </form>
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
  padding: 1em;
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
