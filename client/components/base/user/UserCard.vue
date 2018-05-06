<template>
  <div>
    <v-card>
      <v-layout
        row
      >
        <v-flex xs4>
          <v-card-media
            class="avatar"
            :src="user.picture" 
            contain
          >
          </v-card-media>
        </v-flex>
        <v-flex xs8>
         <div class="headline">{{ user.name }}</div> 
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>
