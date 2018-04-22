<template>
  <div>
    <!-- <h1>Hello {{ this.user.username }}</h1> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  asyncData({ store, redirect }) {
    return store.dispatch('auth/getUser')
    .then((res) => {
      console.log(res)
    })
    .catch(() => {
      console.log('hello')
      redirect('/login')
    })
  },
}
</script>

