<template>
  <b-container fluid="md" class="myContainer">
    <b-row>
      <b-col cols="7" offset="1" offset-md="2">
        <b-form-input
          class="form"
          v-model="text"
          placeholder="Enter new foodtruck name here"
          v-bind:b-button-toolbar="createfoodtruck"
        ></b-form-input>
      </b-col>
      <b-button class="button" pill variant="success" @click="createfoodtruck">
        Create new foodtruck
      </b-button>
      <b-col cols="3"> </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="foodtruck in foodtrucks"
        v-bind:key="foodtruck._id"
        cols="12"
        sm="6"
        md="4"
      >
        <foodtruck-item
          v-bind:foodtruck="foodtruck"
          v-on:del-foodtruck="deletefoodtruck"
          v-on:update-foodtruck="updatefoodtruck"
        />
      </b-col>
    </b-row>
    <div></div>
  </b-container>
</template>

<script>
import FoodtruckItem from '../components/FoodtruckItem.vue'
import { Api } from '@/Api'

export default {
  name: 'foodtrucks',
  components: {
    'foodtruck-item': FoodtruckItem
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
    deletefoodtruck(id) {
      console.log(`Delete foodtruck with id ${id}`)
      Api.delete(`/foodtrucks/${id}`).then((response) => {
        const index = this.foodtrucks.findIndex(
          (foodtruck) => foodtruck._id === id
        )
        this.foodtrucks.splice(index, 1)
      })
      // TODO: catch error
    },
    createfoodtruck(id) {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      Api.post('/foodtrucks', {
        name: this.text,
        color: 'blue'
      }).then((response) => {
        this.foodtrucks = response.data.foodtrucks
      })
    },
    updatefoodtruck(id) {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      alert('kladdkaka123')
      Api.patch(`/foodtrucks/${id}`, {
        name: 'mr robot'
      }).then((response) => {
        this.foodtrucks = response.data.foodtrucks
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

<style>
.myContainer {
  background-color: #b0cbd1;
  border: #000000;
}

.button {
  text-align: center;
}
</style>
