<template>
<div>
    <v-parallax
      :src="user.cover"
      height="300"
    >
    </v-parallax>
  <v-layout justify-center>
    <v-flex class="profile-container" md8>
      <v-layout>
        <v-flex class="profile-aside" md3 pr-3>
          <Aside :user="user" />
        </v-flex>
        <v-flex md9>
          <Content :user="user" />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</div>
</template>


<script>
  import Aside from '@/components/profile/layout/Aside'
  import Content from '@/components/profile/layout/Content'

  export default {
    asyncData({ store, redirect }) {
      return store.dispatch('auth/getUser')
      .then((res) => {
        return { user: res.data }
      })
      .catch(() => {
        store.dispatch('auth/logout')
          .then(redirect('/login'))
      })
    },
    components: {
      Aside,
      Content
    }
  }
</script>

<style lang="stylus" scoped>
#profile_menu
  margin-top: 1em;

.profile-aside
  margin-top: -8em;

.fa
  font-size: 1.5em;
</style>

