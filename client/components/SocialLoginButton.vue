<template>
  <v-btn
  @click="login" 
  :style="{ backgroundColor: color }"
  class="social-btn"
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
      login() {
        switch (this.site) {
          case "facebook":
          console.log("asdf")
            FacebookService.loginUrl()
            .then((res) => {
                const loginWindow = window.open(res.data.url)
                loginWindow.onbeforeunload = () => {
                  this.$emit('socialLogin')
                }
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

<style lang="scss">



.social-btn {
  width: 100%;
  margin-bottom: 10px;
  height: auto;

  .site-icon {
    border-right: 1px solid;
  }

  .fa {
    font-size: 1.5em;
  }
    
  .btn__content {
    padding: 15px 15px 15px 0;
    
  }
}



</style>
