<template>
  <nav>
    <div class="nav-wrapper">
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/Register">Register</router-link></li>
        <li><router-link to="/Restaurant">Restaurant</router-link></li>
        <li><router-link to="/MakeOrder">MakeOrder</router-link></li>

        <li><router-link to="/User">User</router-link></li>

        <li><router-link :to="{name: 'Login'}">Login</router-link></li>
      </ul>
    </div>
  </nav>

  <div class="container white" style="margin-top:30px">
    <router-view></router-view>
  </div>

  <div class="user-data">
    <label>Id: {{id}}</label>
    <label>Usuario: {{usuario}}</label>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    usuario(){
      return localStorage.getItem('userName')
    },
    id(){
      return localStorage.getItem('id')
    }
  }
}
</script>

<style scoped>
  .user-data
  {
    position:fixed;
    bottom: 0px; left: 0px;
    padding:10px;
    background-color:white;
    border-radius:5px;
    z-index: 2;
  }
</style>