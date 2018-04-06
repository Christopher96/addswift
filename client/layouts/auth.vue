<template>
    <v-app dark>
        <v-content>
            <v-container>
                <Logo />
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  components: {
      Logo
  }
}
</script>


<style lang="stylus" scoped>
.container
    max-width 50em
</style>
