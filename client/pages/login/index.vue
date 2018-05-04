<template>
  <v-layout row wrap>
    <v-flex column sm6 xs12>
      <v-form ref="form" lazy-validation>
          <p class="fl subheading">Not a member yet? <nuxt-link to="register">Register </nuxt-link><i class="fa fa-arrow-right"></i></p>
          <v-text-field
            prepend-icon="fa-user"
            v-model="username"
            label="Username"
            :counter="20"
            :error-messages="errors.collect('username')"
            v-validate="'required|max:20|min:3'"
            data-vv-name="username"
            required>
          </v-text-field>
          <v-text-field
            prepend-icon="fa-lock"
            v-model="password"
            label="Password"
            :counter="50"
            :error-messages="errors.collect('password')"
            v-validate="'required|max:50|min:3'"
            data-vv-name="password"
            :append-icon="pw ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (pw = !pw)"
            :type="pw ? 'text' : 'password'"
            required>
          </v-text-field>
          <v-alert
            v-show="error"
            type="error"
            :value="true">
            {{ error }}
          </v-alert>
          <div class="form-btns">
          <v-btn
            id="login-btn"
            @click="login">
            Login
          </v-btn>
          <v-btn
            @click="clear">
            Clear
          </v-btn>
          </div>
      </v-form>
    </v-flex>
    <v-flex class="social-btns" column sm6 xs12>
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
import SocialLoginButton from "@/components/auth/SocialLoginButton.vue"
import { mapGetters } from 'vuex'

export default {
  components: {
    SocialLoginButton
  },
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    pw: false,
    username: '',
    password: '',
    error: '',
    dictionary: {
      custom: {}
    }
  }),
  methods: {
    login() {
      this.error = ''
      this.success = ''
      this.$validator.validateAll().then((result) => {
        if(!result) return
        this.$store.dispatch('auth/login', {
            username: this.username,
            password: this.password
        })
        .then(res => {
          this.$router.push('/profile')
        })
        .catch((err) => {
          console.log(err)
          if(err.response.data)
            this.error = err.response.data
          else console.log(err)
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
  layout: 'notAuthenticated',
}
</script>

<style lang="stylus">
@require '~vuetify/src/stylus/settings/_variables'

@media $display-breakpoints.xs-only
    .social-btns
          margin-top: 2em;   


</style>

