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
          <v-card class="profile-image">
            <v-card-media :src="user.picture" height="175px">
              <v-layout column class="media">
              </v-layout>
            </v-card-media>
            <v-list>
              <v-list-tile >
                <v-list-tile-action>
                  <v-icon color="primary">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                  <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>chat</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
        <v-flex md9>
       
          <v-tabs
            id="profile_menu"
            v-model="currentItem"
            slider-color="primary"
          >
            <v-tab
              v-for="item in items"
              :key="item.title"
              :href="'#tab-' + item.title"
            >
              <v-icon
                class="mr-2" 
              >
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="currentItem">
            <v-tab-item
              v-for="item in items"
              :key="item.title"
              :id="'tab-' + item.title"
            >
              <v-card class="transparent mt-3">
                  <component :is="item.component" :user="user"></component>            
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</div>
</template>


<script>
  import Accounts from '@/components/profile/accounts'
  import Sites from '@/components/profile/sites'

  export default {
    data: () => ({
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      currentItem: 'tab-Accounts',
      items: [
        { title: "Accounts", icon: "group", component: Accounts },
        { title: "Sites", icon: "fa-globe", component: Sites }
      ]
    }),
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
    methods: {
      icon(field) {
        switch(field) {
          case 'address': return 'location_on'
          default: return field
        }
      }
    },
    mounted() {
      console.log(this.user.data)
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
