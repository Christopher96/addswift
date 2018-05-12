<template>
  <v-form v-model="valid" ref="form" lazy-validation>
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
          v-model="tosCheck"
          :error-messages="errors.collect('tosCheck')"
          value="1"
          data-vv-name="tosCheck"
          type="checkbox"
          required
          ></v-checkbox>
        </v-flex>
          <v-flex 
          class="tos-text"
          xs12>
            <p class="subheading">
              Do you agree to the <a href="#" @click.prevent="openTOS">Terms of Service</a>?
            </p>
          </v-flex>
      </v-layout>
      <v-layout 
      class="tos-box"
      justify-start>
        <v-flex>
          <v-checkbox
          class="tos-check"
          v-validate="'required'"
          v-model="ppCheck"
          :error-messages="errors.collect('ppCheck')"
          value="1"
          data-vv-name="ppCheck"
          type="checkbox"
          required
          ></v-checkbox>
        </v-flex>
          <v-flex 
          class="tos-text"
          xs12>
            <p class="subheading">
              Do you comply with our <a href="#" @click.prevent="openPP">Privacy Policy</a>?
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
    tosCheck: null,
    ppCheck: null,
    dictionary: {
      custom: {
        tosCheck: {
          required: 'You must agree to the Terms of Service'
        },
        ppCheck: {
          required: 'You must comply with our Privacy Policy'
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
      if(this.dialog.content == TOS) this.tosCheck = '1'
      else this.ppCheck = '1'
      this.dialog.enabled = false
    },
    closeDialog() {
      if(this.dialog.content == TOS) this.tosCheck = null
      else this.ppCheck = null
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
        }).then((res) => {
          this.$router.push('/')
        }).catch((err) => {
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
    ConfirmDialog
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
