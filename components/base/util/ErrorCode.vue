<template>
    <v-layout 
        justify-center
        align-center
        fill-height>
        <div
        class="text-xs-center">
            <span class="display-3">{{ code }}</span><br/><br/>
            <span class="display-1 grey--text">{{ message }}</span>
        </div>
    </v-layout> 
</template>

<script>
export default {
    props: ['code', 'message']
}
</script>
