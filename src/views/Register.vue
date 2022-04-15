<template>
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="Register">
        <div class="row">
          <div class="col m3">
            <label>Email</label>
            <input type="text" v-model="email">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Name</label>
            <input type="text" v-model="name">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Birthday</label>
            <input type="date" v-model="birthday">
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
            <button v-show="!loading" type="submit" class="btn">CREATE USER<</button>
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

    export default
    {
        name: 'Register',
        data(){
          return {
            email: '',
            name: '',
            birthday: '',
            password: '',
            loading: false
          }
        },
        methods: {
          async Register()
          {
            var data = JSON.stringify({
              "email": this.email,
              "name": this.name,
              "birthday": this.birthday,
              "password": this.password,
            });

            console.log(data);
            var config = {
              method: 'post',
              url: 'http://127.0.0.1:8000/users',
              headers: {
                'Content-Type': 'application/json'
              },
              data : data
            };
            this.loading = true;
            this.axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                  router.push('/login')

                })
                .catch(function (error) {
                  console.log(error);
                });

            this.loading = false;



          }
        }
    }
</script>