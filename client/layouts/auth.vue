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

import "@/assets/scss/auth.scss"

export default {
  components: {
      Logo
  }
}
</script>