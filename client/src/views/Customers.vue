<template>
  <b-container fluid="md" class="myContainer">
    <b-row>
      <b-col cols="7" offset="1" offset-md="2">
        <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
      </b-col>
      <b-col cols="3">
        <b-button>Create New</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="customer in customers" v-bind:key="customer._id" cols="12" sm="6" md="4">
          <customer-item v-bind:customer="customer" v-on:del-customer="deletecustomer"/>
      </b-col>
    </b-row>
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
    console.log('PAGE is loaded!')
    Api.get('/customers')
      .then(response => {
        console.log(response)
        this.customers = response.data.customers
      })
      .catch(error => {
        this.customers = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  methods: {
    deletecustomer(id) {
      console.log(`Delete customer with id ${id}`)
      Api.delete(`/customers/${id}`)
        .then(response => {
          const index = this.customers.findIndex(customer => customer._id === id)
          this.customers.splice(index, 1)
        })
        // TODO: catch error
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
background-color: rgb(77, 81, 144);
border: solid;
}
</style>
