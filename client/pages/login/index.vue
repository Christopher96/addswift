<template>
  <v-form v-model="valid" ref="form" lazy-validation>
      <span class="mr-3">Don't have a user?</span>
      <nuxt-link to="register">Register</nuxt-link>
      <v-text-field
      v-model="username"
      label="Username"
      :counter="10"
      :error-messages="errors.collect('username')"
      v-validate="'required|max:10|min:3'"
      data-vv-name="username"
      required
      ></v-text-field>
      <v-text-field
      v-model="password"
      label="Password"
      :counter="50"
      :error-messages="errors.collect('password')"
      v-validate="'required|max:50|min:3'"
      data-vv-name="password"
      required
      ></v-text-field>
      <v-alert
      v-show="error"
      type="error"
      :value="true"
      >{{ error }}</v-alert>
      <v-btn
      @click="login"
      :disabled="!valid">
      Login</v-btn>
      <v-btn
      @click="clear"
      >clear</v-btn>
  </v-form>
</template>

<script>
import Auth from '@/services/AuthenticationService'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    valid: true,
    username: '',
    password: '',
    error: '',
    dictionary: {
      custom: {}
    }
  }),
  methods: {
    async login() {
      this.error = ''
      this.success = ''
      this.$validator.validateAll().then(async (result) => {
        if(!result) return
        await Auth.login({
            username: this.username,
            password: this.password
        }).then((res) => {
            this.$store.dispatch('setToken', res.data.token)
            this.$store.dispatch('setUser', res.data.user)
            this.$router.push('/')
        }).catch((err) => {
          console.log(err)
          this.error = err.response.data
        })
      })
    },
    clear() {
      this.$refs.form.reset()
      this.$validator.reset()
    }
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
  layout: 'auth'
}
</script>
