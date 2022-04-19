<template>
  <h2>User</h2>
  <strong>Name: {{user.name}}</strong>
  <div></div>
  <strong>Email: {{user.email}}</strong>
  <div></div>

  <strong>Birthday: {{user.birthday}}</strong>
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




    </thead>
    <tbody>
    <tr v-for="current_orders in current_orders" :key="current_orders.id">
      <td>{{ current_orders.number_costumers }}</td>
      <td>{{ current_orders.table_id }}</td>
      <td>{{ current_orders.total_amount }}</td>
      <td> {{ moment(current_orders.start_time).format('MMMM Do YYYY') }}</td>
      <td> {{ moment(current_orders.start_time).format('h:mm a')  }}</td>

      <td>  <router-link :to="'/order/' + current_orders.id " tag="button">ENTER</router-link></td>



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
    <td>Pay</td>




    </thead>
    <tbody>
    <tr v-for="finished_orders in finished_orders" :key="finished_orders.id">
      <td>{{ finished_orders.number_costumers }}</td>
      <td>{{ finished_orders.table_id }}</td>
      <td>{{ finished_orders.total_amount }}</td>
      <td>  <router-link :to="'/order/' + finished_orders.id " tag="button">ENTER</router-link></td>
      <td>  <router-link :to="'/order/' + finished_orders.id + '/pay' " tag="button">PAY</router-link></td>





    </tr>
    </tbody>
  </table>

</template>



<script>
import moment from "moment";

export default{
  async mounted()
  {
    await this.axios.get('http://127.0.0.1:8000/users/me/')
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.user = response.data;
        });
    await this.axios.get('/user/order/' + this.user.id + '/current')
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.current_orders = response.data;
        });
    await this.axios.get('/user/order/' + this.user.id + '/finished')
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.finished_orders = response.data;
        });

  },
  methods: {
    moment: function () {
      return moment();
    }
  },
  data(){
    return {
      user: [],
      current_orders:[],
      finished_orders:[]
    }
  }

}
</script>