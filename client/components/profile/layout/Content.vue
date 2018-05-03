<template>
    <div>
        <v-tabs
        id="profile_menu"
        v-model="currentItem"
        slider-color="primary"
        >
            <v-tab
                v-for="item in items"
                :key="item.title"
                :href="'#tab-' + item.title"
            >
                <v-icon
                class="mr-2" 
                >
                {{ item.icon }}
                </v-icon>
                {{ item.title }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentItem">
            <v-tab-item
                v-for="item in items"
                :key="item.title"
                :id="'tab-' + item.title"
            >
                <v-card class="transparent mt-3">
                    <component :is="item.component" :data="item.data"></component>            
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import Accounts from '@/components/profile/accounts'
import Sites from '@/components/profile/sites'

export default {
    props: ['user'],
    data: () => {
        return {
currentItem: 'tab-Accounts',
        items: [
            { title: "Accounts", icon: "group", component: Accounts, data: user.accounts },
            { title: "Sites", icon: "fa-globe", component: Sites, data: user.sites }
        ]
        }
        
    },
}
</script>
