<template>
  <h2>Order</h2>
  <strong>ID: {{order.id}}</strong>
  <div></div>
  <strong>Table: {{order.table_id}}</strong>
  <div></div>

  <h5>TOTAL: {{order.total_amount}}</h5>
  <div></div>

  <h2>DISHES:</h2>
  <table>
    <thead>
    <td>QUANTITY</td>
    <td>NAME</td>
    <td>PRICE</td>



    </thead>
    <tbody>
    <tr v-if="loading">LOADING MORE...</tr>
    <tr v-for="dishes in dishes" :key="dishes.id">
      <td>{{ dishes.quantity }}</td>
      <td>{{ dishes.name_dish }}</td>
      <td>{{ dishes.price_dish }}</td>


    </tr>
    </tbody>
  </table>
  <button class=button>  <router-link :to="'/CreateOrderDishes/' + order.id" >Add Dishes</router-link>
  </button>

</template>


<script>

export default
{
  async mounted()
  {
    await this.axios.get('order/' + this.$route.params.id)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.order = response.data;
          this.dishes = response.data.details;

          console.log(this.order)
        });
  },

  name: 'AddDishes',
  data(){
    console.log(this.$route.params.id)
    return {
      order: '',
      dishes: '',
      loading: false,

    }

  },


  methods: {
    async AddDish()
    {
      var data = JSON.stringify({
        "name": this.name,
        "price": this.price,
        "description": this.description,
        "suitableDiet": this.suitableDiet,
      });

      console.log(data);
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/restaurant/' + this.$route.params.id + '/dishes',
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };
      this.loading = true;
      this.axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

      this.loading = false;



    }
  }
}
</script>


<style>

.button {
  background-color: #64ff01;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

</style>
