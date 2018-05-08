<template>
  <div>
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
</template>

<script>
export default {
  props: ['users', 'isBanned', 'ban']
}
</script>
