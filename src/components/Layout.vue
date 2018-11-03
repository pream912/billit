<template>
  <v-app id="keep">
    <v-navigation-drawer
    class="teal lighten-3"
    :mini-variant.sync="mini"
    clipped
    app
  >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        router
        :to="item.route"
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

    <v-toolbar color="teal" app absolute clipped-left>
      <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Bill<span class="font-weight-light">it</span></span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>

    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      items: [
          { title: 'Dashboard', icon: 'dashboard', route: '/home' },
          { title: 'Sales', icon: 'attach_money', route: '/invoice'  },
          { title: 'Customers', icon: 'people', route: '/customers' },
          { title: 'Products', icon: 'toys', route: '/products' },
          { title: 'Settings', icon: 'settings', route: '/' },
        ],
      mini: false  

    }),
    props: {
      source: String
    },
    computed: {
      loading () {
        if (this.$store.getters.loading || this.$store.getters.loadingCustomers || this.$store.getters.loadingProducts) {
          return true
        }
        else {
          return false
        }
      }
    }
  }
</script>

<style >
 
</style>