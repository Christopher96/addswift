<template>
<div>
  <Cover :source="profile.cover" />
  <v-layout justify-center>
    <v-flex id="profile_container" md8>
      <v-layout>
        <v-flex id="profile_aside" md3 pr-3>
          <Aside />
        </v-flex>
        <v-flex md9>
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
  }

}
</script>

<style lang="stylus" scoped>
#profile_container
    margin-top -2.5em
#profile_aside
    margin-top -6em
</style>

