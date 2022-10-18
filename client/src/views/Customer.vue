<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

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
      foodtrucks: []
    }
  },
  computed: {
    rows() {
      return this.foodtrucks.length
    }
  },
  mounted() {
    console.log('Here is a list of all your foodtrucks!')
    console.log('kladdkaka2')
    const customerId = localStorage.getItem('LoggedUser')
    const customerID = customerId.slice(1, -1)
    alert(customerID)
    Api.get(`/customers/${customerID}/foodtrucks`)
      .then((response) => {
        console.log(response)
        console.log('kladdkaka1')
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
</script>
