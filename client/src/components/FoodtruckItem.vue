<template>
  <div class="foodtruck">
    <div class="detail">Foodtruck name: {{ foodtruck.name }}</div>
    <b-button
      class="deletebtn"
      pill
      variant="danger"
      v-on:click="$emit('del-foodtruck', foodtruck._id)"
      >Delete</b-button
    >
    <b-button
      class="updatebtn"
      pill
      variant="primary"
      v-on:click="$emit('update-foodtruck', foodtruck._id)"
      >Update</b-button
    >
  </div>
</template>

<script>
export default {
  name: 'foodtruck-item',
  props: ['foodtruck']
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

.foodtruck {
  padding-top: 10%;
}
</style>
