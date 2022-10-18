<template>
  <div>
    <b-form
      class="col-12 col-md-4"
      @submit.prevent="login"
      @reset="onReset"
      v-if="show"
    >
      <b-form-group id="input-group-1" label="Email" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password"
        input
        label-for="input-2"
      >
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          placeholder="Enter your password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button @click.prevent="login" type="submit" pill variant="primary"
        >Login</b-button
      >
      <b-button type="reset" pill variant="outline-danger">Reset</b-button>
      <div>
        <b-form-group label="Choose your role" v-slot="{ ariaDescribedby }">
          <b-form-radio
            id="selection"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="Admin"
            >Admin</b-form-radio
          >
          <b-form-radio
            id="selection"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="Owner"
            >Owner</b-form-radio
          >
          <b-form-radio
            id="selection"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="Customer"
            >Customer</b-form-radio
          >
        </b-form-group>

        <div class="mt-3">
          Selected: <strong>{{ selected }}</strong>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'
// import { Router } from 'express'

export default {
  data() {
    return {
      selected: '',
      form: {
        email: '',
        password: ''
      },

      show: true
    }
  },

  methods: {
    async login() {
      Api.post('/customers/login', {
        email: this.form.email,
        password: this.form.password
      }).then((response) => {
        const customerID = response.data._id
        if (response.status === 200) {
          localStorage.setItem('LoggedUser', JSON.stringify(customerID))
          this.$router.push(`customer/${customerID}`)
          this.customers = response.data.customers
        } else {
          this.$router.push('admin')
        }
      })
    },

    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
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
  background-color: #fff8f0;
  margin: 0 auto;
  width: 80%; /* value of your choice which suits your alignment */
}
</style>
