<template>
  <v-app dark>
    <v-content>
      <Header />
      <Nav /> 
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/base/Header'
import Nav from '@/components/base/Nav'
import Footer from '@/components/base/Footer'

export default {
  components: {
    Header,
    Nav,
    Footer
  },
  props: {
    source: String
  }
}
</script>

