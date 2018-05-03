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
              <v-list-tile class="pt-3 pb-3">
                <v-list-tile-content>
                  <span class="headline">{{ user.displayName }}</span>
                  <span class="caption grey--text">{{ user.username }}</span>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    slot="activator"
                  >
                    <v-icon>person_add</v-icon>
                  </v-btn>
                  <span>Follow</span>
                </v-tooltip>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile v-for="(val, key) in userData" :key="key">
                <v-list-tile-action>
                  <v-icon color="primary">{{ icon(key) }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="body-2">{{ val }}</v-list-tile-title>
                </v-list-tile-content>
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
                  <component :is="item.component" :data="item.data"></component>            
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
      currentItem: 'tab-Accounts',
      items: [
        { title: "Accounts", icon: "group", component: Accounts, data: user.accounts },
        { title: "Sites", icon: "fa-globe", component: Sites, data: user.sites }
      ]
    }),
    beforeMount() {
        this.userData = this.user.data
        delete this.userData["_id"]
    },
    methods: {
      icon(field) {
        switch(field) {
          case 'address': return 'location_on'
          default: return field
        }
      }
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

