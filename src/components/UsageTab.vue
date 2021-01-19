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
    <UsageContent :md="mode" :key="mode"/>
    </v-app>
  </div>
</template>

<script>
import UsageContent from './UsageContent.vue';
// Vue.forceUpdate();

  export default {
    data () {
      return {
        mode:0
      }
    },
    methods: {
      goDay(){
        this.mode=0;
      },
      goMonth(){
        this.mode=1;
      },
      goYear(){
        this.mode=2;
      },
    },
    components:{
      UsageContent,
    }
  }
</script>

<style scoped>
  .penuh{
    height:100vh;
  }
</style>