<template>
  <div>
  <v-layout row>
      <v-jumbotron
        class="profile-header"
        :gradient="gradient"
        align-center         
        height="300px"
      >
      </v-jumbotron>
  </v-layout>
<v-layout justify-center>
      <v-flex class="profile-container" md10>
        <v-layout>
          <v-flex class="profile-aside" md3>
            <v-card class="profile-image">
              <v-card-media src="/static/doc-images/lists/ali.png" height="180px">
                <v-layout column class="media">
                </v-layout>
              </v-card-media>
            </v-card>
          </v-flex>
          <v-flex md8 pl-4>
            <v-toolbar
            tabs
            >
        <v-tabs
          v-model="currentItem"
          slider-color="secondary"
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
      </v-toolbar>

    <v-tabs-items v-model="currentItem">
      <v-tab-item
        v-for="item in items"
        :key="item.title"
        :id="'tab-' + item.title"
      >
        <v-card flat>
          <v-card-text>
            <component :is="item.component" :user="user"></component>            
          </v-card-text>
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
  import AccountList from '@/components/profile/AccountList'

  export default {
    data: () => ({
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      currentItem: 'tab-Accounts',
      items: [
        {
          title: "Accounts",
          icon: "group",
          component: AccountList
        }
      ]
    }),
    components: {
      AccountList
    },
    asyncData({ store, redirect }) {
      return store.dispatch('auth/getUser')
      .then((res) => {
        return { user: res.data }
      })
      .catch(() => {
        store.dispatch('auth/logout')
        .then(redirect('/login'))
      })
    }
  }
</script>

<style lang="stylus" scoped>
.profile-container
  margin-top: -4em;

.profile-aside
  margin-top: -5em;
</style>
