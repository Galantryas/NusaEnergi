<template>
  <v-container grid-list-md text-xs-center>
    <v-layout justify-space-around fill-height>
      <v-flex mxs12 fill-height="true" >
        <v-card dark >
        <HardwareTables :ddc="devicee" />
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HardwareTables from './HardwareDataTables.vue';

export default {
  name:'HardwareContent',
  props:['dev'],
  data () {
      return {
        active: null,
        devicee: this.dev
      }
    },
  components:{
    HardwareTables,
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
