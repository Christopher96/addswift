<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="$store.commit('toggleDrawer')"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <nuxt-link to="/">
        <div class="logo">
            <img src="~/assets/images/logo.png">
        </div>
      </nuxt-link>    
    </v-toolbar-title>
    <v-text-field
        prepend-icon="search"
        label="Search"
        solo-inverted
        class="mx-3"
        flat
      ></v-text-field>
    <v-spacer></v-spacer>
    <nuxt-link v-if="$store.state.user" to="/logout">
      <v-btn class="error">
        <span class="mr-2">Logout</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </nuxt-link>
  </v-toolbar>
</template>

<script>
export default {
  
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
