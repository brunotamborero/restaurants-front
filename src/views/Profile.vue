<template>
  <h2>User</h2>
  <h4>Name: {{user.name}}</h4>
  <h4>Email: {{user.email}}</h4>
  <h4>Birthday: {{user.birthday}}</h4>

</template>



<script>
    export default{
        async mounted()
        {
            await this.axios.get('http://127.0.0.1:8000/users/me/')
            .then(response => {
              console.log(JSON.stringify(response.data));
              this.user = response.data;
            });
        },
        data(){
            return {
              user: []
            }
        }

    }
</script>