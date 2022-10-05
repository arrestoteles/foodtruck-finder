
/** use : cards of foodtrcuks having items component for dishes  */
/** use : tabs for moving through pages */
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
    <div class= "col-7 col-md-5"><component-food/></div>
    <div class= "col-7 col-md-5"><component-food/></div>
    <div  class= "col-7 col-md-1"><component-food/></div>
    <div class= "col-7 col-md-5"><component-food/></div>
    <div class= "col-7 col-md-5"><component-food/></div>
     <div class= "col-7 col-md-1"><component-food/></div>
     <div class= "col-8 col-md-5"><component-food/></div>
    <div class= "col-7 col-md-5"><component-food/></div>
     <div class= "col-7 col-md-1"><component-food/></div>
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
import ComponentFood from '@/component/ComponentFood.vue'

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
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
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
