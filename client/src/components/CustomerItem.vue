<template>
    <div>
        <b-button variant="danger" v-on:click="$emit('del-customer', customer._id)">X</b-button>
        <div>The {{ customer.username }} customer</div>
        <div class="detail"> name is:  {{ customer.username }}</div>
        <div class="more-info">Customer summary</div>
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
    color: red;
  }
}
</style>
