<template>
<v-layout>
    <v-navigation-drawer
      permanent
      :temporary="!mini"
      :mini-variant="mini"
      dark
      fixed
    >
      <v-list>
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar @click="$router.push('/' + user.username)">
          <v-list-tile-avatar>
            <img :src="user.picture || 'logo.png'" :class="!user.picture ? 'profile-thumb' : ''">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.username }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider light></v-divider>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="$router.push(item.path)">
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
export default {
  data () {
    return {
      items: [
        { title: 'Settings', icon: 'settings', path: '/settings' },
      ],
      mini: true
    }
  },
  methods: {
    logout() {
       this.$store.dispatch('auth/logout')
        .then((res) => {
          this.$router.push('/login')
        }).catch((err) => {
          console.log(err)
          if(err.response.data)
            this.error = err.response.data
          else console.log(err)
        })
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  }
}
</script>

<style lang="stylus" scoped>
.profile-thumb
  border: 1px solid;
</style>
