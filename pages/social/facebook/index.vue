/*
 * Redirect page for converting Facebook code to Oauth token
 */

<template>
<div></div>
</template>

<script>
import FB from '@/services/social/FacebookService'

export default {
  layout: 'loading',
  mounted() {
    const params = this.$route.query
    
    if(params.code !== undefined) {
      FB.register(params.code)
        .then((res) => {
          return this.$store.dispatch('auth/socialLogin', res.data.token)
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }
 
}
</script>
