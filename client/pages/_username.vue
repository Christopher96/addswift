<template>
    <Profile v-if="profile" />
    <v-layout 
    justify-center
    align-center
    fill-height
    v-else>
        <div
        class="text-xs-center">
            <span class="display-3">404</span><br/><br/>
            <span class="display-1 grey--text">User was not found.</span>
        </div>
    </v-layout> 
</template>

<script>
import Profile from '@/components/profile'

export default {
    validate ({ params }) {
        // Username "user123" or "facebook.123"
        return /^\w+(\.\d+)?$/.test(params.username)
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
        Profile
    }
}
</script> 
    
