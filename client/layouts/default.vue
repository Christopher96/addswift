
<template>
  <v-app dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile @click="$router.push('/')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/settings')">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <nuxt-link to="/">
          <Logo/>
        </nuxt-link>    
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <nuxt-link v-if="this.$store.state.isLoggedIn" to="/logout">
        <v-btn class="error">
          <span class="mr-2">Logout</span>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </nuxt-link>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  components: {
    Logo
  },
  data: () => ({
    drawer: true
  }),
  props: {
    source: String
  }
}
</script>

