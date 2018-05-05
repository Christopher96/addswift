<template>
  <v-app dark>
    <v-content>
      <Header :authenticated="false" />
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/base/layout/Header'
import Footer from '@/components/base/layout/Footer'

export default {
  components: {
    Header,
    Footer,
  },
  props: {
    source: String
  }
}
</script>

