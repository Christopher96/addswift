
<template>
  <v-app dark>
    <Header />
    <Nav />
    <v-content>
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
  },
  middleware: 'authenticated',
}
</script>

