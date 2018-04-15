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

<style lang="scss" scoped>
.container {
    max-width: 50em;
}

#login-btn,
#register-btn {
    margin: 0;
}

.logo {
    width: 100%;
    text-align: center;
    padding: 2em 6em;
    img {
        width: 100%;
    }
}


</style>
