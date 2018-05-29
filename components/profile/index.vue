/*
 * Template for profile, contains responsive columns and OGP meta data
 */

<template>
<div>
  <Cover :source="profile.cover" />
  <v-layout justify-center>
    <v-flex id="profile_container" sm12 md11 lg9 xl7>
      <v-layout wrap justify-center>
        <v-flex id="profile_aside" xs12 sm6 md3 lg3>
          <Aside />
        </v-flex>
        <v-flex xs12 md9 lg9>
          <Content />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import Aside from './Aside'
import Content from './content'
import Cover from './Cover'

export default {
  components: {
      Aside,
      Content,
      Cover
  },
  computed: {
    profile() {
        return this.$store.getters.profile
    }
  },
  head() {
    return {
      title: this.profile.username,
      titleTemplate: null,
      meta: [
        { 'vmid': 'og:title', 'property': 'og:title', 'content': this.profile.username },
        { 'vmid': 'og:type', 'property': 'og:type', 'content': 'user.profile' },
        { 'vmid': 'og:url', 'property': 'og:url', 'content': process.env.BASE_URI + '/' + this.profile.username },
        { 'vmid': 'og:image', 'property': 'og:image', 'content': this.profile.picture },
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '~vuetify/src/stylus/settings/_variables'

@media $display-breakpoints.md-and-up
  #profile_aside
    padding-right 1em

@media $display-breakpoints.xs-only
  #profile_aside
    padding 1em

#profile_aside
    margin-top -8em
</style>

