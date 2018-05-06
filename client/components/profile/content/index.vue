<template>
    <div id="content_container">
        <v-bottom-nav 
            id="profile_menu"
            value="true" 
            :active.sync="selectedItem" 
            shift
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
        <component :is="currentItem.component" :items="currentItem.items"></component>
    </div>
</template>

<script>
import Accounts from './accounts'
import Sites from './sites'
import Followers from './followers'

export default {
    props: ['accounts', 'sites', 'followers'],
    data: () => ({
        selectedItem: 0,
        items: [
            { title: "Accounts", icon: "person", component: Accounts, items: this.accounts },
            { title: "Sites", icon: "fa-globe", component: Sites, items: this.sites },
            { title: "Followers", icon: "group", component: Followers, items: this.followers }
        ]
    }),
    computed: {
        currentItem() {
            return this.items[this.selectedItem]
        }
    },
}
</script>

<style lang="stylus">
#content_container
    position relative
    .btn:not(.btn--active)
        .icon
            color white !important
    .btn.btn--active
        span
            color white !important

#profile_menu
    top 0 
    justify-content left
    margin-bottom 1em
    
</style>

