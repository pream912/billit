<template>
  <v-app dark>
    <app-layout></app-layout>
  </v-app>
</template>

<script>
import Layout from './components/Layout.vue'
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
    }
  },
  components: {
    appLayout: Layout
  }
}
</script>
