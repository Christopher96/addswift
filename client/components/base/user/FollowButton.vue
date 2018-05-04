<template>
    <v-tooltip 
        bottom
    >
        <v-btn
            icon
            slot="activator"
            @click="unfollow"
            v-if="isFollowing"
        >
            <v-icon>fa-user-times</v-icon>
        </v-btn>
        <v-btn
            icon
            slot="activator"
            @click="follow"
            v-else
        >
            <v-icon>fa-user-plus</v-icon>
        </v-btn>
        <span v-if="isFollowing">Unfollow</span>
        <span v-else>Follow</span>
    </v-tooltip>
</template>

<script>
export default {
    props: ['isFollowing'],
    methods: {
        follow() {
            this.$store.dispatch('follow')
        },
        unfollow() {
            this.$store.dispatch('unfollow')
        }
    }
}
</script>
