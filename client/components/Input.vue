<template>
  <div>
    <input type="text" :value="msg" @input="changeMessage" @keyup.enter="registerCall">
  </div>
</template>

<script>
  export default {
    data(){
      return {
        message: ""
      }
    },
    props: [
      'msg'
    ],
    methods: {
      changeMessage(event) {
        this.message = event.target.value;
        this.$emit("messageChanged", this.message);
      },
      registerCall(){
        this.$emit("registerCall", this.message)
      }
    }
  }
</script>
