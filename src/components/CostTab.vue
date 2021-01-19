<template>
  <div>
    <v-app id="inspire">
    <v-tabs
      dark
    >
      <v-tab @click="goDay">
        Day
      </v-tab>
      <v-tab @click="goMonth">
        Month
      </v-tab>
      <v-tab @click="goYear">
        Year
      </v-tab>
    </v-tabs>
    <CostContent :ck="cek" :key="cek"/>
    </v-app>
  </div>
</template>

<script>
import CostContent from './CostContent.vue';

  export default {
    data () {
      return {
        cek:0
      }
    },
    methods: {
      goDay(){
        this.cek=0;
      },
      goMonth(){
        this.cek=1;
      },
      goYear(){
        this.cek=2;
      }
    },
    components:{
      CostContent,
    }
  }
</script>

<style scoped>
  .penuh{
    height:100vh;
  }
</style>