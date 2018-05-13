<template>
    <v-dialog v-model="isEnabled" max-width="1000">
      <v-card>
        <component v-if="content" :is="_content" />
        <span v-else>{{ text }}</span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="$emit('reject')">{{ negative || 'Disagree' }}</v-btn>
          <v-btn color="success" @click="$emit('resolve')">{{ positive || 'Agree' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: ['enabled', 'content', 'negative', 'positive', 'text'],
    computed: {
      isEnabled: {
        get() {
          return this.enabled
        },
        set(val) {
          if(!val) this.$emit('reject')
        }
      },
      _content() {
        return this.content
      }
    },
    watch: {
      isEnabled(val, old) {
        if(val && !old) setTimeout(() => document.querySelector(".dialog").scrollTo(0,0), 1)
      }
    }
  }
</script>