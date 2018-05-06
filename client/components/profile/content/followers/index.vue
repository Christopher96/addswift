<template>
  <div>
    <UserCard
      v-for="user in items"
      :key="user._id"
      :user="user"
    />
  </div>
</template>

<script>
import UserCard from '@/components/base/user/UserCard'

export default {
  props: ['items'],
  components: {
    UserCard
  }
}
</script>
