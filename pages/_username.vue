/*
 * Dynamic route for profiles, validates username and fetches the profile if it exists
 */

<template>
    <Profile v-if="profile" />
    <ErrorCode v-else :code="code" :message="message" />
</template>

<script>
import Profile from '@/components/profile'
import ErrorCode from '@/components/base/util/ErrorCode.vue'

export default {
    validate ({ params }) {
        console.log(params)
        // Username "user123" or "facebook.123"
        return true
        //return /^ \w+(\.\d+)?$/.test(params.username)
    },
    asyncData({ params, store, redirect }) {
        return store.dispatch('getProfile', params.username)
        .catch((res) => {
            return {
                code: res.response.status,
                message: res.response.data
            }
        })
    },
    computed: {
        profile() {
            return this.$store.getters.profile
        }
    },
    components: {
        Profile,
        ErrorCode
    }
}
</script> 
    
