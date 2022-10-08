<template>
  <b-container fluid="md" class="myContainer">
    <p>This is my page!</p>
    <b-row>
      <b-col
        v-for="customer in customers"
        v-bind:key="customer._id"
        cols="12"
        sm="6"
        md="4"
      >
        <customer-item
          v-bind:customer="customer"
          v-on:del-customer="deletecustomer"
          v-on:update-customer="updatecustomer"
        />
      </b-col>
    </b-row>
    <div></div>
  </b-container>
</template>

<script>
import CustomerItem from '../components/CustomerItem.vue'
import { Api } from '@/Api'

export default {
  name: 'customers',
  components: {
    'customer-item': CustomerItem
  },

  mounted() {
    console.log('Here is a list of all customers!')
    Api.get('/customers')
      .then((response) => {
        console.log(response)
        this.customers = response.data.customers
      })
      .catch((error) => {
        this.customers = []
        console.log(error)
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },

  methods: {
    deletecustomer(id) {
      console.log(`Delete customer with id ${id}`)
      Api.delete(`/customers/${id}`).then((response) => {
        const index = this.customers.findIndex(
          (customer) => customer._id === id
        )
        this.customers.splice(index, 1)
      })
      // TODO: catch error
    },

    createcustomer(id) {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      Api.post('/customers', {
        firstname: this.text,
        lastname: 'Smith',
        email: 'email@gmail.com',
        password: 'password123'
      }).then((response) => {
        this.customers = response.data.customers
      })
    },

    updatecustomer(id) {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      Api.patch(`/customers/${id}`, {
        username: 'mr robot'
      }).then((response) => {
        this.customers = response.data.customers
      })
    }
  },

  data() {
    return {
      customers: [],
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
