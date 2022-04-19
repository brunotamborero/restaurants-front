<template>
  <Transition name="slide-fade">
    <label v-show="errormessage">Wrong username / password combination</label>
  </Transition>

  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="Login">
        <div class="row">
          <div class="col m3">
            <label>Email</label>
            <input type="text" v-model="user">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Password</label>
            <input type="password" v-model="password">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <button vtype="submit" class="btn">LOGIN</button>
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
import storage from "@/storage";

export default
{
  name: 'Login',
  data(){
    return {
      errormessage: false,
      user: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async Login()
    {
      this.errormessage = false;

      var qs = require('qs');
      var data = qs.stringify({
        'username': this.user,
        'password': this.password,
      });
      console.log(data);
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      await this.axios(config)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            console.log(JSON.stringify(response.data));
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('id', response.data.id);
            storage.commit('setAuthenticated', true);
            storage.commit('setUsername', response.data.name);
            storage.commit('setId', response.data.id);
            router.go(-1)
          })
          .catch(function (error) {
            console.log(error);
          });
      this.errormessage = true;
    }

  }
}
</script>

