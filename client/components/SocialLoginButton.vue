<template>
  <v-btn
  @click="login" 
  :class="'social-btn-' + site"
  ><span><i :class="'fa fa-'+site"></i> Sign in with {{name}}</span>
  </v-btn>
</template>

<script>
  export default {
    props: [
      "site",
      "name"
    ],
    methods: {
      login: (event) => {
        switch (event.target.id) {
          case "facebook":

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
