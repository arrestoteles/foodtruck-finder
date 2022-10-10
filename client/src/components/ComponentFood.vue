<template>
<div class= "food-card">
  <div class="card" style="width: 18rem;">
 <img src="https://thumbs.dreamstime.com/b/homemade-burger-fried-potatoes-french-fries-fast-food-set-delicious-fresh-tomatoes-lettuce-onions-cheese-rustic-wooden-table-93980191.jpg" class="card-img-top" alt="...">
  <div class="card-body">
     <h4 class="card-title">Food Truck</h4>
     <h6 class="card-text">Name of the foodtruck:</h6>
     <div>
  <b-collapse id="collapse-2">
    <b-card>Vasagatan 2A, Gothenburg, Sweden</b-card>
  </b-collapse>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">Dish Menu</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" v-on="dishlist">
        <b-card-body>
          <b-card-text>{{ dishes }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</div>
   </div>
   </div>
   </div>
 </template>

<script>
export default {
  name: 'Foodtruck-Card',
  props: ['foodtruck']
}
</script>
<script>
  export default {
    data() {
      return {
        dishes
      }
    }
    ,methods: {
    dishlist() {
    }
  }
  }
</script>

 <style scoped>
 .card-title{
     color: black;
     font-weight:bolder;

 }
 .card{
     width: 18re;
     margin-bottom: 30px;

 }
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
