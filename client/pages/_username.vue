<template>
    <Profile v-if="profile" />
    <notFound v-else />
</template>

<script>
import Profile from '@/components/profile'
import notFound from '@/components/base/util/404'

export default {
    validate ({ params }) {
        console.log(params)
        // Username "user123" or "facebook.123"
        return true
        //return /^ \w+(\.\d+)?$/.test(params.username)
    },
    asyncData({ params, store, redirect }) {
        return store.dispatch('getProfile', params.username)
        .catch(() => {})
    },
    computed: {
        profile() {
            return this.$store.getters.profile
        }
    },
    components: {
        Profile,
        notFound
    }
}
</script> 
    
