<template>
  <v-toolbar 
    app 
    fixed 
    scroll-off-screen
  >
    <v-layout>
      <v-flex md4>
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
      <v-flex md4>
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
