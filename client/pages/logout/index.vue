<template>
    <div></div>
</template>

<script>
export default {
    created: function() {
        this.$store.commit('logout')
        this.$router.push('login')
    },
    layout: 'loading',
    auth: false
}
</script>