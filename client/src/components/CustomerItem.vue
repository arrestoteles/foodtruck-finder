<template>
  <div>
    <div class="detail">Customer: {{ customer.username }}</div>
    <b-button variant="danger" v-on:click="$emit('del-customer', customer._id)"
      >Delete</b-button
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
</style>
