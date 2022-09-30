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
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <form>
      <div>Sign up here</div>
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
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </b-container>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'signup',
  methods: {
    createcustomer(id) {
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
  background-color: #fa8072;
  border: #000000;
}
</style>
