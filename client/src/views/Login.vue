<template>
  <b-container fluid="md" class="myContainer">
    <form>
      <div>Login here</div>
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          type="username"
          class="form-control"
          id="exampleInputUsername"
          aria-describedby="usernameHelp"
        />
        <small id="usernameHelp" class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <p>
      ----------------------------------------------------------------------------------------------------
      or
      ----------------------------------------------------------------------------------------------------
    </p>
    <form>
      <div>Sign up here</div>
      <div class="form-group">
        <label for="exampleInputUsername1">Username</label>
        <input
          v-model="Username"
          type="username"
          class="form-control"
          id="exampleInputUsername"
          aria-describedby="usernameHelp"
        />
        <small id="usernameHelp" class="form-text text-muted"></small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="Password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button @click="createcustomer" type="submit" class="btn btn-primary">
        Submit
      </button>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="defaultCheck1"
        />
        <label class="form-check-label" for="defaultCheck1">
          Owner? Check this box
        </label>
      </div>
    </form>
  </b-container>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'signup',
  methods: {
    createcustomer() {
      Api.post('/customers', {
        username: this.Username,
        password: this.Password
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
  background-color: #0e7876;
  border: #000000;
  margin-bottom: 50px;
}
p {
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
