<template>
  <div>
    <v-layout v-if="accounts.length > 0">
      <Account v-for="account in accounts" :key="account._id" :account="account" />
      
    </v-layout>
    <v-card v-else>
      <v-card-title>No accounts added yet</v-card-title>
    </v-card>
  </div>
    
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
  },
  mounted() {
    console.log(this.accounts)
  }
}
</script>
