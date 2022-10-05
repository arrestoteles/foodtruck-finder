<template>
  <div>
    <b-form class="myForm" @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="First Name" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.firstname"
          type="firstname"
          placeholder="Enter your first name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Last Name" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.lastname"
          placeholder="Enter your last name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Email" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.email"
          placeholder="Enter your email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Password" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.password"
          placeholder="Enter a password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" pill variant="primary">Sign up</b-button>
      <b-button type="reset" pill variant="outline-info">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      Api.post('/customers', {
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        email: this.form.email,
        password: this.form.password
      }).then((response) => {
        this.customers = response.data.customers
      })
      event.preventDefault()
      alert('Your account has been successfully created!')
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.firstname = ''
      this.form.lastname = ''
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
.myForm {
  padding-top: 3%;
  background-color: #dae1c1;
}
</style>
