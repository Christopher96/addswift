<template>
    <v-layout>
      <Account v-for="account in accounts" :key="account._id" :account="account" />
    </v-layout>
</template>

<script>
import Account from './Account'

export default {
  props: ['accounts'],
  components: {
    Account
  }
}
</script>
