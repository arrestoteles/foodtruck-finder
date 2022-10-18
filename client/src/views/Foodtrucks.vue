<template>
  <body>
    <b-container fluid="md" class="myContainer1">
      <b-row>
      <b-col cols="12">
      </b-col>
      </b-row>
    <b-row>
      <b-col cols="12">
        <div><h1 id="header1">Foodtruck Finder</h1></div>
          <b-form-input
          class="search-bar"
          v-model="text"
          placeholder="search any foodtruck" name="q">
            <b-button type="submit" @click="searching">
            </b-button>
          </b-form-input>
        </b-col>
    </b-row>

        <b-row>
      <b-col sm="12" md="6" lg="4"
        v-for="foodtruck in foodtrucks"
        v-bind:key="foodtruck._id"
      >
          <component-food
            v-if="foodtruck.name === text || text == ''"
            v-bind:foodtruck="foodtruck"
          />
           </b-col>
        </b-row>
</b-container>
</body>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import ComponentFood from '../components/ComponentFood.vue'

export default {
  name: 'foodtrucks',
  components: {
    ComponentFood
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
        name: this.foodtruck_name
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

<style scoped>
#header1 {
  font-family: sans-serif;
  text-align: center;
  text-shadow: 2px 2px 10px #05cc16;
  font-weight: bold;
}

body {
  background-repeat: no-repeat;
  background-color: white;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
  padding-bottom: 600px;

}
.myContainer1 {
background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2%27');
opacity:1;
background-size: cover;
 background-attachment: fixed;
}
.search-bar {
  background: white;
  display: flex;
  align-items: center;
  backdrop-filter: blur(4px) saturate(180%);
  padding-bottom: 10px;
}
input::placeholder {
    font-weight: bold;
    opacity: 0.5;
    color: gray;
}
</style>
