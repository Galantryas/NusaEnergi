<template>
  <div id="">
      <v-card>
        <v-card-title>
          Devices
          <v-spacer/>
        </v-card-title>
        
        <v-data-table 
          v-bind:headers="headers"
          :items="items"
          :search="tipe"
        >
        
          <template slot="items" slot-scope="props" >
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.type }}</td>
            <td  v-if="props.item.status == true">Active</td>
            <td  v-else>Non Active</td>
            <td>{{ props.item.lastUpdate }}</td>
          </template>
        </v-data-table>
      </v-card>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name:'HardwareDataTables',
  props:['ddc'],
  mounted() {
    this.getListData();
  },
  methods: {
    getListData: function() {
      var root = "https://lit-brook-85851.herokuapp.com/api/user/dashboard/data/devices/details"+'?token='+this.tokken;
      var vm = this;

      $.ajax({
        url: root,
        method: "GET"
      }).then(function(data) {
        vm.items = data;
      });
    }
  },
  data() {
    return {
      tipe: this.ddc,
      tokken: localStorage.getItem('token'),
      headers: [
        {
          text: "Name",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "Type", value: "type", align: "center" },
        { text: "Status", value: "status", align: "center" },
        { text: "Last Update", value: "lastUpdate", align: "center" }
      ],
      items: [
        
      ]
    };
  },
  computed: {
        selecttion: function(){
            return this.ddc;
        }
    }
};
</script>