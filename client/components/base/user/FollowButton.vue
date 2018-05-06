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
        <v-snackbar
            bottom
            :timeout="5000"
            v-model="snackbar.show"
            >
            {{ snackbar.text }}
            <v-btn flat color="primary" @click.native="snackbar.show = false">Close</v-btn>
        </v-snackbar>
    </div>
    
</template>

<script>
export default {
    props: ['name', 'isFollowing'],
    data() {
        return  {
            snackbar: {
                show: false,
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
    watch: {
        isFollowing() {
            this.snackbar.show = true
            this.snackbar.text = (this.isFollowing) ? "You are now following " + this.name : "You've unfollowed " + this.name
        }
    }
}
</script>
