<template>
<div></div>
</template>

<script>
import FacebookService from '@/services/social/FacebookService'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  layout: 'loading',
  mounted() {
    const params = this.$route.query
    
    if(params.code !== undefined) {
      FacebookService.registerCode(params.code)
        .then((res) => {
          console.log(res)
          return AuthenticationService.socialLogin(res.data.token)
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }
 
}
</script>
