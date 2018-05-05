<template>
    <v-snackbar
        bottom
        timeout="5000"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="show"
        >
        {{ text }}
        <v-btn flat color="primary" @click.native="show = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {
  props: ["text", "show"]
}
</script>