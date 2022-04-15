<template>
  <h2>Restaurant</h2>
  <h4>Name: {{restaurants.name}}</h4>
  <h4>Currency: {{restaurants.currency}}</h4>
  <h4>Phone: {{restaurants.phone}}</h4>

  <router-link :to="'/restaurant/' + restaurants.id + '/addDishes'" tag="button">ADD DISHES</router-link>
  <div></div>

  <router-link :to="'/restaurant/' + restaurants.id + '/addTables'" tag="button">ADD TABLES</router-link>
  <div></div>
</template>



<script>
    export default{
        async mounted()
        {
          var restaurantid = this.$route.params.id
            await this.axios.get('restaurant/'+ restaurantid)
            .then(response => {
              console.log(JSON.stringify(response.data));
              this.restaurants = response.data;
            });
        },
        data(){
            return {
              restaurants: []
            }
        }

    }
</script>