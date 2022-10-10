<template>

<body>
    <b-row>
      <b-col cols="7" offset="1" offset-md="2">
      <h1 class="header1">Foodtrucks</h1>
      <div class="container">
      <form action="https://WWWW.google.com" method="get" class="search-bar">
      <input type="text" placeholder="search any foodtruck" name="q">
      <button type="submit"><img src="https://img.icons8.com/color/20/FA5252/search--v1.png"></button>
    </form>
    </div>
    <div class="row">
    <b-row>
    <b-col v-for="foodtruck in foodtrucks"
        v-bind:key="foodtruck._id">
<component-food/>

</b-col>
</b-row>
    </div>
    </b-col>
    </b-row>
 </body>

</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import ComponentFood from '@/components/ComponentFood.vue'

export default {
  name: 'foodtrucks',
  components: {
    'component-food': ComponentFood
  },
  mounted() {
    console.log('Here is a list of all foodtrucks!')
    Api.get('/foodtrucks')
      .then((response) => {
        console.log(response)
        this.foodtrucks = response.data.foodtrucks
      })
      .catch((error) => {
        this.foodtrucks = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },

  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  },

  data() {
    return {
      foodtrucks: [],
      text: ''
    }
  }
}
</script>

<style scoped>
.btn_message {
  margin-bottom: 1em;
}
.header1{
    font-family:sans-serif;
    padding-left:175px;
    text-align:center;
    text-shadow: 2px 2px 10px #05cc16;
    font-weight: bold;
}

body {
  background-image: url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-repeat: no-repeat;
  background-color: #45d03b;
   background-size: cover;
  background-position: center;
  background-attachment: fixed;
  resize: horizontal; overflow: hidden;
}
 .container{
        width: 100;
        min-height: 20vh;
        padding: 5%;
      }
    .search-bar{
      width: 100;
      max-width: 700px;
      max-height: 50%;
      background: white;
      display:flex;
      align-items:center;
      border-radius: 60px;
      padding: 5px 10px;
      backdrop-filter: blur(4px) saturate(180%);
    }
    .search-bar input{
      background: transparent;
      flex: 1;
      border:0;
      outline: none;
      padding: 5px 20px;
      font-size: 15px;
      color: grey;
    }
    ::placeholder{
      color:gray;
    }
    .search-bar button {
      border: 0;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      background: lightgrey;
      cursor: pointer;
    }
</style>
