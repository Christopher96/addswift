/*
 * Small card for users under following/followers tabs
 */

<template>
  <v-flex xs12 sm6 md6 lg4>
    <v-card>
      <v-list >
        <v-list-tile avatar :to="'/' + user.username">
          <v-list-tile-avatar
          >
             <img :src="user.picture || 'logo.png'"  alt="addswift logo">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title >
                {{ user.username }}
            </v-list-tile-title>
            <v-list-tile-sub-title></v-list-tile-sub-title>
          </v-list-tile-content>
          <!-- <v-list-tile-action v-if="!isOwner">
            <FollowButton />
          </v-list-tile-action> -->
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
import FollowButton from '@/components/base/user/FollowButton'

export default {
  props: ['user'],
  components: {
    FollowButton,
  },
  computed: {
    isOwner() {
      if(this.$store.getters['auth/isAuthenticated']) {
        if(this.$store.getters['auth/userId'] == this.user._id) {
          return true
        }
      }

      return false
    }
  }
}
</script>
