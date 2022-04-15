<template>

  <h2>DISHES:</h2>
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
      <button v-on:click="handleClick(dishes.id, quantity, dishes_order)">Add</button>




    </tr>
    </tbody>
  </table>
  <h4>Quantity:</h4>
  <input v-model="quantity" type="int">
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
          console.log(this.$route.params.id)
          return {
            dishes: [],
            dishes_order: [],

            order: [],
            name: '',
            price: '',
            description: '',
            suitableDiet: '',
            quantity: '',
            loading: false,
            select_instances:[]
          }

        },


        methods: {
          async handleClick(id, quantity, dishes_order) {
            var data = JSON.stringify({
              "detail_id_dish": id,
              "quantity": quantity,
            });
            dishes_order.push(data)

          },
          async CreateOrder()
          {
            var datalist = JSON.stringify({
            dishes: this.dishes_order
          });
            var newStr = datalist.replace(/"{/, "{");
            newStr = newStr.replace(/}"/, "}");
            newStr = newStr.replace(/\\/gi, '')
            console.log(newStr);

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
                  router.go();
                })
                .catch(function (error) {
                  console.log(error);
                });
          }
        }
    }
</script>