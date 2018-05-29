/*
 * Logout route, kills the session and removes token
 */

<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('auth/logout')
    .then((res) => {
        this.$router.push('/login')
    }).catch((err) => {
        console.log(err)
        if(err.response.data)
        this.error = err.response.data
        else console.log(err)
    })
  },
  layout: 'loading'
}
</script>
