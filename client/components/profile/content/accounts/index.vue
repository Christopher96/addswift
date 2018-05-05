<template>
    <v-layout>
      <Account v-for="account in accounts" :key="account._id" :account="account" />
    </v-layout>
</template>

<script>
import Account from './Account'

export default {
  beforeMount() {
    const profile = this.$store.getters.profile
    this.accounts = profile.accounts
  },
  components: {
    Account
  }
}
</script>
