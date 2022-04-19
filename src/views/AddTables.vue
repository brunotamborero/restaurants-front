<template>
  <div class="row">
    <div class="col m12 card-panel">
      <form @submit.prevent="AddTable">
        <div class="row">
          <div class="col m3">
            <label>Table number</label>
            <input type="int" v-model="table_number">
          </div>
        </div>
        <div class="row">
          <div class="col m3">
            <label>Capacity</label>
            <input type="int" v-model="capacity">
          </div>
        </div>

        <div class="row">
          <div class="col m3">
            <button v-show="!loading" type="submit" class="btn">ADD TABLE</button>
            <div v-show="loading" class="progress">
              <div class="indeterminate"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <h5>TABLES:</h5>
  <table>
    <thead>
    <td>TABLE NUMBER</td>
    <td>CAPACITY</td>
    <td>QR</td>
    <td>DELETE</td>





    </thead>
    <tbody>
    <tr v-if="loading">LOADING MORE...</tr>
    <tr v-for="tables in tables" :key="tables.id">
      <td>{{ tables.table_number }}</td>
      <td>{{ tables.capacity }}</td>
      <vue-qr :text="'http://localhost:8080/createorder/' + this.$route.params.id + '/' + tables.table_number + '/'" :size="100"></vue-qr>
      <td><button v-on:click="delete_table(tables.id)">X</button></td>
    </tr>
    </tbody>
  </table>

</template>


<script>
import router from "@/router";
import vueQr from 'vue-qr/src/packages/vue-qr.vue'


export default
{
  components: {vueQr},

  async mounted()
  {
    console.log("EJECUTADO");
    await this.axios.get('restauranttables/' + this.$route.params.id)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.tables = response.data;
        });
  },

  name: 'AddTables',
  data(){
    console.log(this.$route.params.id)
    return {
      tables: [],
      table_number: '',
      capacity: '',
      loading: false,
    }

  },


  methods: {
    async delete_table(table_id) {
      await this.axios.delete('/restauranttables/' + table_id)
          .then(response => {
            console.log(JSON.stringify(response.data));
            router.go();

          });
    },
    async AddTable()
    {
      var data = JSON.stringify({
        "table_number": this.table_number,
        "capacity": this.capacity,
      });

      console.log(data);
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/restaurant/' + this.$route.params.id + '/restauranttables/',
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