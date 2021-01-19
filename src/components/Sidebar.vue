<template>
  <v-navigation-drawer
  class="fullkebawah"
    dark
    v-model="drawer"
    :mini-variant.sync="mini"
    :clipped="drawer.clipped"
    :fixed="drawer.fixed"
    width="200"
    permanent
    hide-overlay
    stateless
    app
    floating
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="../assets/logo.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>NusaEnergi</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="goCoba(item)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Usage', icon: 'trending_up', methoda: 'goUsage' },
          { title: 'Cost', icon: '$', methoda: 'goCost'},
          {title: 'Hardware', icon: 'dvr', methoda : 'goHardware'},
          {title: 'Logout', icon: 'reply', methoda : 'Logout'}
        ],
        mini: true,
        right: null,
      }
    },
    methods : {
      goCoba(item){
        // eslint-disable-next-line
        console.log(item.methoda);
        const tipe = item.methoda;
        if(tipe === "goUsage" ){
          this.$router.push('/usage');
        } else if(tipe === "goCost" ){
          this.$router.push('/cost');
        } else  if(tipe === "goHardware"){
          this.$router.push('/hardware');
        } else {
          this.$store.dispatch('logout')
          .then(() => {
          this.$router.push('/login')
          })
        }
      }
    }
  }
</script>

<style>
</style>
