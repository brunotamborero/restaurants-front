<template>
  <h2>Restaurant</h2>
  <strong>Name: {{restaurants.name}}</strong>
  <div></div>
  <strong>Currency: {{restaurants.currency}}</strong>
  <div></div>
  <strong>Phone: {{restaurants.phone}}</strong>
  <div></div>


  <router-link :to="'/restaurant/' + restaurants.id + '/addDishes'" tag="button">ADD DISHES</router-link>
  <div></div>

  <router-link :to="'/restaurant/' + restaurants.id + '/addTables'" tag="button">ADD TABLES</router-link>
  <div></div>

  <button v-on:click="delete_restaurant(restaurants.id)">DELETE</button>
  <div></div>


  <h2>Current Orders:</h2>
  <table>
    <thead>
    <td>Number of Costumers</td>
    <td>Table Number</td>
    <td>Total amount</td>
    <td>Date</td>
    <td>Start Time</td>
    <td>Details</td>
    <td>Finish</td>




    </thead>
    <tbody>
    <tr v-for="current_orders in current_orders" :key="current_orders.id">
      <td>{{ current_orders.number_costumers }}</td>
      <td>{{ current_orders.table_id }}</td>
      <td>{{ current_orders.total_amount }}</td>
      <td> {{ moment(current_orders.start_time).format('MMMM Do YYYY') }}</td>
      <td> {{ moment(current_orders.start_time).format('h:mm a')  }}</td>
      <td>  <router-link :to="'/order/' + current_orders.id " tag="button">ENTER</router-link></td>
      <button v-on:click="handleClick(current_orders.id)">FINISH</button>



    </tr>
    </tbody>
  </table>

  <h2>Finished Orders:</h2>
  <table>
    <thead>
    <td>Number of Costumers</td>
    <td>Table Number</td>
    <td>Total amount</td>
    <td>Details</td>



    </thead>
    <tbody>
    <tr v-for="finished_orders in finished_orders" :key="finished_orders.id">
      <td>{{ finished_orders.number_costumers }}</td>
      <td>{{ finished_orders.table_id }}</td>
      <td>{{ finished_orders.total_amount }}</td>
      <td>  <router-link :to="'/order/' + finished_orders.id " tag="button">ENTER</router-link></td>




    </tr>
    </tbody>
  </table>
</template>



<script>
import router from "@/router";
import moment from "moment";

export default{

  async mounted()
  {
    var restaurantid = this.$route.params.id
    await this.axios.get('restaurant/'+ restaurantid)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.restaurants = response.data;
        });
    await this.axios.get('/restaurant/order/' + restaurantid + '/current')
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.current_orders = response.data;
        });
    await this.axios.get('/restaurant/order/' + restaurantid + '/finished')
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.finished_orders = response.data;
        });

  },
  data(){
    return {
      restaurants: [],
      current_orders:[],
      finished_orders:[]

    }
  },
  methods: {
    moment: function () {
      return moment();
    },
    async handleClick(order_id) {
      await this.axios.put('order/finish/'+ order_id)
          .then(response => {
            console.log(JSON.stringify(response.data));
            router.go();
          });

    },
    async delete_restaurant(restaurant_id) {
      await this.axios.delete('restaurant/'+ restaurant_id)
          .then(response => {
            console.log(JSON.stringify(response.data));
            router.push('/');
          });

    },
  }

}
</script>