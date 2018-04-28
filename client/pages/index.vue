<template>
  <div>
    <h1 v-if="user">Hello {{ user.username }}</h1>
  </div>
</template>

<script>
export default {
  asyncData({ store, redirect }) {
    return store.dispatch('auth/getUser')
    .then((res) => {
      console.log(res)
      return { user: res.data.user }
    })
    .catch(() => {
      store.dispatch('auth/logout')
      .then(redirect('/login'))
    })
  }
}
</script>

