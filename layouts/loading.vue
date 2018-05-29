/*
 * Addswift loader layout
 */

<template>
    <v-app dark>
            <v-layout align-center justify-center>
            <div>
                <v-progress-circular :width="7" :size="400" indeterminate color="secondary">
                    <div class="logo">
                        <img src="/addswift.png" alt="addswift logo">
                    </div>
                </v-progress-circular>
            </div>
            <nuxt />
        </v-layout>
    </v-app>
</template>

<style lang="scss" scoped>
.logo {
    margin: -2em;
    img {
        width: 100%;
    }
}
</style>

<script>
export default {
  head() {
      return {
          titleTemplate: null
      }
  }
}
</script>

