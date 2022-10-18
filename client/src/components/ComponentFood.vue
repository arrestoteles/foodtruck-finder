<template>
<div class= "container">
  <div class="card">
 <img src="https://thumbs.dreamstime.com/b/homemade-burger-fried-potatoes-french-fries-fast-food-set-delicious-fresh-tomatoes-lettuce-onions-cheese-rustic-wooden-table-93980191.jpg" class="card-img-top" alt="...">
  <div class="card-body">
     <div class="card-title">{{ foodtruck.name }}</div>
      <div id="card-text">Dishes: </div>
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
#card-text {
font: 1em sans-serif;
}
 </style>
