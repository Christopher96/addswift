
<template>
  <v-app dark>
    <Nav />
    <Header />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Nav,
    Footer
  },
  props: {
    source: String
  },
  middleware: 'authenticated',
}
</script>

