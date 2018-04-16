<template>
    <v-app dark>
            <v-layout align-center justify-center>
            <div>
                <v-progress-circular :width="7" :size="400" indeterminate color="secondary">
                    <div class="logo">
                        <img src="~/assets/images/logo_large.png">
                    </div>
                </v-progress-circular>
            </div>
            <nuxt />
        </v-layout>
    </v-app>
</template>

<style lang="scss" scoped>
.logo {
    margin: -3em;
    img {
        width: 100%;
    }
}
</style>
