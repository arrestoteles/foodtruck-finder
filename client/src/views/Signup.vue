<template>
  <div>
    <b-form
      class="col-12 col-md-4"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
      v-if="show"
    >
      <b-form-group id="input-group-1" label="First Name" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.first_name"
          type="firstname"
          placeholder="Enter your first name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Last Name" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.last_name"
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
          type="password"
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
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      show: true
    }
  },

  methods: {
    async onSubmit() {
      setTimeout(function () {
        window.location.reload()
      }, 0)
      Api.post('/customers', {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        password: this.form.password
      }).then((response) => {
        this.customers = response.data.customers
        // TODO inform upon unsuccessful signup
      })
    },

    async onReset() {
      // Reset our form values
      this.form.first_name = ''
      this.form.last_name = ''
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
  background-color: #bedcdc;
  margin: 0 auto;
  width: 80%; /* value of your choice which suits your alignment */
}
</style>
