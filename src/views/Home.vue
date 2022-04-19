<template>
  <h2>Restaurants:</h2>
  <table>
    <thead>
    <td>ID</td>
    <td>NAME</td>
    <td>LOCATION</td>
    <td>PHONE</td>
    <td>CURRENCY</td>
    <td>EDIT</td>



    </thead>
    <tbody>
    <tr v-if="loading">LOADING MORE...</tr>
    <tr v-for="restaurants in restaurants" :key="restaurants.id">
      <td>{{ restaurants.id }}</td>
      <td>{{ restaurants.name }}</td>
      <td>{{ restaurants.location }}</td>
      <td>{{ restaurants.phone }}</td>
      <td>{{ restaurants.currency }}</td>
      <td>  <router-link :to="'/restaurant/' + restaurants.id " tag="button">ENTER</router-link></td>


    </tr>
    </tbody>
  </table>
</template>



<script>
export default{
  async mounted()
  {
    var id = localStorage.getItem('id');

    console.log(id);
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