<template>
<v-layout>
    <v-navigation-drawer
      dark
      fixed
      temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-tile avatar 
        @click="$router.push('/' + user.username)">
          <v-list-tile-avatar>
            <img :src="user.picture || '/logo.png'">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.username }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn 
            icon 
            @click.stop="setDrawer(false)">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          prepend-icon="person"
          value="true"
          v-if="isAdmin"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>
          <v-list-tile 
          to="/admin/users">
            <v-list-tile-title>User management</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>people_outline</v-icon>
            </v-list-tile-action>
          </v-list-tile>
       </v-list-group>
      </v-list>
      <v-list>
        <v-list-tile 
        v-for="item in items" 
        :key="item.title" 
        :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="danger" @click="logout">
          <v-list-tile-action class="text-xs-center">
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      items: [
        { title: 'Settings', icon: 'settings', path: '/settings' },
      ]
    }
  },
  methods: {
    logout() {
       this.$router.push('/logout')
    },
    setDrawer(state) {
      this.$store.commit('setDrawer', state)
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isAdmin: 'auth/isAdmin'
    }),
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(state) {
        this.setDrawer(state)
      }
    }
  },
}
</script>
