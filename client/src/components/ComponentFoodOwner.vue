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
        <div class="card-text">Dishes:</div>
        <b-row>
          <b-col cols="9">
            <b-input
              v-model="FoodtruckName"
              placeholder="Change name of foodtruck here..."
            >
            </b-input>
          </b-col>
          <b-col cols="0"></b-col>
          <b-col cols="3">
            <b-button
              class="sidebutton"
              pill
              variant="success"
              v-on:click="
                $emit('update-foodtruck', foodtruck._id, FoodtruckName)
              "
            ></b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="7" id="dishtext">Create new dish:</b-col>
          <b-col cols="2"></b-col>
          <b-col cols="3"></b-col>
        </b-row>
        <b-row>
          <b-col cols="9">
            <b-input v-model="dishname" placeholder="Dish name..."> </b-input>
          </b-col>
          <b-col cols="0"></b-col>
          <b-col cols="3"></b-col>
        </b-row>
        <b-row>
          <b-col cols="9">
            <b-input v-model="dishprice" placeholder="Dish price..."> </b-input>
          </b-col>
          <b-col cols="0"></b-col>
          <b-col cols="3">
            <b-button
              class="sidebutton"
              pill
              variant="success"
              v-on:click="
                $emit('create-dish', foodtruck._id, dishname, dishprice)
              "
            >
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="0"></b-col>
          <b-col cols="12">
            <b-button
              class="deletebtn"
              pill
              variant="danger"
              v-on:click="$emit('del-foodtruck', foodtruck._id)"
              >Delete Foodtruck</b-button
            >
          </b-col>
          <b-col cols="0"></b-col>
        </b-row>
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

input::placeholder {
  font-size: 8px;
  font-weight: bolder;
}
.sidebutton {
  padding-right: 10px;
  padding-left: 20px;
  width: 50px;
  height: 33px;
}
.deletebtn {
  margin-top: 10px;
}
#dishtext {
  padding-top: 10px;
  font-size: 14px;
}
</style>
