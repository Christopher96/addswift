<template>
  <Profile /> 
</template>

<script>
import Profile from '@/components/profile'

export default {
    validate ({ params }) {
        // Username "user123" or "facebook.123"
        return /^\w+(\.\d+)?$/.test(params.username)
    },
    asyncData({ params, store, redirect }) {
        if(store.getters['auth/isAuthenticated']) {
            if(store.getters['auth/user'].username == params.username) {
                return store.dispatch('setProfile', store.getters['auth/user'])
            }
        }

        return store.dispatch('getProfile', params.username)
            .catch(err => {
                redirect('/')
            })
    },
    components: {
        Profile
    },
    layout: ({ store }) => {
        if(store.getters['auth/isAuthenticated']) {
            return 'authenticated'
        }
    }
}
</script> 
    
