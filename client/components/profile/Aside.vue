<template>
    <div>
        <v-card 
        class="profile-image fade-3"
        >
            <v-card-media 
            :src="profile.picture || 'logo.png'" 
            :contain="!profile.picture" 
            :class="!profile.picture ? 'contain-image' : ''"
            height="175px"
            >
            </v-card-media>
            <v-list>
                <v-list-tile class="pt-3 pb-3">
                    <v-list-tile-content>
                        <span class="headline">{{ profile.username }}</span>
                        <i class="body-2 grey--text">{{ profile.role.title }}</i>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                    <FollowButton :name="profile.username" v-if="!profileOwner" :isFollowing="isFollowing" />
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
    ...mapGetters(["profile", "profileOwner", "isFollowing"]),
    profileData() {
        let profileData = this.profile.data
        if(profileData) delete profileData["_id"]
        return profileData
    }
  },
  components: {
    FollowButton
  },
  mounted() {
      console.log(this.profile)
  }
};
</script> 

<style lang="stylus">
.contain-image
    .card__media__background
        background-origin: content-box !important;
        padding 1em
</style>

