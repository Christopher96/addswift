<template>
<div>
  <Cover :source="profile.cover" />
  <v-layout justify-center>
    <v-flex id="profile_container" md8>
      <v-layout>
        <v-flex id="profile_aside" md3 pr-3>
          <Aside :name="profile.username" :picture="profile.picture" :profileData="profileData" />
        </v-flex>
        <v-flex md9>
          <Content :accounts="profile.accounts" :sites="profile.sites" :followers="profile.followers" />
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

import { mapGetters } from 'vuex'

export default {
  beforeMount() {
    this.profileData = this.profile.data
    if(this.profileData) delete this.profileData["_id"]
  },
  components: {
      Aside,
      Content,
      Cover
  },
  computed: {
    ...mapGetters([
      'profile',
      'profileOwner' 
    ]) 
  }
}
</script>

<style lang="stylus" scoped>
#profile_container
    margin-top -2.5em
#profile_aside
    margin-top -6em
</style>

