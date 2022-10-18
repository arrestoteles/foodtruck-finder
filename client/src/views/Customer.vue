<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <b-form
      class="col-12 col-md-4"
      @add.prevent="onAdd"
      @reset.prevent="onReset"
      v-if="show"
    >
      <b-form-group
        class="formtxt"
        id="input-group-1"
        label="My Favorite Food Trucks"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.foodtruckform"
          placeholder="Add your favorite food trucks here"
          required
        ></b-form-input>
      </b-form-group>

      <b-button class="addbtn" type="add" pill variant="success">Add </b-button>
      <b-button class="resetbtn" type="reset" pill variant="outline-info"
        >Reset</b-button
      >
    </b-form>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="foodtrucks"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      foodtrucks: [],
      form: {
        foodtruckform: ''
      },
      show: true
    }
  },
  computed: {
    rows() {
      return this.foodtrucks.length
    }
  },
  mounted() {
    console.log('Here is a list of all your foodtrucks!')
    const customerId = localStorage.getItem('LoggedUser')
    const customerID = customerId.slice(1, -1)
    Api.get(`/customers/${customerID}/foodtrucks`)
      .then((response) => {
        this.foodtrucks = response.data.foodtrucks
        console.log(this.foodtrucks)
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
    onReset() {
      // Reset our form values
      this.form.foodtruckform = 'Hungry much?'
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
.col-12 {
  padding-top: 3%;
  background-color: #6044ff;
  margin: 0 auto;
  width: 80%; /* value of your choice which suits your alignment */
}
.addbtn {
  margin-right: 5px;
  margin-bottom: 10px;
}
.resetbtn {
  margin-left: 5px;
  margin-bottom: 10px;
}
.formtxt {
  color: whitesmoke;
  font-size: 250%;
}
</style>
