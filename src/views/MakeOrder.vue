<template>
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="CreateOrder">
        <div class="row">
          <div class="col m3">
            <label>Number Of Clients</label>
            <input type="int" v-model="number_costumers">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <button vtype="submit" class="btn">CREATE ORDER</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import router from "@/router";
import M from 'materialize-css'


export default
{
  async mounted()
  {
    console.log("EJECUTADO");
    var elems = document.querySelectorAll('select');
    this.select_instances = M.FormSelect.init(elems, null);
    //this.$route.params.id
  },

  name: 'CreateOrder',
  data(){
    console.log(this.$route.params.id)
    return {
      number_costumers: '',
      customer_id: '',
      restaurant_id: '',
      table_id: '',
      loading: false,
      select_instances:[]
    }

  },


  methods: {
    async CreateOrder()
    {
      var customer_id = localStorage.getItem('id');
      console.log(customer_id);
      var restaurant_id = 1;
      console.log(restaurant_id);
      var table_id = 1;
      console.log(table_id);
      //"number_costumers": this.number_costumers,
      //"customer_id": localStorage.getItem('id'),
      var data = JSON.stringify({
        "number_costumers": 1,
        "customer_id": 1,
        "restaurant_id": 1,
        "table_id": 1
      });

      console.log(data);
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/order/',
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };
      this.loading = true;
      this.axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            router.go();
          })
          .catch(function (error) {
            console.log(error);
          });

      this.loading = false;



    }
  }
}
</script>