<template>
  <v-layout>
    <v-flex xs4>
      <v-card>
          <v-card-actions
            class="secondary" 
          >
            <v-btn icon>
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
            <span class="subheading">{{ this.account.vendor.title }}</span>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>person_add</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        <v-card-media :src="imageUrl" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <a :href="accountUrl" class="headline">{{ username }}</a>
            <div>
              <span class="grey--text caption">{{ this.account.created }}</span>
            </div> 
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['account'],
  data() {
      return {
        icon: "fa-"+this.account.vendor.site,
        ...this.account.data
      }
  },
}
</script>

<style lang="stylus" scoped>
.fa
  font-size: 1.3em;
  
</style>


