<template>
  <div class="foodtruck">
    <b-avatar variant="dark"></b-avatar>
    <div class="detail">Foodtruck name: {{ foodtruck.name }}</div>
    <div class="detail">Foodtruck color: {{ foodtruck.color }}</div>
    <div class="detail">id: {{ foodtruck._id }}</div>
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

.foodtruck {
  padding-top: 10%;
}
</style>
