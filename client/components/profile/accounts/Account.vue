<template>
  <v-layout>
    <v-flex xs4>
      <v-card>
          <v-card-actions
            :style="'background-color:' + vendor.color + ';'" 
          >
            <v-btn icon>
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
            <span class="subheading">{{ vendor.title }}</span>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>person_add</v-icon>
            </v-btn>
            <v-btn @click="remove" icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        <v-card-media :src="data.picture" height="150px">
        </v-card-media>
        <v-card-title>
          <div>
            <a :href="data.link" class="title mb-1">{{ data.name }}</a>
            <div>
              <span class="grey--text caption">{{ created }}</span>
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
        ...this.account
      }
  },
  methods: {
    remove() {
      
    }
  },
  mounted() {
    // console.log(this.account)
  }
}
</script>

<style lang="stylus" scoped>
.fa
  font-size: 1.3em;
  
</style>


