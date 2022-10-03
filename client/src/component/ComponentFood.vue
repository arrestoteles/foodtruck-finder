<template>
  <div class="card" style="width: 18rem;">
 <img src="https://thumbs.dreamstime.com/b/homemade-burger-fried-potatoes-french-fries-fast-food-set-delicious-fresh-tomatoes-lettuce-onions-cheese-rustic-wooden-table-93980191.jpg" class="card-img-top" alt="...">
  <div class="card-body">
     <h4 class="card-title">Food Truck</h4>
     <h6 class="card-text">Name of the foodtruck:</h6>
     <h6 class="card-text">Color of the foodtruck:</h6>
     <a href="#" class="btn btn-primary">Opening hours</a>
     <b-button v-b-toggle.collapse-2 class="m-1">Location</b-button>
     <div>
  <b-collapse id="collapse-2">
    <b-card>Vasagatan 2A, Gothenburg, Sweden</b-card>
  </b-collapse>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">Dish #1: Scrambled Egg</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text1 }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="info">Dish #2: Vegan Pizza</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text2 }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="info">Special Dish #3: Spicy Salmon</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text3 }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</div>
   </div>
   </div>
 </template>

<script>
export default {
  name: 'Foodtruck-Card'
}
</script>
<script>
  export default {
    data() {
      return {
        text1: `Ingredients: Egg and oil.`
        ,text2: `Ingredients: Cheese, onion, mushroom, sauce and bread.`
        ,text3: `Ingredients: Salmon and spice.`
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

 }

 </style>
