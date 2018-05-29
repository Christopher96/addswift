/*
 * Layout for registration and login
 */

<template>
    <v-app dark>
        <v-content>
            <v-container align-center justify-center>
                <div class="logo">
                    <img src="/addswift.png" alt="addswift logo">
                </div>
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>


<style lang="stylus">
@require '~vuetify/src/stylus/settings/_variables'

.container {
    max-width: 60em;
    height: 100%;
}

.logo {
    width: 100%;
    padding: 3em 10em;
    img {
        width: 100%;
    }
}

@media $display-breakpoints.sm-and-up
    .column 
        &:first-of-type 
            padding-right: 1em;
        &:last-of-type 
            padding-left: 1em;

@media $display-breakpoints.xs-only
    .logo
        padding: 2em;    
</style>


<script>
export default {
    middleware: 'notAuthenticated',
    mounted() {
    }
}
</script>
