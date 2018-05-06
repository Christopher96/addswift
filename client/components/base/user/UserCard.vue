<template>
  <v-flex xs4>
    <v-card>
      <v-list >
        <v-list-tile avatar>
          <v-list-tile-avatar
          >
            <img :src="user.picture">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <nuxt-link :to="'/' + user.username">
            <v-list-tile-title >
                {{ user.username }}
            </v-list-tile-title>
            </nuxt-link>
            <v-list-tile-sub-title></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <FollowButton />
          </v-list-tile-action>
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
    FollowButton
  }
}
</script>
