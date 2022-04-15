<template>
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="CreateRestaurant">
        <div class="row">
          <div class="col m3">
            <label>Name Of The Restaurant</label>
            <input type="text" v-model="namerestaurant">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Currency</label>
            <select v-model="currency">
              <option value="Euro">Euro</option>
              <option value="Dollar">Dollar</option>
              <option value="Pound"> Pound</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Location</label>
            <input type="text" v-model="location">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Phone</label>
            <input type="integer" v-model="phone">
          </div>
        </div>

        <div class="row">
          <div class="col m3">
            <button v-show="!loading" type="submit" class="btn">CREATE RESTAURANT<i class="material-icons right">security</i></button>
            <div v-show="loading" class="progress">
              <div class="indeterminate"></div>
          </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
    import router from "@/router";
    import M from "materialize-css";

    export default

    {
      async mounted()
      {
        console.log("EJECUTADO");
        var elems = document.querySelectorAll('select');
        this.select_instances = M.FormSelect.init(elems, null);
      },
        name: 'Restaurant',
        data(){
          return {
            namerestaurant: '',
            currency: '',
            location: '',
            phone: '',
            loading: false,
            select_instances:[]
          }
        },
        methods: {
          async CreateRestaurant()
          {
            var data = JSON.stringify({
              "name": this.namerestaurant,
              "currency": this.currency,
              "location": this.location,
              "phone": this.phone,
            });

            console.log(data);
            var config = {
              method: 'post',
              url: 'http://127.0.0.1:8000/restaurants',
              headers: {
                'Content-Type': 'application/json'
              },
              data : data
            };
            this.loading = true;
            this.axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                  router.push('/')

                })
                .catch(function (error) {
                  console.log(error);
                });

            this.loading = false;



          }
        }
    }
</script>