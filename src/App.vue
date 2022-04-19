<template>
  <nav>
    <div class="nav-wrapper">
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link v-if="!$store.state.isAuthenticated" to="/Register">Register</router-link></li>
        <li><router-link to="/Restaurant">Restaurant</router-link></li>


        <li><router-link v-if="$store.state.isAuthenticated" to="/User">{{$store.state.username}}</router-link></li>
        <li><router-link v-if="!$store.state.isAuthenticated" :to="{name: 'Login'}">Login</router-link></li>
        <li><a href="#!" v-if="$store.state.isAuthenticated" @click="$store.commit('logout')">Logout</a></li>
      </ul>
    </div>
  </nav>

  <div class="container white" style="margin-top:30px">
    <router-view></router-view>
  </div>


</template>

<script>

export default {
  name: 'App',
}
</script>


