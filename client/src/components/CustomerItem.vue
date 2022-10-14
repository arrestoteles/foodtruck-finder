<template>
  <div class="customer">
    <b-avatar variant="dark"></b-avatar>
    <div class="detail">First name: {{ customer.first_name }}</div>
    <div class="detail">Last name: {{ customer.last_name }}</div>
    <div class="detail">Email: {{ customer.email }}</div>
    <div class="detail">Password: {{ customer.password }}</div>
    <div class="detail">id: {{ customer._id }}</div>
    <b-button
      class="deletebtn"
      pill
      variant="danger"
      v-on:click="$emit('del-customer', customer._id)"
      >Delete</b-button
    >
    <b-button
      class="updatebtn"
      pill
      variant="primary"
      v-on:click="$emit('update-customer', customer._id)"
      >Update</b-button
    >
  </div>
</template>

<script>
export default {
  name: 'customer-item',
  props: ['customer']
}
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .detail {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .more-info {
    color: rgb(0, 0, 0);
  }
}

.customer {
  padding-top: 10%;
}
</style>
