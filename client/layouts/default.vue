<template>
  <div>
    <Nav /> 
    <nuxt />
  </div>
</template>

<script>
import Nav from '@/components/base/Nav'

export default {
  components: {
    Nav
  },
  middleware: 'authenticated',
  layout: 'public'
}
</script>

