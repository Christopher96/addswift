<template>
  <div>
    <v-layout v-if="followers.length > 0">
      <UserCard
       
        v-for="user in followers"
        :key="user._id"
        :user="user"
      />
    </v-layout>
    <v-card v-else>
      <v-card-title>No one is following yet</v-card-title>
    </v-card>
  </div>
  
</template>

<script>
import UserCard from '@/components/base/user/UserCard'

export default {
  components: {
    UserCard
  },
  computed: {
    followers() {
      return this.$store.getters.followers
    }
  },
  mounted() {
  }
}
</script>
