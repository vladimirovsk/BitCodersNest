const app = new Vue({
  el: '#app',
  data: {
    title: 'WAITING...',
    message: {
      type: undefined,
      block: undefined,
      data: {
        token: undefined,
      },
    },
  },
  methods: {},
  computed: {},

  created() {
    // this.socket = io("https://exchange-rate-ts.nimbusplatform.io");
    //  this.socket = io('http://116.203.136.246:8081');
    this.socket = io('http://localhost:8000');

    this.socket.on('connect', () => {
      this.title = 'CONNECTED';
      this.socket.emit('subscribe', {
        type: 'subscribe',
        event: 'new subscribe',
      });
    });

    this.socket.on('message', (message) => {
      console.log('message', message.data.token);
      message.data.token.forEach((row) => {
        row.rate = row.rate * Math.pow(10, 0);
      });
      if (message.type == 'receive_rate') {
        this.message = message;
      }
    });

    this.socket.on('subscribe', (data) => {
      console.log('on subscribe', data);
    });

    this.socket.on('error', (err) => {
      console.log(`Error due to ${err.message}`);
    });

    this.socket.on('disconnect', (data) => {
      this.title = 'DISCONNECTED';
      if (this.message.data.token) {
        this.socket.on('disconnect', this.message.data.token);
      }
      console.log(`DISCONNECT`, data);
    });
  },
});

console.log(process.env.URI);
