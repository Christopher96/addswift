<template>
  <v-toolbar 
    app 
    fixed 
    scroll-off-screen>
    <v-layout>
      <v-flex xs3 xl5>
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
      <v-flex xs6 xl4>
        <v-layout row>
        <v-text-field
            prepend-icon="search"
            label="Search"
            solo-inverted
            flat
          ></v-text-field>
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
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


<style lang="scss" scoped>
.logo,
.toolbar__title {
    height: 100%;
}

.toolbar__title .logo img {
    height: 100%;
    padding: .6em;
}
</style>
