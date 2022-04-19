<template>

  <h2>Dishes:</h2>
  <table>
    <thead>
    <td>NAME</td>
    <td>PRICE</td>
    <td>DESCRIPTION</td>
    <td>SUITABLEDIET</td>
    <td>ADD</td>



    </thead>
    <tbody>
    <tr v-if="loading">LOADING MORE...</tr>
    <tr v-for="dishes in dishes" :key="dishes.name">
      <td>{{ dishes.name }}</td>
      <td>{{ dishes.price }}</td>
      <td>{{ dishes.description }}</td>
      <td>{{ dishes.suitableDiet }}</td>

      <button v-on:click="handleClick(dishes.id, quantity, dishes_order)">Add </button>




    </tr>
    </tbody>
  </table>
  <h4>Quantity:</h4>
  <input v-model="quantity" type="int" :min="1">
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="CreateOrder">
        <div class="row">
          <div class="col m3">
            <button vtype="submit" class="btn">FINISH ORDER</button>
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

    await this.axios.get('http://127.0.0.1:8000/order/'+ this.$route.params.id)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.order = response.data;
        });
    await this.axios.get('dishes/' + this.order.restaurant_id)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.dishes = response.data;
        });
  },

  name: 'AddDishes',
  data(){
    return {
      dishes: [],
      dishes_order: [],
      orderid: '',
      order: [],
      price: '',
      description: '',
      suitableDiet: '',
      quantity: '',
      select_instances:[]
    }

  },

  methods: {
    async handleClick(id, quantity, dishes_order) {
      this.countDownTimer();
      console.log(quantity)
      if (quantity < 1) quantity = 1
      var data = JSON.stringify({
        "detail_id_dish": id,
        "quantity": quantity,
      });
      this.added = true;

      dishes_order.push(data);

    },
    async CreateOrder()
    {
      var datalist = JSON.stringify({
        dishes: this.dishes_order
      });
      var newStr = datalist.replaceAll(/"{/g, "{");
      newStr = newStr.replaceAll(/}"/g, "}");
      newStr = newStr.replaceAll(/\\/gi, '');

      console.log(newStr)

      var config = {
        method: 'put',
        url: 'http://127.0.0.1:8000/order/' + this.$route.params.id + '/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: newStr
      };
      this.axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            router.push('/order/' + response.data.id + '/')
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },
}
</script>