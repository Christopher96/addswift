<template>
  <div>
  </div>
</template>

<script>
export default {
  layout: ({ store }) => {
    if(store.getters['auth/isAuthenticated']) {
        return 'authenticated'
    }
  },
  head() {
    return {
      titleTemplate: null
    }
  }
}
</script>

