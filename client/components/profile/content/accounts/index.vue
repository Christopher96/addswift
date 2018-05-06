<template>
    <v-layout>
      <Account v-for="account in accounts" :key="account._id" :account="account" />
    </v-layout>
</template>

<script>
import Account from './Account'

export default {
  components: {
    Account
  },
  computed: {
    accounts() {
      return this.$store.getters.profile.accounts
    }
  }
}
</script>
