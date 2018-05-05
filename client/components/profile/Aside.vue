<template>
    <div>
        <v-card 
        class="profile-image fade-3"
        >
            <v-card-media 
            :src="picture || 'logo.png'" 
            :contain="!picture" 
            height="175px">
                <v-layout column class="media">
                </v-layout>
            </v-card-media>
            <v-list>
                <v-list-tile class="pt-3 pb-3">
                    <v-list-tile-content>
                        <span class="headline">{{ name }}</span>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <FollowButton :name="name" v-if="!profileOwner" :isFollowing="isFollowing" />
                </v-list-tile>
                <div v-if="profileData">
                    <v-divider></v-divider>
                    <v-list-tile v-for="(val, key) in profileData" :key="key">
                        <v-list-tile-action>
                            <v-icon color="primary">{{ icon(key) }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="body-2">{{ val }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </div>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import FollowButton from "@/components/base/user/FollowButton"

export default {
  props: ["name", "picture", "profileData"],
  methods: {
    icon(field) {
      switch (field) {
        case "address":
          return "location_on";
        default:
          return field;
      }
    }
  },
  computed: {
    ...mapGetters(["profileOwner", "isFollowing"])
  },
  components: {
    FollowButton
  }
};
</script> 

