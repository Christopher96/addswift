<template>
<div>
  <Cover :source="profile.cover" />
  <v-layout justify-center>
    <v-flex class="profile-container" md8>
      <v-layout>
        <v-flex class="profile-aside" md3 pr-3>
          <Aside :name="profile.displayName || profile.username" :picture="profile.picture" :profileData="profileData" />
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
import Content from './Content'
import Cover from './Cover'

export default {
  beforeMount() {
    this.profile = this.$store.getters.profile
    this.profileData = this.profile.data
    if(this.profileData) delete this.profileData["_id"]

    if(this.$store.getters['auth/isAuthenticated']) {
      if(this.profile._id == this.$store.getters['auth/user']._id) {
        this.owner = true
      }
    }
  },
  components: {
      Aside,
      Content,
      Cover
  }
}
</script>

<style lang="stylus" scoped>
.profile-aside
  margin-top: -8em;
</style>

