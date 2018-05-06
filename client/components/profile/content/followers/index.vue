<template>
  <div>
    <UserCard
      v-for="user in followers"
      :key="user._id"
      :user="user"
    />
  </div>
</template>

<script>
import UserCard from '@/components/base/user/UserCard'

export default {
  components: {
    UserCard
  },
  asyncData() {
    return this.$store.dispatch('followers')
    .then(res => {
      return { followers: res.data }
    })
  }
}
</script>
