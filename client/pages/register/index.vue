<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <span class="mr-3">Already have a user?</span>
    <nuxt-link to="login">Login</nuxt-link>
    <v-text-field label="Username" v-model="username" :rules="nameRules" :counter="10" required></v-text-field>
    <v-text-field label="Password" v-model="password" :rules="passwordRules" :counter="10" required></v-text-field>
    <v-alert v-show="error" type="error" :value="true">{{ error }}</v-alert>
    <v-btn @click="register" :disabled="!valid">Register</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import Auth from '@/services/AuthenticationService'
export default {
  data: () => ({
    valid: true,
    username: "",
    nameRules: [
      v => !!v || "Username is required",
      v => (v && v.length <= 10) || "Username must be less than 10 characters"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 10) || "Username must be less than 10 characters"
    ],
    error: ""
  }),
  methods: {
    async register() {
      this.error = ""
      this.success = ""
      if (this.$refs.form.validate()) {
        await Auth.register({
            username: this.username,
            password: this.password
        }).then((res) => {
          this.$store.dispatch('setToken', res.data.token)
          this.$store.dispatch('setUser', res.data.user)
          this.$router.push('/')
        }).catch((err) => {
          this.error = err.response.data
        })
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  },
  layout: 'auth'
}
</script>
