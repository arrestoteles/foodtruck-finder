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
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },

      show: true
    }
  },

  methods: {
    async login() {
      setTimeout(function () {}, 0)
      Api.post('/customers/login', {
        email: this.form.email,
        password: this.form.password
      }).then((response) => {
        if (response.status === 200) {
          const id = response.data._id
          alert(
            response.status === 200 ? 'Successul Login!' : 'ERROR ON TERROR'
          )
          window.location.assign(
            // http://localhost:8081/customer/${id}
            `https://limitless-harbor-45889.herokuapp.com/api/customer/${id}`
          )
          this.customers = response.data.customers
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
