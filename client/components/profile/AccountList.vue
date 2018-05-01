<template>
  <v-container>
      <v-layout>
        <Account v-for="account in user.accounts" :key="account._id" :account="account" />
      </v-layout>
  </v-container>
</template>

<script>
import Account from './Account'

export default {
  props: ['user'],
  components: {
    Account
  },
  mounted() {
    console.log(this.user)
  }
}
</script>
