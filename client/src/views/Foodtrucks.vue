<template>
  <body>
    <b-container>

    <b-row>
      <b-col cols="12">
        <h1 class="header1">Foodtrucks</h1>

        <div class="container">
          <b-form
            class="search-bar"
          >
            <input v-model="text" placeholder="search any foodtruck" name="q" />
            <b-button type="submit" @click="searching">
              <img
                src="https://img.icons8.com/color/20/FA5252/search--v1.png"
              />
            </b-button>
          </b-form>
        </div>
        </b-col>
    </b-row>

          <b-row>
      <b-col sm="12" md="6" lg="4"
        v-for="foodtruck in foodtrucks"
        v-bind:key="foodtruck._id"
      >
          <component-food
          v-if="foodtruck.name === text"
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

<style scoped>
.btn_message {
  margin-bottom: 1em;
}
.header1 {
  font-family: sans-serif;
  text-align: center;
  text-shadow: 2px 2px 10px #05cc16;
  font-weight: bold;
}

body {
  background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-repeat: repeat;
  background-color: #45d03b;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  resize: horizontal;
  overflow: hidden;
}
.container {
  min-height: 100%;
  padding: 5%;
  margin-bottom: 500px;
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
  color: grey;
   align-items: center;
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

</style>
