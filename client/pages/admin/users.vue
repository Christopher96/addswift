<template>
  <v-layout 
  class="mt-4" 
  justify-center>
    <v-flex xs4>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <div 
          v-for="item in items"
          :key="item.header"
          v-if="item.users.length > 0">
            <v-subheader>{{ item.header }}</v-subheader>
            <v-list-tile 
            avatar 
            v-for="user in item.users"
            :key="user._id"
            @click="$router.push('/' + user.username)">
              <v-list-tile-avatar>
                <img :src="user.picture || '/logo.png'">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title >
                    {{ user.username }}
                </v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
              <div
              v-if="item.actions != false">
                <v-list-tile-action>
                  <v-tooltip 
                  v-if="item.banned != false"
                  bottom>
                    <v-btn
                    icon
                    slot="activator"
                    @click.stop="unban(user._id)">
                      <v-icon>undo</v-icon>
                    </v-btn>
                    <span>Unban user</span>
                  </v-tooltip>
                  <v-tooltip 
                  v-else
                  bottom>
                    <v-btn
                    icon
                    slot="activator"
                    @click.stop="ban(user._id)">
                      <v-icon>block</v-icon>
                    </v-btn>
                    <span>Ban user</span>
                  </v-tooltip>
                </v-list-tile-action>
              </div>
            </v-list-tile>
          </div>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  asyncData({ store }) {
    return store.dispatch('admin/getUsers')
    .then(res => {
      return { users : res.data }
    })
    .catch(err => {
      console.log(err)
    })
  },
  computed: {
    banned() {
      return this.users.filter(user => user.status == 0)
    },
    admins() {
      return this.users.filter(user => user.role.priv > 2 && this.banned.indexOf(user) == -1)
    },
    normal() {
      return this.users.filter(user => this.admins.indexOf(user) == -1 && this.banned.indexOf(user) == -1)
    },
    items() {
      return [
        { header: 'Admins', users: this.admins, actions: false },
        { header: 'Banned', users: this.banned, banned: false },
        { header: 'Normal', users: this.normal }
      ]
    }
  },
  methods: {
    ban(userId) {
      return this.$store.dispatch('admin/banUser', userId)
      .then(res => {
        this.replaceUser(res.data)
      })
    },
    unban(userId) {
      return this.$store.dispatch('admin/unbanUser', userId)
      .then(res => {
        this.replaceUser(res.data)
      })
    },
    replaceUser(newUser) {
      this.users = this.users.map(user => (user._id == newUser._id) ? newUser : user)
    }
  },
  layout: 'authenticated',
  middleware: 'admin'
}
</script>
