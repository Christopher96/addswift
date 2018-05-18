<template>
  <v-layout
  class="container-card"
  justify-center>
    <v-flex sm8 md8 lg6 xl4>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <slot></slot>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['title'],
  mounted() {
  }
}
</script>

<style lang="stylus">
@require '~vuetify/src/stylus/settings/_variables'

@media $display-breakpoints.xs-only
  .container-card
    padding 2em 1em

@media $display-breakpoints.sm-and-up
  .container-card
    margin-top 4em
</style>
