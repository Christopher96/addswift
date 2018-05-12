<template>
  <v-toolbar 
    id="header"
    app 
    fixed 
    scroll-off-screen>
    <v-layout>
      <v-flex xs1 sm2 lg3>
        <v-btn
        icon
        @click="setDrawer(true)">
          <v-icon>menu</v-icon>
        </v-btn>
        <div v-if="!authenticated">
          <nuxt-link to="/login">
            <v-btn color="secondary">
              Log in
            </v-btn>
          </nuxt-link>
          <nuxt-link to="/register">
            <v-btn color="secondary">
              Register
            </v-btn>
          </nuxt-link>
        </div>
      </v-flex>
      <v-flex xs11 sm8 lg6 id="search">
        <v-layout row>
        <v-text-field
            prepend-icon="search"
            label="Search"
            solo-inverted
            flat
          ></v-text-field>
        </v-layout>
      </v-flex>
      <v-flex sm1 md2 lg3></v-flex>
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
    padding-right 1em !important
  #search
    padding-left 2em

.logo,
.toolbar__title
    height 100%

.toolbar__title .logo img
    height 100%
    padding .6em

</style>
