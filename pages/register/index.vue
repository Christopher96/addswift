<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <Stepper />
    <p class="subheading">Already a member? <nuxt-link to="login">Login </nuxt-link><i class="fa fa-arrow-right"></i></p>
    <v-layout row wrap>
      <v-flex column sm6 xs12>
        <v-text-field
        prepend-icon="fa-user"
        v-model="username"
        label="Username"
        :counter="20"
        :error-messages="errors.collect('username')"
        v-validate="'required|max:20|min:3'"
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
      <v-flex column sm6 xs12>
        <v-text-field
        name="password"
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
        required
        ></v-text-field>
        <v-text-field
        prepend-icon="fa-unlock-alt"
        v-model="confirm_password"
        label="Confirm password"
        :error-messages="errors.collect('confirm_password')"
        v-validate="'required|confirmed:password'"
        data-vv-name="confirm_password"
        :type="pw ? 'text' : 'password'"
        required
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout 
    class="tos-box"
    justify-start>
      <v-flex>
        <v-checkbox
        class="tos-check"
        v-validate="'required'"
        v-model="check"
        :error-messages="errors.collect('check')"
        value="1"
        data-vv-name="check"
        type="checkbox"
        required
        ></v-checkbox>
      </v-flex>
        <v-flex 
        class="tos-text"
        xs12>
          <p class="subheading">
            Do you agree to the <a href="#" @click.prevent="openTOS">Terms of Service</a> and comply with our <a href="#" @click.prevent="openPP">Privacy Policy</a>?
          </p>
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
    <ConfirmDialog 
    :enabled="dialog.enabled" 
    :content="dialog.content" 
    v-on:resolve="resolveDialog"
    v-on:reject="closeDialog" />
  </v-form>
</template>

<script>
import ConfirmDialog from '@/components/base/user/ConfirmDialog'
import TOS from '@/components/auth/TOS'
import PP from '@/components/auth/PP'
import Stepper from '@/components/auth/AuthStepper'

import { mapGetters } from 'vuex'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    pw: false,
    valid: true,
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    error: '',
    check: null,
    tosCheck: false,
    ppCheck: false,
    dictionary: {
      custom: {
        check: {
          required: 'You must agree to the above.'
        },
        confirm_password: {
          required: 'You must confirm your password.',
          confirmed: 'Your passwords must match.'
        }
      }
    },
    dialog: {
      enabled: false,
      content: null
    }
  }),
  methods: {
    openTOS() {
      this.dialog.content = TOS
      this.dialog.enabled = true
    },
    openPP() {
      this.dialog.content = PP
      this.dialog.enabled = true
    },
    resolveDialog() {
      if(this.dialog.content == TOS) this.tosCheck = true
      else this.ppCheck = true
      
      this.check = (this.ppCheck && this.tosCheck) ? '1' : null
      this.dialog.enabled = false
    },
    closeDialog() {
      if(this.dialog.content == TOS) this.tosCheck = false
      else this.ppCheck = false
      
      this.check = (this.ppCheck && this.tosCheck) ? '1' : null
      this.dialog.enabled = false
    },
    register() {
      this.error = ''
      this.success = ''
      this.$validator.validateAll().then((result) => {
        if(!result) return
        this.$store.dispatch('auth/register', {
            username: this.username,
            password: this.password,
            email: this.email
        })
        .then(user => {
          this.user = user
        })
        .catch((err) => {
          console.log(err.response)
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
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  watch: {
    isAuthenticated(val) {
      console.log(this.user)
      if(val) this.$router.push('/')
    }
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
  layout: 'notAuthenticated',
  head() {
      return {
          title: 'Register',
      }
  },
  components: {
    ConfirmDialog,
    Stepper
  }
}
</script>

<style lang="stylus">
.tos-check
  position absolute
  .input-group__details
    padding-left 40px 

.tos-text
  position absolute
  margin-top 3px
  margin-left 40px

.tos-box
  padding-bottom 4em
</style>
