<template>
  <v-btn
  @click="login" 
  :style="{ backgroundColor: color }"
  ><span><i :class="'fa fa-'+site"></i>{{title}}</span>
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
            FacebookService.loginWindow()
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
  margin-right: 10px;
}

.btn {
  width: 100%;
  margin-bottom: 15px;
}

</style>
