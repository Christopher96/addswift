<template>
  <v-btn
  @click="login" 
  :data-site="site"
  :style="{ backgroundColor: color }"
  ><span><i :class="'fa fa-'+site"></i>{{title}}</span>
  </v-btn>
</template>

<script>
  export default {
    props: [
      "title",
      "site",
      "color"
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

<style lang="scss" scoped>
.fa {
  margin-right: 10px;
}

.btn {
  width: 100%;
  margin: 0 0 15px 0;
}
</style>
