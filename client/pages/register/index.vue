<template>
  <v-form v-model="valid" ref="form" lazy-validation>
       <p class="subheading">Already a member? <nuxt-link to="login">Login </nuxt-link><i class="fa fa-arrow-right"></i></p>
      <v-layout fluid>
        <v-flex md6 column>
          <v-text-field
          prepend-icon="fa-user"
          v-model="username"
          label="Username"
          :counter="10"
          :error-messages="errors.collect('username')"
          v-validate="'required|max:10|min:3'"
          data-vv-name="username"
          required
          ></v-text-field>
          <v-text-field
          prepend-icon="fa-envelope"
          v-model="email"
          label="Email"
          :error-messages="errors.collect('email')"
          v-validate="'required|email'"
          data-vv-name="email"
          required
          ></v-text-field>
          
        </v-flex >
        <v-flex md6 column>
          <v-text-field
          name="password"
          prepend-icon="fa-lock"
          v-model="password"
          label="Password"
          :counter="50"
          :error-messages="errors.collect('password')"
          v-validate="'required|max:50|min:3'"
          data-vv-name="password"
          required
          ></v-text-field>
          <v-text-field
          prepend-icon="fa-unlock-alt"
          v-model="confirm_password"
          label="Confirm password"
          :error-messages="errors.collect('confirm_password')"
          v-validate="'confirmed:password'"
          data-vv-name="confirm_password"
          required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-alert
      v-show="error"
      type="error"
      :value="true"
      >{{ error }}</v-alert>
      <div class="form-btns">
      <v-btn
      id="register-btn"
      @click="register"
      :disabled="!valid">
      Register</v-btn>
      <v-btn
      @click="clear"
      >clear</v-btn>
      </div>
      
  </v-form>
</template>

<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    valid: true,
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    error: '',
    dictionary: {
      custom: {}
    }
  }),
  methods: {
    async register() {
      this.error = ''
      this.success = ''
      this.$validator.validateAll().then(async (result) => {
        if(!result) return
        await this.$store.dispatch('auth/register', {
            username: this.username,
            password: this.password
        }).then((res) => {
          this.$router.push('/')
        }).catch((err) => {
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
  layout: 'auth',
  middleware: 'notAuthenticated'
}
</script>
