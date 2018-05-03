<template>
    <v-flex class="profile-aside" md3 pr-3>
        <v-card class="profile-image">
        <v-card-media :src="picture" height="175px">
            <v-layout column class="media">
            </v-layout>
        </v-card-media>
        <v-list>
            <v-list-tile class="pt-3 pb-3">
            <v-list-tile-content>
                <span class="headline">{{ displayName }}</span>
                <span class="caption grey--text">{{ username }}</span>
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
</template>

<script>
export default {
    props: ['picture', 'displayName', 'username', 'userData'],
    beforeMount() {
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
