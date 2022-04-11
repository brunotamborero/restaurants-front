<template>
  <h2>Restaurants:</h2>
  <table>
    <thead>
    <td>ID</td>
    <td>NAME</td>
    <td>LOCATION</td>
    <td>PHONE</td>


    </thead>
    <tbody>
    <tr v-if="loading">LOADING MORE...</tr>
    <tr v-for="restaurants in restaurants" :key="restaurants.id">
      <td>{{ restaurants.id }}</td>
      <td>{{ restaurants.name }}</td>
      <td>{{ restaurants.location }}</td>
      <td>{{ restaurants.phone }}</td>


    </tr>
    </tbody>
  </table>
</template>



<script>
    export default{
        async mounted()
        {
            await this.axios.get('restaurants/me')
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