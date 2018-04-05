<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <span class="mr-3">Don't have a user?</span>
    <nuxt-link to="register">Register</nuxt-link>
    <v-text-field label="Username" v-model="username" :rules="nameRules" :counter="10" required></v-text-field>
    <v-text-field label="Password" v-model="password" :rules="passwordRules" :counter="10" required></v-text-field>
    <v-alert v-show="error" type="error" :value="true">{{ error }}</v-alert>
    <v-btn @click="login" :disabled="!valid">Login</v-btn>
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
    async login() {
      this.error = ""
      this.success = ""
      if (this.$refs.form.validate()) {
        await Auth.login({
            username: this.username,
            password: this.password
        }).then((res) => {

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