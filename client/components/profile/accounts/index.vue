<template>
    <v-layout>
      <Account v-for="account in user.accounts" :key="account._id" :account="account" />
    </v-layout>
</template>

<script>
import Account from './Account'

export default {
  props: ['user'],
  components: {
    Account
  },
  mounted() {
  }
}
</script>
