<template>
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="iniciarSesion">
        <div class="row">
          <div class="col m3">
            <label>Table Number</label>
            <input type="text" v-model="tablenumber">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Capacity</label>
            <input type="password" v-model="capacity">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <button v-show="!loading" type="submit" class="btn">CREATE ORDER<i class="material-icons right">security</i></button>
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
import M from 'materialize-css'
export default
{
  name: 'Login',
  data(){
    return {
      user: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async iniciarSesion()
    {
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
      this.loading = true;
      this.axios(config)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            console.log(JSON.stringify(response.data.access_token));
            localStorage.setItem('token', response.data.access_token);
            console.log(localStorage.token);
            this.$router.push('/');
          })
          .catch(function (error) {
            console.log(error);
            var data = error.response.data;
            M.toast({html: data.message});
          });
      this.loading = false;



    }
  }
}
</script>