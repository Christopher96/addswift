<template>
  <v-layout fluid>
    <v-flex column md6>
      <v-form v-model="valid" ref="form" lazy-validation>
          <p class="fl subheading">Not a member yet? <nuxt-link to="register">Register </nuxt-link><i class="fa fa-arrow-right"></i></p>
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
          prepend-icon="fa-lock"
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
          :value="true">
            {{ error }}
          </v-alert>
          <div class="form-btns">
            <v-btn
            id="login-btn"
            @click="login"
            :disabled="!valid">
              Login
            </v-btn>
            <v-btn
            @click="clear">
              Clear
            </v-btn>
          </div>
      </v-form>
    </v-flex>
    <v-flex column md6>
      <p class="subheading">Or sign in with social media</p>
      <SocialLoginButton
        title="Facebook"
        site="facebook"
        color="#4267b2"/>
      <SocialLoginButton
        title="Google +"
        site="google-plus"
        color="#db4437"/>
      <SocialLoginButton
        title="Twitter"
        site="twitter"
        color="#1DA1F2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import SocialLoginButton from "@/components/SocialLoginButton.vue";
import AuthenticationService from '@/services/AuthenticationService'

export default {
  components: {
    SocialLoginButton
  },
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
        await this.$auth.loginWith('local', {
            username: this.username,
            password: this.password
        }).then((res) => {
          console.log(res)
            this.$store.commit('setUser', res.data.user)
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
  layout: 'auth',
  auth: false
}
</script>


