<template>
    <v-app dark>
        <v-content>
            <v-container align-center justify-center>
                <div class="logo">
                    <img src="~/assets/images/logo_large.png">
                </div>
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<style lang="scss">
.container {
    max-width: 60em;
    height: 100%;
}

.logo {
    width: 100%;
    padding: 3em 8em;
    img {
        width: 100%;
    }
}

.column {
  &:first-of-type {
    padding-right: 1em;
  }
  &:last-of-type {
    padding-left: 1em;
  }
}
</style>
