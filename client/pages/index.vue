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
    store.dispatch('auth/getUser')
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      redirect('/login')
    })
  }
}
</script>

