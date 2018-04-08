<template>
<div></div>
</template>

<script>
import FacebookService from '@/services/social/FacebookService'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  mounted() {
    const params = this.$route.query
    if(params.code !== undefined) {
      FacebookService.getToken(params.code)
        .then((res) => {
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
