<template lang="html">
  <div class='error-dialog'>
    <span class="text" v-text="errorMessage"></span>
    <div className="container">
      <span class='arrow'></span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "errorMessage"
  ]
}

</script>

<style lang="css">
</style>
