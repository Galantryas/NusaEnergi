<template>
  <v-container grid-list-md text-xs-center>
    <v-layout justify-space-around fill-height>
      <v-flex mb2 fill-height="true" >
        <v-card dark >
        <v-card-title primary-title>
            <h3 class="headline mb-0">Total Cost</h3>
        </v-card-title>
        <v-card-text>
          <a class="rupiah">Rp</a>
          <br/>
          <br/>
          <br/>
          <br/>
          <p class="harga">{{this.fromapi}}</p>
          <hr/>
        </v-card-text>
      </v-card>
      </v-flex>
      <v-flex xs5>
        <v-card dark>
        <v-card-title primary-title>
            <h3 class="headline mb-0">{{text}}</h3>
            <CostBar :ce="ceek"/>
        </v-card-title>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CostBar from './CostBar.vue';
import axios from "axios";

export default {
  name:'CostContent',
  props:['ck'],
  data () {
      return {
        tokken  : localStorage.getItem('token'),
        active: null,
        text: 'Change in Cost',
        ceek:this.ck,
        fromapi:[]
      }
    },
  components:{
    CostBar
  },
  async mounted(){
    let resp;
      try {
      resp = await axios.get(`https://lit-brook-85851.herokuapp.com/api/user/dashboard/data/device`+'?token='+this.tokken);
      // console.log(resp.data)
      } catch (err) { 
        // eslint-disable-next-line
        console.log("err " + err);      
      }
      if(this.ck==0){
        // eslint-disable-next-line
        this.fromapi=resp.data.today.cost.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.");
      }else if(this.ck==1){
        // eslint-disable-next-line
        this.fromapi=resp.data.thisMonth.cost.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.");
      }else if(this.ck==2){
        // eslint-disable-next-line
        this.fromapi=resp.data.thisYear.cost.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.");
      }
  }
}
</script>


<style scoped>
  .rupiah{
    text-align: center;
    font-size: 1548%;
    padding-bottom: 900px;
  }
  .harga{
    font-size: 300%;
  }
</style>
