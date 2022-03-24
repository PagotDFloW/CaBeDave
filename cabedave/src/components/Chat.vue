<template>
  <div>
    <ul id="messages"></ul>
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
  name: 'Chat',
  watch: {
    message(val) {
      this.message = val;
    },
  },
  methods: {
    send() {
      const data = {
        userName: 'FloW',
        message: this.message,
      };
      console.log(data);
      this.$socketChat.emit('message_send', data);
      // eslint-disable-next-line no-shadow
      this.$socketChat.on('message_received', (data) => {
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

<style scoped>

#input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
#input:focus { outline: none; }

#messages { list-style-type: none; margin: 0; padding: 0; }
#messages > li { padding: 0.5rem 1rem; }
#messages > li:nth-child(odd) { background: #efefef; }

</style>
