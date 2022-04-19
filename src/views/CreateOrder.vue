<template>
  <label>Max Capacity: {{restaurantables.capacity}}</label>
  <div></div>
  <label>Table Number: {{restaurantables.table_number}}</label>

  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="CreateOrder">
        <div class="row">
          <div class="col m3">
            <label>Number Of Clients</label>
            <vue-number-input v-model="number_costumers" :min="1" :max=restaurantables.capacity inline controls></vue-number-input>
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <button vtype="submit" class="btn">CREATE ORDER</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>


import router from "@/router";

export default
{
  async mounted()
  {
    this.customer_id = localStorage.getItem('id');
    console.log('Costumer id:' + this.customer_id);
    this.restaurant_id = this.$route.params.idrestaurant;
    console.log('Restaurant id:' + this.restaurant_id);
    this.table_id = this.$route.params.idtable;
    console.log('Table id:' + this.table_id);

    await this.axios.get('/restauranttables/' + this.restaurant_id +'/' + this.table_id + '/')
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.restaurantables = response.data;
        });
    console.log(this.$route.params.idrestaurant)
    console.log(this.$route.params.idtable)
    console.log('Capacity:' + this.restaurantables.capacity);

  },

  name: 'CreateOrder',
  data(){
    return {
      number_costumers: '',
      customer_id: '',
      restaurant_id: '',
      table_id: '',
      restaurantables: [],
      loading: false,
      select_instances:[]
    }

  },


  methods: {
    async CreateOrder()
    {
      var data = JSON.stringify({
        "number_costumers": this.number_costumers,
        "customer_id": this.customer_id,
        "restaurant_id": this.restaurant_id,
        "table_id": this.table_id
      });

      console.log(data);
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/order/',
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };
      this.loading = true;
      this.axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data.id));
            router.push('/CreateOrderDishes/' + response.data.id)
          })
          .catch(function (error) {
            console.log(error);
          });

      this.loading = false;



    }
  }
}
</script>