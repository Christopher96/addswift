<template>
  <button @click="login" :id="site">
		<span><i :class="'fa fa-'+site"></i> Sign in with {{name}}</span>
	</button>
</template>

<script>
  export default {
    props: [
      "site",
      "name"
    ],
    methods: {
      login: (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
          case "facebook":

          break;
          case "twitter":

          break;
          case "google-plus":

          break;
        }
      }
    }
  }
</script>
