<template>
  <div>
    <v-app id="inspire">
    <v-tabs
      dark
    >
      <HS :dec="devc" @dataupdated="devc=$event" />
    </v-tabs>
    <HardwareContent :dev="devc" :key="devc"/>
    </v-app>
  </div>
</template>

<script>
import HardwareContent from './HardwareContent.vue';
import HS from './HardwareSelection';

  export default {
    data (){
      return{
        devc:""
      }
    },
    methods: {
    },
    components:{
      HardwareContent,
      HS
    }
  }
</script>

<style scoped>
  .penuh{
    height:100vh;
  }
</style>