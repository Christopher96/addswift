<template>
    <v-layout>
      <Account v-for="account in data" :key="account._id" :account="account" />
    </v-layout>
</template>

<script>
import Account from './Account'

export default {
  props: ['data'],
  components: {
    Account
  },
  mounted() {
  }
}
</script>
