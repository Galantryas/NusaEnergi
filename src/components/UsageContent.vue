<template>
  <v-container grid-list-md text-xs-center>
    <v-layout justify-space-around fill-height>
      <v-flex mb2 fill-height="true" >
        <v-card dark >
        <v-card-title primary-title>
            <h3 class="headline mb-0">Enegy Instensity</h3>
            <UsageGauge :mde="moode"/>
        </v-card-title>

      </v-card>
      </v-flex>
      <v-flex xs5>
        <v-card dark>
        <v-card-title primary-title>
            <h3 class="headline mb-0">Change in Usage</h3>
            <UsageBar :mda="moode"/>
        </v-card-title>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UsageGauge from './UsageGauge.vue';
import UsageBar from './UsageBar.vue';

export default {
  name:'usageContent',
  props:['md'],
  data(){
    return{
      moode:this.md
    }
  },
  components:{
    UsageGauge,
    UsageBar
  }  
}
</script>


<style scoped>

</style>
