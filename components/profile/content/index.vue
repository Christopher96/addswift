<template>
    <div id="content_container">
        <v-bottom-nav 
            id="profile_menu"
            value="true" 
            :active.sync="selectedItem" 
        >
            <v-btn
                flat 
                color="primary"
                v-for="(item, i) in items"
                :key="i"
                :value="i"
            >
                <span>{{ item.title }}</span>
                <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
        </v-bottom-nav>
        <v-layout id="profile_content" justify-center>
            <v-flex xs12 sm10 md12>
                <component :is="currentItem.component"></component>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Accounts from './accounts'
import Sites from './sites'
import Followers from './followers'

export default {
    data: () => ({
        selectedItem: 0,
        items: [
            { title: "Accounts", icon: "person", component: Accounts },
            { title: "Sites", icon: "fa-globe", component: Sites },
            { title: "Followers", icon: "group", component: Followers }
        ]
    }),
    computed: {
        currentItem() {
            return this.items[this.selectedItem]
        },
    }
}
</script>

<style lang="stylus">
@require '~vuetify/src/stylus/settings/_variables'

@media $display-breakpoints.md-and-up
    #content_container
        position relative
        margin-top 3em
    #profile_menu
        position absolute
        top -5em

@media $display-breakpoints.sm-and-down
    #profile_content
        padding 1em
    #profile_menu
        position fixed
        bottom 0
        
#content_container
    .btn:not(.btn--active)
        .icon
            color white !important
    .btn:not(.btn--active)
        span
            color white !important

#profile_menu
    .fa
        width 24px
        height 24px
    
</style>

