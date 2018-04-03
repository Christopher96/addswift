<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Username"
      v-model="username"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      :rules="passwordRules"
      :counter="10"
      required
    ></v-text-field>
    <v-btn
      @click="register"
      :disabled="!valid"
    >
      submit
    </v-btn>
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
    ]
  }),
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        await Auth.register({
            username: this.username,
            password: this.password
        }).then((res) => {
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>