<template>
  <v-app dark>
    <v-content>
        <Header/>
        <Nav />
        <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/base/layout/Header'
import Footer from '@/components/base/layout/Footer'
import Nav from '@/components/base/layout/Nav'

export default {
  components: {
    Header,
    Footer,
    Nav
  },
  props: {
    source: String
  },
  middleware: 'public'
}
</script>

