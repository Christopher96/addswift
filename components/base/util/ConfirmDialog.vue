<template>
    <v-dialog v-model="dialog.enabled" max-width="500">
      <v-card>
        <v-card-title class="headline">{{ dialog.title }}</v-card-title>
        <v-card-text class="subheading">{{ dialog.description }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="cancel">Cancel</v-btn>
          <v-btn class="error" @click.native="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['dialog'],
  methods: {
    cancel() {
        this.dialog.enabled = false
        //this.$parent.$emit('cancel')
    },
    confirm() {
        this.dialog.enabled = false
            //this.$parent.$emit('confirm')
    }
  }
}
</script>
