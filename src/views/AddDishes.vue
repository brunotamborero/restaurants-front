<template>
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="AddDish">
        <div class="row">
          <div class="col m3">
            <label>Name</label>
            <input type="text" v-model="name">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Price</label>
            <input type="int" v-model="price">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>description</label>
            <input type="text" v-model="description">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Suitable Diet</label>
            <select v-model="suitableDiet">
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian"> Vegetarian</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col m3">
            <button v-show="!loading" type="submit" class="btn">ADD DISH</button>
            <div v-show="loading" class="progress">
              <div class="indeterminate"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <h2>DISHES:</h2>
  <table>
    <thead>
    <td>NAME</td>
    <td>PRICE</td>
    <td>DESCRIPTION</td>
    <td>SUITABLEDIET</td>
    <td>DELETE</td>



    </thead>
    <tbody>
    <tr v-if="loading">LOADING MORE...</tr>
    <tr v-for="dishes in dishes" :key="dishes.name">
      <td>{{ dishes.name }}</td>
      <td>{{ dishes.price }}</td>
      <td>{{ dishes.description }}</td>
      <td>{{ dishes.suitableDiet }}</td>
      <button v-on:click="delete_dish(dishes.id)">X</button>



    </tr>
    </tbody>
  </table>
</template>


<script>
import router from "@/router";
import M from 'materialize-css'


export default
{
  async mounted()
  {
    console.log("EJECUTADO");
    var elems = document.querySelectorAll('select');
    this.select_instances = M.FormSelect.init(elems, null);
    await this.axios.get('dishes/' + this.$route.params.id)
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
      name: '',
      price: '',
      description: '',
      suitableDiet: '',
      loading: false,
      select_instances:[]
    }

  },


  methods: {
    async delete_dish(dish_id) {
      await this.axios.delete('dish/' + dish_id)
          .then(response => {
            console.log(JSON.stringify(response.data));
            router.go();

          });
    },

    async AddDish()
    {
      if (this.suitableDiet){
        var data = JSON.stringify({
          "name": this.name,
          "price": this.price,
          "description": this.description,
          "suitableDiet": this.suitableDiet,
        });
      }
      else{
        data = JSON.stringify({
          "name": this.name,
          "price": this.price,
          "description": this.description,
        });
      }


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
            router.go();
          })
          .catch(function (error) {
            console.log(error);
          });

      this.loading = false;



    }
  }
}
</script>