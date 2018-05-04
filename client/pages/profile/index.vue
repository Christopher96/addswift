<template>
  <Profile /> 
</template>

<script>
import Profile from '@/components/profile'

export default {
    asyncData({ store }) {
        return store.dispatch('setProfile', store.getters['auth/user'])
    },
    components: {
        Profile
    },
    layout: 'authenticated'
}
</script>
