<template>
  <div>
    <h1>Customer vue under construction!</h1>
    <h2>Customer vue under construction!</h2>
    <h3>Customer vue under construction!</h3>
    <h4>Customer vue under construction!</h4>
    <h5>Customer vue under construction!</h5>
    <h6>Customer vue under construction!</h6>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'customers',

  data() {
    return {
      customers: [],
      text: ''
    }
  },

  methods: {
    mounted(id) {
      console.log('Here is a list of all customers!')
      Api.get(`/customers/${id}`)
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
    }
  }
}
</script>

<style>
</style>
