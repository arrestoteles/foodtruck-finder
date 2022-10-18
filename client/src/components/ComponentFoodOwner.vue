<template>
  <div class="container">
    <div class="card">
      <img
        src="https://thumbs.dreamstime.com/b/homemade-burger-fried-potatoes-french-fries-fast-food-set-delicious-fresh-tomatoes-lettuce-onions-cheese-rustic-wooden-table-93980191.jpg"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <div class="card-title">{{ foodtruck.name }}</div>
        <div class="card-text">Dishes:{{ foodtruck.dishes }}</div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentFood',
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
.card-title {
  color: black;
  font-weight: bolder;
}

.container {
  width: 18rem;
}
</style>
