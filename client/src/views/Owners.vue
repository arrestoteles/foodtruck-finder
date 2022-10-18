<template>
  <b-container fluid="md" class="myContainer">
    <b-row>
      <b-col cols="3"></b-col>
      <b-col cols="6">
        <div class="container">
          <b-form-input
            id="search-form"
            v-model="text"
            placeholder="search any foodtruck"
            name="q"
          >
          </b-form-input>
        </div>
        <b-row>
          <b-col cols="12">
            <b-form-input
              class="form"
              v-model="foodtruck_name"
              placeholder="Enter foodtruck name here"
              v-bind:b-button-toolbar="createfoodtruck"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12">
        <div class="containerbutton">
          <b-button pill variant="success" @click="createfoodtruck">
            Create new foodtruck
          </b-button>
        </div>
        <div>
          <b-button pill variant="success" @click="updatefoodtruck">
            Edit foodtruck
          </b-button>
        </div>
        <div>
          <b-label> Owned foodtrucks:</b-label>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="foodtruck in foodtrucks"
        v-bind:key="foodtruck._id"
        cols="12"
        sm="6"
        lg="4"
      >
        <ComponentFoodOwner
          v-if="foodtruck.name === text || text == ''"
          v-bind:foodtruck="foodtruck"
          v-on:del-foodtruck="deletefoodtruck"
          v-on:update-foodtruck="updatefoodtruck"
          v-on:create-dish="createdish"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import ComponentFoodOwner from '../components/ComponentFoodOwner.vue'

export default {
  name: 'foodtrucks',
  components: {
    ComponentFoodOwner
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
    createfoodtruck() {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      Api.post('/foodtrucks', {
        name: this.foodtruck_name
      }).then((response) => {
        this.foodtrucks = response.data.foodtrucks
      })
    },
    updatefoodtruck(id, newname) {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      alert('kladdkaka123')
      Api.patch(`/foodtrucks/${id}`, {
        name: newname
      }).then((response) => {
        this.foodtrucks = response.data.foodtrucks
      })
    },
    createdish(id, dishname, dishprice) {
      Api.post('/dishes', {
        name: dishname,
        price: dishprice
      }).then((response) => {
        this.foodtrucks.forEach((foodtruck) => {
          if (foodtruck._id === id) {
            foodtruck.dishes.push(response.data._id)
            console.log('success')
          }
        })
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
  background-color: lightblue;
  border: #000000;
}
b-label {
  font-weight: bold;
}

.button {
  text-align: center;
}
.container {
  width: 10%;
  min-height: 5%;
  padding: 5%;
}
#search-form {
  background: white;
  align-items: center;
}

.containerbutton {
  min-height: 5%;
  padding: 5%;
}
input::placeholder {
  opacity: 1;
  color: gray;
}
</style>
