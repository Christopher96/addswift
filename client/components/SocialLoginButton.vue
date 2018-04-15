<template>
  <v-btn
  @click="login" 
  :style="{ backgroundColor: color }"
  >
  <v-layout>
    <v-flex class="site-icon" md2><v-icon>fa-{{site}}</v-icon></v-flex>
    <v-flex md10>{{title}}</v-flex>
  </v-layout>
  </v-btn>
</template>

<script>
import FacebookService from '@/services/social/FacebookService'

  export default {
    props: [
      "title",
      "site",
      "color"
    ],
    methods: {
      login: function() {
        switch (this.site) {
          case "facebook":
            FacebookService.loginUrl()
            .then((res) => {
                window.open(res.data.url)
            })
          break;
          case "twitter":

          break;
          case "google-plus":

          break;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.fa {
  font-size: 1.5em;
}

.site-icon {
  border-right: 1px solid;
}

.btn {
  width: 100%;
  margin-bottom: 10px;
  padding: 15px 15px 15px 0;
  height: auto;
}


</style>
