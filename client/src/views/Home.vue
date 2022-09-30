<template>
  <div>
    <b-jumbotron
      header="Food Truck Finder (FTF)"
      lead="Let's find you a good food truck"
    >
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()"
        >Get Message from Server</b-button
      >
      <p>
        Message from the server:<br />
        {{ message }}
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'hungry?'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then((response) => {
          this.message = response.data.message
        })
        .catch((error) => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
