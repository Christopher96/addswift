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
      FB.registerCode(params.code)
        .then((res) => {
          return this.$store.dispatch('auth/socialLogin', res.data)
        })
        .catch((err) => {
          console.log(err.response)
        })
        .then(() => {
          window.close()
        })
    }
  }
 
}
</script>
