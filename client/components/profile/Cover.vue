<template>
    <v-card
        color="grey darken-4"
    >
        <v-parallax
            :src="source"
            height="300"
        >
        </v-parallax>
    </v-card>
</template>

<script>
export default {
    props: ['source']    
}
</script>
