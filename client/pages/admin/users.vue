<template>
  <ContainerCard title="Users">
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
            <img :src="user.picture || '/logo.png'" alt="addswift logo">
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
              <BanButton :user="user" />
            </v-list-tile-action>
          </div>
        </v-list-tile>
      </div>
    </v-list>
  </ContainerCard>
</template>

<script>
import ContainerCard from '@/components/base/layout/ContainerCard'
import BanButton from '@/components/base/user/BanButton'

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
        { header: 'Banned', users: this.banned, banned: true },
        { header: 'Normal', users: this.normal }
      ]
    }
  },
  components: {
    BanButton,
    ContainerCard
  },
  middleware: ['admin', 'authenticated'],
  head() {
    return {
      title: 'Admin'
    }
  } 
}
</script>
