<template>
  <b-container fluid="md" class="myContainer">
    <b-row>
      <b-col md="3" sm="1"></b-col>
      <b-col md="6" sm="10">
        <b-form-input
          class="form"
          v-model="first_name"
          placeholder="Enter customer first name here"
          v-bind:b-button-toolbar="createcustomer"
        ></b-form-input>
        <b-form-input
          class="form"
          v-model="last_name"
          placeholder="Enter customer last name here"
          v-bind:b-button-toolbar="createcustomer"
        ></b-form-input>
        <b-form-input
          class="form"
          v-model="email"
          placeholder="Enter customer email here"
          v-bind:b-button-toolbar="createcustomer"
        ></b-form-input>
        <b-form-input
          type="password"
          class="form"
          v-model="password"
          placeholder="Enter customer password here"
          v-bind:b-button-toolbar="createcustomer"
        ></b-form-input>
        <b-button class="button" pill variant="success" @click="createcustomer">
          Create new customer
        </b-button>
        <b-button class="button" pill variant="danger" @click="deletecustomers">
          Delete all customers
        </b-button>
      </b-col>
      <b-col md="3" sm="1"> </b-col>
    </b-row>
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
          v-on:del-all-customers="deletecustomers"
          v-on:reset-customer="resetcustomer"
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
        //   TODO: display some error message instead of logging to console
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
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }).then((response) => {
        this.customers = response.data.customers
      })
    },

    updatecustomer(id) {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      Api.patch(`/customers/${id}`, {
        password: 'Password123'
      }).then((response) => {
        this.customers = response.data.customers
      })
    },

    resetcustomer(id) {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      Api.put(`/customers/${id}`, {
        first_name: 'John',
        last_name: 'Smith',
        email: 'sexy_boy89@hotmail.com',
        password: 'NewPassword123'
      }).then((response) => {
        this.customers = response.data.customers
      })
    },

    deletecustomers() {
      console.log('Delete all customers!')
      Api.delete('/customers')
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
