<template>
  <div>
    <ul id="messages">
      {{ data }}
    </ul>
    <form id="form" class="form-group" v-on:submit.prevent="onSubmit">
      <label for="input">
        <input id="input" autocomplete="off" name="messageToSend" type="text" v-model="message"/>
      </label>
      <button @click="send(e)">Send</button>
    </form>
  </div>
</template>

<script>

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
        socketId: this.$socketChat.engine.id,
        role: 'admin',
      };
      console.log(data);
      this.$socketChat.emit('message_send', data);
      // eslint-disable-next-line no-shadow
      this.$socketChat.on('message_send', (data) => {
        this.data += `${data}\n`;
      });
    },
  },
  data() {
    return {
      data: [],
      message: '',
    };
  },
};
</script>

<style>
body {
  display: none;
}

#form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0;
        left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box;
        backdrop-filter: blur(10px); }
#input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
#input:focus { outline: none; }
#form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem;
                border-radius: 3px; outline: none; color: #fff; }

#messages { list-style-type: none; margin: 0; padding: 0; }
#messages > li { padding: 0.5rem 1rem; }
#messages > li:nth-child(odd) { background: #efefef; }

</style>
