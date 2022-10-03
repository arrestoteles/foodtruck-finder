<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="foodtrucks"> Foodtrucks</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Sign up</router-link> |
      <router-link to="/admin">Admin</router-link> |
    </div>
    <!-- Render the content of the current page view -->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Garamond', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
router-link {
  white-space: normal;
  padding-left: 10px;
}
</style>
