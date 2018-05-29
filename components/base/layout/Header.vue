/*
 * Header template
 */
 
<template>
  <v-toolbar 
    id="header"
    app 
    fixed 
    scroll-off-screen>
    <v-layout>
      <v-flex xs2 lg3 xl4>
        <v-btn
        icon
        @click="setDrawer(true)">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs10 sm8 md8 lg6 xl4 id="search">
        <v-layout row>
        <v-text-field
            prepend-icon="search"
            label="Search"
            solo-inverted
            flat
          ></v-text-field>
        </v-layout>
      </v-flex>
      <v-flex sm2 md2 lg3></v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    authenticated: Boolean
  },
  methods: {
    setDrawer(state) {
      this.$store.commit('setDrawer', state)
    }
  }
}
</script>


<style lang="stylus" scoped>
@require '~vuetify/src/stylus/settings/_variables'

@media $display-breakpoints.xs-only
  #header
    padding .5em !important
  #search
    padding-right .5em

.logo,
.toolbar__title
    height 100%

.toolbar__title .logo img
    height 100%
    padding .6em

</style>
