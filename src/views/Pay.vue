<template>

  <div class="row">
    <div class="col m3">
      <label>Payment Method</label>
      <select int="payment_type">
        <option value="Cash">Cash</option>
        <option value="Paypal">Paypal</option>
        <option value="Credit Card"> Credit Card</option>
      </select>
    </div>
  </div>
  <button class=button>  <router-link :to="'/User'" >PAY</router-link></button>
</template>


<script>
//import router from "@/router";
import M from "materialize-css";

export default

{
  async mounted()
  {
    var elems = document.querySelectorAll('select');
    this.select_instances = M.FormSelect.init(elems, null);
  },
  name: 'Restaurant',
  data(){
    return {
      Payment_type: '',
      select_instances:[]
    }
  },
}
</script>

<style>

  .button {
  background-color: #64ff01;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  }

</style>
