<template>
  <div></div>
</template>

<script>
import ProfileService from '@/services/ProfileService'

export default {
    validate ({ params }) {
    // Username "user123" or "facebook.123"
        return /^\w+(\.\d+)?$/.test(params.username)
    },
    asyncData({ params }) {
        return ProfileService.find(params.username)
        .then(res => {
             return { user: res.data }
        })
        .catch(err => {
            console.log(err)
        })
    },
    layout: 'public'
}
</script>
