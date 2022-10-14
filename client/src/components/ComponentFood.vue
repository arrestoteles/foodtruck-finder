<template>
<div class= "container">
  <div class="card">
 <img src="https://thumbs.dreamstime.com/b/homemade-burger-fried-potatoes-french-fries-fast-food-set-delicious-fresh-tomatoes-lettuce-onions-cheese-rustic-wooden-table-93980191.jpg" class="card-img-top" alt="...">
  <div class="card-body">
     <div class="card-title">Food Truck</div>
      <div class="card-text">Foodtruck name: {{ foodtruck.name }}</div>
  <div class="accordion" role="tablist">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">Dish Menu</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
        </b-card-body>
      </b-collapse>
  </div>
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
 .card-title{
     color: black;
     font-weight:bolder;

 }

 .container{
  width: 18rem
 }

 </style>
