<template>
  <div class="customer">
    <b-avatar variant="dark"></b-avatar>
    <div class="detail">First name: {{ customer.first_name }}</div>
    <div class="detail">Last name: {{ customer.last_name }}</div>
    <div class="detail">Email: {{ customer.email }}</div>
    <div class="detail">
      Favorite Foodtrucks: {{ customer.foodtrucks.name }}
    </div>
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
    <b-button
      class="resetbtn"
      pill
      variant="info"
      v-on:click="$emit('reset-customer', customer._id)"
      >Reset</b-button
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
@media screen and (max-width: 600px) {
  .detail {
    display: none;
  }
}

@media screen and (min-width: 600px) {
  .more-info {
    color: rgb(0, 0, 0);
  }
}

.customer {
  padding-top: 10%;
}
.deletebtn {
  margin-right: 2px;
}
.updatebtn {
  margin-right: 2px;
}
</style>
