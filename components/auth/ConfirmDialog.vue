/*
 * Dynamic confirm dialog with optional text button fields, can use component as content
 */

<template>
    <v-dialog v-model="enabled" max-width="1000">
      <v-card>
        <component v-if="content" :is="content" />
        <span v-else>{{ text }}</span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="reject">{{ negative || 'Disagree' }}</v-btn>
          <v-btn color="success" @click="resolve">{{ positive || 'Agree' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: ['negative', 'positive', 'text'],
    data: () => ({
      enabled: false,
      content: null
    }),
    methods: {
        resolve() {
            this.$emit('resolve')
            this.enabled = false
        },
        reject() {
            this.$emit('reject')
            this.enabled = false
        }
    },
    watch: {
      enabled(val, old) {
        console.log("asfd")
        if(val && !old) setTimeout(() => document.querySelector(".dialog").scrollTo(0,0), 1)
      }
    }
  }
</script>