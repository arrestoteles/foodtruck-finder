<template>
  <b-container fluid="md" class="myContainer">
    <b-row>
      <b-col cols="8" offset="1" offset-md="2">
        <div class="container">
          <form
            class="search-bar"
          >
            <input v-model="text" placeholder="search any foodtruck" name="q" />
            <button type="submit" @click="searching">
              <img
                src="https://img.icons8.com/color/20/FA5252/search--v1.png"
              />
            </button>
          </form>
        </div>
          <b-row>
           <b-col cols="8" offset="1" offset-md="2">
        <b-form-input
          class="form"
          v-model="foodtruck_name"
          placeholder="Enter foodtruck name here"
          v-bind:b-button-toolbar="createfoodtruck"
        ></b-form-input>
           </b-col>
          </b-row>
      </b-col>
      <b-col cols="8" offset-md="2">
        <div class="containerbutton">
      <b-button  pill variant="success" @click="createfoodtruck">
        Create new foodtruck
      </b-button>
        </div>
      </b-col>
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
        v-if="foodtruck.name === text"
          v-bind:foodtruck="foodtruck"
          v-on:del-foodtruck="deletefoodtruck"
          v-on:update-foodtruck="updatefoodtruck"
        />
      </b-col>
    </b-row>
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
        name: this.foodtruck_name,
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
    },
    searching(text) {
      Api.get(`/foodtrucks?name=${this.text}`).then((response) => {
        console.log(response)
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
.container {
  width: 10%;
  min-height: 5%;
  padding: 5%;
}
.search-bar {
  max-height: 70%;
  background: white;
  display: flex;
  align-items: center;
  border-radius: 60px;
  backdrop-filter: blur(4px) saturate(180%);
  padding: 5px 5px;
  padding-bottom: 10px;
}
.search-bar input {
  background: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 5px 20px;
  font-size: 15px;
  color: black;
}
::placeholder {
  color: gray;
}
.search-bar button {
  border: 0;
  border-radius: 50%;
  width: 35px;
  height: 33px;
  background: lightgray;
  cursor: pointer;
}
.containerbutton{
  min-height: 5%;
  padding: 5%;
}

</style>
