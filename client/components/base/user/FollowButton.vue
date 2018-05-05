<template>
    <div>
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
        <Snackbar :show="snackbar.on" :text="snackbar.text" />
    </div>
    
</template>

<script>
import Snackbar from "./Snackbar"

export default {
    props: ['name', 'isFollowing'],
    data() {
        return  {
            snackbar: {
                on: false,
                text: ""
            },
        }
    },
    methods: {
        follow() {
            this.$store.dispatch('follow')
        },
        unfollow() {
            this.$store.dispatch('unfollow')
        }
    },
    components: {
        Snackbar
    },
    watch: {
        isFollowing() {
            this.snackbar.on = true
            this.snackbar.text = (this.isFollowing) ? "You are now following " + this.name : "You've unfollowed " + this.name
        }
    }
}
</script>
