<template>
    <v-dialog v-model="dialog" max-width="800">
        <v-stepper v-model="e1">
            <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Terms of Service</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Privacy Policy</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Using Addswift</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
            <v-stepper-content step="1">
                <v-card class="mb-5">
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Terms of Service</h3>
                            <img src="/agreement.png" alt="agreement handshake" />
                            <div>
                                <p>To use Addswift you must firstly accept our Terms of Service. This means that we will have proper allowance to terminate your account if you do not follow these guidelines.</p>
                                <p>The guidelines are here to both protect you as a user and the company from any legal disputes. If you wish to read it through fully here are the full <a href="#">Terms of Service</a></p>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
                <v-btn color="primary" @click.native="e1 = 2">Accept</v-btn>
                <v-btn flat>Decline</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-card class="mb-5">
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Privacy Policy</h3>
                            <div>
                                <p>Addswift as a company who handles sensitive data are required and responsible for making sure that this data does not come in the wrong hands. We do not store any data that we do not have any consent to store from you as a user and that you have full control over this data and is able to terminate your account and your data at any time.</p>

                                <p>We are actively striving to be fully compliant with the GDPR <i>(General Data Protection Regulation)</i> so that the company and you as a user have legal rights in how we are handling your data.</p>

                                <p>If you wish to know more about what type of data we store and how we use that data read our full <a href="#">Privacy Policy</a></p>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
                <v-btn color="primary" @click.native="e1 = 3">Accept</v-btn>
                <v-btn flat>Decline</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
                <v-card class="mb-5">
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Using Addswift</h3>
                            <div>
                                <p>Addswift is publicly open to everyone that have access to internet, this includes your profile and all of the data that you decide to publish unless you explicitly change your account to be private. Once logged in this can easily be achieved by entering your profile settings and switching the "Private" option on.</p>
                                <v-card>
                                    <img src="/private.png" alt="private option" />
                                </v-card>
                            </div>
                        </div>
                    </v-card-title>
                </v-card>
                <v-btn color="primary" @click.native="e1 = 1">Accept</v-btn>
                <v-btn flat>Decline</v-btn>
            </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: true,
        e1: 0
      }
    }
  }
</script>