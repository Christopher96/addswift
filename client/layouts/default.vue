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
import Footer from '@/components/base/Footer'
import Nav from '@/components/base/Nav'

export default {
  components: {
    Header,
    Nav,
    Footer
  },
  props: {
    source: String
  },
  middleware: 'authenticated'
}
</script>

