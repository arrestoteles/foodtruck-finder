<template>
  <div class="overflow-auto">
    <div :style="image"></div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <b-form
      class="col-12 col-md-4"
      @submit.prevent="onSubmit"
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
          v-model="form.name"
          placeholder="Add your favorite food trucks here"
          required
        ></b-form-input>
      </b-form-group>

      <b-button class="addbtn" type="submit" pill variant="success"
        >Add</b-button
      >
      <b-button class="resetbtn" type="reset" pill variant="outline-info"
        >Reset</b-button
      >
    </b-form>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      striped
      hover
      id="my-table"
      :items="foodtrucks"
      :fields="fields"
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
      props: ['foodtruck'],
      foodtrucks: [],
      fields: [
        {
          key: 'name',
          sortable: true
        }
      ],
      image: {
        backgroundImage:
          'url(https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80)'
      },
      form: {
        name: ''
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
    async onReset() {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      // Reset our form values
      this.form.name = 'Hungry much?'
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    async onSubmit() {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      const customerId = localStorage.getItem('LoggedUser')
      const customerID = customerId.slice(1, -1)
      Api.post(`/customers/${customerID}/foodtrucks`, {
        name: this.form.name
      })
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
