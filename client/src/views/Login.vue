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

      <b-button
        class="loginbtn"
        @click.prevent="login"
        type="submit"
        pill
        variant="primary"
        >Login</b-button
      >
      <b-button class="resetbtn" type="reset" pill variant="outline-danger"
        >Reset</b-button
      >
      <div>
        <b-dropdown class="rolebtn" right text="Choose your role">
          <b-dropdown-item>Admin</b-dropdown-item>
          <b-dropdown-item>Owner</b-dropdown-item>
          <b-dropdown-item>Customer</b-dropdown-item>
        </b-dropdown>
      </div>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'

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
  background-color: #e6e6e6;
  margin: 0 auto;
  width: 80%; /* value of your choice which suits your alignment */
}
.rolebtn {
  margin-top: 10px;
}
.loginbtn {
  margin-right: 5px;
}
.resetbtn {
  margin-left: 5px;
}
.rolebtn {
  margin-bottom: 10px;
}
</style>
