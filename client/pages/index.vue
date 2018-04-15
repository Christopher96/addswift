<template>
  <div>
    <div v-if="this.$store.state.isLoggedIn">
      <h1>Hello {{ this.$store.state.user.username }}</h1>
    </div>
    <h1 v-else>fuck you</h1>
  </div>
</template>

