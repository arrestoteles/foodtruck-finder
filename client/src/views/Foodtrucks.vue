
/** use : cards of foodtrcuks having items component for dishes  */
/** use : tabs for moving through pages */
<template>
  <body>
    <b-row>
      <b-col cols="7" offset="1" offset-md="2">
        <h1 class="header1">Foodtrucks</h1>
        <div>
          <b-form-input
            v-model="text"
            placeholder="Search for foodtruck"
          ></b-form-input>
          <div class="mt-3">Value: {{ text }}</div>
        </div>
        <div class="container1">
          <div class="row">
            <div class="col-7 col-md-5"><component-food /></div>
            <div class="col-7 col-md-5"><component-food /></div>
            <div class="col-7 col-md-1"><component-food /></div>
            <div class="col-7 col-md-5"><component-food /></div>
            <div class="col-7 col-md-5"><component-food /></div>
            <div class="col-7 col-md-1"><component-food /></div>
            <div class="col-8 col-md-5"><component-food /></div>
            <div class="col-7 col-md-5"><component-food /></div>
            <div class="col-7 col-md-1"><component-food /></div>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- how to: have space between rows? -->
    <!-- how to: fix the components to the background? -->
    <!-- how to: make components have seprate functiinality? -->
    <!-- Create: Search bar + filter -->
  </body>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import ComponentFood from '@/components/ComponentFood.vue'

export default {
  name: 'foodtrucks',
  components: {
    ComponentFood
  },
  data() {
    return {
      text: ''
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

<style scoped>
.btn_message {
  margin-bottom: 1em;
}
.header1 {
  font-family: sans-serif;
  padding-left: 175px;
  text-align: center;
  text-shadow: 2px 2px 10px #05cc16;
  font-weight: bold;
}
.container {
  display: inline-block;
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100vh;
}
body {
  background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-repeat: no-repeat;
  background-color: #45d03b;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
