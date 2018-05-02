<template>
  <v-toolbar app fixed scroll-off-screen>
    <v-layout>
      <v-spacer></v-spacer>
      <v-flex md4>
        <v-layout row>
        <v-text-field
            prepend-icon="search"
            label="Search"
            solo-inverted
            flat
          ></v-text-field>
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-toolbar>
</template>

<script>
export default {
 computed: {
   drawer() {
     return this.$store.state.drawer
   }
 } 
}
</script>


<style lang="scss" scoped>
.logo,
.toolbar__title {
    height: 100%;
}

.toolbar__title .logo img {
    height: 100%;
    padding: .6em;
}
</style>
