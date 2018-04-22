<template>
    <div></div>
</template>

<script>
export default {
    created: function() {
        this.$store.dispatch('auth/logout')
        .then(() => {
            this.$router.push('/login')
        })
    },
    layout: 'loading',
    auth: false
}
</script>