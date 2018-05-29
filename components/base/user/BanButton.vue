/*
 * Button for banning or unbanning users
 */

<template>
    <v-tooltip 
    v-if="isBanned"
    bottom>
        <v-btn
        icon
        slot="activator"
        @click.stop="unban(user)">
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
        @click.stop="ban(user)">
            <v-icon>block</v-icon>
        </v-btn>
        <span>Ban user</span>
    </v-tooltip>
</template>

<script>
export default {
  props: ['user'],
  computed: {
    isBanned() {
      return this.user.status == 0
    }
  },
  methods: {
    ban(user) {
      return this.$store.dispatch("admin/banUser", user._id).then(res => {
        user.status = res.data.status
      })
    },
    unban(user) {
      return this.$store.dispatch("admin/unbanUser", user._id).then(res => {
        user.status = res.data.status
      })
    }
  }
}
</script>
