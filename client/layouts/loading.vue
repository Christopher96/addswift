<template>
    <v-app dark>
            <v-layout align-center justify-center>
            <div>
                <v-progress-circular :width="7" :size="400" indeterminate color="secondary">
                    <Logo/>
                </v-progress-circular>
            </div>
            <nuxt />
        </v-layout>
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
.logo {
    margin: -3em;
}
</style>
