<template>
  <v-layout>
    <UserCard
      v-for="user in followers"
      :key="user._id"
      :user="user"
    />
  </v-layout>
</template>

<script>
import UserCard from '@/components/base/user/UserCard'

export default {
  components: {
    UserCard
  },
  computed: {
    followers() {
      return this.$store.getters.profile.followers
    }
  },
  mounted() {
    console.log(this.followers)
  }
}
</script>
